/**
 * Función para cargar contenido dinámicamente en la página
 * @param {string} opc - Opción seleccionada (career, period, etc.)
 * @param {string} filter - Filtro opcional para la consulta
 */
function option(opc, filter) {
    try {
        // Validar que jQuery está disponible
        if (typeof $ === 'undefined') {
            console.error('jQuery no está cargado');
            alert('Error: jQuery no está disponible');
            return;
        }

        let mainContent = document.getElementById('mainContent');
        if (!mainContent) {
            console.error('Elemento mainContent no encontrado');
            return;
        }

        // Mostrar indicador de carga
        mainContent.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin fa-3x"></i><p class="mt-2">Cargando...</p></div>';

        let url = "";

        // Determinar la URL según la opción
        switch (opc) {
            case 'career':
                url = "career/main.php";
                break;
            case 'period':
                url = "period/main.php";
                break;
            case 'teacher':
                url = "teacher/main.php";
                break;
            case 'career-manager':
                url = "career-manager/main.php";
                break;
            case 'settings':
                url = "settings/main.php";
                break;
            default:
                mainContent.innerHTML = '<div class="alert alert-warning">Opción no válida</div>';
                return;
        }

        // Preparar datos para enviar
        let data = {
            filter: filter || ""
        };

        // Convertir a JSON
        let json = JSON.stringify(data);

        console.log(`Cargando ${opc} con filtro: ${json}`);

        // Realizar petición AJAX
        $.ajax({
            url: url,
            type: 'POST',
            data: json,
            contentType: 'application/json',
            timeout: 10000, // 10 segundos de timeout
            success: function (responseText) {
                mainContent.innerHTML = responseText;

                // Inicializar DataTables según la opción
                if ($.fn.DataTable) {
                    try {
                        // Para la tabla de carreras
                        if (opc === 'career' && $('#tableCareer').length) {
                            $('#tableCareer').DataTable({
                                language: {
                                    url: "https://cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
                                },
                                responsive: true
                            });
                        }

                        // Para la tabla de jefes de carrera
                        if (opc === 'career-manager' && $('#tableCareerManager').length) {
                            $('#tableCareerManager').DataTable({
                                language: {
                                    url: "https://cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
                                },
                                responsive: true,
                                pageLength: 10
                            });
                        }

                        // Para la tabla de periodos
                        if (opc === 'period' && $('#tablePeriod').length) {
                            $('#tablePeriod').DataTable({
                                language: {
                                    url: "https://cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json"
                                },
                                responsive: true,
                                pageLength: 10
                            });
                        }

                    } catch (tableError) {
                        console.error("Error al inicializar DataTable:", tableError);
                    }
                }
            },
            error: function (xhr, status, error) {
                mainContent.innerHTML = `
                    <div class="alert alert-danger">
                        <h4>Error al cargar el contenido</h4>
                        <p>Estado: ${status}</p>
                        <p>Error: ${error}</p>
                    </div>
                `;
                console.error(`Error en la petición: ${status} - ${error}`);
            }
        });
    } catch (e) {
        console.error("Error general:", e);
        alert("Ocurrió un error: " + e.message);
    }
}

function clearArea(myArea) {
    document.getElementById(myArea).innerHTML = "";
}

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
        });

        // Cerrar menú al hacer clic en un enlace (en dispositivos móviles)
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('show');
                }
            });
        });

        // Cerrar menú al hacer clic fuera del mismo
        document.addEventListener('click', function (event) {
            const isClickInsideMenu = sidebar.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        });
    }

    // Ajustar diseño cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992 && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    });
});

/**
 * Función para mostrar ventana modal de error de captura
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarErrorCaptura(mensaje) {
    // Crear el contenido del modal
    let modalHTML = `
    <div class="modal fade" id="errorCapturaModal" tabindex="-1" aria-labelledby="errorCapturaModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="errorCapturaModalLabel">
                        <i class="fas fa-exclamation-triangle me-2"></i>Error de Captura
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <i class="fas fa-times-circle text-danger fa-4x"></i>
                    </div>
                    <p class="text-center">${mensaje || 'Se ha producido un error durante la captura de datos.'}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>`;

    // Remover modal anterior si existe
    let modalAnterior = document.getElementById('errorCapturaModal');
    if (modalAnterior) {
        modalAnterior.remove();
    }

    // Agregar el modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Mostrar el modal
    let modalElement = document.getElementById('errorCapturaModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Eliminar el modal del DOM cuando se cierre
    modalElement.addEventListener('hidden.bs.modal', function () {
        modalElement.remove();
    });
}

/**
 * Función para mostrar ventana de alerta por falta de datos
 * @param {string} mensaje - Mensaje específico sobre los datos faltantes
 * @param {Function} callback - Función a ejecutar al confirmar (opcional)
 */
function mostrarFaltaDatos(mensaje, callback) {
    // Crear el contenido del modal
    let modalHTML = `
    <div class="modal fade" id="faltaDatosModal" tabindex="-1" aria-labelledby="faltaDatosModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-warning text-dark">
                    <h5 class="modal-title" id="faltaDatosModalLabel">
                        <i class="fas fa-exclamation-circle me-2"></i>Datos Incompletos
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <i class="fas fa-clipboard-list text-warning fa-4x"></i>
                    </div>
                    <p class="text-center">${mensaje || 'Hay campos obligatorios sin completar. Por favor, revise el formulario.'}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnEntendido" data-bs-dismiss="modal">Entendido</button>
                </div>
            </div>
        </div>
    </div>`;

    // Remover modal anterior si existe
    let modalAnterior = document.getElementById('faltaDatosModal');
    if (modalAnterior) {
        modalAnterior.remove();
    }

    // Agregar el modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Mostrar el modal
    let modalElement = document.getElementById('faltaDatosModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Configurar callback si se proporciona
    if (typeof callback === 'function') {
        document.getElementById('btnEntendido').addEventListener('click', callback);
    }

    // Eliminar el modal del DOM cuando se cierre
    modalElement.addEventListener('hidden.bs.modal', function () {
        modalElement.remove();
    });
}

/**
 * Función para mostrar ventana de éxito cuando se guardan datos
 * @param {string} mensaje - Mensaje de éxito a mostrar
 * @param {Function} callback - Función a ejecutar al confirmar (opcional)
 */
function mostrarDatosGuardados(mensaje, callback) {
    // Crear el contenido del modal
    let modalHTML = `
    <div class="modal fade" id="datosGuardadosModal" tabindex="-1" aria-labelledby="datosGuardadosModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title" id="datosGuardadosModalLabel">
                        <i class="fas fa-check-circle me-2"></i>Operación Exitosa
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-3">
                        <i class="fas fa-save text-success fa-4x"></i>
                    </div>
                    <p class="text-center">${mensaje || 'Los datos se han guardado correctamente.'}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnAceptar" data-bs-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>`;

    // Remover modal anterior si existe
    let modalAnterior = document.getElementById('datosGuardadosModal');
    if (modalAnterior) {
        modalAnterior.remove();
    }

    // Agregar el modal al documento
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Mostrar el modal
    let modalElement = document.getElementById('datosGuardadosModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();

    // Configurar callback si se proporciona
    if (typeof callback === 'function') {
        document.getElementById('btnAceptar').addEventListener('click', callback);
    }

    // Eliminar el modal del DOM cuando se cierre
    modalElement.addEventListener('hidden.bs.modal', function () {
        modalElement.remove();
    });
}

/**
 * Función para validar el formulario de periodo
 * Integración con la función existente validafrmPeriodo
 */
function validafrmPeriodo() {
    // Obtener los valores de los campos del formulario
    const id = document.getElementById('txtId').value.trim();
    const periodo = document.getElementById('txtPeriodo').value.trim();
    const fechaInicio = document.getElementById('txtFechaInicio').value.trim();
    const fechaTermino = document.getElementById('txtFechaTermino').value.trim();
    const fechaInicioAjuste = document.getElementById('txtFechaInicioAjuste').value.trim();
    const fechaFinalAjuste = document.getElementById('txtFechaFinalAjuste').value.trim();

    // Validar campos obligatorios
    if (!id || !periodo || !fechaInicio || !fechaTermino || !fechaInicioAjuste || !fechaFinalAjuste) {
        mostrarFaltaDatos('Por favor, complete todos los campos obligatorios para continuar.');
        return false;
    }

    // Aquí iría la lógica de envío del formulario
    // Por ahora solo mostramos un modal de éxito como ejemplo

    // Simulación de éxito (esto se reemplazaría por la lógica real de guardado)
    mostrarDatosGuardados('El período académico ha sido guardado exitosamente.', function () {
        // Callback que se ejecutaría después de guardar los datos
        // Por ejemplo, recargar la lista de periodos
        option('period', '');
    });

    return true;
}