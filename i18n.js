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
                'footer.fecha': '7 de diciembre de 2025',

                // Migas de pan
                'migas.inicio': 'Inicio',

                // Index - Sobre mí
                'index.sobre-mi': 'Sobre mí',
                'index.foto-alt': 'Foto de Pelayo Rojas',
                'index.descripcion': 'Graduado y entusiasta de la ingeniería de software.',
                'index.bio': 'Actualmente estudio el máster en Ingeniería Web en la Escuela de Ingeniería Informática de la Universidad de Oviedo.',

                // Index - Objetivos
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
                'referencias.ref1': '"Pelayo demostró una capacidad excepcional para resolver problemas complejos de forma elegante. Su código siempre está bien documentado y sigue las mejores prácticas. Un placer trabajar con él en el proyecto de ArkServerApi."',
                'referencias.ref1-autor': 'Carlos Martínez, Senior Developer en GameDev Studios',
                'referencias.ref2': '"Durante su colaboración en Arquisoft, Pelayo destacó por su iniciativa y su capacidad para aprender rápidamente nuevas tecnologías. Su contribución fue fundamental para cumplir los plazos del proyecto."',
                'referencias.ref2-autor': 'Laura García, Project Manager en TechSolutions',

                // Aficiones - General
                'aficiones.titulo': 'Mis aficiones',
                'aficiones.intro': 'Estas son tres actividades que disfruto y que me ayudan a mantener el equilibrio entre la vida académica/profesional y el tiempo personal.',

                // Aficiones - Piragüismo
                'aficiones.piraguismo': 'Piragüismo',
                'aficiones.piraguismo-alt': 'Equipo nacional de piragüismo',
                'aficiones.piraguismo-caption': 'Agua, técnica y concentración.',
                'aficiones.piraguismo-desc': 'El piragüismo me permite desconectar y a la vez exigirme físicamente. Disfruto perfeccionando la técnica de paleo y compitiendo en diferentes regatas.',
                'aficiones.piraguismo-li1': 'Qué me aporta: resistencia, equilibrio y conexión con la naturaleza.',
                'aficiones.piraguismo-li2': 'Cómo lo practico: salidas regulares y ejercicios técnicos.',
                'aficiones.piraguismo-li3': 'Objetivo: participar en travesías más largas y mejorar tiempos en aguas tranquilas.',
                'aficiones.piraguismo-video-titulo': 'La selección española en acción',
                'aficiones.piraguismo-video-desc': 'El video muestra a la selección española de piragüismo siendo presentada para los juegos olímpicos de París 2024.',
                'aficiones.piraguismo-video-fallback': 'Tu navegador no soporta la reproducción de videos.',

                // Aficiones - Motor
                'aficiones.motor': 'Deportes de motor',
                'aficiones.motor-alt': 'Coche de Fórmula 1',
                'aficiones.motor-caption': 'Precisión, estrategia y pasión por la ingeniería.',
                'aficiones.motor-desc': 'Sigo de cerca distintas competiciones y me interesa tanto la conducción como el componente técnico: reglajes, telemetría y evolución de los vehículos.',
                'aficiones.motor-li1': 'Competición favorita: Fórmula 1',
                'aficiones.motor-li2': 'Qué me gusta analizar: estrategias de parada, neumáticos y gestión de energía.',

                // Aficiones - Software
                'aficiones.software': 'Desarrollar software propio',
                'aficiones.software-alt': 'Icono de desarrollo de software',
                'aficiones.software-caption': 'De la idea al repositorio, con cariño por el detalle.',
                'aficiones.software-desc': 'Crear software es mi forma favorita de construir cosas útiles. Me interesan las buenas prácticas, el diseño sencillo y la resolución de problemas reales.',
                'aficiones.software-li1': 'Enfoque: prototipado rápido, pruebas y documentación clara.',
                'aficiones.software-li2': 'Intereses: herramientas para desarrolladores, automatización y aplicaciones web.',
                'aficiones.software-li3': 'Más: algunos proyectos están recopilados en el',
                'aficiones.software-quote': '"Aprender haciendo, iterar y compartir."',

                // Portfolio
                'portfolio.titulo': 'Portfolio',
                'portfolio.intro': 'A continuación encontrarás una selección de perfiles y organizaciones en GitHub donde publico y colaboro en proyectos. Cada bloque incluye una breve descripción y una vista previa del perfil u organización.',
                'portfolio.repos': 'Mis repositorios',

                // Portfolio - Pelayori
                'portfolio.pelayori-titulo': 'Perfil personal: Pelayori',
                'portfolio.pelayori-alt': 'Avatar del perfil de GitHub Pelayori',
                'portfolio.pelayori-caption': 'Vista previa del perfil personal en GitHub.',
                'portfolio.pelayori-desc1': 'Espacio donde publico proyectos propios, utilidades y pequeños experimentos. Me gusta mantener un enfoque práctico: ideas pequeñas que resuelven problemas concretos, con atención a la calidad y la documentación.',
                'portfolio.pelayori-desc2': 'También publico proyectos open-source que haya creado o de los que haya contribuido.',
                'portfolio.pelayori-que': 'Qué puedes encontrar',
                'portfolio.pelayori-li1': 'Prototipos y herramientas de uso diario.',
                'portfolio.pelayori-li2': 'Aprendizajes y pruebas de concepto.',
                'portfolio.pelayori-li3': 'Colaboraciones puntuales en proyectos abiertos.',
                'portfolio.pelayori-footer': 'Últimos cambios y contribuciones se reflejan directamente en GitHub.',

                // Portfolio - ArkServerApi
                'portfolio.ark-titulo': 'Organización: ArkServerApi',
                'portfolio.ark-alt': 'Logotipo/Avatar de la organización ArkServerApi en GitHub',
                'portfolio.ark-caption': 'Vista previa de la organización ArkServerApi.',
                'portfolio.ark-desc': 'Ecosistema orientado a la creación y mantenimiento de herramientas y extensiones para servidores de los juegos ARK: Survival Ascended y ARK: Survival Evolved. El foco está en facilitar el desarrollo de plugins y utilidades para administración, monitorización y personalización del servidor.',
                'portfolio.ark-que': 'Qué puedes encontrar',
                'portfolio.ark-li1': 'APIs y utilidades para extender la funcionalidad del servidor.',
                'portfolio.ark-li2': 'Ejemplos y recursos para desarrolladores de plugins.',
                'portfolio.ark-li3': 'Documentación y guías de uso orientadas a la comunidad.',
                'portfolio.ark-footer': 'Proyectos vivos y con aportaciones de la comunidad.',

                // Portfolio - Arquisoft
                'portfolio.arquisoft-titulo': 'Organización: Arquisoft',
                'portfolio.arquisoft-alt': 'Logotipo/Avatar de la organización Arquisoft en GitHub',
                'portfolio.arquisoft-caption': 'Vista previa de la organización Arquisoft.',
                'portfolio.arquisoft-desc': 'Organización centrada en proyectos y materiales de Arquitectura del Software de la Universidad de Oviedo. Recopila diferentes prácticas de la asignatura de Arquitectura del Software, así como plantillas y ejemplos de proyectos.',
                'portfolio.arquisoft-que': 'Qué puedes encontrar',
                'portfolio.arquisoft-li1': 'Proyectos docentes y plantillas base.',
                'portfolio.arquisoft-li2': 'Ejemplos de integración, pruebas y despliegue.',
                'portfolio.arquisoft-li3': 'Material de apoyo y documentación técnica.',
                'portfolio.arquisoft-footer': 'Contenido especialmente útil para aprendizaje y trabajo colaborativo.',

                // Portfolio - Experiencia Laboral
                'portfolio.experiencia-titulo': 'Experiencia Laboral',

                // TechStart Solutions
                'portfolio.techstart-titulo': 'TechStart Solutions',
                'portfolio.techstart-puesto': 'Desarrollador Full Stack',
                'portfolio.techstart-fecha': 'Marzo 2024 - Presente',
                'portfolio.techstart-desc': 'Desarrollo de aplicaciones web empresariales utilizando React, Node.js y PostgreSQL. Implementación de APIs RESTful y microservicios para clientes del sector financiero.',
                'portfolio.techstart-logros-titulo': 'Logros destacados',
                'portfolio.techstart-logro1': 'Reducción del tiempo de carga de la aplicación principal en un 40%.',
                'portfolio.techstart-logro2': 'Implementación de sistema de autenticación OAuth2 para 50.000+ usuarios.',
                'portfolio.techstart-logro3': 'Mentoría a 3 desarrolladores junior del equipo.',

                // InnovateTech
                'portfolio.innovate-titulo': 'InnovateTech',
                'portfolio.innovate-puesto': 'Becario de Desarrollo',
                'portfolio.innovate-fecha': 'Septiembre 2023 - Febrero 2024',
                'portfolio.innovate-desc': 'Prácticas curriculares enfocadas en el desarrollo de herramientas internas y automatización de procesos. Trabajo con Python, Django y bases de datos NoSQL.',
                'portfolio.innovate-logros-titulo': 'Logros destacados',
                'portfolio.innovate-logro1': 'Desarrollo de un sistema de monitorización de servidores.',
                'portfolio.innovate-logro2': 'Automatización de tareas repetitivas ahorrando 10 horas semanales.',

                // CloudScale Systems
                'portfolio.cloudscale-titulo': 'CloudScale Systems',
                'portfolio.cloudscale-puesto': 'Colaborador en Prácticas',
                'portfolio.cloudscale-fecha': 'Verano 2023',
                'portfolio.cloudscale-desc': 'Participación en un proyecto de migración a la nube. Configuración de infraestructura en AWS y desarrollo de scripts de despliegue automatizado.',
                'portfolio.cloudscale-logros-titulo': 'Logros destacados',
                'portfolio.cloudscale-logro1': 'Configuración de pipelines CI/CD con GitHub Actions.',
                'portfolio.cloudscale-logro2': 'Documentación técnica de procesos de despliegue.',

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
                'footer.fecha': 'December 7, 2025',

                // Breadcrumbs
                'migas.inicio': 'Home',

                // Index - About me
                'index.sobre-mi': 'About me',
                'index.foto-alt': 'Photo of Pelayo Rojas',
                'index.descripcion': 'Graduate and software engineering enthusiast.',
                'index.bio': 'I am currently studying a Master\'s degree in Web Engineering at the School of Computer Engineering at the University of Oviedo.',

                // Index - Goals
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
                'referencias.ref1': '"Pelayo demonstrated an exceptional ability to solve complex problems elegantly. His code is always well documented and follows best practices. A pleasure to work with him on the ArkServerApi project."',
                'referencias.ref1-autor': 'Carlos Martínez, Senior Developer at GameDev Studios',
                'referencias.ref2': '"During his collaboration at Arquisoft, Pelayo stood out for his initiative and ability to quickly learn new technologies. His contribution was essential to meeting project deadlines."',
                'referencias.ref2-autor': 'Laura García, Project Manager at TechSolutions',

                // Hobbies - General
                'aficiones.titulo': 'My hobbies',
                'aficiones.intro': 'These are three activities I enjoy that help me maintain balance between academic/professional life and personal time.',

                // Hobbies - Canoeing
                'aficiones.piraguismo': 'Canoeing',
                'aficiones.piraguismo-alt': 'National canoeing team',
                'aficiones.piraguismo-caption': 'Water, technique and concentration.',
                'aficiones.piraguismo-desc': 'Canoeing allows me to disconnect while physically challenging myself. I enjoy perfecting my paddling technique and competing in different regattas.',
                'aficiones.piraguismo-li1': 'What it gives me: endurance, balance and connection with nature.',
                'aficiones.piraguismo-li2': 'How I practice: regular outings and technical exercises.',
                'aficiones.piraguismo-li3': 'Goal: participate in longer crossings and improve times in calm waters.',
                'aficiones.piraguismo-video-titulo': 'The Spanish team in action',
                'aficiones.piraguismo-video-desc': 'The video shows the Spanish canoeing team being presented for the Paris 2024 Olympic Games.',
                'aficiones.piraguismo-video-fallback': 'Your browser does not support video playback.',

                // Hobbies - Motor sports
                'aficiones.motor': 'Motor sports',
                'aficiones.motor-alt': 'Formula 1 car',
                'aficiones.motor-caption': 'Precision, strategy and passion for engineering.',
                'aficiones.motor-desc': 'I closely follow various competitions and am interested in both driving and the technical component: setups, telemetry and vehicle evolution.',
                'aficiones.motor-li1': 'Favorite competition: Formula 1',
                'aficiones.motor-li2': 'What I like to analyze: pit strategies, tires and energy management.',

                // Hobbies - Software
                'aficiones.software': 'Developing my own software',
                'aficiones.software-alt': 'Software development icon',
                'aficiones.software-caption': 'From idea to repository, with attention to detail.',
                'aficiones.software-desc': 'Creating software is my favorite way to build useful things. I\'m interested in best practices, simple design and solving real problems.',
                'aficiones.software-li1': 'Approach: rapid prototyping, testing and clear documentation.',
                'aficiones.software-li2': 'Interests: developer tools, automation and web applications.',
                'aficiones.software-li3': 'More: some projects are collected in the',
                'aficiones.software-quote': '"Learn by doing, iterate and share."',

                // Portfolio
                'portfolio.titulo': 'Portfolio',
                'portfolio.intro': 'Below you will find a selection of profiles and organizations on GitHub where I publish and collaborate on projects. Each block includes a brief description and a preview of the profile or organization.',
                'portfolio.repos': 'My repositories',

                // Portfolio - Pelayori
                'portfolio.pelayori-titulo': 'Personal profile: Pelayori',
                'portfolio.pelayori-alt': 'GitHub profile avatar Pelayori',
                'portfolio.pelayori-caption': 'Preview of personal GitHub profile.',
                'portfolio.pelayori-desc1': 'Space where I publish my own projects, utilities and small experiments. I like to maintain a practical approach: small ideas that solve specific problems, with attention to quality and documentation.',
                'portfolio.pelayori-desc2': 'I also publish open-source projects I have created or contributed to.',
                'portfolio.pelayori-que': 'What you can find',
                'portfolio.pelayori-li1': 'Prototypes and daily-use tools.',
                'portfolio.pelayori-li2': 'Learning experiences and proofs of concept.',
                'portfolio.pelayori-li3': 'Occasional collaborations on open projects.',
                'portfolio.pelayori-footer': 'Latest changes and contributions are reflected directly on GitHub.',

                // Portfolio - ArkServerApi
                'portfolio.ark-titulo': 'Organization: ArkServerApi',
                'portfolio.ark-alt': 'Logo/Avatar of ArkServerApi organization on GitHub',
                'portfolio.ark-caption': 'Preview of ArkServerApi organization.',
                'portfolio.ark-desc': 'Ecosystem focused on creating and maintaining tools and extensions for ARK: Survival Ascended and ARK: Survival Evolved game servers. The focus is on facilitating plugin and utility development for server administration, monitoring and customization.',
                'portfolio.ark-que': 'What you can find',
                'portfolio.ark-li1': 'APIs and utilities to extend server functionality.',
                'portfolio.ark-li2': 'Examples and resources for plugin developers.',
                'portfolio.ark-li3': 'Documentation and user guides for the community.',
                'portfolio.ark-footer': 'Living projects with community contributions.',

                // Portfolio - Arquisoft
                'portfolio.arquisoft-titulo': 'Organization: Arquisoft',
                'portfolio.arquisoft-alt': 'Logo/Avatar of Arquisoft organization on GitHub',
                'portfolio.arquisoft-caption': 'Preview of Arquisoft organization.',
                'portfolio.arquisoft-desc': 'Organization focused on Software Architecture projects and materials from the University of Oviedo. It compiles various practices from the Software Architecture course, as well as templates and project examples.',
                'portfolio.arquisoft-que': 'What you can find',
                'portfolio.arquisoft-li1': 'Teaching projects and base templates.',
                'portfolio.arquisoft-li2': 'Integration, testing and deployment examples.',
                'portfolio.arquisoft-li3': 'Support material and technical documentation.',
                'portfolio.arquisoft-footer': 'Content especially useful for learning and collaborative work.',

                // Portfolio - Work Experience
                'portfolio.experiencia-titulo': 'Work Experience',

                // TechStart Solutions
                'portfolio.techstart-titulo': 'TechStart Solutions',
                'portfolio.techstart-puesto': 'Full Stack Developer',
                'portfolio.techstart-fecha': 'March 2024 - Present',
                'portfolio.techstart-desc': 'Development of enterprise web applications using React, Node.js and PostgreSQL. Implementation of RESTful APIs and microservices for financial sector clients.',
                'portfolio.techstart-logros-titulo': 'Key achievements',
                'portfolio.techstart-logro1': 'Reduced main application load time by 40%.',
                'portfolio.techstart-logro2': 'Implemented OAuth2 authentication system for 50,000+ users.',
                'portfolio.techstart-logro3': 'Mentored 3 junior developers on the team.',

                // InnovateTech
                'portfolio.innovate-titulo': 'InnovateTech',
                'portfolio.innovate-puesto': 'Development Intern',
                'portfolio.innovate-fecha': 'September 2023 - February 2024',
                'portfolio.innovate-desc': 'Curricular internship focused on internal tools development and process automation. Working with Python, Django and NoSQL databases.',
                'portfolio.innovate-logros-titulo': 'Key achievements',
                'portfolio.innovate-logro1': 'Development of a server monitoring system.',
                'portfolio.innovate-logro2': 'Automation of repetitive tasks saving 10 hours weekly.',

                // CloudScale Systems
                'portfolio.cloudscale-titulo': 'CloudScale Systems',
                'portfolio.cloudscale-puesto': 'Internship Collaborator',
                'portfolio.cloudscale-fecha': 'Summer 2023',
                'portfolio.cloudscale-desc': 'Participation in a cloud migration project. AWS infrastructure configuration and development of automated deployment scripts.',
                'portfolio.cloudscale-logros-titulo': 'Key achievements',
                'portfolio.cloudscale-logro1': 'Configuration of CI/CD pipelines with GitHub Actions.',
                'portfolio.cloudscale-logro2': 'Technical documentation of deployment processes.',

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
