/*
 * Clase para interceptar el envío de un formulario con motivos de demostración
 */
class FormularioStub {

    /*
     * Constructor
     */
    constructor() {
        this.botonFormulario = document.querySelector('main form button');

        this.botonFormulario.addEventListener(
            'click',
            (e) => {
                this.enviarFormulario(e);
            }
        );
    }

    /*
     * Envía el formulario
     */
    enviarFormulario(e) {
        e.preventDefault();
        console.log('Formulario enviado');
        alert('Formulario enviado!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FormularioStub();
});
