/**
 * Buscador global del sitio web personal
 * Carga el contenido de las páginas mediante fetch lazy
 */
class Buscador {
    /**
     * Constructor del buscador
     * Inicializa el índice vacío y configura eventos
     */
    constructor() {
        // Índice de contenido del sitio (se llena con fetch lazy)
        this.indice = {};

        // Lista de páginas del sitio
        this.paginas = [
            { url: 'index.html', titulo: 'Inicio', tituloEN: 'Home' },
            { url: 'aficiones.html', titulo: 'Aficiones', tituloEN: 'Hobbies' },
            { url: 'portfolio.html', titulo: 'Portfolio', tituloEN: 'Portfolio' },
            { url: 'contacto.html', titulo: 'Contacto', tituloEN: 'Contact' }
        ];

        // Referencia al formulario y resultados
        this.formulario = null;
        this.campoTexto = null;
        this.contenedorResultados = null;

        // Estado de carga
        this.cargando = false;
        this.cargaCompleta = false;
        this.promesaCarga = null;

        // Elemento search y botón toggle
        this.elementoSearch = null;
        this.botonToggle = null;
        this.buscadorVisible = false;

        // Inicializar el buscador
        this.inicializar();
    }

    /**
     * Inicializa el buscador
     * Carga la página actual y configura los eventos
     */
    inicializar() {
        var buscador = this;

        // Configurar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function () {
                buscador.configurarToggle();
                buscador.configurarFormulario();
                buscador.cargarPaginaActual();
            });
        } else {
            this.configurarToggle();
            this.configurarFormulario();
            this.cargarPaginaActual();
        }
    }

    /**
     * Configura el botón toggle para mostrar/ocultar el buscador
     */
    configurarToggle() {
        var buscador = this;

        // Buscar elementos - toggle del search completo
        this.elementoSearch = document.querySelector('header search');
        this.botonToggle = document.querySelector('[data-toggle-search]');
        var botonCerrar = document.querySelector('[data-close-search]');

        if (this.botonToggle && this.elementoSearch) {
            this.botonToggle.addEventListener('click', function () {
                buscador.toggleBuscador();
            });
        }

        // Configurar botón de cerrar
        if (botonCerrar) {
            botonCerrar.addEventListener('click', function () {
                buscador.cerrarBuscador();
            });
        }
    }

    /**
     * Cierra el buscador y los resultados
     */
    cerrarBuscador() {
        this.buscadorVisible = false;

        // Ocultar search
        this.elementoSearch.setAttribute('hidden', '');
        this.botonToggle.setAttribute('aria-expanded', 'false');

        // Ocultar output
        this.ocultarResultados();

        // Limpiar campo
        if (this.campoTexto) {
            this.campoTexto.value = '';
        }
    }

    /**
     * Muestra u oculta el buscador
     */
    toggleBuscador() {
        this.buscadorVisible = !this.buscadorVisible;

        if (this.buscadorVisible) {
            // Mostrar search
            this.elementoSearch.removeAttribute('hidden');
            this.botonToggle.setAttribute('aria-expanded', 'true');

            // Enfocar el campo de búsqueda
            if (this.campoTexto) {
                this.campoTexto.focus();
            }

            // Cargar todas las páginas al abrir
            this.cargarTodasLasPaginas();
        } else {
            // Ocultar search y resultados
            this.cerrarBuscador();
        }
    }

    /**
     * Carga el contenido de la página actual al entrar
     */
    cargarPaginaActual() {
        var paginaActual = this.obtenerPaginaActual();

        // Cargar la página actual primero
        this.cargarPagina(paginaActual);
    }

    /**
     * Obtiene el nombre de la página actual
     * @returns {string} - Nombre del archivo HTML actual
     */
    obtenerPaginaActual() {
        var ruta = window.location.pathname;
        var partes = ruta.split('/');
        var nombreArchivo = partes[partes.length - 1];

        // Si está vacío o es solo /, devolver index.html
        if (!nombreArchivo || nombreArchivo === '') {
            return 'index.html';
        }

        return nombreArchivo;
    }

    /**
     * Carga el contenido de una página mediante fetch
     * @param {string} nombrePagina - Nombre del archivo HTML a cargar
     * @returns {Promise} - Promesa que se resuelve cuando la página está cargada
     */
    cargarPagina(nombrePagina) {
        var buscador = this;

        // Si ya está cargada, devolver promesa resuelta
        if (this.indice[nombrePagina]) {
            return Promise.resolve(this.indice[nombrePagina]);
        }

        // Realizar fetch de la página
        return fetch(nombrePagina)
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error('Error al cargar ' + nombrePagina);
                }
                return respuesta.text();
            })
            .then(function (html) {
                // Parsear el HTML y extraer el contenido de texto
                var contenido = buscador.extraerContenido(html);

                // Guardar en el índice
                buscador.indice[nombrePagina] = contenido;

                return contenido;
            })
            .catch(function (error) {
                console.error('Error cargando página:', error);
                return [];
            });
    }

    /**
     * Carga todas las páginas del sitio
     * @returns {Promise} - Promesa que se resuelve cuando todas las páginas están cargadas
     */
    cargarTodasLasPaginas() {
        var buscador = this;

        // Si ya está cargando, devolver la promesa existente
        if (this.promesaCarga) {
            return this.promesaCarga;
        }

        // Si ya está completa, devolver promesa resuelta
        if (this.cargaCompleta) {
            return Promise.resolve();
        }

        this.cargando = true;
        var promesas = [];

        for (var i = 0; i < this.paginas.length; i++) {
            var pagina = this.paginas[i];
            promesas.push(this.cargarPagina(pagina.url));
        }

        this.promesaCarga = Promise.all(promesas).then(function () {
            buscador.cargando = false;
            buscador.cargaCompleta = true;
            buscador.promesaCarga = null;
        });

        return this.promesaCarga;
    }

    /**
     * Genera un ID slug a partir de un texto
     * @param {string} texto - Texto a convertir
     * @param {number} indice - Índice para desambiguación
     * @returns {string} - ID generado
     */
    generarSlug(texto, indice) {
        var slug = texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Quitar acentos
            .replace(/[^a-z0-9]+/g, '-') // Espacios y símbolos a guiones
            .replace(/^-+|-+$/g, '') // Quitar guiones al inicio/fin
            .substring(0, 40); // Limitar longitud

        return slug + '-' + indice;
    }

    /**
     * Extrae el contenido de texto de un documento HTML
     * @param {string} html - Contenido HTML de la página
     * @returns {Array} - Array con objetos {texto, textoEN, ancla, i18nKey} encontrados
     */
    extraerContenido(html) {
        var contenido = [];
        var buscador = this;
        var contadorSlugs = 0;

        // Crear un parser para el HTML
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Obtener el contenido del main (donde está el contenido principal)
        var main = doc.querySelector('main');
        if (!main) {
            return contenido;
        }

        /**
         * Extrae texto, clave i18n y ancla de un elemento
         * @param {Element} elemento - Elemento DOM
         * @returns {Object|null} - {texto, i18nKey, ancla} o null
         */
        function extraerElemento(elemento) {
            var texto = elemento.textContent.trim();
            if (!texto) return null;

            // Obtener la clave i18n si existe
            var i18nKey = elemento.getAttribute('data-i18n') || null;

            // Buscar el ancestro más cercano con ID o el heading padre
            var ancla = buscador.encontrarAncla(elemento, doc);

            // Si no hay ancla existente, generar una basada en el texto
            if (!ancla) {
                ancla = buscador.generarSlug(texto, contadorSlugs++);
            }

            return { texto: texto, i18nKey: i18nKey, ancla: ancla };
        }

        // Extraer texto de headings (estos son los principales puntos de anclaje)
        var headings = main.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (var i = 0; i < headings.length; i++) {
            var resultado = extraerElemento(headings[i]);
            if (resultado) contenido.push(resultado);
        }

        // Extraer texto de párrafos
        var parrafos = main.querySelectorAll('p');
        for (var j = 0; j < parrafos.length; j++) {
            var resultadoP = extraerElemento(parrafos[j]);
            if (resultadoP) contenido.push(resultadoP);
        }

        // Extraer texto de listas
        var items = main.querySelectorAll('li');
        for (var k = 0; k < items.length; k++) {
            var resultadoLi = extraerElemento(items[k]);
            if (resultadoLi) contenido.push(resultadoLi);
        }

        // Extraer texto de blockquotes
        var citas = main.querySelectorAll('blockquote');
        for (var l = 0; l < citas.length; l++) {
            var resultadoCita = extraerElemento(citas[l]);
            if (resultadoCita) contenido.push(resultadoCita);
        }

        // Extraer texto de figcaption
        var captions = main.querySelectorAll('figcaption');
        for (var m = 0; m < captions.length; m++) {
            var resultadoCaption = extraerElemento(captions[m]);
            if (resultadoCaption) contenido.push(resultadoCaption);
        }

        // Extraer texto alt de imágenes
        var imagenes = main.querySelectorAll('img[alt]');
        for (var n = 0; n < imagenes.length; n++) {
            var img = imagenes[n];
            var textoAlt = img.getAttribute('alt').trim();
            var i18nKeyAlt = img.getAttribute('data-i18n') || null;

            if (textoAlt) {
                var anclaImg = buscador.encontrarAncla(img, doc);
                if (!anclaImg) {
                    anclaImg = buscador.generarSlug(textoAlt, contadorSlugs++);
                }
                contenido.push({ texto: textoAlt, i18nKey: i18nKeyAlt, ancla: anclaImg });
            }
        }

        // Extraer texto de summaries (details)
        var summaries = main.querySelectorAll('summary');
        for (var o = 0; o < summaries.length; o++) {
            var resultadoSummary = extraerElemento(summaries[o]);
            if (resultadoSummary) contenido.push(resultadoSummary);
        }

        return contenido;
    }

    /**
     * Obtiene el texto traducido de un elemento del índice
     * @param {Object} item - Elemento del índice {texto, i18nKey, ancla}
     * @returns {string} - Texto en el idioma actual
     */
    obtenerTextoTraducido(item) {
        // Si hay una clave i18n y el gestor de idioma está disponible
        if (item.i18nKey && typeof gestorIdioma !== 'undefined' && gestorIdioma) {
            var traduccion = gestorIdioma.traducir(item.i18nKey);
            // Si la traducción existe y no es la misma clave, usarla
            if (traduccion && traduccion !== item.i18nKey) {
                return traduccion;
            }
        }
        // Fallback al texto original (español por defecto)
        return item.texto;
    }

    /**
     * Encuentra el ancla más cercana para un elemento
     * Busca IDs en el elemento o ancestros, o headings hermanos anteriores
     * @param {Element} elemento - Elemento DOM
     * @param {Document} doc - Documento
     * @returns {string|null} - ID del ancla o null
     */
    encontrarAncla(elemento, doc) {
        // Si el elemento tiene ID, usarlo
        if (elemento.id) {
            return elemento.id;
        }

        // Primero buscar la sección o artículo más cercano con ID
        var seccion = elemento.closest('section[id], article[id]');
        if (seccion && seccion.id) {
            return seccion.id;
        }

        // Buscar en ancestros hasta main
        var ancestro = elemento.parentElement;
        while (ancestro && ancestro.tagName !== 'MAIN') {
            if (ancestro.id) {
                return ancestro.id;
            }
            ancestro = ancestro.parentElement;
        }

        // Buscar el heading más cercano en la sección
        seccion = elemento.closest('section, article');
        if (seccion) {
            // Si la sección tiene ID, usarlo
            if (seccion.id) {
                return seccion.id;
            }
            var heading = seccion.querySelector('h1, h2, h3, h4, h5, h6');
            if (heading && heading.id) {
                return heading.id;
            }
        }

        // No generar slugs dinámicos - devolver null para usar navegación de página
        return null;
    }

    /**
     * Configura el formulario de búsqueda y sus eventos
     */
    configurarFormulario() {
        var buscador = this;

        // Buscar elementos del formulario (ahora dentro del header)
        this.formulario = document.querySelector('header search form');
        this.campoTexto = document.querySelector('header search input');
        this.contenedorResultados = document.querySelector('output');

        if (this.formulario && this.campoTexto) {
            // Prevenir envío del formulario
            this.formulario.addEventListener('submit', function (evento) {
                evento.preventDefault();
                buscador.buscar();
            });

            // Búsqueda en tiempo real (con debounce)
            var temporizador = null;
            this.campoTexto.addEventListener('input', function () {
                clearTimeout(temporizador);
                temporizador = setTimeout(function () {
                    buscador.buscar();
                }, 400);
            });

            // Al enfocar el campo, cargar todas las páginas
            this.campoTexto.addEventListener('focus', function () {
                buscador.cargarTodasLasPaginas();
            });
        }
    }

    /**
     * Realiza la búsqueda en el índice
     * Espera a que la carga esté completa antes de buscar
     */
    buscar() {
        var buscador = this;
        var consulta = this.campoTexto.value.trim().toLowerCase();

        // Si no hay consulta, ocultar resultados
        if (consulta.length < 2) {
            this.ocultarResultados();
            return;
        }

        // Asegurarse de que todas las páginas estén cargadas
        this.cargarTodasLasPaginas().then(function () {
            // Buscar coincidencias
            var resultados = buscador.buscarEnIndice(consulta);

            // Mostrar resultados
            buscador.mostrarResultados(resultados, consulta);
        });
    }

    /**
     * Busca coincidencias en el índice
     * Busca en el idioma actualmente seleccionado
     * @param {string} consulta - Texto a buscar
     * @returns {Array} - Resultados encontrados
     */
    buscarEnIndice(consulta) {
        var resultados = [];
        var buscador = this;

        for (var i = 0; i < this.paginas.length; i++) {
            var pagina = this.paginas[i];
            var contenido = this.indice[pagina.url];

            if (!contenido) {
                continue;
            }

            var coincidencias = [];
            var idiomaActual = (typeof gestorIdioma !== 'undefined' && gestorIdioma) ? gestorIdioma.idiomaActual : 'es';
            var titulo = idiomaActual === 'en' ? pagina.tituloEN : pagina.titulo;

            // Buscar en el contenido (usando el texto traducido al idioma actual)
            for (var j = 0; j < contenido.length; j++) {
                var item = contenido[j];
                // Obtener el texto en el idioma actual
                var texto = buscador.obtenerTextoTraducido(item);
                var ancla = item.ancla || null;

                if (texto.toLowerCase().indexOf(consulta) !== -1) {
                    coincidencias.push({
                        texto: texto,
                        ancla: ancla
                    });
                }
            }

            // Si hay coincidencias, agregar a resultados
            if (coincidencias.length > 0) {
                resultados.push({
                    pagina: pagina.url,
                    titulo: titulo,
                    coincidencias: coincidencias
                });
            }
        }

        return resultados;
    }

    /**
     * Muestra los resultados de la búsqueda
     * @param {Array} resultados - Resultados encontrados
     * @param {string} consulta - Consulta original
     */
    mostrarResultados(resultados, consulta) {
        if (!this.contenedorResultados) {
            return;
        }

        // Obtener traducciones
        var textoSinResultados = (typeof gestorIdioma !== 'undefined' && gestorIdioma) ? gestorIdioma.traducir('buscar.sin-resultados') : 'No se encontraron resultados para';
        var textoResultados = (typeof gestorIdioma !== 'undefined' && gestorIdioma) ? gestorIdioma.traducir('buscar.resultados') : 'resultados encontrados';

        // Limpiar resultados anteriores
        this.contenedorResultados.innerHTML = '';
        this.contenedorResultados.style.display = 'block';
        this.contenedorResultados.removeAttribute('hidden');

        if (resultados.length === 0) {
            // Mostrar mensaje de sin resultados
            var mensaje = document.createElement('p');
            mensaje.textContent = textoSinResultados + ' "' + consulta + '"';
            this.contenedorResultados.appendChild(mensaje);
            return;
        }

        // Mostrar contador de resultados
        var contador = document.createElement('p');
        var totalCoincidencias = 0;
        for (var r = 0; r < resultados.length; r++) {
            totalCoincidencias = totalCoincidencias + resultados[r].coincidencias.length;
        }
        contador.innerHTML = '<strong>' + totalCoincidencias + '</strong> ' + textoResultados + ' en ' + resultados.length + ' páginas';
        this.contenedorResultados.appendChild(contador);

        // Crear lista de resultados
        var lista = document.createElement('ul');

        for (var i = 0; i < resultados.length; i++) {
            var resultado = resultados[i];
            var item = document.createElement('li');

            // Obtener la primera coincidencia para el enlace
            var primeraCoincidencia = resultado.coincidencias[0];
            var ancla = primeraCoincidencia.ancla;

            // Enlace a la página con ancla
            var enlace = document.createElement('a');
            enlace.href = resultado.pagina + (ancla ? '#' + ancla : '');
            enlace.textContent = resultado.titulo;
            item.appendChild(enlace);

            // Mostrar primera coincidencia con contexto
            var extracto = document.createElement('p');
            var textoCoincidencia = primeraCoincidencia.texto;

            // Limitar longitud del extracto
            if (textoCoincidencia.length > 100) {
                var indice = textoCoincidencia.toLowerCase().indexOf(consulta);
                var inicio = Math.max(0, indice - 40);
                var fin = Math.min(textoCoincidencia.length, indice + consulta.length + 40);
                textoCoincidencia = (inicio > 0 ? '...' : '') +
                    textoCoincidencia.substring(inicio, fin) +
                    (fin < textoCoincidencia.length ? '...' : '');
            }

            // Resaltar término buscado
            var textoResaltado = this.resaltarTermino(textoCoincidencia, consulta);
            extracto.innerHTML = textoResaltado;

            // Si hay más coincidencias, mostrar subenlaces
            if (resultado.coincidencias.length > 1) {
                var sublista = document.createElement('ul');
                sublista.className = 'resultados-sublista';

                for (var j = 1; j < Math.min(resultado.coincidencias.length, 4); j++) {
                    var subitem = document.createElement('li');
                    var subenlace = document.createElement('a');
                    var subCoincidencia = resultado.coincidencias[j];

                    subenlace.href = resultado.pagina + (subCoincidencia.ancla ? '#' + subCoincidencia.ancla : '');

                    // Texto resumido para el subenlace
                    var subTexto = subCoincidencia.texto;
                    if (subTexto.length > 60) {
                        subTexto = subTexto.substring(0, 60) + '...';
                    }
                    subenlace.innerHTML = this.resaltarTermino(subTexto, consulta);

                    subitem.appendChild(subenlace);
                    sublista.appendChild(subitem);
                }

                item.appendChild(extracto);
                item.appendChild(sublista);
            } else {
                item.appendChild(extracto);
            }

            lista.appendChild(item);
        }

        this.contenedorResultados.appendChild(lista);
    }

    /**
     * Resalta el término buscado en el texto
     * @param {string} texto - Texto original
     * @param {string} termino - Término a resaltar
     * @returns {string} - HTML con el término resaltado
     */
    resaltarTermino(texto, termino) {
        var indice = texto.toLowerCase().indexOf(termino);
        if (indice === -1) {
            return texto;
        }

        var antes = texto.substring(0, indice);
        var coincidencia = texto.substring(indice, indice + termino.length);
        var despues = texto.substring(indice + termino.length);

        return antes + '<mark>' + coincidencia + '</mark>' + despues;
    }

    /**
     * Oculta el contenedor de resultados
     */
    ocultarResultados() {
        if (this.contenedorResultados) {
            this.contenedorResultados.style.display = 'none';
            this.contenedorResultados.setAttribute('hidden', '');
            this.contenedorResultados.innerHTML = '';
        }
    }
}

// Instancia global del buscador
var buscador = null;

/**
 * Genera un slug desde texto (función global para resolución de anclas)
 */
function generarSlugGlobal(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 40);
}

/**
 * Resuelve anclas al cargar la página
 * Busca elementos que coincidan con el hash y les asigna IDs
 */
function resolverAnclas() {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    var anclaId = hash.substring(1); // Quitar el #

    // Si ya existe un elemento con ese ID, scrollear y resaltar
    if (document.getElementById(anclaId)) {
        var elemento = document.getElementById(anclaId);
        elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
        resaltarElemento(elemento);
        return;
    }

    // Extraer el slug base (quitar el sufijo -N si existe)
    var slugBase = anclaId.replace(/-\d+$/, '');

    // Buscar el elemento que debería tener esta ancla
    var main = document.querySelector('main');
    if (!main) return;

    // Buscar en todos los elementos de texto
    var selectores = 'h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption';
    var elementos = main.querySelectorAll(selectores);

    for (var i = 0; i < elementos.length; i++) {
        var elem = elementos[i];
        var texto = elem.textContent.trim();
        if (!texto) continue;

        var slugElemento = generarSlugGlobal(texto);

        // Comparar el slug base con el slug generado del elemento
        if (slugElemento === slugBase || slugBase.startsWith(slugElemento) || slugElemento.startsWith(slugBase)) {
            // Encontramos el elemento, asignarle ID y scrollear
            elem.id = anclaId;
            elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resaltarElemento(elem);
            return;
        }
    }

    // También buscar en alt de imágenes
    var imagenes = main.querySelectorAll('img[alt]');
    for (var j = 0; j < imagenes.length; j++) {
        var img = imagenes[j];
        var altTexto = img.getAttribute('alt').trim();
        if (!altTexto) continue;

        var slugImg = generarSlugGlobal(altTexto);

        if (slugImg === slugBase || slugBase.startsWith(slugImg) || slugImg.startsWith(slugBase)) {
            // Scrollear a la imagen o su contenedor
            var contenedor = img.closest('figure') || img;
            contenedor.id = anclaId;
            contenedor.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resaltarElemento(contenedor);
            return;
        }
    }
}

/**
 * Resalta temporalmente un elemento para indicar que es el resultado
 */
function resaltarElemento(elemento) {
    elemento.classList.add('resultado-encontrado');
    setTimeout(function () {
        elemento.classList.remove('resultado-encontrado');
    }, 3000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    buscador = new Buscador();

    // Resolver anclas después de un pequeño delay para asegurar que el DOM está listo
    setTimeout(resolverAnclas, 100);
});

// También resolver al cambiar el hash (navegación interna)
window.addEventListener('hashchange', resolverAnclas);
