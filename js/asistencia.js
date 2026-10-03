// --- MÓDULO DE ASISTENCIA INTERACTIVA POR FECHAS, PLANO Y ESTADÍSTICAS ---

let baseDatosAsistenciasPorFecha = JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {};
let modalGuardarInstancia = null;
let myChartBarras = null;
let myChartLineas = null;

function inicializarModuloAsistencia() {
    let modalEl = document.getElementById('modalGuardarAsistencia');
    if (modalEl) {
        modalGuardarInstancia = new bootstrap.Modal(modalEl);
    }
    
    // Establecer la fecha actual por defecto si el input está vacío
    const inputFecha = document.getElementById('inputFechaAsistencia');
    if (inputFecha && !inputFecha.value) {
        inputFecha.value = new Date().toISOString().split('T')[0];
    }

    renderizarMapaAsientos();
    actualizarContadoresAsistencia();
}

function obtenerFechaSeleccionada() {
    const inputFecha = document.getElementById('inputFechaAsistencia');
    return inputFecha ? inputFecha.value : new Date().toISOString().split('T')[0];
}

function cambiarFechaAsistencia() {
    renderizarMapaAsientos();
    actualizarContadoresAsistencia();
}

function obtenerEstadoAsientosActuales() {
    let fecha = obtenerFechaSeleccionada();
    return baseDatosAsistenciasPorFecha[fecha] || {};
}

function renderizarMapaAsientos() {
    const contenedor = document.getElementById('mapaAsientosContainer');
    if (!contenedor) return;

    contenedor.innerHTML = "";
    let totalCalculado = 0;
    let estadoDia = obtenerEstadoAsientosActuales();

    // Contenedor general del auditorio centrado

    let auditorioDiv = document.createElement('div');
    auditorioDiv.className = "d-flex flex-column align-items-center gap-2 p-3 bg-light border rounded shadow-sm mb-4 w-100";
    auditorioDiv.style.maxWidth = "750px";
    auditorioDiv.style.margin = "0 auto";

    let tituloSuperior = document.createElement('span');
    tituloSuperior.className = "small fw-bold text-muted mb-2";
    tituloSuperior.textContent = "AUDITORIO PRINCIPAL";
    auditorioDiv.appendChild(tituloSuperior);

    // 1. FILA SUPERIOR (PLATAFORMA): Asientos en columna 1 y columna 5
    let filaPlat = document.createElement('div');
    filaPlat.className = "d-flex justify-content-center gap-3 mb-4 w-100";
    
    for (let col = 1; col <= 8; col++) {
        let colDiv = document.createElement('div');
        colDiv.className = "col-asiento-wrapper";
        colDiv.style.width = "34px";
        colDiv.style.display = "flex";
        colDiv.style.justifyContent = "center";

        if (col === 1 || col === 5) {
            let idUnico = `PLAT-${col}`;
            totalCalculado++;
            colDiv.appendChild(crearBotonAsiento(idUnico, "", estadoDia[idUnico]));
        }
        filaPlat.appendChild(colDiv);
    }
    auditorioDiv.appendChild(filaPlat);

    // 2. FILAS PRINCIPALES (Total 10 filas uniformes con estructura 4 - 8 - 4)
    for (let fila = 1; fila <= 10; fila++) {
        let filaDiv = document.createElement('div');
        filaDiv.className = "d-flex justify-content-center gap-2 align-items-center w-100 mb-1";

        let contenedorFila = document.createElement('div');
        contenedorFila.className = "d-flex justify-content-between align-items-center w-100 px-3";
        contenedorFila.style.maxWidth = "680px";

        // --- SECCIÓN IZQUIERDA (4 columnas) ---
        let secIzq = document.createElement('div');
        secIzq.className = "d-flex gap-1";
        for (let c = 1; c <= 4; c++) {
            let colDiv = document.createElement('div');
            colDiv.className = "col-asiento-wrapper";
            colDiv.style.width = "34px";
            colDiv.style.display = "flex";
            colDiv.style.justifyContent = "center";

            if (fila === 10 && c === 1) {
                let idIsla = `F10-EXT-IZQ`;
                totalCalculado++;
                colDiv.appendChild(crearBotonAsiento(idIsla, "", estadoDia[idIsla]));
            } else if (fila < 10) {
                let idUnico = `F${fila}-IZQ-${c}`;
                totalCalculado++;
                colDiv.appendChild(crearBotonAsiento(idUnico, "", estadoDia[idUnico]));
            }
            secIzq.appendChild(colDiv);
        }
        contenedorFila.appendChild(secIzq);

        // --- SECCIÓN CENTRAL (8 columnas - Fila 10 con solo un asiento central en columna 5) ---
        let secCent = document.createElement('div');
        secCent.className = "d-flex gap-1";
        for (let c = 1; c <= 8; c++) {
            let colDiv = document.createElement('div');
            colDiv.className = "col-asiento-wrapper";
            colDiv.style.width = "34px";
            colDiv.style.display = "flex";
            colDiv.style.justifyContent = "center";

            let pintarAsiento = true;
            if (fila === 10) {
                pintarAsiento = (c === 5);
            }

            if (pintarAsiento) {
                let idUnico = `F${fila}-CENT-${c}`;
                totalCalculado++;
                colDiv.appendChild(crearBotonAsiento(idUnico, "", estadoDia[idUnico]));
            }
            secCent.appendChild(colDiv);
        }
        contenedorFila.appendChild(secCent);

        // --- SECCIÓN DERECHA (4 columnas) ---
        let secDer = document.createElement('div');
        secDer.className = "d-flex gap-1";
        for (let c = 1; c <= 4; c++) {
            let colDiv = document.createElement('div');
            colDiv.className = "col-asiento-wrapper";
            colDiv.style.width = "34px";
            colDiv.style.display = "flex";
            colDiv.style.justifyContent = "center";

            if (fila === 10 && (c === 3 || c === 4)) {
                let idExtDer = `F10-EXT-DER-${c}`;
                totalCalculado++;
                colDiv.appendChild(crearBotonAsiento(idExtDer, "", estadoDia[idExtDer]));
            } else if (fila < 10) {
                let idUnico = `F${fila}-DER-${c}`;
                totalCalculado++;
                colDiv.appendChild(crearBotonAsiento(idUnico, "", estadoDia[idUnico]));
            }
            secDer.appendChild(colDiv);
        }
        contenedorFila.appendChild(secDer);

        filaDiv.appendChild(contenedorFila);
        auditorioDiv.appendChild(filaDiv);
    }

    contenedor.appendChild(auditorioDiv);

    // 3. ZONA POSTERIOR AUXILIAR (Matriz de 4x4)
    let zonaTraseraDiv = document.createElement('div');
    zonaTraseraDiv.className = "p-3 bg-light border rounded shadow-sm d-flex flex-column align-items-center mx-auto mt-3";
    zonaTraseraDiv.style.width = "fit-content";
    
    let tituloTrasero = document.createElement('span');
    tituloTrasero.className = "small fw-bold text-muted mb-2";
    tituloTrasero.textContent = "SALA AUXILIAR";
    zonaTraseraDiv.appendChild(tituloTrasero);

    ['J', 'K', 'L', 'M'].forEach((filaLetra) => {
        let filaTrasera = document.createElement('div');
        filaTrasera.className = "d-flex gap-1 mb-1";
        for (let col = 1; col <= 4; col++) {
            let idUnico = `POST-${filaLetra}-${col}`;
            totalCalculado++;
            filaTrasera.appendChild(crearBotonAsiento(idUnico, "", estadoDia[idUnico]));
        }
        zonaTraseraDiv.appendChild(filaTrasera);
    });

    contenedor.appendChild(zonaTraseraDiv);
    window._totalAsientosAforo = totalCalculado;
}

function crearBotonAsiento(idUnico, etiqueta, ocupado) {
    let btnAsiento = document.createElement('button');
    btnAsiento.type = "button";
    btnAsiento.className = `btn btn-sm btn-asiento text-white ${ocupado ? 'bg-danger' : 'bg-success'}`;
    btnAsiento.style.width = "30px";
    btnAsiento.style.height = "30px";
    btnAsiento.style.borderRadius = "4px";
    btnAsiento.style.padding = "0";
    btnAsiento.textContent = etiqueta;
    
    btnAsiento.onclick = () => {
        toggleAsiento(idUnico, btnAsiento);
    };
    return btnAsiento;
}

function toggleAsiento(idUnico, botonEl) {
    let fecha = obtenerFechaSeleccionada();
    if (!baseDatosAsistenciasPorFecha[fecha]) {
        baseDatosAsistenciasPorFecha[fecha] = {};
    }

    let actual = baseDatosAsistenciasPorFecha[fecha][idUnico] === true;
    let nuevoEstado = !actual;

    baseDatosAsistenciasPorFecha[fecha][idUnico] = nuevoEstado;

    if (nuevoEstado) {
        botonEl.classList.remove('bg-success');
        botonEl.classList.add('bg-danger');
    } else {
        botonEl.classList.remove('bg-danger');
        botonEl.classList.add('bg-success');
    }

    actualizarContadoresAsistencia();
}

function actualizarContadoresAsistencia() {
    let total = window._totalAsientosAforo || 0;
    let estadoDia = obtenerEstadoAsientosActuales();
    let ocupados = Object.values(estadoDia).filter((val, key) => val === true && !key.toString().startsWith('_')).length;
    let libres = total - ocupados;

    let elOcupados = document.getElementById('contadorOcupados');
    let elLibres = document.getElementById('contadorLibres');
    let elTotal = document.getElementById('contadorTotal');

    if (elOcupados) elOcupados.textContent = ocupados;
    if (elLibres) elLibres.textContent = libres;
    if (elTotal) elTotal.textContent = total;
}

function abrirModalGuardarAsistencia() {
    let fecha = obtenerFechaSeleccionada();
    let [y, m, d] = fecha.split('-');
    let fechaFormateada = `${d}/${m}/${y}`;

    let elTextoFecha = document.getElementById('modalTextoFechaGuardar');
    if (elTextoFecha) elTextoFecha.textContent = fechaFormateada;
    
    let total = window._totalAsientosAforo || 0;
    let estadoDia = obtenerEstadoAsientosActuales();
    let ocupados = Object.keys(estadoDia).filter(k => !k.startsWith('_') && estadoDia[k] === true).length;
    
    let elResOcupados = document.getElementById('modalResumenOcupados');
    let elResLibres = document.getElementById('modalResumenLibres');
    if (elResOcupados) elResOcupados.textContent = ocupados;
    if (elResLibres) elResLibres.textContent = total - ocupados;

    let inputParados = document.getElementById('inputParados');
    let inputZoom = document.getElementById('inputZoom');
    if (inputParados) inputParados.value = estadoDia._parados || 0;
    if (inputZoom) inputZoom.value = estadoDia._zoom || 0;

    if (modalGuardarInstancia) {
        modalGuardarInstancia.show();
    }
}

function confirmarGuardadoAsistenciaHistorial() {
    let fecha = obtenerFechaSeleccionada();
    if (!baseDatosAsistenciasPorFecha[fecha]) {
        baseDatosAsistenciasPorFecha[fecha] = {};
    }

    let inputParados = document.getElementById('inputParados');
    let inputZoom = document.getElementById('inputZoom');

    baseDatosAsistenciasPorFecha[fecha]._parados = inputParados ? parseInt(inputParados.value) || 0 : 0;
    baseDatosAsistenciasPorFecha[fecha]._zoom = inputZoom ? parseInt(inputZoom.value) || 0 : 0;

    localStorage.setItem('bd_asistencia_fechas_v1', JSON.stringify(baseDatosAsistenciasPorFecha));
    
    if (modalGuardarInstancia) {
        modalGuardarInstancia.hide();
    }

    const toast = document.getElementById('toast-copiado');
    if (toast) {
        toast.textContent = "✅ ¡Asistencia guardada correctamente con éxito!";
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
            toast.textContent = "✅ Mensaje copiado al portapapeles";
        }, 2500);
    } else {
        alert("✅ ¡Asistencia guardada correctamente con éxito!");
    }
    
    renderizarMapaAsientos();
    actualizarContadoresAsistencia();
}

// --- FUNCIONES PARA LAS GRÁFICAS Y RESUMEN ESTADÍSTICO ---

function cargarDatosResumenEstadisticas() {
    requestAnimationFrame(() => {
        actualizarGraficasEstadisticas();
    });
}

function actualizarGraficasEstadisticas() {
    let selectFiltro = document.getElementById('filtroTiempoResumen');
    let tipoFiltro = selectFiltro ? selectFiltro.value : 'dia';
    let datosCrudos = JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {};
    
    let etiquetas = [];
    let presencialArr = [];
    let paradosArr = [];
    let zoomArr = [];
    let totalGeneralArr = [];

    let fechasOrdenadas = Object.keys(datosCrudos).sort();

    if (tipoFiltro === 'dia') {
        fechasOrdenadas = fechasOrdenadas.slice(-10); // Últimos 10 días
        fechasOrdenadas.forEach(fecha => {
            let registro = datosCrudos[fecha];
            let presencial = Object.keys(registro).filter(k => !k.startsWith('_') && registro[k] === true).length;
            let parados = registro._parados || 0;
            let zoom = registro._zoom || 0;

            etiquetas.push(fecha);
            presencialArr.push(presencial);
            paradosArr.push(parados);
            zoomArr.push(zoom);
            totalGeneralArr.push(presencial + parados + zoom);
        });
    } else if (tipoFiltro === 'mes') {
        let agrupadoMes = {};
        fechasOrdenadas.forEach(fecha => {
            let mesAno = fecha.substring(0, 7); // YYYY-MM
            if (!agrupadoMes[mesAno]) agrupadoMes[mesAno] = { presencial: 0, parados: 0, zoom: 0, total: 0 };
            
            let registro = datosCrudos[fecha];
            let presencial = Object.keys(registro).filter(k => !k.startsWith('_') && registro[k] === true).length;
            let parados = registro._parados || 0;
            let zoom = registro._zoom || 0;

            agrupadoMes[mesAno].presencial += presencial;
            agrupadoMes[mesAno].parados += parados;
            agrupadoMes[mesAno].zoom += zoom;
            agrupadoMes[mesAno].total += (presencial + parados + zoom);
        });

        Object.keys(agrupadoMes).sort().forEach(mes => {
            etiquetas.push(mes);
            presencialArr.push(agrupadoMes[mes].presencial);
            paradosArr.push(agrupadoMes[mes].parados);
            zoomArr.push(agrupadoMes[mes].zoom);
            totalGeneralArr.push(agrupadoMes[mes].total);
        });
    } else if (tipoFiltro === 'ano') {
        let agrupadoAno = {};
        fechasOrdenadas.forEach(fecha => {
            let ano = fecha.substring(0, 4); // YYYY
            if (!agrupadoAno[ano]) agrupadoAno[ano] = { presencial: 0, parados: 0, zoom: 0, total: 0 };
            
            let registro = datosCrudos[fecha];
            let presencial = Object.keys(registro).filter(k => !k.startsWith('_') && registro[k] === true).length;
            let parados = registro._parados || 0;
            let zoom = registro._zoom || 0;

            agrupadoAno[ano].presencial += presencial;
            agrupadoAno[ano].parados += parados;
            agrupadoAno[ano].zoom += zoom;
            agrupadoAno[ano].total += (presencial + parados + zoom);
        });

        Object.keys(agrupadoAno).sort().forEach(ano => {
            etiquetas.push(ano);
            presencialArr.push(agrupadoAno[ano].presencial);
            paradosArr.push(agrupadoAno[ano].parados);
            zoomArr.push(agrupadoAno[ano].zoom);
            totalGeneralArr.push(agrupadoAno[ano].total);
        });
    }

    // --- RENDERIZAR GRÁFICA DE BARRAS (Presencial Total vs Zoom) ---
    const elBarras = document.getElementById('graficoBarrasAsistencia');
    if (elBarras) {
        const ctxBarras = elBarras.getContext('2d');
        if (myChartBarras) myChartBarras.destroy();

        // Sumamos presenciales (asientos) + parados en un solo arreglo de Presencial Total
        let presencialTotalArr = presencialArr.map((val, idx) => val + paradosArr[idx]);

        myChartBarras = new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: etiquetas.length > 0 ? etiquetas : ['Sin registros'],
                datasets: [
                    { label: 'Total Presencial (Asientos + Parados)', data: etiquetas.length > 0 ? presencialTotalArr : [0], backgroundColor: '#198754' },
                    { label: 'Zoom', data: etiquetas.length > 0 ? zoomArr : [0], backgroundColor: '#0d6efd' }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { x: { stacked: false }, y: { beginAtZero: true } }
            }
        });
    }

    // --- RENDERIZAR GRÁFICA DE LÍNEAS ---
    const elLineas = document.getElementById('graficoLineasAsistencia');
    if (elLineas) {
        const ctxLineas = elLineas.getContext('2d');
        if (myChartLineas) myChartLineas.destroy();

        myChartLineas = new Chart(ctxLineas, {
            type: 'line',
            data: {
                labels: etiquetas.length > 0 ? etiquetas : ['Sin registros'],
                datasets: [
                    {
                        label: 'Asistencia General Total',
                        data: etiquetas.length > 0 ? totalGeneralArr : [0],
                        borderColor: '#6f42c1',
                        backgroundColor: 'rgba(111, 66, 193, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}