let dbServicio = JSON.parse(localStorage.getItem('bd_app_servicio_v6')) || [];
let barChartServicioInstance = null;
let linePrivilegioInstance = null;

const mesesNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const ordenMesesServ = {
    "Enero": 1, "Febrero": 2, "Marzo": 3, "Abril": 4, "Mayo": 5, "Junio": 6,
    "Julio": 7, "Agosto": 8, "Septiembre": 9, "Octubre": 10, "Noviembre": 11, "Diciembre": 12
};

function inicializarModuloServicio() {
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear().toString();
    const mesActualIndex = fechaActual.getMonth();
    const mesActualNombre = mesesNombres[mesActualIndex];

    let aniosDisponibles = [
        ...new Set([...dbServicio.map(r => r.anio), anioActual, String(Number(anioActual) - 1), String(Number(anioActual) + 1)])
    ].filter(Boolean);
    aniosDisponibles.sort().reverse();

    const selTablaAnio = document.getElementById('filtroAnioInforme');
    const selAnalisisAnio = document.getElementById('filtroAnioAnalisis');

    if (selTablaAnio) {
        selTablaAnio.innerHTML = aniosDisponibles.map(a => `<option value="${a}">${a}</option>`).join('');
        selTablaAnio.value = anioActual;
    }

    if (selAnalisisAnio) {
        selAnalisisAnio.innerHTML = aniosDisponibles.map(a => `<option value="${a}">${a}</option>`).join('');
        selAnalisisAnio.value = anioActual;
    }

    const selMes = document.getElementById('filtroMesInforme');
    if (selMes) selMes.value = mesActualNombre;

    actualizarTablaServicio();
    actualizarSelectorGraficoHermanos();
}

function determinarTipoPrecursorado(h) {
    if (h.precursorado && h.precursorado !== 'Ninguno') {
        return h.precursorado;
    }
    return 'Publicador';
}

function evaluarMetaServicio(tipo, horas) {
    if (tipo === "Precursor Auxiliar") return horas >= 15;
    if (tipo === "Precursor Regular") return horas >= 50;
    return true; 
}

function actualizarTablaServicio() {
    const grupoSelect = document.getElementById('filtroGrupoInforme');
    const mesSelect = document.getElementById('filtroMesInforme');
    const anioSelect = document.getElementById('filtroAnioInforme');
    const cuerpoTabla = document.getElementById('tablaCuerpoServicio');
    
    if (!cuerpoTabla) return;

    const grupoSeleccionado = grupoSelect ? grupoSelect.value : 'todos';
    const mesSeleccionado = mesSelect ? mesSelect.value : 'Enero';
    const anioSeleccionado = anioSelect ? anioSelect.value : new Date().getFullYear().toString();

    const hermanosGeneral = obtenerHermanos();
    
    if (!hermanosGeneral || hermanosGeneral.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay hermanos en la base de datos general.</td></tr>`;
        return;
    }

    const hermanosGrupo = grupoSeleccionado === 'todos' 
        ? hermanosGeneral 
        : hermanosGeneral.filter(h => Number(h.grupo) === Number(grupoSeleccionado));

    if (hermanosGrupo.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No hay hermanos registrados en este filtro.</td></tr>`;
        return;
    }

    cuerpoTabla.innerHTML = '';

    hermanosGrupo.forEach(h => {
        const informeExistente = dbServicio.find(r => 
            r.nombre.trim().toLowerCase() === h.nombre.trim().toLowerCase() && 
            r.mes === mesSeleccionado && 
            r.anio === anioSeleccionado
        );

        const tipoPrecursorado = informeExistente ? informeExistente.tipo : determinarTipoPrecursorado(h);
        
        let horas = informeExistente ? informeExistente.horas : 0;
        let estudios = informeExistente ? informeExistente.estudios : 0;
        let estaRegistrado = !!informeExistente;
        let metaCumplida = evaluarMetaServicio(tipoPrecursorado, horas);

        let estadoBadge = '';
        if (!estaRegistrado) {
            estadoBadge = `<span class="badge" style="background-color: #f8d7da; color: #842029; padding: 5px 12px; border-radius: 15px; font-weight: bold;">Incompleto</span>`;
        } else if (metaCumplida) {
            estadoBadge = `<span class="badge" style="background-color: #d1e7dd; color: #0f5132; padding: 5px 12px; border-radius: 15px; font-weight: bold;">Cumplida</span>`;
        } else {
            estadoBadge = `<span class="badge" style="background-color: #fff3cd; color: #664d03; padding: 5px 12px; border-radius: 15px; font-weight: bold;">Pendiente Meta</span>`;
        }

        const nombreSeguro = h.nombre.replace(/'/g, "\\'");
        const nombreFormateado = typeof invertirNombre === 'function' ? invertirNombre(h.nombre) : h.nombre;

        let botonesAccion = `
            <button class="btn btn-sm btn-primary" onclick="abrirModalInforme('${nombreSeguro}', '${tipoPrecursorado}', ${horas}, ${estudios})">
                ✏️ ${estaRegistrado ? 'Editar' : 'Registrar'}
            </button>
        `;

        if (estaRegistrado) {
            botonesAccion += `
                <button class="btn btn-sm btn-outline-danger ms-1" onclick="reiniciarInformeServicio('${nombreSeguro}')" title="Reiniciar informe">
                    🔄
                </button>
            `;
        }

        cuerpoTabla.innerHTML += `
            <tr>
                <td><strong>${nombreFormateado}</strong></td>
                <td><small class="text-muted border p-1 rounded bg-light">${tipoPrecursorado}</small></td>
                <td class="text-center fw-bold">${horas}</td>
                <td class="text-center">${estudios}</td>
                <td class="text-center">${estadoBadge}</td>
                <td class="text-end">${botonesAccion}</td>
            </tr>
        `;
    });
}

function abrirModalInforme(nombre, tipoActual, horas, estudios) {
    document.getElementById('modalNombreHermano').value = nombre;
    const nombreFormateado = typeof invertirNombre === 'function' ? invertirNombre(nombre) : nombre;
    document.getElementById('modalLabelHermano').textContent = `Hermano(a): ${nombreFormateado}`;
    document.getElementById('modalHoras').value = horas;
    document.getElementById('modalEstudios').value = estudios;

    const selectTipo = document.getElementById('modalTipoHermano');
    if (selectTipo) selectTipo.value = tipoActual;

    const modalEl = document.getElementById('modalInformeServicio');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

function guardarInformeModal() {
    const nombre = document.getElementById('modalNombreHermano').value;
    const tipo = document.getElementById('modalTipoHermano').value;
    const horas = parseInt(document.getElementById('modalHoras').value) || 0;
    const estudios = parseInt(document.getElementById('modalEstudios').value) || 0;
    const mes = document.getElementById('filtroMesInforme').value;
    const anio = document.getElementById('filtroAnioInforme').value;

    const index = dbServicio.findIndex(r => r.nombre === nombre && r.mes === mes && r.anio === anio);

    if (index !== -1) {
        dbServicio[index].horas = horas;
        dbServicio[index].estudios = estudios;
        dbServicio[index].tipo = tipo;
    } else {
        dbServicio.push({ anio, mes, nombre, tipo, horas, estudios });
    }

    localStorage.setItem('bd_app_servicio_v6', JSON.stringify(dbServicio));

    const modalEl = document.getElementById('modalInformeServicio');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();

    actualizarTablaServicio();
    actualizarSelectorGraficoHermanos();
}

function reiniciarInformeServicio(nombre) {
    const mes = document.getElementById('filtroMesInforme').value;
    const anio = document.getElementById('filtroAnioInforme').value;
    const nombreFormateado = typeof invertirNombre === 'function' ? invertirNombre(nombre) : nombre;

    if (confirm(`¿Deseas reiniciar el informe de ${nombreFormateado} para ${mes} ${anio}? Volverá a estado incompleto.`)) {
        dbServicio = dbServicio.filter(r => !(r.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && r.mes === mes && r.anio === anio));
        localStorage.setItem('bd_app_servicio_v6', JSON.stringify(dbServicio));
        
        actualizarTablaServicio();
        actualizarSelectorGraficoHermanos();
    }
}

function actualizarSelectorGraficoHermanos() {
    const selectorGrafico = document.getElementById('selectHermanoGrafico');
    if (!selectorGrafico) return;

    const valGrafico = selectorGrafico.value;
    selectorGrafico.innerHTML = '<option value="">-- Elegir de la base de datos --</option>';
    
    const hermanosCongregacion = obtenerHermanos();
    const nombresUnicos = [...new Set(hermanosCongregacion.map(h => h.nombre))].sort();

    nombresUnicos.forEach(nombre => {
        let nombreFormateado = typeof invertirNombre === 'function' ? invertirNombre(nombre) : nombre;
        selectorGrafico.innerHTML += `<option value="${nombre}">${nombreFormateado}</option>`;
    });
    if (nombresUnicos.includes(valGrafico)) selectorGrafico.value = valGrafico;
}

function inicializarGraficosServicio() {
    actualizarSelectorGraficoHermanos();
    requestAnimationFrame(() => {
        renderizarGraficosServicio();
    });
}

function destruirGraficosServicio() {
    if (barChartServicioInstance) {
        barChartServicioInstance.destroy();
        barChartServicioInstance = null;
    }
    if (linePrivilegioInstance) {
        linePrivilegioInstance.destroy();
        linePrivilegioInstance = null;
    }
}

function renderizarGraficosServicio() {
    const nombre = document.getElementById('selectHermanoGrafico')?.value;
    const anioSelect = document.getElementById('filtroAnioAnalisis');
    const tabla = document.getElementById('tablaAnalisisCuerpo');
    const kpiHoras = document.getElementById('kpiPromedioHoras');
    const kpiEstudios = document.getElementById('kpiPromedioEstudios');
    
    if (!tabla) return;
    
    const anio = anioSelect ? anioSelect.value : new Date().getFullYear().toString();

    if (!nombre) {
        tabla.innerHTML = '<tr><td colspan="5" class="text-center text-muted">Seleccione un hermano para ver su análisis</td></tr>';
        if (kpiHoras) kpiHoras.textContent = "0.0";
        if (kpiEstudios) kpiEstudios.textContent = "0.0";
        destruirGraficosServicio();
        return;
    }

    let registrosHermano = dbServicio.filter(r => r.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && r.anio === anio);
    
    tabla.innerHTML = '';
    if (registrosHermano.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay informes registrados para este hermano en el año ${anio}.</td></tr>`;
        if (kpiHoras) kpiHoras.textContent = "0.0";
        if (kpiEstudios) kpiEstudios.textContent = "0.0";
    } else {
        registrosHermano.sort((a, b) => ordenMesesServ[a.mes] - ordenMesesServ[b.mes]);
        
        let totalHoras = 0;
        let totalEstudios = 0;
        let mesesConDatos = registrosHermano.length;

        registrosHermano.forEach(r => {
            totalHoras += Number(r.horas) || 0;
            totalEstudios += Number(r.estudios) || 0;
            const meta = evaluarMetaServicio(r.tipo, r.horas);
            tabla.innerHTML += `
                <tr>
                    <td><strong>${r.mes}</strong></td>
                    <td>${r.tipo}</td>
                    <td class="text-center">${r.horas}</td>
                    <td class="text-center">${r.estudios}</td>
                    <td class="text-center"><span class="badge" style="background-color: ${meta ? '#d1e7dd' : '#f8d7da'}; color: ${meta ? '#0f5132' : '#842029'}; padding: 5px 10px; border-radius: 15px; font-weight: bold;">${meta ? 'OK' : 'Falta'}</span></td>
                </tr>
            `;
        });

        if (kpiHoras) kpiHoras.textContent = (totalHoras / (mesesConDatos || 1)).toFixed(1);
        if (kpiEstudios) kpiEstudios.textContent = (totalEstudios / (mesesConDatos || 1)).toFixed(1);
    }

    destruirGraficosServicio();

    const mesesLabels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const datosHoras = mesesLabels.map(mes => {
        const encontrado = registrosHermano.find(r => r.mes === mes);
        return encontrado ? Number(encontrado.horas) : 0;
    });

    const datosEstudios = mesesLabels.map(mes => {
        const encontrado = registrosHermano.find(r => r.mes === mes);
        return encontrado ? Number(encontrado.estudios) : 0;
    });

    const datosPrivilegioNumerico = mesesLabels.map(mes => {
        const encontrado = registrosHermano.find(r => r.mes === mes);
        if (!encontrado) return null;
        if (encontrado.tipo === "Precursor Regular") return 3;
        if (encontrado.tipo === "Precursor Auxiliar") return 2;
        return 1;
    });

    const canvasBar = document.getElementById('barChartHorasEstudios');
    if (canvasBar) {
        barChartServicioInstance = new Chart(canvasBar.getContext('2d'), {
            type: 'bar',
            data: { 
                labels: mesesLabels, 
                datasets: [
                    { 
                        label: 'Horas', 
                        data: datosHoras, 
                        backgroundColor: 'rgba(74, 109, 167, 0.8)', 
                        borderColor: '#4a6da7',
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    { 
                        label: 'Estudios', 
                        data: datosEstudios, 
                        backgroundColor: 'rgba(40, 167, 69, 0.8)', 
                        borderColor: '#28a745',
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ] 
            },
            options: { 
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                    }
                }
            }
        });
    }

    const canvasLine = document.getElementById('lineChartPrivilegio');
    if (canvasLine) {
        linePrivilegioInstance = new Chart(canvasLine.getContext('2d'), {
            type: 'line',
            data: { 
                labels: mesesLabels, 
                datasets: [{ 
                    label: 'Privilegio', 
                    data: datosPrivilegioNumerico, 
                    borderColor: '#ffc107', 
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    fill: true,
                    tension: 0.1,
                    spanGaps: true
                }] 
            },
            options: { 
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0.5,
                        max: 3.5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                if (value === 3) return 'Pr. Regular';
                                if (value === 2) return 'Pr. Auxiliar';
                                if (value === 1) return 'Publicador';
                                return '';
                            }
                        }
                    }
                }
            }
        });
    }
}