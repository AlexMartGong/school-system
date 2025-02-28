function loadFormPeriodo(id) {
    clearArea('frmArea');
    let url = "period/frmPeriod.php";
    let datos = {
        id: id
    };

    $.post(url, JSON.stringify(datos), function (responseText, status) {
        try {
            if (status == "success") {
                document.getElementById('frmArea').innerHTML = responseText;
                // Inicializar datepickers después de cargar el formulario
                $('.datepicker').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true,
                    language: 'es'
                });
            } else {
                throw status;
            }
        } catch (e) {
            console.log('mainAlertZone', 'Error al cargar el formulario: ' + e, 'danger');
        }
    });
}