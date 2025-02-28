<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Escolar - TecJalisco</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- DataTables CSS -->
    <link href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="../css/style.css" rel="stylesheet">
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3 col-lg-2 px-0 sidebar">
            <div class="logo">
                <img src="../img/logo-tecmm.png" alt="TecJalisco Logo" class="img-fluid">
            </div>

            <!-- Menú Datos -->
            <div class="nav flex-column">
                <h5 class="section-title">
                    <i class="fas fa-database me-2"></i>Datos
                </h5>
                <div class="submenu">
                    <!-- Enlaces directos sin submenús -->
                    <a href="javascript:void(0);" onclick="option('student', '');" class="nav-link"><i
                                class="fas fa-user-graduate me-2"></i>Alumnos</a>
                    <a href="javascript:void(0);" onclick="option('career', '');" class="nav-link"><i
                                class="fas fa-graduation-cap me-2"></i>Carrera</a>
                    <a href="javascript:void(0);" onclick="option('teacher', '');" class="nav-link"><i
                                class="fas fa-chalkboard-teacher me-2"></i>Docente</a>
                    <a href="javascript:void(0);" onclick="option('subject', '');" class="nav-link"><i
                                class="fas fa-book me-2"></i>Materias</a>
                    <a href="javascript:void(0);" onclick="option('career-manager', '')" class="nav-link"><i
                                class="fas fa-user-tie me-2"></i>Jefe de
                        Carrera</a>
                </div>
            </div>

            <!-- Menú Configuraciones -->
            <div class="nav flex-column">
                <h5 class="section-title">
                    <i class="fas fa-cog me-2"></i>Configuraciones
                </h5>
                <div class="submenu">
                    <!-- Enlaces directos sin submenús -->
                    <a href="javascript:void(0);" onclick="option('settings', '');" class="nav-link"><i
                                class="fas fa-calendar me-2"></i>Periodo</a>
                    <a href="javascript:void(0);" class="nav-link"><i class="fas fa-tasks me-2"></i>Parcial</a>
                </div>
            </div>

            <!-- Menú Operaciones -->
            <div class="nav flex-column">
                <h5 class="section-title">
                    <i class="fas fa-cogs me-2"></i>Operaciones
                </h5>
                <div class="submenu">
                    <!-- Enlaces directos sin submenús -->
                    <a href="javascript:void(0);" class="nav-link"><i class="fas fa-clipboard-list me-2"></i>Oferta</a>
                    <a href="javascript:void(0);" class="nav-link"><i class="fas fa-edit me-2"></i>Captura</a>
                    <a href="javascript:void(0);" class="nav-link"><i class="fas fa-clock me-2"></i>Horario</a>
                    <a href="javascript:void(0);" class="nav-link"><i class="fas fa-user-minus me-2"></i>Baja</a>
                </div>
            </div>
        </div>

        <!-- Contenido principal -->
        <div class="col-md-9 col-lg-10 ms-auto p-4">
            <div id="mainContent" class="p-3 rounded">
                <!-- El contenido se cargará aquí dinámicamente -->
                <h2>Bienvenido al sistema</h2>
            </div>
        </div>
    </div>
</div>

<!-- jQuery primero (necesario para Bootstrap y DataTables) -->
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<!-- DataTables JS -->
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>
<!-- Bootstrap JS Bundle -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
<!-- Función personalizada JS (después de cargar jQuery) -->
<script src="../js/function.js"></script>
</body>
</html>