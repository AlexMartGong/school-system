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