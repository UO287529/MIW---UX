/**
 * Sistema de internacionalización (i18n) para el sitio web personal
 * Permite cambiar el idioma entre español e inglés
 */
class GestorIdioma {
    /**
     * Constructor del gestor de idioma
     * Inicializa las traducciones y el idioma por defecto
     */
    constructor() {
        // Idioma actual (por defecto español)
        this.idiomaActual = 'es';

        // Diccionario de traducciones
        this.traducciones = {
            es: {
                // Navegación
                'nav.inicio': 'Inicio',
                'nav.aficiones': 'Aficiones',
                'nav.portfolio': 'Portfolio',
                'nav.contacto': 'Contacto',

                // Buscador
                'buscar.placeholder': 'Buscar en el sitio...',
                'buscar.boton': 'Buscar',
                'buscar.sin-resultados': 'No se encontraron resultados para',
                'buscar.resultados': 'resultados encontrados',

                // Footer
                'footer.copyright': '© 2025 Pelayo Rojas Íñigo',
                'footer.actualizado': 'Última actualización:',
                'footer.redes': 'Redes sociales',

                // Migas de pan
                'migas.inicio': 'Inicio',

                // Index
                'index.sobre-mi': 'Sobre mí',
                'index.foto-alt': 'Foto de Pelayo Rojas',
                'index.descripcion': 'Graduado y entusiasta de la ingeniería de software.',
                'index.bio': 'Actualmente estudio el máster en Ingeniería Web en la Escuela de Ingeniería Informática de la Universidad de Oviedo.',
                'index.objetivos': 'Objetivos profesionales',
                'index.software': 'Software de calidad',
                'index.software-desc': 'Mi intención es proveer a la industria de nuevos tipos de software que permitan solventar diferentes deficiencias en la vida de las personas, o que permitan a integrantes del ámbito empresarial desempeñar sus tareas de una manera más fácil',
                'index.proyectos': 'Proyectos personales',
                'index.proyectos-desc': 'Fuera del ámbito académico y laboral desarrollo diferentes proyectos personales, asisto a usuarios en problemas con el software y lidero una comunidad de desarrolladores en un proyecto de código abierto.',
                'index.mas-info': 'Más información en el',

                // Formación
                'formacion.titulo': 'Formación Académica',
                'formacion.master': 'Máster en Ingeniería Web',
                'formacion.master-lugar': 'Universidad de Oviedo',
                'formacion.master-fecha': '2025 - 2026',
                'formacion.grado': 'Grado en Ingeniería Informática del Software',
                'formacion.grado-lugar': 'Universidad de Oviedo',
                'formacion.grado-fecha': '2021 - 2025',

                // Referencias
                'referencias.titulo': 'Referencias',
                'referencias.nota': 'Testimonios de personas con las que he colaborado profesionalmente.',

                // Aficiones
                'aficiones.titulo': 'Mis aficiones',
                'aficiones.intro': 'Estas son tres actividades que disfruto y que me ayudan a mantener el equilibrio entre la vida académica/profesional y el tiempo personal.',
                'aficiones.piraguismo': 'Piragüismo',
                'aficiones.motor': 'Deportes de motor',
                'aficiones.software': 'Desarrollar software propio',

                // Portfolio
                'portfolio.titulo': 'Portfolio',
                'portfolio.intro': 'A continuación encontrarás una selección de perfiles y organizaciones en GitHub donde publico y colaboro en proyectos.',
                'portfolio.repos': 'Mis repositorios',

                // Contacto
                'contacto.titulo': '¡Contáctame!',
                'contacto.intro': 'Si deseas ponerte en contacto conmigo, puedes hacerlo a través de uno de mis correos electrónicos:',
                'contacto.corporativo': 'Corporativo (Universidad)',
                'contacto.personal': 'Personal',
                'contacto.profesional': 'Profesional',
                'contacto.formulario': 'En su defecto, puedes utilizar el siguiente formulario de contacto:',
                'contacto.nombre': 'Nombre:',
                'contacto.email': 'Correo electrónico:',
                'contacto.mensaje': 'Mensaje:',
                'contacto.enviar': 'Enviar'
            },
            en: {
                // Navigation
                'nav.inicio': 'Home',
                'nav.aficiones': 'Hobbies',
                'nav.portfolio': 'Portfolio',
                'nav.contacto': 'Contact',

                // Search
                'buscar.placeholder': 'Search the site...',
                'buscar.boton': 'Search',
                'buscar.sin-resultados': 'No results found for',
                'buscar.resultados': 'results found',

                // Footer
                'footer.copyright': '© 2025 Pelayo Rojas Íñigo',
                'footer.actualizado': 'Last updated:',
                'footer.redes': 'Social media',

                // Breadcrumbs
                'migas.inicio': 'Home',

                // Index
                'index.sobre-mi': 'About me',
                'index.foto-alt': 'Photo of Pelayo Rojas',
                'index.descripcion': 'Graduate and software engineering enthusiast.',
                'index.bio': 'I am currently studying a Master\'s degree in Web Engineering at the School of Computer Engineering at the University of Oviedo.',
                'index.objetivos': 'Professional goals',
                'index.software': 'Quality software',
                'index.software-desc': 'My intention is to provide the industry with new types of software that solve different deficiencies in people\'s lives, or that allow members of the business sector to perform their tasks more easily.',
                'index.proyectos': 'Personal projects',
                'index.proyectos-desc': 'Outside of academia and work, I develop different personal projects, assist users with software problems, and lead a developer community in an open source project.',
                'index.mas-info': 'More information in the',

                // Education
                'formacion.titulo': 'Education',
                'formacion.master': 'Master\'s in Web Engineering',
                'formacion.master-lugar': 'University of Oviedo',
                'formacion.master-fecha': '2025 - 2026',
                'formacion.grado': 'Bachelor\'s in Software Engineering',
                'formacion.grado-lugar': 'University of Oviedo',
                'formacion.grado-fecha': '2021 - 2025',

                // References
                'referencias.titulo': 'References',
                'referencias.nota': 'Testimonials from people I have collaborated with professionally.',

                // Hobbies
                'aficiones.titulo': 'My hobbies',
                'aficiones.intro': 'These are three activities I enjoy that help me maintain balance between academic/professional life and personal time.',
                'aficiones.piraguismo': 'Canoeing',
                'aficiones.motor': 'Motor sports',
                'aficiones.software': 'Developing my own software',

                // Portfolio
                'portfolio.titulo': 'Portfolio',
                'portfolio.intro': 'Below you will find a selection of profiles and organizations on GitHub where I publish and collaborate on projects.',
                'portfolio.repos': 'My repositories',

                // Contact
                'contacto.titulo': 'Contact me!',
                'contacto.intro': 'If you wish to contact me, you can do so through one of my email addresses:',
                'contacto.corporativo': 'Corporate (University)',
                'contacto.personal': 'Personal',
                'contacto.profesional': 'Professional',
                'contacto.formulario': 'Alternatively, you can use the following contact form:',
                'contacto.nombre': 'Name:',
                'contacto.email': 'Email:',
                'contacto.mensaje': 'Message:',
                'contacto.enviar': 'Send'
            }
        };

        // Inicializar el idioma desde localStorage o navegador
        this.inicializar();
    }

    /**
     * Inicializa el gestor de idioma
     * Recupera el idioma guardado o detecta el del navegador
     */
    inicializar() {
        // Intentar recuperar idioma guardado
        var idiomaGuardado = localStorage.getItem('idioma');

        if (idiomaGuardado && this.traducciones[idiomaGuardado]) {
            this.idiomaActual = idiomaGuardado;
        } else {
            // Detectar idioma del navegador
            var idiomaNavegador = navigator.language.substring(0, 2);
            if (this.traducciones[idiomaNavegador]) {
                this.idiomaActual = idiomaNavegador;
            }
        }

        // Aplicar traducciones iniciales
        this.aplicarTraducciones();

        // Configurar selector de idioma si existe
        this.configurarSelector();
    }

    /**
     * Obtiene la traducción de una clave
     * @param {string} clave - Clave de traducción
     * @returns {string} - Texto traducido o la clave si no existe
     */
    traducir(clave) {
        var diccionario = this.traducciones[this.idiomaActual];
        if (diccionario && diccionario[clave]) {
            return diccionario[clave];
        }
        return clave;
    }

    /**
     * Cambia el idioma actual
     * @param {string} nuevoIdioma - Código del nuevo idioma (es/en)
     */
    cambiarIdioma(nuevoIdioma) {
        if (this.traducciones[nuevoIdioma]) {
            this.idiomaActual = nuevoIdioma;
            localStorage.setItem('idioma', nuevoIdioma);
            this.aplicarTraducciones();

            // Actualizar atributo lang del HTML
            document.documentElement.lang = nuevoIdioma;
        }
    }

    /**
     * Aplica las traducciones a todos los elementos con data-i18n
     */
    aplicarTraducciones() {
        var elementos = document.querySelectorAll('[data-i18n]');
        var gestor = this;

        for (var i = 0; i < elementos.length; i++) {
            var elemento = elementos[i];
            var clave = elemento.getAttribute('data-i18n');
            var traduccion = gestor.traducir(clave);

            // Aplicar traducción según el tipo de elemento
            if (elemento.tagName === 'INPUT' && elemento.placeholder !== undefined) {
                elemento.placeholder = traduccion;
            } else if (elemento.tagName === 'IMG') {
                elemento.alt = traduccion;
            } else {
                elemento.textContent = traduccion;
            }
        }

        // Actualizar selector si existe
        var selector = document.querySelector('header select');
        if (selector) {
            selector.value = this.idiomaActual;
        }
    }

    /**
     * Configura el selector de idioma
     */
    configurarSelector() {
        var selector = document.querySelector('header select');
        var gestor = this;

        if (selector) {
            selector.value = this.idiomaActual;

            selector.addEventListener('change', function (evento) {
                gestor.cambiarIdioma(evento.target.value);
            });
        }
    }
}

// Instancia global del gestor de idioma
var gestorIdioma = null;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    gestorIdioma = new GestorIdioma();
});
