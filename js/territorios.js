// --- MÓDULO DE GESTIÓN DE TERRITORIOS (Con Filtros Globales y Gráfico Comparativo) ---

function inicializar54Territorios() {
    let listado = [];
    let puntosMock = [
        "Esquina Av. Paraíso con Mz. A", "Paradero Los Olivos Mz. E", 
        "Frente al Colegio Las Casitas", "Entrada Principal Av. Carabayllo"
    ];
    
    let hermanosMock = ["Segura, Eder", "Diaz, Carlos", "Alvarez, Giovana", "Calderon, Carlos", "Pantoja, Peter"];

    for (let i = 1; i <= 54; i++) {
        let puntoAsignado = puntosMock[i % puntosMock.length];
        // Historial simulado con fechas y responsables
        let historialSimulado = [
            { fecha: "2026-03-10", responsable: hermanosMock[i % hermanosMock.length] },
            { fecha: "2026-05-12", responsable: hermanosMock[(i + 1) % hermanosMock.length] }
        ];

        if (i === 3) {
            listado.push({ 
                num: i, 
                puntos: [puntoAsignado, "Mz. C Lote 10 (Segundo Punto)"], 
                responsable: "Segura, Eder", 
                fecha: "2026-05-12", 
                historial: historialSimulado,
                veces: 4, 
                observaciones: "Mz. C Lote 15: No desean ser visitados por religión." 
            });
        } else if (i === 8) {
            listado.push({ 
                num: i, 
                puntos: [puntoAsignado], 
                responsable: "Diaz, Carlos", 
                fecha: "2026-05-26", 
                historial: historialSimulado,
                veces: 7, 
                observaciones: "Mz. F Lote 4: Pidieron no ser visitados de forma agresiva." 
            });
        } else {
            let vecesRand = Math.floor(Math.random() * 5) + 1;
            listado.push({ 
                num: i, 
                puntos: [puntoAsignado], 
                responsable: "", 
                fecha: "", 
                historial: historialSimulado,
                veces: vecesRand, 
                observaciones: "" 
            });
        }
    }
    return listado;
}

let dbTerritorios = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || inicializar54Territorios();
let modalAsignarTerr = null;
let modalNuevoTerr = null;
let modalEditarTerr = null;
let chartGlobalInstance = null;
let chartIndividualInstance = null;

const mesesTerritoriosNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function inicializarModuloTerritorios() {
    modalAsignarTerr = new bootstrap.Modal(document.getElementById('modalAsignarTerritorio'));
    modalNuevoTerr = new bootstrap.Modal(document.getElementById('modalNuevoTerritorio'));
    modalEditarTerr = new bootstrap.Modal(document.getElementById('modalEditarTerritorio'));
    
    inicializarFiltrosGlobales();
    renderizarTablasEcosistema();
}

function inicializarFiltrosGlobales() {
    const selTerritorio = document.getElementById('filtroGlobalTerritorio');
    const selMes = document.getElementById('filtroGlobalMes');
    const selAnio = document.getElementById('filtroGlobalAnio');

    if (!selTerritorio || !selMes || !selAnio) return;

    // 1. Poblar Territorios
    selTerritorio.innerHTML = `<option value="general">🌐 General (Todos)</option>`;
    dbTerritorios.sort((a,b) => a.num - b.num).forEach(t => {
        selTerritorio.innerHTML += `<option value="${t.num}">Territorio ${t.num}</option>`;
    });

    // 2. Poblar Meses
    const fechaActual = new Date();
    const mesActualNombre = mesesTerritoriosNombres[fechaActual.getMonth()];
    selMes.innerHTML = `<option value="todos">Todos los Meses</option>`;
    mesesTerritoriosNombres.forEach(m => {
        selMes.innerHTML += `<option value="${m}">${m}</option>`;
    });
    selMes.value = mesActualNombre; // Por defecto mes actual

    // 3. Poblar Años
    const anioActual = fechaActual.getFullYear().toString();
    selAnio.innerHTML = `<option value="${anioActual}">${anioActual}</option>`;
    selAnio.value = anioActual; // Por defecto año actual
}

function renderizarTablasEcosistema() {
    const tbodyTodosControl = document.getElementById('tablaControlTodos');
    const tbodyCalleControl = document.getElementById('tablaControlCalle');
    const tbodyMaestroInfo = document.getElementById('tablaInfoMaestra');

    if (!tbodyTodosControl || !tbodyCalleControl || !tbodyMaestroInfo) return;

    tbodyTodosControl.innerHTML = "";
    tbodyCalleControl.innerHTML = "";
    tbodyMaestroInfo.innerHTML = "";

    dbTerritorios.sort((a,b) => a.num - b.num).forEach(t => {
        let estaAsignado = t.responsable !== "";
        let puntosHtml = t.puntos.map(p => `• ${p}`).join('<br>');

        // 1. Casillero General
        let badgeEstado = estaAsignado ? `<span class="badge bg-danger">En la Calle</span>` : `<span class="badge bg-success">Disponible</span>`;
        let botonAsignar = estaAsignado 
            ? `<button class="btn btn-sm btn-outline-secondary py-0 px-2" disabled style="font-size:0.8rem;">Asignar</button>` 
            : `<button class="btn btn-sm btn-primary py-0 px-2" style="font-size:0.8rem;" onclick="abrirModalAsignar(${t.num})">Asignar</button>`;

        tbodyTodosControl.innerHTML += `
            <tr>
                <td class="text-center fw-bold bg-light">Territorio ${t.num}</td>
                <td class="small text-muted">${puntosHtml}</td>
                <td class="text-center">${badgeEstado}</td>
                <td class="text-center">${botonAsignar}</td>
            </tr>
        `;

        // 2. En la Calle
        if (estaAsignado) {
            let [y, m, d] = t.fecha.split('-');
            let nombreResponsableFormateado = typeof invertirNombre === 'function' ? invertirNombre(t.responsable) : t.responsable;
            tbodyCalleControl.innerHTML += `
                <tr>
                    <td class="text-center fw-bold bg-light text-danger">Territorio ${t.num}</td>
                    <td><strong>${nombreResponsableFormateado}</strong></td>
                    <td class="text-center small fw-medium">${d}/${m}/${y}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-success py-0 px-2 fw-bold" style="font-size:0.8rem;" onclick="recibirTerritorio(${t.num})">🟢 Recibir</button>
                    </td>
                </tr>
            `;
        }

        // 3. Información Maestra
        let textoObs = t.observaciones ? `<small class="text-danger fw-semibold d-block" style="font-size:0.75rem;">⚠️ ${t.observaciones}</small>` : `<span class="text-muted small">-</span>`;
        tbodyMaestroInfo.innerHTML += `
            <tr class="fila-info-busqueda">
                <td class="text-center fw-bold bg-light">Territorio ${t.num}</td>
                <td class="small text-muted">${puntosHtml}</td>
                <td class="text-center fw-bold text-secondary" style="font-size:0.9rem;">${t.veces} veces</td>
                <td>${textoObs}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-light border py-0 px-2" style="font-size:0.8rem;" onclick="abrirModalEditar(${t.num})">✏️ Editar</button>
                </td>
            </tr>
        `;
    });
}

function abrirModalAsignar(num) {
    let terr = dbTerritorios.find(t => t.num === num);
    if (!terr) return;

    document.getElementById('modalTerritorioNum').value = num;
    document.getElementById('modalTerritorioTexto').textContent = `Salida de Tarjeta: Territorio ${num}`;
    document.getElementById('inputResponsableTerritorio').value = "";
    
    let hoy = new Date();
    document.getElementById('inputFechaTerritorio').value = `${hoy.getFullYear()}-${String(hoy.getMonth()+1).padStart(2,'0')}-${String(hoy.getDate()).padStart(2,'0')}`;
    modalAsignarTerr.show();
}

function guardarSalidaTerritorio(e) {
    e.preventDefault();
    let num = parseInt(document.getElementById('modalTerritorioNum').value);
    let responsable = document.getElementById('inputResponsableTerritorio').value.trim();
    let fecha = document.getElementById('inputFechaTerritorio').value;

    let idx = dbTerritorios.findIndex(t => t.num === num);
    if (idx !== -1) {
        dbTerritorios[idx].responsable = responsable;
        dbTerritorios[idx].fecha = fecha;
        dbTerritorios[idx].veces = (dbTerritorios[idx].veces || 0) + 1;
        if (!dbTerritorios[idx].historial) dbTerritorios[idx].historial = [];
        dbTerritorios[idx].historial.push({ fecha: fecha, responsable: responsable });
        modalAsignarTerr.hide();
        guardarEnMemoriaTerritorios();
    }
}

function recibirTerritorio(num) {
    let idx = dbTerritorios.findIndex(t => t.num === num);
    if (idx !== -1) {
        if (confirm(`¿Confirmar la devolución en casillero del Territorio ${num}?`)) {
            dbTerritorios[idx].responsable = "";
            dbTerritorios[idx].fecha = "";
            guardarEnMemoriaTerritorios();
        }
    }
}

function abrirModalNuevoTerritorio() {
    document.getElementById('formNuevoTerritorio').reset();
    document.getElementById('contenedorPuntosDinamicos').innerHTML = `
        <div class="input-group mb-2">
            <input type="text" class="form-control input-punto-encuentro" required placeholder="Ej. Esquina Av. Paraíso con Mz. C">
            <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">✕</button>
        </div>
    `;
    let proxNum = dbTerritorios.length > 0 ? Math.max(...dbTerritorios.map(t => t.num)) + 1 : 1;
    document.getElementById('inputNuevoNum').value = proxNum;
    modalNuevoTerr.show();
}

function agregarPuntoEncuentroInput(valor = "") {
    const contenedor = document.getElementById('contenedorPuntosDinamicos');
    if (!contenedor) return;
    const div = document.createElement('div');
    div.className = "input-group mb-2";
    div.innerHTML = `
        <input type="text" class="form-control input-punto-encuentro" required value="${valor}" placeholder="Punto de encuentro adicional">
        <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">✕</button>
    `;
    contenedor.appendChild(div);
}

function guardarNuevoTerritorio(e) {
    e.preventDefault();
    let puntosInputs = document.querySelectorAll('.input-punto-encuentro');
    let listaPuntos = [];
    puntosInputs.forEach(input => {
        if(input.value.trim()) listaPuntos.push(input.value.trim());
    });

    dbTerritorios.push({
        num: parseInt(document.getElementById('inputNuevoNum').value),
        puntos: listaPuntos.length > 0 ? listaPuntos : ["Punto principal no especificado"],
        responsable: "", fecha: "", veces: 0,
        historial: [],
        observaciones: document.getElementById('inputNuevoObs').value.trim()
    });
    modalNuevoTerr.hide();
    inicializarFiltrosGlobales();
    guardarEnMemoriaTerritorios();
}

function abrirModalEditar(num) {
    let terr = dbTerritorios.find(t => t.num === num);
    if (!terr) return;
    document.getElementById('editTerritorioNum').value = num;
    document.getElementById('editObservaciones').value = terr.observaciones || "";
    
    const contenedor = document.getElementById('editContenedorPuntos');
    contenedor.innerHTML = "";
    terr.puntos.forEach(p => {
        const div = document.createElement('div');
        div.className = "input-group mb-2";
        div.innerHTML = `
            <input type="text" class="form-control edit-input-punto" required value="${p}">
            <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">✕</button>
        `;
        contenedor.appendChild(div);
    });

    modalEditarTerr.show();
}

function editarAgregarPuntoInput(valor = "") {
    const contenedor = document.getElementById('editContenedorPuntos');
    if (!contenedor) return;
    const div = document.createElement('div');
    div.className = "input-group mb-2";
    div.innerHTML = `
        <input type="text" class="form-control edit-input-punto" required value="${valor}" placeholder="Punto de encuentro adicional">
        <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">✕</button>
    `;
    contenedor.appendChild(div);
}

function guardarEdicionTerritorio(e) {
    e.preventDefault();
    let num = parseInt(document.getElementById('editTerritorioNum').value);
    let idx = dbTerritorios.findIndex(t => t.num === num);
    if (idx !== -1) {
        let puntosInputs = document.querySelectorAll('.edit-input-punto');
        let listaPuntos = [];
        puntosInputs.forEach(input => {
            if(input.value.trim()) listaPuntos.push(input.value.trim());
        });

        dbTerritorios[idx].puntos = listaPuntos;
        dbTerritorios[idx].observaciones = document.getElementById('editObservaciones').value.trim();
        modalEditarTerr.hide();
        guardarEnMemoriaTerritorios();
    }
}

// ==========================================================
// --- MOTOR DE PROCESAMIENTO GRÁFICO CON FILTROS GLOBALES ---
// ==========================================================
function inicializarGraficosTerritorios() {
    aplicarFiltrosGlobalesYRenderizar();
}

function aplicarFiltrosGlobalesYRenderizar() {
    const selTerritorio = document.getElementById('filtroGlobalTerritorio');
    const selMes = document.getElementById('filtroGlobalMes');
    const selAnio = document.getElementById('filtroGlobalAnio');

    let territorioFiltro = selTerritorio ? selTerritorio.value : "general";
    let mesFiltro = selMes ? selMes.value : "todos";
    let anioFiltro = selAnio ? selAnio.value : new Date().getFullYear().toString();

    // Función auxiliar para verificar si un registro de historial cumple con el mes y año
    function cumpleFiltroFecha(fechaStr) {
        if (!fechaStr) return false;
        let [y, m] = fechaStr.split('-');
        let nombreMesRegistro = mesesTerritoriosNombres[parseInt(m) - 1];
        let anioRegistro = y;

        let matchAnio = (anioRegistro === anioFiltro);
        let matchMes = (mesFiltro === "todos" || nombreMesRegistro === mesFiltro);
        return matchAnio && matchMes;
    }

    // Filtrar datos según los filtros globales
    let datosProcesados = dbTerritorios.map(t => {
        let historialFiltrado = (t.historial || []).filter(h => cumpleFiltroFecha(h.fecha));
        let vecesFiltradas = (mesFiltro === "todos") ? (t.veces || 0) : historialFiltrado.length;
        return {
            ...t,
            vecesActivas: vecesFiltradas,
            historialActivo: historialFiltrado
        };
    });

    // 1. Renderizar Gráfico Global (Doughnut)
    let enCalle = datosProcesados.filter(t => t.responsable !== "").length;
    let disponibles = datosProcesados.length - enCalle;

    const leyendaEl = document.getElementById('leyendaGlobalTexto');
    if (leyendaEl) {
        leyendaEl.innerHTML = `🟢 Disponibles: <strong>${disponibles}</strong> tarjetas | 🔴 En la calle: <strong>${enCalle}</strong> tarjetas`;
    }

    if (chartGlobalInstance) chartGlobalInstance.destroy();
    
    const ctxGlobal = document.getElementById('chartGlobalTerritorios');
    if (ctxGlobal) {
        chartGlobalInstance = new Chart(ctxGlobal.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Disponibles (Casillero)', 'Asignados (Calle)'],
                datasets: [{
                    data: [disponibles, enCalle],
                    backgroundColor: ['#28a745', '#dc3545'],
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // 2. Renderizar Gráfico de Líneas / Comparativa y Tabla Inferior
    renderizarGraficoLineasZoom(datosProcesados, territorioFiltro);
}

function renderizarGraficoLineasZoom(datos, seleccion) {
    const tablaFechasContainer = document.getElementById('contenedorTablaFechasAsignadas');
    if (chartIndividualInstance) chartIndividualInstance.destroy();

    let labelsX = [];
    let dataY = [];
    let backgroundColors = [];
    let tablaHtml = "";

    if (seleccion === "general") {
        // Modo General: Mostrar todos los territorios ordenados por número
        datos.sort((a,b) => a.num - b.num).forEach(t => {
            labelsX.push(`Territorio ${t.num}`);
            dataY.push(t.vecesActivas);
            backgroundColors.push('#2c3e50');
        });

        if (tablaFechasContainer) {
            tablaFechasContainer.innerHTML = `<p class="text-muted small text-center fst-italic">Seleccione un territorio específico arriba en los filtros para ver el historial detallado de responsables y fechas.</p>`;
        }
    } else {
        // Modo Zoom / Comparativo: Seleccionado un territorio específico
        let numSel = parseInt(seleccion);
        let objetivo = datos.find(t => t.num === numSel);
        if (!objetivo) return;

        // Ordenar el resto de territorios por sus veces activas para encontrar los 3 mayores y 3 menores
        let resto = datos.filter(t => t.num !== numSel);
        
        // Mayores o iguales (orden descendente, tomamos los 3 primeros)
        let mayores = [...resto].sort((a, b) => b.vecesActivas - a.vecesActivas).slice(0, 3).reverse();
        // Menores o iguales (orden ascendente, tomamos los 3 primeros)
        let menores = [...resto].sort((a, b) => a.vecesActivas - b.vecesActivas).slice(0, 3);

        // Construir arrays para el gráfico centrado en el objetivo
        let grupoVisual = [...menores, objetivo, ...mayores];

        grupoVisual.forEach(t => {
            labelsX.push(`Territorio ${t.num}`);
            dataY.push(t.vecesActivas);
            // Destacar con color rojo/especial al territorio seleccionado en el centro
            if (t.num === objetivo.num) {
                backgroundColors.push('#dc3545'); // Centro (Zoom)
            } else {
                backgroundColors.push('#2c3e50'); // Laterales (Comparativa)
            }
        });

        // Construir la tabla inferior con el responsable y fechas de asignación
        let historial = objetivo.historialActivo || [];
        if (historial.length === 0) {
            tablaHtml = `<tr><td colspan="3" class="text-center text-muted small">Sin registros para los filtros seleccionados</td></tr>`;
        } else {
            historial.sort((a,b) => new Date(a.fecha) - new Date(b.fecha)).forEach((h, index) => {
                let [y, m, d] = h.fecha.split('-');
                let responsableFormateado = typeof invertirNombre === 'function' ? invertirNombre(h.responsable) : h.responsable;
                tablaHtml += `
                    <tr>
                        <td class="text-center">${index + 1}</td>
                        <td class="text-center fw-semibold">${d}/${m}/${y}</td>
                        <td><strong>${responsableFormateado}</strong></td>
                    </tr>
                `;
            });
        }

        if (tablaFechasContainer) {
            tablaFechasContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-bold text-secondary small m-0">📅 Historial Detallado de Asignaciones (Territorio ${objetivo.num})</h6>
                    <span class="badge bg-danger">Comparativa: 3 menores (izq) ➔ [ Territorio ${objetivo.num} ] ➔ 3 mayores (der)</span>
                </div>
                <div class="table-responsive border rounded" style="max-height: 200px; overflow-y: auto;">
                    <table class="table table-sm table-hover table-bordered mb-0 bg-white align-middle">
                        <thead class="table-light sticky-top">
                            <tr><th class="text-center" style="width: 80px;">N° Salida</th><th class="text-center" style="width: 150px;">Fecha de Asignación</th><th>Hermano Responsable</th></tr>
                        </thead>
                        <tbody>${tablaHtml}</tbody>
                    </table>
                </div>
            `;
        }
    }

    const ctxIndividual = document.getElementById('chartIndividualTerritorio');
    if (ctxIndividual) {
        chartIndividualInstance = new Chart(ctxIndividual.getContext('2d'), {
            type: 'line',
            data: {
                labels: labelsX,
                datasets: [{
                    label: 'Veces Usado',
                    data: dataY,
                    borderColor: '#2c3e50',
                    backgroundColor: 'rgba(44, 62, 80, 0.15)',
                    borderWidth: 2.5,
                    pointBackgroundColor: backgroundColors,
                    pointRadius: 6,
                    fill: true,
                    tension: 0.15
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                },
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return ` Usado: ${context.raw} veces`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function filtrarTablaInfo() {
    let buscar = document.getElementById('buscadorInfo').value.toLowerCase();
    document.querySelectorAll('.fila-info-busqueda').forEach(f => {
        let texto = f.cells[0].textContent.toLowerCase() + " " + f.cells[1].textContent.toLowerCase();
        f.style.display = texto.includes(buscar) ? "" : "none";
    });
}

function guardarEnMemoriaTerritorios() {
    localStorage.setItem('bd_modulo_territorios_v6', JSON.stringify(dbTerritorios));
    renderizarTablasEcosistema();
    
    const resumenTab = document.getElementById('moduloResumen');
    if (resumenTab && resumenTab.classList.contains('active')) { 
        inicializarGraficosTerritorios(); 
    }
    
    const toast = document.getElementById('toast-copiado');
    if (toast) {
        toast.style.display = 'block'; 
        setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }
}