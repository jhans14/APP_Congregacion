// ==========================================================================
// MÓDULO DE ASISTENCIA V2 (ModuloAsistencia-V2)
// Gestión Integral de Asistencia para Congregaciones
// ==========================================================================

// Base de datos de asistencia persistente
let baseDatosAsistenciasPorFecha = JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {};

// Sembrar datos históricos iniciales de ejemplo si la base de datos está vacía
if (Object.keys(baseDatosAsistenciasPorFecha).length === 0) {
    baseDatosAsistenciasPorFecha = {
        "2025-03-06": { fecha: "2025-03-06", presencial: 58, zoom: 18, total: 76, standing: 2, _parados: 2, _zoom: 18, zoomVal: 18, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-03-13": { fecha: "2025-03-13", presencial: 61, zoom: 21, total: 82, standing: 1, _parados: 1, _zoom: 21, zoomVal: 21, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-03-20": { fecha: "2025-03-20", presencial: 68, zoom: 23, total: 91, standing: 3, _parados: 3, _zoom: 23, zoomVal: 23, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-03-27": { fecha: "2025-03-27", presencial: 65, zoom: 21, total: 86, standing: 2, _parados: 2, _zoom: 21, zoomVal: 21, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-04-03": { fecha: "2025-04-03", presencial: 77, zoom: 24, total: 101, standing: 4, _parados: 4, _zoom: 24, zoomVal: 24, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-04-10": { fecha: "2025-04-10", presencial: 70, zoom: 24, total: 94, standing: 3, _parados: 3, _zoom: 24, zoomVal: 24, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-04-17": { fecha: "2025-04-17", presencial: 81, zoom: 27, total: 108, standing: 5, _parados: 5, _zoom: 27, zoomVal: 27, occupied: ["C-1","C-2","C-3","L-1","R-1"] },
        "2025-04-24": { fecha: "2025-04-24", presencial: 71, zoom: 12, total: 83, standing: 2, _parados: 2, _zoom: 12, zoomVal: 12, occupied: Array.from({ length: 69 }, (_, i) => `C-${i + 1}`) }
    };
    localStorage.setItem('bd_asistencia_fechas_v1', JSON.stringify(baseDatosAsistenciasPorFecha));
}

// Variables de estado del módulo
let vistaActualAsistencia = 'registro'; // 'registro' | 'analitica' | 'datos'
let fechaSeleccionadaAsistencia = new Date().toISOString().split('T')[0];
let asientosOcupadosSet = new Set();
let paradosAsistencia = 2;
let zoomAsistencia = 12;
let estadoGuardadoAsistencia = true;
const CAPACIDAD_AUDITORIO_TOTAL = 161; // 2 plataforma + 33 izquierda + 72 centro + 38 derecha + 16 auxiliar

// Filtros interactivos del gráfico de líneas
let filtroLineaTotal = true;
let filtroLineaPresencial = true;
let filtroLineaZoom = true;

/**
 * Función principal para renderizar e inicializar el módulo de asistencia
 * @param {HTMLElement} contenedorDestino - Contenedor principal donde se inyecta la interfaz
 */
function inicializarModuloAsistencia(contenedorDestino) {
    const area = contenedorDestino || document.getElementById('area-tabla');
    if (!area) return;

    // Si ya existe registro para la fecha de hoy, cargarlo
    cargarDatosFechaActual(fechaSeleccionadaAsistencia);

    area.innerHTML = `
        <div class="attendance-page">
            <!-- Barra Superior de Navegación de Vistas y Copiado Rápido -->
            <div class="attendance-viewbar">
                <div class="view-tabs" role="tablist" aria-label="Vistas de Asistencia">
                    <button class="view-tab ${vistaActualAsistencia === 'registro' ? 'active' : ''}" 
                            onclick="cambiarPestanaAsistencia('registro')" id="btnTabRegistro">
                        🎟️ Registro y Guardado
                    </button>
                    <button class="view-tab ${vistaActualAsistencia === 'analitica' ? 'active' : ''}" 
                            onclick="cambiarPestanaAsistencia('analitica')" id="btnTabAnalitica">
                        📈 Analítica y Gráficos
                    </button>
                    <button class="view-tab ${vistaActualAsistencia === 'datos' ? 'active' : ''}" 
                            onclick="cambiarPestanaAsistencia('datos')" id="btnTabDatos">
                        🗃️ Datos Históricos
                    </button>
                </div>
                <div>
                    <button class="btn btn-outline-primary btn-sm fw-bold d-inline-flex align-items-center gap-2" 
                            id="btnCopiarWhatsapp" onclick="copiarReporteWhatsApp()" title="Copiar reporte formateado para WhatsApp">
                        <span>📋</span> <span id="lblCopiarWhatsapp">Copiar para WhatsApp</span>
                    </button>
                </div>
            </div>

            <!-- Contenedor Dinámico de la Vista Activa -->
            <div id="contenedorVistaAsistencia"></div>
        </div>
    `;

    renderizarVistaActiva();
}

/**
 * Conmuta entre las tres pestañas superiores
 */
function cambiarPestanaAsistencia(nuevaVista) {
    vistaActualAsistencia = nuevaVista;

    // Actualizar clases de las pestañas
    document.querySelectorAll('.view-tab').forEach(b => b.classList.remove('active'));
    if (nuevaVista === 'registro') document.getElementById('btnTabRegistro')?.classList.add('active');
    if (nuevaVista === 'analitica') document.getElementById('btnTabAnalitica')?.classList.add('active');
    if (nuevaVista === 'datos') document.getElementById('btnTabDatos')?.classList.add('active');

    renderizarVistaActiva();
}

/**
 * Renderiza la vista que corresponda
 */
function renderizarVistaActiva() {
    const contenedor = document.getElementById('contenedorVistaAsistencia');
    if (!contenedor) return;

    if (vistaActualAsistencia === 'registro') {
        renderizarVistaRegistro(contenedor);
    } else if (vistaActualAsistencia === 'analitica') {
        renderizarVistaAnalitica(contenedor);
    } else if (vistaActualAsistencia === 'datos') {
        renderizarVistaDatos(contenedor);
    }
}

/**
 * Carga los datos de una fecha en el estado local
 */
function cargarDatosFechaActual(fecha) {
    fechaSeleccionadaAsistencia = fecha;
    const registro = baseDatosAsistenciasPorFecha[fecha];

    if (registro) {
        // Cargar butacas
        if (Array.isArray(registro.occupied)) {
            asientosOcupadosSet = new Set(registro.occupied);
        } else if (Array.isArray(registro.asientos)) {
            asientosOcupadosSet = new Set(registro.asientos);
        } else {
            // Extraer claves booleanas
            let asientos = Object.keys(registro).filter(k => !k.startsWith('_') && registro[k] === true);
            asientosOcupadosSet = new Set(asientos);
        }

        paradosAsistencia = parseInt(registro.standing ?? registro._parados ?? 0);
        zoomAsistencia = parseInt(registro.zoom ?? registro._zoom ?? registro.zoomVal ?? 0);
        estadoGuardadoAsistencia = true;
    } else {
        // Nueva fecha sin registro previo
        asientosOcupadosSet = new Set();
        paradosAsistencia = 0;
        zoomAsistencia = 0;
        estadoGuardadoAsistencia = false;
    }
}

// ==========================================================================
// VISTA 1: REGISTRO Y GUARDADO (Plano del Auditorio, Contadores y Sala Auxiliar)
// ==========================================================================
function renderizarVistaRegistro(contenedor) {
    const totalPresencial = asientosOcupadosSet.size + paradosAsistencia;
    const totalGeneral = totalPresencial + zoomAsistencia;
    const porcentajeCapacidad = Math.min(Math.round((totalPresencial / CAPACIDAD_AUDITORIO_TOTAL) * 100), 100);

    contenedor.innerHTML = `
        <div class="attendance-layout">
            <!-- Columna Izquierda: Auditorio, Plano y Sala Auxiliar -->
            <section class="card auditorium-card">
                <!-- Encabezado con Selector de Fecha a la Derecha -->
                <div class="auditorium-heading">
                    <div>
                        <h2>Auditorio Principal</h2>
                        <p>Selecciona las butacas ocupadas durante la reunión para el conteo automático.</p>
                    </div>
                    <div class="date-control">
                        <label for="inputFechaReunion">Fecha de reunión:</label>
                        <div class="date-control-input-wrap">
                            <span>📅</span>
                            <input type="date" id="inputFechaReunion" value="${fechaSeleccionadaAsistencia}" 
                                   onchange="alCambiarFechaAsistencia(this.value)">
                        </div>
                    </div>
                </div>

                <!-- Plataforma Superior (2 Asientos Estratégicos: Centro y Esquina Izquierda) -->
                <div class="stage">
                    <button class="seat platform-seat left ${asientosOcupadosSet.has('P-2') ? 'occupied' : ''}" 
                            onclick="toggleButaca('P-2')" title="Plataforma Esquina Izquierda (P2)">
                        P2
                    </button>
                    <span>PLATAFORMA</span>
                    <button class="seat platform-seat center ${asientosOcupadosSet.has('P-1') ? 'occupied' : ''}" 
                            onclick="toggleButaca('P-1')" title="Plataforma Centro (P1)">
                        P1
                    </button>
                </div>

                <!-- Plano de Butacas con Scroll Horizontal Táctil -->
                <div class="seat-scroll">
                    <div class="seat-sections">
                        <!-- Sección Izquierda: 4x8 + 1 asiento extra en extremo izquierdo -->
                        <div class="seat-section left-section">
                            <span class="section-label">Sección Izquierda</span>
                            <div class="seat-matrix-wrap">
                                <button class="seat extra-seat left-extra ${asientosOcupadosSet.has('L-E1') ? 'occupied' : ''}" 
                                        onclick="toggleButaca('L-E1')" title="Asiento Extra Izquierdo">
                                    E
                                </button>
                                <div class="seat-matrix" style="grid-template-columns: repeat(4, 34px);">
                                    ${generarMatrizAsientos('L', 4, 8)}
                                </div>
                            </div>
                        </div>

                        <!-- Sección Central: 8x9 -->
                        <div class="seat-section featured">
                            <span class="section-label">Sección Central</span>
                            <div class="seat-matrix" style="grid-template-columns: repeat(8, 34px);">
                                ${generarMatrizAsientos('C', 8, 9)}
                            </div>
                        </div>

                        <!-- Sección Derecha: 4x9 + 2 asientos extra en extremo derecho (fila 6) -->
                        <div class="seat-section">
                            <span class="section-label">Sección Derecha</span>
                            <div class="seat-matrix-wrap">
                                <div class="seat-matrix" style="grid-template-columns: repeat(4, 34px);">
                                    ${generarMatrizAsientos('R', 4, 9)}
                                </div>
                                <div class="right-extras">
                                    <button class="seat extra-seat ${asientosOcupadosSet.has('R-E1') ? 'occupied' : ''}" 
                                            onclick="toggleButaca('R-E1')" title="Asiento Extra 1 Derecha">
                                        E
                                    </button>
                                    <button class="seat extra-seat ${asientosOcupadosSet.has('R-E2') ? 'occupied' : ''}" 
                                            onclick="toggleButaca('R-E2')" title="Asiento Extra 2 Derecha">
                                        E
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Leyenda del Plano -->
                <div class="plan-legend">
                    <span><i class="legend-seat occupied"></i> Butaca Ocupada</span>
                    <span><i class="legend-seat"></i> Disponible</span>
                    <span>↔️ Desliza horizontalmente para ver todas las secciones</span>
                </div>

                <!-- Sala Auxiliar (Matriz 4x4) -->
                <div class="auxiliary-room-card">
                    <span class="auxiliary-room-heading">SALA AUXILIAR (4x4)</span>
                    <div class="auxiliary-grid">
                        ${generarMatrizAsientos('AUX', 4, 4)}
                    </div>

                    <!-- Botón de Guardar Asistencia Posicionado Exactamente Debajo de la Sala Auxiliar -->
                    <button class="btn-guardar-asistencia-aux" id="btnGuardarAsistenciaAux" onclick="guardarAsistenciaActual()">
                        <span>💾</span> Guardar Asistencia
                    </button>
                </div>
            </section>

            <!-- Columna Derecha: Panel de Métricas y Contadores Interactivos -->
            <aside class="attendance-side">
                <!-- Tarjeta de Asistencia Total -->
                <section class="card attendance-total">
                    <span>ASISTENCIA TOTAL</span>
                    <strong id="lblAsistenciaTotal">${totalGeneral}</strong>
                    <small>asistentes en la reunión</small>

                    <div class="capacity">
                        <div>
                            <span>Capacidad presencial</span>
                            <strong id="lblCapacidadPresencial">${totalPresencial} / ${CAPACIDAD_AUDITORIO_TOTAL}</strong>
                        </div>
                        <div class="progress">
                            <div class="progress-bar" id="barraProgresoCapacidad" style="width: ${porcentajeCapacidad}%;"></div>
                        </div>
                    </div>
                </section>

                <!-- Tarjeta de Contadores y Modificadores (+/- o entrada numérica directa) -->
                <section class="card counter-card">
                    <!-- Butacas Marcadas -->
                    <div class="counter-row">
                        <span>Butacas Marcadas</span>
                        <strong class="text-primary fs-6" id="lblButacasMarcadas">${asientosOcupadosSet.size}</strong>
                    </div>

                    <!-- Personas de Pie (Parados) -->
                    <div class="counter-row">
                        <span>Personas de Pie</span>
                        <div>
                            <button type="button" onclick="modificarContador('parados', -1)" aria-label="Disminuir parados">−</button>
                            <input type="number" id="inputContadorParados" value="${paradosAsistencia}" min="0" 
                                   onchange="alCambiarInputContador('parados', this.value)">
                            <button type="button" onclick="modificarContador('parados', 1)" aria-label="Aumentar parados">+</button>
                        </div>
                    </div>

                    <!-- Conexiones Zoom -->
                    <div class="counter-row">
                        <span>Conexiones por Zoom</span>
                        <div>
                            <button type="button" onclick="modificarContador('zoom', -1)" aria-label="Disminuir Zoom">−</button>
                            <input type="number" id="inputContadorZoom" value="${zoomAsistencia}" min="0" 
                                   onchange="alCambiarInputContador('zoom', this.value)">
                            <button type="button" onclick="modificarContador('zoom', 1)" aria-label="Aumentar Zoom">+</button>
                        </div>
                    </div>
                </section>

                <!-- Estado de Guardado -->
                <div class="save-status ${estadoGuardadoAsistencia ? 'saved' : ''}" id="indicadorEstadoGuardado">
                    <i></i>
                    <span id="textoEstadoGuardado">${estadoGuardadoAsistencia ? 'Cambios guardados' : 'Cambios pendientes de guardar'}</span>
                </div>

                <!-- Botón de Guardado Adicional para Acceso Inmediato en Lateral -->
                <button class="btn btn-primary fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2" 
                        onclick="guardarAsistenciaActual()">
                    <span>💾</span> Guardar Asistencia
                </button>
            </aside>
        </div>
    `;
}

/**
 * Genera el HTML de las butacas de una sección dada
 */
function generarMatrizAsientos(prefijo, columnas, filas) {
    let html = '';
    const total = columnas * filas;

    for (let i = 1; i <= total; i++) {
        const idAsiento = `${prefijo}-${i}`;
        const ocupado = asientosOcupadosSet.has(idAsiento);
        html += `
            <button class="seat ${ocupado ? 'occupied' : ''}" 
                    id="seat-${idAsiento}" 
                    onclick="toggleButaca('${idAsiento}')" 
                    title="Asiento ${idAsiento}">
                ${i}
            </button>
        `;
    }
    return html;
}

/**
 * Conmuta el estado de ocupado de una butaca e incrementa/decrementa automáticamente el conteo
 */
function toggleButaca(idAsiento) {
    if (asientosOcupadosSet.has(idAsiento)) {
        asientosOcupadosSet.delete(idAsiento);
    } else {
        asientosOcupadosSet.add(idAsiento);
    }

    // Actualizar visualmente la butaca en el DOM si existe
    const btnButaca = document.getElementById(`seat-${idAsiento}`);
    if (btnButaca) {
        btnButaca.classList.toggle('occupied', asientosOcupadosSet.has(idAsiento));
    } else {
        // En caso de que sea plataforma o extra que tengan otra clase
        const btns = document.querySelectorAll(`button[onclick="toggleButaca('${idAsiento}')"]`);
        btns.forEach(b => b.classList.toggle('occupied', asientosOcupadosSet.has(idAsiento)));
    }

    marcarCambioPendiente();
    actualizarValoresUI();
}

/**
 * Modifica contadores con botones +/-
 */
function modificarContador(tipo, delta) {
    if (tipo === 'parados') {
        paradosAsistencia = Math.max(0, paradosAsistencia + delta);
        const input = document.getElementById('inputContadorParados');
        if (input) input.value = paradosAsistencia;
    } else if (tipo === 'zoom') {
        zoomAsistencia = Math.max(0, zoomAsistencia + delta);
        const input = document.getElementById('inputContadorZoom');
        if (input) input.value = zoomAsistencia;
    }
    marcarCambioPendiente();
    actualizarValoresUI();
}

/**
 * Modifica contadores con entrada numérica directa
 */
function alCambiarInputContador(tipo, valor) {
    const valNumerico = Math.max(0, parseInt(valor) || 0);
    if (tipo === 'parados') {
        paradosAsistencia = valNumerico;
    } else if (tipo === 'zoom') {
        zoomAsistencia = valNumerico;
    }
    marcarCambioPendiente();
    actualizarValoresUI();
}

/**
 * Actualiza los contadores y porcentajes en la interfaz en tiempo real
 */
function actualizarValoresUI() {
    const presencial = asientosOcupadosSet.size + paradosAsistencia;
    const total = presencial + zoomAsistencia;
    const porcentaje = Math.min(Math.round((presencial / CAPACIDAD_AUDITORIO_TOTAL) * 100), 100);

    const lblTotal = document.getElementById('lblAsistenciaTotal');
    if (lblTotal) lblTotal.textContent = total;

    const lblPresencial = document.getElementById('lblCapacidadPresencial');
    if (lblPresencial) lblPresencial.textContent = `${presencial} / ${CAPACIDAD_AUDITORIO_TOTAL}`;

    const barra = document.getElementById('barraProgresoCapacidad');
    if (barra) barra.style.width = `${porcentaje}%`;

    const lblButacas = document.getElementById('lblButacasMarcadas');
    if (lblButacas) lblButacas.textContent = asientosOcupadosSet.size;
}

/**
 * Marca que hay cambios pendientes de guardar
 */
function marcarCambioPendiente() {
    estadoGuardadoAsistencia = false;
    const indicador = document.getElementById('indicadorEstadoGuardado');
    const texto = document.getElementById('textoEstadoGuardado');
    if (indicador) indicador.classList.remove('saved');
    if (texto) texto.textContent = 'Cambios pendientes de guardar';
}

/**
 * Al cambiar la fecha en el selector interactivo
 */
function alCambiarFechaAsistencia(nuevaFecha) {
    cargarDatosFechaActual(nuevaFecha);
    renderizarVistaActiva();
}

/**
 * Guarda los datos de la asistencia en localStorage y actualiza persistencia
 */
function guardarAsistenciaActual() {
    const presencial = asientosOcupadosSet.size + paradosAsistencia;
    const total = presencial + zoomAsistencia;
    const fecha = fechaSeleccionadaAsistencia;

    const occupiedArray = Array.from(asientosOcupadosSet);
    
    // Crear objeto con formato enriquecido y retrocompatible
    const registro = {
        fecha: fecha,
        occupied: occupiedArray,
        asientos: occupiedArray,
        standing: paradosAsistencia,
        _parados: paradosAsistencia,
        zoom: zoomAsistencia,
        _zoom: zoomAsistencia,
        zoomVal: zoomAsistencia,
        presencial: presencial,
        _presencial: presencial,
        total: total,
        _total: total
    };

    // Agregar claves booleanas de butacas para retrocompatibilidad con SQL bridge
    occupiedArray.forEach(asientoId => {
        registro[asientoId] = true;
    });

    baseDatosAsistenciasPorFecha[fecha] = registro;
    localStorage.setItem('bd_asistencia_fechas_v1', JSON.stringify(baseDatosAsistenciasPorFecha));

    estadoGuardadoAsistencia = true;
    const indicador = document.getElementById('indicadorEstadoGuardado');
    const texto = document.getElementById('textoEstadoGuardado');
    if (indicador) indicador.classList.add('saved');
    if (texto) texto.textContent = 'Cambios guardados con éxito';

    mostrarToastNotificacion(`✅ Asistencia de ${fecha.split('-').reverse().join('/')} guardada correctamente`);
}

/**
 * Copia el reporte formateado para WhatsApp
 */
async function copiarReporteWhatsApp() {
    const presencial = asientosOcupadosSet.size + paradosAsistencia;
    const total = presencial + zoomAsistencia;
    const [y, m, d] = fechaSeleccionadaAsistencia.split('-');
    const fechaFormateada = `${d}/${m}/${y}`;

    const reporteTexto = `📊 *Asistencia - Congregación Paraíso*\n📅 Fecha: ${fechaFormateada}\n👥 Presencial: ${presencial}\n💻 Zoom: ${zoomAsistencia}\n📈 Total General: ${total}`;

    try {
        await navigator.clipboard.writeText(reporteTexto);
    } catch (e) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = reporteTexto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    const lbl = document.getElementById('lblCopiarWhatsapp');
    if (lbl) {
        const textoOriginal = lbl.textContent;
        lbl.textContent = '¡Reporte Copiado!';
        setTimeout(() => {
            lbl.textContent = textoOriginal;
        }, 2200);
    }

    mostrarToastNotificacion('📋 Reporte copiado con éxito para WhatsApp');
}

function mostrarToastNotificacion(mensaje) {
    let toast = document.getElementById('toast-copiado');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-copiado';
        document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2500);
}

// ==========================================================================
// VISTA 2: ANALÍTICA Y GRÁFICOS (Donut Chart, Trend Line y Tarjetas KPI)
// ==========================================================================
function renderizarVistaAnalitica(contenedor) {
    const fechas = Object.keys(baseDatosAsistenciasPorFecha).sort();
    
    // Obtener últimas reuniones (~8 reuniones)
    const ultimasFechas = fechas.slice(-8);
    let datosHistoricos = ultimasFechas.map(f => {
        const r = baseDatosAsistenciasPorFecha[f];
        const pres = parseInt(r.presencial ?? r._presencial ?? ((r.occupied ? r.occupied.length : 0) + (r.standing ?? 0)));
        const zm = parseInt(r.zoom ?? r._zoom ?? r.zoomVal ?? 0);
        const tot = parseInt(r.total ?? r._total ?? (pres + zm));
        return {
            fecha: f,
            presencial: pres,
            zoom: zm,
            total: tot
        };
    });

    if (datosHistoricos.length === 0) {
        datosHistoricos = [
            { fecha: fechaSeleccionadaAsistencia, presencial: asientosOcupadosSet.size + paradosAsistencia, zoom: zoomAsistencia, total: asientosOcupadosSet.size + paradosAsistencia + zoomAsistencia }
        ];
    }

    // Cálculos para Donut Chart y KPIs
    const sumaTotales = datosHistoricos.reduce((acc, d) => acc + d.total, 0);
    const promedioMensual = Math.round(sumaTotales / datosHistoricos.length);
    const ultimoRegistro = datosHistoricos[datosHistoricos.length - 1];
    const comparacionPorcentaje = promedioMensual > 0 ? Math.round((ultimoRegistro.total / promedioMensual) * 100) : 100;

    // Métricas Máxima, Mínima y Promedio
    let mayorRegistro = datosHistoricos.reduce((max, d) => d.total > max.total ? d : max, datosHistoricos[0]);
    let menorRegistro = datosHistoricos.reduce((min, d) => d.total < min.total ? d : min, datosHistoricos[0]);

    // Función para formatear fechas a texto amigable
    const formatearFechaCorta = (iso) => {
        const [, m, d] = iso.split('-');
        const meses = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
        return `${parseInt(d)} ${meses[parseInt(m) - 1]}`;
    };

    const formatearFechaLarga = (iso) => {
        const [y, m, d] = iso.split('-');
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        return `${parseInt(d)} de ${meses[parseInt(m) - 1]} de ${y}`;
    };

    // Renderizado del Trend Line SVG con puntos exactos y valores numéricos
    const svgWidth = 440;
    const svgHeight = 150;
    const paddingX = 35;
    const paddingY = 25;
    const plotWidth = svgWidth - paddingX * 2;
    const plotHeight = svgHeight - paddingY * 2;

    const maxValor = Math.max(...datosHistoricos.map(d => d.total), 110);
    const stepX = datosHistoricos.length > 1 ? plotWidth / (datosHistoricos.length - 1) : plotWidth;

    const coordsTotal = datosHistoricos.map((d, i) => ({
        x: paddingX + i * stepX,
        y: svgHeight - paddingY - (d.total / maxValor) * plotHeight,
        val: d.total
    }));

    const coordsPresencial = datosHistoricos.map((d, i) => ({
        x: paddingX + i * stepX,
        y: svgHeight - paddingY - (d.presencial / maxValor) * plotHeight,
        val: d.presencial
    }));

    const coordsZoom = datosHistoricos.map((d, i) => ({
        x: paddingX + i * stepX,
        y: svgHeight - paddingY - (d.zoom / maxValor) * plotHeight,
        val: d.zoom
    }));

    const crearPuntosPolyline = (coords) => coords.map(c => `${c.x},${c.y}`).join(' ');

    const renderizarLineaYMarcadores = (coords, color, visible, clave) => {
        if (!visible) return '';
        const pts = crearPuntosPolyline(coords);
        let markers = '';
        coords.forEach(c => {
            markers += `
                <g class="chart-point">
                    <circle cx="${c.x}" cy="${c.y}" r="4" fill="var(--surface)" stroke="${color}" stroke-width="3" />
                    <text x="${c.x}" y="${c.y - 8}" text-anchor="middle" fill="${color}" font-weight="800" font-size="9">${c.val}</text>
                </g>
            `;
        });
        return `
            <g id="line-${clave}">
                <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                ${markers}
            </g>
        `;
    };

    contenedor.innerHTML = `
        <div class="attendance-analytics">
            <div class="analytics-grid">
                <!-- 1. Diagrama Circular (Donut Chart) Comparativo -->
                <article class="card attendance-donut-card">
                    <div class="attendance-donut" style="background: conic-gradient(var(--primary) 0 ${Math.min(comparacionPorcentaje, 100)}%, var(--slate-200) ${Math.min(comparacionPorcentaje, 100)}% 100%);">
                        <div>
                            <strong>${comparacionPorcentaje}%</strong>
                            <span>del promedio</span>
                        </div>
                    </div>
                    <div>
                        <h3 class="fs-6 fw-bold mb-1">Comparativa de Asistencia</h3>
                        <p class="text-muted small mb-1">
                            <strong class="text-dark fs-5">${ultimoRegistro.total}</strong> asistentes registrados
                        </p>
                        <span class="trend-up">Promedio de las últimas ${datosHistoricos.length} reuniones: ${promedioMensual}</span>
                    </div>
                </article>

                <!-- 2. Diagrama de Líneas (Trend Line) con Leyenda Interactiva -->
                <article class="card trend-card">
                    <div class="chart-heading">
                        <div>
                            <h3>Tendencia de Asistencia</h3>
                            <p>Alterna las líneas para analizar la asistencia en cada reunión</p>
                        </div>
                        <div class="chart-legend">
                            <button class="${filtroLineaTotal ? 'active total' : ''}" onclick="alternarFiltroLinea('total')">
                                <i></i> Total
                            </button>
                            <button class="${filtroLineaPresencial ? 'active onsite' : ''}" onclick="alternarFiltroLinea('presencial')">
                                <i></i> Presencial
                            </button>
                            <button class="${filtroLineaZoom ? 'active online' : ''}" onclick="alternarFiltroLinea('zoom')">
                                <i></i> Zoom
                            </button>
                        </div>
                    </div>

                    <svg viewBox="0 0 ${svgWidth} ${svgHeight}" role="img" aria-label="Gráfica de tendencia histórica">
                        <!-- Líneas guía sutiles -->
                        <line x1="${paddingX}" y1="${paddingY}" x2="${svgWidth - paddingX}" y2="${paddingY}" stroke="var(--border)" stroke-dasharray="3 3" />
                        <line x1="${paddingX}" y1="${svgHeight - paddingY}" x2="${svgWidth - paddingX}" y2="${svgHeight - paddingY}" stroke="var(--border)" />

                        <!-- Líneas de datos -->
                        ${renderizarLineaYMarcadores(coordsTotal, 'var(--primary)', filtroLineaTotal, 'total')}
                        ${renderizarLineaYMarcadores(coordsPresencial, 'var(--emerald-600)', filtroLineaPresencial, 'presencial')}
                        ${renderizarLineaYMarcadores(coordsZoom, 'var(--amber-600)', filtroLineaZoom, 'zoom')}
                    </svg>

                    <!-- Etiquetas de Fechas en el Eje X -->
                    <div class="chart-labels">
                        ${datosHistoricos.map(d => `<span>${formatearFechaCorta(d.fecha)}</span>`).join('')}
                    </div>
                </article>
            </div>

            <!-- 3. Tarjetas de Resumen (KPIs) -->
            <div class="attendance-metrics">
                <article class="card">
                    <span class="metric-symbol average">👥</span>
                    <div>
                        <small>PROMEDIO GENERAL</small>
                        <strong>${promedioMensual} personas</strong>
                        <p>Últimas ${datosHistoricos.length} reuniones analizadas</p>
                    </div>
                </article>
                <article class="card">
                    <span class="metric-symbol high">📈</span>
                    <div>
                        <small>MAYOR ASISTENCIA</small>
                        <strong>${mayorRegistro.total} personas</strong>
                        <p>${formatearFechaLarga(mayorRegistro.fecha)}</p>
                    </div>
                </article>
                <article class="card">
                    <span class="metric-symbol low">📉</span>
                    <div>
                        <small>MENOR ASISTENCIA</small>
                        <strong>${menorRegistro.total} personas</strong>
                        <p>${formatearFechaLarga(menorRegistro.fecha)}</p>
                    </div>
                </article>
            </div>
        </div>
    `;
}

/**
 * Alterna la visibilidad de una línea en la gráfica
 */
function alternarFiltroLinea(linea) {
    if (linea === 'total') filtroLineaTotal = !filtroLineaTotal;
    if (linea === 'presencial') filtroLineaPresencial = !filtroLineaPresencial;
    if (linea === 'zoom') filtroLineaZoom = !filtroLineaZoom;

    const contenedor = document.getElementById('contenedorVistaAsistencia');
    if (contenedor) renderizarVistaAnalitica(contenedor);
}

// ==========================================================================
// VISTA 3: DATOS (Tabla Histórica con Fecha, Presencial, Zoom y Total)
// ==========================================================================
let filtroPeriodoHistorico = 'todos';

function renderizarVistaDatos(contenedor) {
    const fechas = Object.keys(baseDatosAsistenciasPorFecha).sort().reverse();
    
    // Obtener años únicos para el selector
    const anios = [...new Set(fechas.map(f => f.substring(0, 4)))];

    const registrosFiltrados = fechas.filter(f => {
        if (filtroPeriodoHistorico === 'todos') return true;
        return f.startsWith(filtroPeriodoHistorico);
    });

    contenedor.innerHTML = `
        <section class="card attendance-history">
            <div class="history-heading">
                <div>
                    <h2>Registro Histórico de Asistencias</h2>
                    <p>Consulta, carga o exporta el detalle completo de todas las reuniones registradas.</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <select onchange="alCambiarFiltroPeriodo(this.value)" aria-label="Filtrar por año">
                        <option value="todos" ${filtroPeriodoHistorico === 'todos' ? 'selected' : ''}>Todos los años</option>
                        ${anios.map(a => `<option value="${a}" ${filtroPeriodoHistorico === a ? 'selected' : ''}>Año ${a}</option>`).join('')}
                    </select>
                    <button class="btn btn-outline-secondary btn-sm fw-bold" onclick="exportarAsistenciaCSV()">
                        📥 Exportar Excel/CSV
                    </button>
                </div>
            </div>

            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>FECHA</th>
                            <th>PRESENCIAL</th>
                            <th>ZOOM</th>
                            <th>TOTAL</th>
                            <th>ESTADO</th>
                            <th style="text-align: right;">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${registrosFiltrados.length === 0 ? `
                            <tr>
                                <td colspan="6" class="text-center text-muted py-4">
                                    No se encontraron registros de asistencia para este periodo.
                                </td>
                            </tr>
                        ` : registrosFiltrados.map(f => {
                            const r = baseDatosAsistenciasPorFecha[f];
                            const presencial = parseInt(r.presencial ?? r._presencial ?? ((r.occupied ? r.occupied.length : 0) + (r.standing ?? 0)));
                            const zoom = parseInt(r.zoom ?? r._zoom ?? r.zoomVal ?? 0);
                            const total = parseInt(r.total ?? r._total ?? (presencial + zoom));
                            const [y, m, d] = f.split('-');
                            const fechaFmt = `${d}/${m}/${y}`;

                            return `
                                <tr>
                                    <td>
                                        <strong>${fechaFmt}</strong>
                                    </td>
                                    <td>${presencial}</td>
                                    <td>${zoom}</td>
                                    <td><strong class="text-primary">${total}</strong></td>
                                    <td><span class="badge bg-success">GUARDADO</span></td>
                                    <td style="text-align: right;">
                                        <button class="btn btn-sm btn-outline-primary py-0 px-2 fw-bold me-1" 
                                                onclick="cargarFechaEnPlano('${f}')" title="Cargar fecha en plano para ver o editar">
                                            🔍 Cargar
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger py-0 px-2 fw-bold" 
                                                onclick="eliminarFechaAsistencia('${f}')" title="Eliminar este registro">
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

function alCambiarFiltroPeriodo(nuevoPeriodo) {
    filtroPeriodoHistorico = nuevoPeriodo;
    const contenedor = document.getElementById('contenedorVistaAsistencia');
    if (contenedor) renderizarVistaDatos(contenedor);
}

/**
 * Carga un registro del historial directamente al plano de butacas
 */
function cargarFechaEnPlano(fecha) {
    cargarDatosFechaActual(fecha);
    cambiarPestanaAsistencia('registro');
    mostrarToastNotificacion(`📅 Asistencia del ${fecha.split('-').reverse().join('/')} cargada en el plano`);
}

/**
 * Elimina un registro con confirmación
 */
function eliminarFechaAsistencia(fecha) {
    if (confirm(`¿Estás seguro de que deseas eliminar el registro de asistencia del ${fecha}?`)) {
        delete baseDatosAsistenciasPorFecha[fecha];
        localStorage.setItem('bd_asistencia_fechas_v1', JSON.stringify(baseDatosAsistenciasPorFecha));
        const contenedor = document.getElementById('contenedorVistaAsistencia');
        if (contenedor) renderizarVistaDatos(contenedor);
        mostrarToastNotificacion(`🗑️ Registro de ${fecha} eliminado`);
    }
}

/**
 * Exporta el historial de asistencias a un archivo CSV estructurado
 */
function exportarAsistenciaCSV() {
    const fechas = Object.keys(baseDatosAsistenciasPorFecha).sort();
    if (fechas.length === 0) {
        alert("No hay registros para exportar.");
        return;
    }

    let csv = "Fecha,Presencial,Zoom,Total\n";
    fechas.forEach(f => {
        const r = baseDatosAsistenciasPorFecha[f];
        const presencial = parseInt(r.presencial ?? r._presencial ?? 0);
        const zoom = parseInt(r.zoom ?? r._zoom ?? 0);
        const total = parseInt(r.total ?? r._total ?? (presencial + zoom));
        csv += `${f},${presencial},${zoom},${total}\n`;
    });

    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asistencia_congregacion_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}