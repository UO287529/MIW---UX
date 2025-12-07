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
     * Extrae el contenido de texto de un documento HTML
     * @param {string} html - Contenido HTML de la página
     * @returns {Array} - Array con fragmentos de texto encontrados
     */
    extraerContenido(html) {
        var contenido = [];

        // Crear un parser para el HTML
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Obtener el contenido del main (donde está el contenido principal)
        var main = doc.querySelector('main');
        if (!main) {
            return contenido;
        }

        // Extraer texto de headings
        var headings = main.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (var i = 0; i < headings.length; i++) {
            var texto = headings[i].textContent.trim();
            if (texto) {
                contenido.push(texto);
            }
        }

        // Extraer texto de párrafos
        var parrafos = main.querySelectorAll('p');
        for (var j = 0; j < parrafos.length; j++) {
            var textoParrafo = parrafos[j].textContent.trim();
            if (textoParrafo) {
                contenido.push(textoParrafo);
            }
        }

        // Extraer texto de listas
        var items = main.querySelectorAll('li');
        for (var k = 0; k < items.length; k++) {
            var textoItem = items[k].textContent.trim();
            if (textoItem) {
                contenido.push(textoItem);
            }
        }

        // Extraer texto de blockquotes
        var citas = main.querySelectorAll('blockquote');
        for (var l = 0; l < citas.length; l++) {
            var textoCita = citas[l].textContent.trim();
            if (textoCita) {
                contenido.push(textoCita);
            }
        }

        // Extraer texto de figcaption
        var captions = main.querySelectorAll('figcaption');
        for (var m = 0; m < captions.length; m++) {
            var textoCaption = captions[m].textContent.trim();
            if (textoCaption) {
                contenido.push(textoCaption);
            }
        }

        // Extraer texto alt de imágenes
        var imagenes = main.querySelectorAll('img[alt]');
        for (var n = 0; n < imagenes.length; n++) {
            var textoAlt = imagenes[n].getAttribute('alt').trim();
            if (textoAlt) {
                contenido.push(textoAlt);
            }
        }

        return contenido;
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
     * @param {string} consulta - Texto a buscar
     * @returns {Array} - Resultados encontrados
     */
    buscarEnIndice(consulta) {
        var resultados = [];

        for (var i = 0; i < this.paginas.length; i++) {
            var pagina = this.paginas[i];
            var contenido = this.indice[pagina.url];

            if (!contenido) {
                continue;
            }

            var coincidencias = [];
            var idiomaActual = (typeof gestorIdioma !== 'undefined' && gestorIdioma) ? gestorIdioma.idiomaActual : 'es';
            var titulo = idiomaActual === 'en' ? pagina.tituloEN : pagina.titulo;

            // Buscar en el contenido
            for (var j = 0; j < contenido.length; j++) {
                var texto = contenido[j];
                if (texto.toLowerCase().indexOf(consulta) !== -1) {
                    coincidencias.push(texto);
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

            // Enlace a la página
            var enlace = document.createElement('a');
            enlace.href = resultado.pagina;
            enlace.textContent = resultado.titulo;
            item.appendChild(enlace);

            // Mostrar primera coincidencia con contexto
            var extracto = document.createElement('p');
            var textoCoincidencia = resultado.coincidencias[0];

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
            item.appendChild(extracto);

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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    buscador = new Buscador();
});
