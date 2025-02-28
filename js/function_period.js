function loadFormPeriodo(id) {
    // Si hay un formulario existente, lo cerramos con animación primero
    if (document.querySelector('#frmArea .card')) {
        const formCard = document.querySelector('#frmArea .card');
        formCard.classList.add('animate__animated', 'animate__fadeOutUp');

        setTimeout(() => {
            clearArea('frmArea');
            cargarNuevoFormulario(id);
        }, 500); // Esperar a que termine la animación
    } else {
        // Si no hay formulario, cargamos uno nuevo directamente
        cargarNuevoFormulario(id);
    }
}

function cargarNuevoFormulario(id) {
    let url = "period/frmPeriod.php";
    let datos = {
        id: id
    };

    $.post(url, JSON.stringify(datos), function (responseText, status) {
        try {
            if (status == "success") {
                document.getElementById('frmArea').innerHTML = responseText;

                // Añadir las clases de animación al card recién cargado
                const formCard = document.querySelector('#frmArea .card');
                if (formCard) {
                    formCard.classList.add('animate__animated', 'animate__fadeInDown');
                }

                // Inicializar datepickers después de cargar el formulario
                $('.datepicker').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    language: 'es'
                });

                // Modificar el botón de cancelar para usar la animación
                const btnCancelar = document.querySelector('#frmArea button[onclick*="clearArea"]');
                if (btnCancelar) {
                    btnCancelar.setAttribute('onclick', 'closeFormPeriodoAnimado()');
                }
            } else {
                throw status;
            }
        } catch (e) {
            console.log('mainAlertZone', 'Error al cargar el formulario: ' + e, 'danger');
        }
    });
}

function closeFormPeriodoAnimado() {
    const formCard = document.querySelector('#frmArea .card');
    if (formCard) {
        // Asegurarnos de que tenga la clase animate__animated
        formCard.classList.add('animate__animated');
        // Quitar la animación de entrada si existe
        formCard.classList.remove('animate__fadeInDown');
        // Añadir animación de salida
        formCard.classList.add('animate__fadeOutUp');

        // Esperar a que termine la animación antes de limpiar
        setTimeout(() => {
            clearArea('frmArea');
        }, 500);
    } else {
        clearArea('frmArea');
    }
}

// La función clearArea original se mantiene igual
function clearArea(areaId) {
    document.getElementById(areaId).innerHTML = '';
}

function validafrmPeriodo() {
    // Obtener el formulario
    const form = document.getElementById('frmPeriodo');

    // Agregar la clase 'was-validated' para activar los estilos de validación de Bootstrap
    form.classList.add('was-validated');

    // Verificar si el formulario es válido (todos los campos required están completos)
    if (!form.checkValidity()) {
        // Si hay campos faltantes, mostrar el modal
        mostrarModalFaltaDatos();
        return false;
    }

    // Si todos los campos están completos, continuar con el envío del formulario
    guardarPeriodo();
    return true;
}

// Función para mostrar el modal de falta de datos
function mostrarModalFaltaDatos() {
    // Si el modal ya existe en el DOM, lo eliminamos primero
    const modalExistente = document.getElementById('modalFaltaDatos');
    if (modalExistente) {
        modalExistente.remove();
    }

    // Crear el modal dinámicamente
    const modalHTML = `
    <div class="modal fade" id="modalFaltaDatos" tabindex="-1" aria-labelledby="modalFaltaDatosLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content animate__animated animate__fadeInDown">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="modalFaltaDatosLabel">
                        <i class="fas fa-exclamation-triangle me-2"></i>Datos Incompletos
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-0">Por favor complete todos los campos requeridos del formulario.</p>
                    <ul class="mt-3 text-danger" id="listaCamposFaltantes">
                        <!-- Aquí se listarán los campos faltantes -->
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times me-2"></i>Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;

    // Añadir el modal al final del body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Obtener todos los campos requeridos que no están completos
    const camposRequeridos = form.querySelectorAll('[required]');
    const listaFaltantes = document.getElementById('listaCamposFaltantes');

    listaFaltantes.innerHTML = ''; // Limpiar la lista

    // Recorrer los campos requeridos y añadir a la lista los que están vacíos
    camposRequeridos.forEach(campo => {
        if (!campo.value) {
            // Obtener la etiqueta (label) asociada al campo
            let labelTexto = '';
            const labelElement = document.querySelector(`label[for="${campo.id}"]`);
            if (labelElement) {
                labelTexto = labelElement.textContent;
            } else {
                labelTexto = campo.placeholder || campo.id;
            }

            // Añadir el campo a la lista
            const li = document.createElement('li');
            li.textContent = labelTexto;
            listaFaltantes.appendChild(li);
        }
    });

    // Inicializar y mostrar el modal usando Bootstrap
    const modalElement = document.getElementById('modalFaltaDatos');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();

    // Añadir animación cuando se cierre el modal
    modalElement.addEventListener('hide.bs.modal', function () {
        const modalContent = this.querySelector('.modal-content');
        modalContent.classList.remove('animate__fadeInDown');
        modalContent.classList.add('animate__fadeOutUp');
    });

    // Limpiar el modal después de cerrarse completamente
    modalElement.addEventListener('hidden.bs.modal', function () {
        // Opcional: si quieres eliminar el modal del DOM después de cerrarse
        // this.remove();
    });
}

// Función para guardar el periodo (esta función deberías tenerla ya implementada)
function guardarPeriodo() {
    // Obtener el formulario
    const formCard = document.querySelector('#frmArea .card');

    // Mostrar alguna indicación de éxito (opcional)
    const alertHTML = `
    <div class="alert alert-success animate__animated animate__fadeIn" role="alert">
        <i class="fas fa-check-circle me-2"></i>Datos guardados correctamente
    </div>`;

    // Insertar el mensaje de éxito antes de los botones
    const botonesRow = document.querySelector('#frmPeriodo .row:last-child');
    if (botonesRow) {
        botonesRow.insertAdjacentHTML('beforebegin', alertHTML);
    }

    // Aquí va tu código para guardar los datos del periodo
    // Por ejemplo:
    // const formData = new FormData(document.getElementById('frmPeriodo'));
    // $.ajax({ ... });

    // Este es solo un placeholder - debes mantener tu implementación actual
    console.log('Guardar periodo - formulario válido');

    // Añadir animación de salida
    if (formCard) {
        formCard.classList.add('animate__animated');
        formCard.classList.remove('animate__fadeInDown'); // Remover animación de entrada si existe
        formCard.classList.add('animate__fadeOutUp');
    }

    // Esperar antes de limpiar el área
    setTimeout(() => {
        clearArea('frmArea');
    }, 1000); // Esperar 1.5 segundos antes de cerrar
}