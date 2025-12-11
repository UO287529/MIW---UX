/**
 * Clase para generar el mapa de la página (Índice de contenido)
 * Se adapta al contenido actual buscando encabezados h2 y h3
 */
class MapaPagina {
    constructor() {
        this.contenedor = document.querySelector('aside');
        if (!this.contenedor) return;

        this.init();
    }

    init() {
        // Crear título del mapa
        const titulo = document.createElement('h2');
        titulo.setAttribute('data-i18n', 'mapa.titulo');
        // El texto inicial se llenará vía i18n.js, pero ponemos un fallback
        titulo.textContent = 'Índice de contenido';
        this.contenedor.appendChild(titulo);

        // Generar lista de contenidos
        const lista = this.generarListaJerarquica();
        if (lista) {
            const nav = document.createElement('nav');
            nav.setAttribute('aria-label', 'Índice de contenidos');
            nav.appendChild(lista);
            this.contenedor.appendChild(nav);

            // Si el gestor de idioma ya existe, reaplicar traducciones
            if (window.gestorIdioma) {
                window.gestorIdioma.aplicarTraducciones();
            }
        } else {
            // Ocultar contenedor si no hay encabezados
            this.contenedor.hidden = true;
        }
    }

    generarListaJerarquica() {
        const headers = document.querySelectorAll('main h2, main h3');
        if (headers.length === 0) return null;

        const rootUl = document.createElement('ul');
        let currentH2Li = null;
        let currentSubList = null;

        headers.forEach((header, index) => {
            // Asegurar que el header o su sección padre tenga ID para el ancla
            let anchorId = header.id;
            if (!anchorId) {
                const parentSection = header.closest('section, article');
                if (parentSection && parentSection.id) {
                    anchorId = parentSection.id;
                } else {
                    // Generar ID basado en el texto si no existe (necesario para la navegación interna)
                    // Se usa slug simple
                    anchorId = 'seccion-' + index;
                    header.id = anchorId;
                }
            }

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${anchorId}`;
            a.textContent = header.textContent; // Texto del enlace igual al header

            // Copiar el data-i18n si existe para mantener traducción dinámica en el mapa
            if (header.hasAttribute('data-i18n')) {
                // Nota: Para simplificar, usamos el mismo texto traducido. 
                // Si cambia el idioma, este mapa se regenera o los textos no cambiarían si solo copiamos textContent.
                // Lo ideal es copiar el atributo data-i18n.
                a.setAttribute('data-i18n', header.getAttribute('data-i18n'));
            }

            li.appendChild(a);

            if (header.tagName.toLowerCase() === 'h2') {
                rootUl.appendChild(li);
                currentH2Li = li;
                currentSubList = null;
            } else if (header.tagName.toLowerCase() === 'h3') {
                if (!currentH2Li) {
                    // Caso borde: h3 sin h2 previo, añadir a raíz
                    rootUl.appendChild(li);
                } else {
                    if (!currentSubList) {
                        currentSubList = document.createElement('ul');
                        currentH2Li.appendChild(currentSubList);
                    }
                    currentSubList.appendChild(li);
                }
            }
        });

        return rootUl;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    new MapaPagina();
});
