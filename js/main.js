window.onload = () => {
    if (localStorage.getItem('app_sidebar_collapsed') === 'true') {
        document.body.classList.add('sidebar-collapsed');
    }
    cargarModulo('inicio');
    actualizarIconoTemaTop();
};

function alternarModoOscuroTop() {
    let activo = !document.body.classList.contains('modo-oscuro');
    aplicarEstiloModoOscuro(activo);
    localStorage.setItem('app_modo_oscuro', activo);
    let check = document.getElementById('checkModoOscuro');
    if (check) check.checked = activo;
    actualizarIconoTemaTop();
}

function actualizarIconoTemaTop() {
    let icon = document.getElementById('iconoTemaTop');
    if (icon) {
        icon.textContent = document.body.classList.contains('modo-oscuro') ? '☀️' : '🌙';
    }
}

function toggleSidebar(forceState) {
    const sidebar = document.getElementById('sidebarMenu');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;

    let isActive;
    if (forceState !== undefined) {
        isActive = forceState;
        if (forceState) {
            sidebar.classList.add('active');
            if (backdrop) backdrop.classList.add('active');
            document.body.classList.add('sidebar-open');
        } else {
            sidebar.classList.remove('active');
            if (backdrop) backdrop.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    } else {
        isActive = sidebar.classList.toggle('active');
        if (backdrop) backdrop.classList.toggle('active', isActive);
        document.body.classList.toggle('sidebar-open', isActive);
    }
}

function toggleSidebarDesktop() {
    let isCollapsed = document.body.classList.toggle('sidebar-collapsed');
    localStorage.setItem('app_sidebar_collapsed', isCollapsed);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleSidebar(false);
});

function cargarModulo(modulo) {
    toggleSidebar(false);
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    let activeLink = document.getElementById(`nav-link-${modulo}`);
    if (activeLink) activeLink.classList.add('active');

    requestAnimationFrame(() => {
        ejecutarCargaModulo(modulo);
    });
}

function ejecutarCargaModulo(modulo) {
    const areaTabla = document.getElementById('area-tabla');

    if (modulo === 'inicio') {
        const hermanos = obtenerHermanos();
        
        // 1. Total de publicadores (todos los registros activos)
        const totalPublicadores = hermanos.length;

        // 2. Publicadores bautizados (incluye precursores, ancianos, siervos ministeriales o bautizados)
        const publicadoresBautizados = hermanos.filter(h => {
            let esBautizado = h.bautizado === true || String(h.bautizado).toLowerCase() === 'sí' || String(h.bautizado).toLowerCase() === 'si';
            let tienePrivilegioEspecial = h.cargo && h.cargo !== 'Ninguno' && h.cargo !== 'Publicador' && !h.cargo.includes('No Bautizado');
            let esPrecursor = h.precursorado && h.precursorado !== 'Ninguno';
            return esBautizado || tienePrivilegioEspecial || esPrecursor;
        }).length;

        const precursoresRegulares = hermanos.filter(h => h.precursorado === 'Precursor Regular').length;
        const precursoresAuxiliares = hermanos.filter(h => h.precursorado === 'Precursor Auxiliar').length;

        // 3. Recopilar tareas pendientes vinculadas al calendario (Asignaciones, Territorios y Cierre de Mes)
        let listaTareas = [];

        let dbAsig = JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [];
        let hoyIso = new Date().toISOString().split('T')[0];
        
        dbAsig.forEach(a => {
            if (a.fecha >= hoyIso && a.cumplio === "pendiente") {
                listaTareas.push({
                    fecha: a.fecha,
                    prioridad: "alta",
                    texto: `📅 Asignación (${a.tipo}) - Estudiante: ${typeof invertirNombre === 'function' ? invertirNombre(a.estudiante) : a.estudiante}`
                });
            }
        });

        let dbTerr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
        dbTerr.forEach(t => {
            if (t.responsable && t.fecha) {
                listaTareas.push({
                    fecha: t.fecha,
                    prioridad: "media",
                    texto: `🚗 Tarjeta Territorio N° ${t.num} en la calle (Responsable: ${typeof invertirNombre === 'function' ? invertirNombre(t.responsable) : t.responsable})`
                });
            }
        });

        let fechaActualObj = new Date();
        let ultimoDiaMes = new Date(fechaActualObj.getFullYear(), fechaActualObj.getMonth() + 1, 0);
        let diasRestantesCierre = ultimoDiaMes.getDate() - fechaActualObj.getDate();
        
        if (diasRestantesCierre <= 5) {
            let anioMesStr = `${fechaActualObj.getFullYear()}-${String(fechaActualObj.getMonth()+1).padStart(2,'0')}-${String(ultimoDiaMes.getDate()).padStart(2,'0')}`;
            listaTareas.unshift({
                fecha: anioMesStr,
                prioridad: "urgente",
                texto: `⏰ Cierre de Mes: Quedan ${diasRestantesCierre} días para la entrega de informes de servicio.`
            });
        }

        listaTareas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        let tareasPendientesHtml = "";
        if (listaTareas.length === 0) {
            tareasPendientesHtml = `<li class="list-group-item text-muted text-center py-3">No hay tareas pendientes en el calendario próximo.</li>`;
        } else {
            listaTareas.forEach(t => {
                let estiloBorde = t.prioridad === "urgente" ? "border-danger bg-light" : (t.prioridad === "alta" ? "border-warning" : "border-secondary");
                tareasPendientesHtml += `
                    <li class="list-group-item d-flex justify-content-between align-items-center ${estiloBorde} mb-2 border rounded shadow-sm">
                        <div>
                            <span class="fw-bold d-block text-dark">${t.texto}</span>
                            <small class="text-muted">Fecha del evento / plazo: ${t.fecha}</small>
                        </div>
                        <span class="badge bg-dark">Pendiente</span>
                    </li>
                `;
            });
        }

        areaTabla.innerHTML = `
            <div class="p-4 p-md-5 bg-light border rounded shadow-sm mb-4">
                <h1 class="mb-2">Bienvenido Jhans</h1>
                <p class="lead text-muted mb-4">Congregación Paraíso de Carabayllo</p>
                <div class="row g-3">
                    <div class="col-12 col-md-3">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <h6 class="text-muted">Total Publicadores</h6>
                                <div class="display-5 fw-bold text-dark">${totalPublicadores}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <h6 class="text-muted">Publicadores Bautizados</h6>
                                <div class="display-5 fw-bold text-dark">${publicadoresBautizados}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <h6 class="text-muted">Precursores Regulares</h6>
                                <div class="display-5 fw-bold">${precursoresRegulares}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-3">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-body text-center">
                                <h6 class="text-muted">Precursores Auxiliares</h6>
                                <div class="display-5 fw-bold">${precursoresAuxiliares}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECCIÓN DE CALENDARIO Y TAREAS PENDIENTES -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="card shadow-sm p-4 bg-white border">
                        <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                            <h5 class="fw-bold text-dark m-0">📌 Tareas Pendientes y Vencimientos del Calendario</h5>
                            <span class="badge bg-primary">Sincronizado con Asignaciones y Territorios</span>
                        </div>
                        <ul class="list-group list-group-flush" style="max-height: 400px; overflow-y: auto;">
                            ${tareasPendientesHtml}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } 
    
    else if (modulo === 'asignaciones') {
        areaTabla.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                    <h3 class="mb-1 fw-bold header-title-primary">📅 Gestor de Asignaciones</h3>
                    <p class="text-muted small mb-0">Programa semanal de Vida y Ministerio Cristianos, estado de publicadores y planeación</p>
                </div>
                <div class="d-flex align-items-center gap-2 bg-white p-2 rounded-pill shadow-sm border">
                    <label class="fw-bold text-muted mb-0 ps-2 small">Año:</label>
                    <select id="selectorAnioAsignaciones" class="form-select form-select-sm fw-bold border-0 bg-transparent" style="width: 85px;" onchange="cambiarAnioAsignaciones()"></select>
                </div>
            </div>

            <ul class="nav nav-pills justify-content-center mb-4 shadow-sm" id="pills-tab" role="tablist">
                <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#modulo1">📅 Programa General</button></li>
                <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#modulo2">👥 Disponibilidad y Grupos</button></li>
                <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#modulo-planificacion" onclick="renderizarPlanificacionMeses()">📂 Planificación Anual</button></li>
                <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#modulo3">🕒 Historial Personal</button></li>
            </ul>

            <div class="tab-content">
                <!-- PESTAÑA 1: PROGRAMA GENERAL -->
                <div class="tab-pane fade show active" id="modulo1">
                    <div class="row justify-content-center mb-4">
                        <div class="col-md-6 text-center">
                            <select id="selectorMesPrograma" class="form-select select-mes-gigante text-center" onchange="renderizarProgramaMensual()">
                                <option value="">-- No hay meses registrados --</option>
                            </select>
                        </div>
                    </div>
                    <div id="contenedorPrograma"></div>
                </div>

                <!-- PESTAÑA 2: VISTA GENERAL -->
                <div class="tab-pane fade" id="modulo2">
                    <div class="row" id="contenedorGrupos"></div>
                </div>

                <!-- PESTAÑA 3: PLANIFICACIÓN (12 TABLAS MENSUALES CON DATOS DE EXCEL) -->
                <div class="tab-pane fade" id="modulo-planificacion">
                    <div id="contenedorPlanificacionMeses"></div>
                </div>

                <!-- PESTAÑA 4: HISTORIAL PERSONAL -->
                <div class="tab-pane fade" id="modulo3">
                    <div class="row">
                        <div class="col-md-12 mb-4">
                            <div class="card p-4 shadow-sm border-0 rounded-4">
                                <label class="form-label fw-bold text-dark mb-2">Seleccionar Hermano para ver Historial Completo:</label>
                                <select id="selectHistorial" class="form-select rounded-pill px-3 py-2 fw-semibold" onchange="mostrarHistorialAsignaciones()">
                                    <option value="">-- Buscar hermano --</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card p-3">
                                <h6 class="text-center text-muted fw-bold mb-3">📋 Trayectoria de Asignaciones y Cumplimiento</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Rol</th>
                                                <th>Tipo de Asignación</th>
                                                <th>Compañero</th>
                                                <th class="text-center">Estado / Cumplimiento</th>
                                                <th class="text-center">Intervalo</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaHistorial">
                                            <tr><td colspan="6" class="text-center text-muted">Seleccione un hermano</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL PARA AGREGAR / EDITAR ASIGNACIÓN RÁPIDA -->
            <div class="modal fade" id="modalAgregadoRapido" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="tituloModal">Agregar a la Semana</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="formAsignacionRapida" onsubmit="guardarAsignacionRapida(event)">
                         <input type="hidden" id="modalFechaMartes">
                         <input type="hidden" id="modalEditId">
                         
                         <div class="row bg-light p-3 rounded mb-3 border">
                             <div class="col-md-4 mb-2">
                                 <label class="form-label text-muted fw-bold">N° Parte</label>
                                 <input type="number" name="numeroParte" class="form-control" min="3" max="9" required>
                             </div>
                             <div class="col-md-8 mb-2">
                                 <label class="form-label text-muted fw-bold">Tipo de Asignación</label>
                                 <select name="tipoAsignacion" class="form-select" required>
                                     <option value="Lectura de la Biblia">Lectura de la Biblia</option>
                                     <option value="Empiece conversaciones">Empiece conversaciones</option>
                                     <option value="Haga revisitas">Haga revisitas</option>
                                     <option value="Haga discípulos">Haga discípulos</option>
                                     <option value="Explique sus creencias (Escenificación)">Explique sus creencias (Escenificación)</option>
                                     <option value="Explique sus creencias (Discurso)">Explique sus creencias (Discurso)</option>
                                     <option value="Discurso">Discurso</option>
                                 </select>
                             </div>
                         </div>
                         
                         <div class="mb-3">
                             <label class="form-label text-muted fw-bold">Estudiante / Asignado</label>
                             <input type="text" name="nombreEstudiante" class="form-control" list="listaHermanosGlobal" required placeholder="Apellidos, Nombres">
                         </div>

                         <div class="mb-2">
                             <label class="form-label text-muted fw-bold">Ayudante (Opcional)</label>
                             <input type="text" name="nombreAyudante" class="form-control" list="listaHermanosGlobal" placeholder="Apellidos, Nombres">
                         </div>
                         <datalist id="listaHermanosGlobal"></datalist>

                         <button type="submit" class="btn btn-primary w-100 py-2 mt-3" id="btnGuardarModal">Guardar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <!-- MODAL PARA REGISTRAR CUMPLIMIENTO INDIVIDUAL (OBJETIVO DE TIRO) -->
            <div class="modal fade" id="modalControlCumplimiento" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title">🎯 Control de Cumplimiento de Asignación</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <input type="hidden" id="modalCumplimientoIdAsignacion">
                    <div id="contenedorListaCumplimiento"></div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" onclick="guardarControlCumplimientoModal()">Guardar Cambios</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        inicializarModuloAsignaciones();
    }
    else if (modulo === 'informes') {
        areaTabla.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h3 class="mb-0 text-primary fw-bold" style="color: #4a6da7;">Gestor de Servicio - Informes</h3>
            </div>

            <ul class="nav nav-pills justify-content-center mb-4 shadow-sm p-2 bg-white rounded" id="pills-tab" role="tablist">
                <li class="nav-item"><button class="nav-link active" data-bs-toggle="pill" data-bs-target="#lista-serv">📊 Registros y Grupos</button></li>
                <li class="nav-item"><button class="nav-link" data-bs-toggle="pill" data-bs-target="#graficos-serv" onclick="inicializarGraficosServicio()">📈 Análisis Gráfico</button></li>
            </ul>

            <div class="tab-content">
                <!-- PESTAÑA 1: REGISTROS POR GRUPO, MES Y AÑO -->
                <div class="tab-pane fade show active" id="lista-serv">
                    <div class="card p-3 shadow-sm bg-white border-0 mb-3">
                        <div class="row g-3 align-items-end">
                            <div class="col-12 col-md-4">
                                <label class="fw-bold text-muted mb-1">Seleccionar Grupo:</label>
                                <select id="filtroGrupoInforme" class="form-select form-select-sm" onchange="actualizarTablaServicio()">
                                    <option value="todos">Todos los grupos</option>
                                    <option value="1">Grupo 1</option>
                                    <option value="2">Grupo 2</option>
                                    <option value="3">Grupo 3</option>
                                    <option value="4">Grupo 4</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="fw-bold text-muted mb-1">Mes:</label>
                                <select id="filtroMesInforme" class="form-select form-select-sm" onchange="actualizarTablaServicio()">
                                    <option value="Enero">Enero</option><option value="Febrero">Febrero</option>
                                    <option value="Marzo">Marzo</option><option value="Abril">Abril</option>
                                    <option value="Mayo">Mayo</option><option value="Junio">Junio</option>
                                    <option value="Julio">Julio</option><option value="Agosto">Agosto</option>
                                    <option value="Septiembre">Septiembre</option><option value="Octubre">Octubre</option>
                                    <option value="Noviembre">Noviembre</option><option value="Diciembre">Diciembre</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="fw-bold text-muted mb-1">Año:</label>
                                <select id="filtroAnioInforme" class="form-select form-select-sm" onchange="actualizarTablaServicio()"></select>
                            </div>
                        </div>
                    </div>

                    <div class="card p-3 shadow-sm bg-white border-0">
                        <h5 class="m-0 text-muted mb-3">Listado de Hermanos</h5>
                        <div class="table-responsive">
                            <table class="table align-middle table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precursorado</th>
                                        <th class="text-center">Horas</th>
                                        <th class="text-center">Estudios</th>
                                        <th class="text-center">Estado</th>
                                        <th class="text-end">Acción</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaCuerpoServicio"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- PESTAÑA 2: GRÁFICOS -->
                <div class="tab-pane fade" id="graficos-serv">
                    <div class="row">
                        <!-- SELECTOR DE HERMANO Y AÑO -->
                        <div class="col-md-12 mb-4">
                            <div class="card p-3 shadow-sm bg-white border-0">
                                <div class="row align-items-end">
                                    <div class="col-md-8">
                                        <label class="form-label fw-bold text-primary">Seleccionar Hermano para Analizar:</label>
                                        <select id="selectHermanoGrafico" class="form-select border-primary" onchange="renderizarGraficosServicio()">
                                            <option value="">-- Elegir de la base de datos --</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 mt-3 mt-md-0">
                                        <label class="form-label fw-bold text-muted">Filtrar por Año:</label>
                                        <select id="filtroAnioAnalisis" class="form-select" onchange="renderizarGraficosServicio()"></select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 1. TARJETAS DE INDICADORES (PROMEDIO DE HORAS Y ESTUDIOS) -->
                        <div class="col-12 mb-4">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="card border-0 shadow-sm p-3 text-center bg-light">
                                        <h6 class="text-muted mb-1">Promedio de Horas / Mes</h6>
                                        <h3 class="fw-bold text-primary mb-0" id="kpiPromedioHoras">0.0</h3>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card border-0 shadow-sm p-3 text-center bg-light">
                                        <h6 class="text-muted mb-1">Promedio de Estudios / Mes</h6>
                                        <h3 class="fw-bold text-success mb-0" id="kpiPromedioEstudios">0.0</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. GRÁFICO DE BARRAS COMBINADO (HORAS Y ESTUDIOS) -->
                        <div class="col-lg-7 mb-4">
                            <div class="card p-3 border-0 shadow-sm h-100">
                                <h6 class="text-center text-muted fw-bold mb-3">📊 Horas y Estudios Mensuales</h6>
                                <div style="position: relative; height: 300px; width: 100%;"><canvas id="barChartHorasEstudios"></canvas></div>
                            </div>
                        </div>

                        <!-- 3. GRÁFICO DE LÍNEAS (EVOLUCIÓN DE PRIVILEGIOS) -->
                        <div class="col-lg-5 mb-4">
                            <div class="card p-3 border-0 shadow-sm h-100">
                                <h6 class="text-center text-muted fw-bold mb-3">📈 Evolución de Privilegio</h6>
                                <div style="position: relative; height: 300px; width: 100%;"><canvas id="lineChartPrivilegio"></canvas></div>
                            </div>
                        </div>

                        <!-- TABLA DE DETALLE MENSUAL OPCIONAL ABAJO -->
                        <div class="col-md-12 mb-4">
                            <div class="card p-3 border-0 shadow-sm">
                                <h6 class="text-center text-muted fw-bold mb-3">📋 Detalle Mensual</h6>
                                <div class="table-responsive">
                                    <table class="table table-sm align-middle">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Mes</th>
                                                <th>Nombramiento</th>
                                                <th class="text-center">Horas</th>
                                                <th class="text-center">Estudios</th>
                                                <th class="text-center">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaAnalisisCuerpo">
                                            <tr><td colspan="5" class="text-center text-muted">Seleccione un hermano y año para ver sus reportes</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL PARA REGISTRAR / EDITAR INFORME -->
            <div class="modal fade" id="modalInformeServicio" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalInformeTitulo">Registrar Informe de Servicio</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="modalNombreHermano">
                            
                            <p class="fw-bold text-primary mb-3" id="modalLabelHermano"></p>
                            
                            <div class="mb-3">
                                <label class="form-label text-muted fw-bold">Tipo / Precursorado para este mes</label>
                                <select id="modalTipoHermano" class="form-select">
                                    <option value="Publicador">Publicador</option>
                                    <option value="Precursor Auxiliar">Precursor Auxiliar</option>
                                    <option value="Precursor Regular">Precursor Regular</option>
                                </select>
                            </div>

                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label class="form-label text-muted fw-bold">Horas</label>
                                    <input type="number" id="modalHoras" class="form-control" value="0" min="0">
                                </div>
                                <div class="col-6 mb-3">
                                    <label class="form-label text-muted fw-bold">Estudios</label>
                                    <input type="number" id="modalEstudios" class="form-control" value="0" min="0">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button class="btn btn-primary" onclick="guardarInformeModal()">Guardar Informe</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        inicializarModuloServicio();
    }
    else if (modulo === 'asistencia') {
        inicializarModuloAsistencia(areaTabla);
    }
    else if (modulo === 'territorios') {
        areaTabla.innerHTML = `
            <div class="card p-4 shadow-sm bg-white mb-4">
                <div class="border-bottom pb-3 mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <h4 class="fw-bold" style="color: #2c3e50; margin: 0;">🗺️ Sistema de Gestión de Territorios</h4>
                        <small class="text-muted">Congregación Paraíso de Carabayllo — Módulos Independientes</small>
                    </div>
                </div>

                <ul class="nav nav-pills justify-content-center mb-4 bg-light p-2 rounded border shadow-sm" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-control-tab" data-bs-toggle="pill" data-bs-target="#moduloControl" type="button" role="tab" aria-controls="moduloControl" aria-selected="true">🎮 Control de Tarjetas</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-info-tab" data-bs-toggle="pill" data-bs-target="#moduloInfo" type="button" role="tab" aria-controls="moduloInfo" aria-selected="false">📋 Información Territorios</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-resumen-tab" data-bs-toggle="pill" data-bs-target="#moduloResumen" type="button" role="tab" aria-controls="moduloResumen" aria-selected="false" onclick="inicializarGraficosTerritorios()">📊 Resumen Territorio</button>
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    
                    <div class="tab-pane fade show active" id="moduloControl" role="tabpanel" aria-labelledby="pills-control-tab">
                        <div class="row">
                            <div class="col-lg-6 border-end">
                                <h6 class="fw-bold text-muted mb-3">📦 Casillero General (Tarretero)</h6>
                                <div class="table-responsive border rounded" style="max-height: 520px; overflow-y: auto;">
                                    <table class="table table-sm table-hover table-bordered align-middle mb-0">
                                        <thead class="table-light position-sticky" style="top: 0; z-index: 2;">
                                            <tr>
                                                <th class="text-center" style="width: 120px;">Territorio</th>
                                                <th>Puntos de Encuentro</th>
                                                <th class="text-center" style="width: 120px;">Estado</th>
                                                <th class="text-center" style="width: 100px;">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaControlTodos"></tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="col-lg-6 mt-4 mt-lg-0">
                                <h6 class="fw-bold text-danger mb-3">🚗 Tarjetas en la Calle (Asignadas)</h6>
                                <div class="table-responsive border rounded" style="max-height: 520px; overflow-y: auto;">
                                    <table class="table table-sm table-hover table-bordered align-middle mb-0">
                                        <thead class="table-light position-sticky" style="top: 0; z-index: 2;">
                                            <tr>
                                                <th class="text-center" style="width: 120px;">Territorio</th>
                                                <th>Hermano Responsable</th>
                                                <th class="text-center" style="width: 120px;">Fecha Asig.</th>
                                                <th class="text-center" style="width: 100px;">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaControlCalle"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="moduloInfo" role="tabpanel" aria-labelledby="pills-info-tab">
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
                            <h6 class="fw-bold text-muted m-0">🗃️ Registro General y Observaciones de No Visita</h6>
                            <div class="d-flex gap-2 w-100 w-md-auto" style="max-width: 500px;">
                                <input type="text" id="buscadorInfo" class="form-control" placeholder="🔍 Buscar territorio o punto..." oninput="filtrarTablaInfo()">
                                <button class="btn btn-primary text-nowrap" onclick="abrirModalNuevoTerritorio()">+ Agregar Territorio</button>
                            </div>
                        </div>

                        <div class="table-responsive border rounded" style="max-height: 520px; overflow-y: auto;">
                            <table class="table table-sm table-hover table-bordered align-middle mb-0">
                                <thead class="table-light position-sticky" style="top: 0; z-index: 2;">
                                    <tr>
                                        <th class="text-center" style="width: 120px;">Territorio</th>
                                        <th>Puntos de Encuentro</th>
                                        <th class="text-center" style="width: 130px;">Asignado (Veces)</th>
                                        <th>Observaciones (Casas que no desean ser visitadas)</th>
                                        <th class="text-center" style="width: 90px;">Acción</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaInfoMaestra"></tbody>
                            </table>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="moduloResumen" role="tabpanel" aria-labelledby="pills-resumen-tab">
                        
                        <!-- BARRA DE FILTROS GLOBALES (DENTRO DE LA PESTAÑA RESUMEN) -->
                        <div class="bg-light p-3 rounded border mb-4 shadow-sm">
                            <div class="row align-items-center g-3">
                                <div class="col-md-4">
                                    <label class="form-label small fw-bold text-secondary mb-1">Filtrar por Territorio (Zoom):</label>
                                    <select id="filtroGlobalTerritorio" class="form-select form-select-sm fw-bold" onchange="aplicarFiltrosGlobalesYRenderizar()"></select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label small fw-bold text-secondary mb-1">Filtrar por Mes:</label>
                                    <select id="filtroGlobalMes" class="form-select form-select-sm fw-bold" onchange="aplicarFiltrosGlobalesYRenderizar()"></select>
                                </div>
                                <div class="col-md-4">
                                    <label class="form-label small fw-bold text-secondary mb-1">Filtrar por Año:</label>
                                    <select id="filtroGlobalAnio" class="form-select form-select-sm fw-bold" onchange="aplicarFiltrosGlobalesYRenderizar()"></select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 mb-4">
                                <div class="card p-3 bg-white shadow-sm border">
                                    <h6 class="fw-bold text-muted text-center mb-3">📊 Vista General del Tarretero</h6>
                                    <div style="position: relative; height: 250px; width: 100%;">
                                        <canvas id="chartGlobalTerritorios"></canvas>
                                    </div>
                                    <div class="text-center mt-3 small text-secondary" id="leyendaGlobalTexto"></div>
                                </div>
                            </div>
                            
                            <div class="col-md-12 mb-4">
                                <div class="card p-3 bg-white shadow-sm border">
                                    <h6 class="fw-bold text-muted text-center mb-2">📈 Gráfico Comparativo y Zoom de Uso</h6>
                                    <div style="position: relative; height: 350px; width: 100%;" class="mb-3">
                                        <canvas id="chartIndividualTerritorio"></canvas>
                                    </div>
                                    <div id="contenedorTablaFechasAsignadas" class="px-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- MODAL ASIGNAR TERRITORIO -->
            <div class="modal fade" id="modalAsignarTerritorio" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title">Asignar Tarjeta de Territorio</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="formAsignarTerritorio" onsubmit="guardarSalidaTerritorio(event)">
                         <input type="hidden" id="modalTerritorioNum">
                         <div class="mb-3 bg-light p-3 border rounded fw-bold text-center text-primary" id="modalTerritorioTexto"></div>
                         <div class="mb-3">
                             <label class="form-label fw-bold text-muted">Hermano Responsable</label>
                             <input type="text" id="inputResponsableTerritorio" class="form-control" list="listaHermanosGlobal" required placeholder="Apellidos, Nombres">
                         </div>
                         <div class="mb-3">
                             <label class="form-label fw-bold text-muted">Fecha de Entrega</label>
                             <input type="date" id="inputFechaTerritorio" class="form-control" required>
                         </div>
                         <button type="submit" class="btn btn-primary w-100 py-2">Confirmar Salida</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL NUEVO TERRITORIO -->
            <div class="modal fade" id="modalNuevoTerritorio" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title">Añadir Nueva Tarjeta</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="formNuevoTerritorio" onsubmit="guardarNuevoTerritorio(event)">
                         <div class="mb-3">
                             <label class="form-label fw-bold text-muted">Número de Territorio</label>
                             <input type="number" id="inputNuevoNum" class="form-control" readonly>
                         </div>
                         <div class="mb-3">
                             <div class="d-flex justify-content-between align-items-center mb-1">
                                 <label class="form-label fw-bold text-muted m-0">Puntos de Encuentro</label>
                                 <button type="button" class="btn btn-sm btn-outline-primary py-0" onclick="agregarPuntoEncuentroInput()">+ Añadir Punto</button>
                             </div>
                             <div id="contenedorPuntosDinamicos">
                                 <div class="input-group mb-2">
                                     <input type="text" class="form-control input-punto-encuentro" required placeholder="Ej. Esquina Av. Paraíso con Mz. C">
                                     <button type="button" class="btn btn-outline-danger" onclick="this.parentElement.remove()">✕</button>
                                 </div>
                             </div>
                         </div>
                         <div class="mb-3">
                             <label class="form-label fw-bold text-muted">Observaciones de No Visita (Opcional)</label>
                             <textarea id="inputNuevoObs" class="form-control" rows="2" placeholder="Ej. Mz. B Lote 5 no desean visitas."></textarea>
                         </div>
                         <button type="submit" class="btn btn-primary w-100 py-2">Dar de Alta Territorio</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL EDITAR TERRITORIO -->
            <div class="modal fade" id="modalEditarTerritorio" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title">✏️ Editar Información de Tarjeta</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form id="formEditarTerritorio" onsubmit="guardarEdicionTerritorio(event)">
                         <input type="hidden" id="editTerritorioNum">
                         <div class="mb-3">
                             <div class="d-flex justify-content-between align-items-center mb-1">
                                 <label class="form-label fw-bold text-muted m-0">Puntos de Encuentro</label>
                                 <button type="button" class="btn btn-sm btn-outline-primary py-0" onclick="editarAgregarPuntoInput()">+ Añadir Punto</button>
                             </div>
                             <div id="editContenedorPuntos"></div>
                         </div>
                         <div class="mb-3">
                             <label class="form-label fw-bold text-muted">Observaciones (Casas que no desean ser visitadas)</label>
                             <textarea id="editObservaciones" class="form-control" rows="3" placeholder="Ninguna observación registrada"></textarea>
                         </div>
                         <button type="submit" class="btn btn-primary w-100 py-2">Guardar Cambios</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        `;
        inicializarModuloTerritorios();
    }
    else if (modulo === 'hermanos') {
        areaTabla.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3 gap-2 flex-wrap">
                <h3 class="mb-0" id="titulo-hermanos">Congregación Paraíso de Carabayllo</h3>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary btn-sm" onclick="exportarTablaExcel()">📊 Excel</button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="limpiarFiltrosTabla()">Limpiar filtros</button>
                    <button class="btn btn-success" onclick="abrirEdicion(-1)">+ Nuevo</button>
                </div>
            </div>

            <table class="table table-striped table-bordered" id="tabla-hermanos">
                <thead>
                    <tr>
                        <th>
                            <div class="column-header">
                                <span>Nombre</span>
                                <button class="column-toggle" type="button" onclick="toggleColumnMenu('menu-nombre')">☰</button>
                            </div>
                            <div id="menu-nombre" class="column-menu">
                                <select id="orden-nombre" class="form-select form-select-sm mb-2" onchange="aplicarFiltrosTabla()">
                                    <option value="">Sin orden</option>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                                </select>
                            </div>
                        </th>
                        <th>
                            <div class="column-header">
                                <span>Cargo</span>
                                <button class="column-toggle" type="button" onclick="toggleColumnMenu('menu-privilegio')">☰</button>
                            </div>
                            <div id="menu-privilegio" class="column-menu">
                                <select id="filtro-privilegio" class="form-select form-select-sm" onchange="aplicarFiltrosTabla()">
                                    <option value="">Todos</option>
                                </select>
                            </div>
                        </th>
                        <th>
                            <div class="column-header">
                                <span>Precursorado</span>
                                <button class="column-toggle" type="button" onclick="toggleColumnMenu('menu-precursorado')">☰</button>
                            </div>
                            <div id="menu-precursorado" class="column-menu">
                                <select id="filtro-precursorado" class="form-select form-select-sm" onchange="aplicarFiltrosTabla()">
                                    <option value="">Todos</option>
                                </select>
                            </div>
                        </th>
                        <th>
                            <div class="column-header">
                                <span>Grupo</span>
                                <button class="column-toggle" type="button" onclick="toggleColumnMenu('menu-grupo')">☰</button>
                            </div>
                            <div id="menu-grupo" class="column-menu">
                                <select id="filtro-grupo" class="form-select form-select-sm" onchange="aplicarFiltrosTabla()">
                                    <option value="">Todos</option>
                                </select>
                            </div>
                        </th>
                        <th>
                            <div class="column-header">
                                <span>Género</span>
                                <button class="column-toggle" type="button" onclick="toggleColumnMenu('menu-genero')">☰</button>
                            </div>
                            <div id="menu-genero" class="column-menu">
                                <select id="filtro-genero" class="form-select form-select-sm" onchange="aplicarFiltrosTabla()">
                                    <option value="">Todos</option>
                                </select>
                            </div>
                        </th>
                        <th>
                            <div class="column-header">
                                <span>Mayor Edad</span>
                                <button class="column-toggle" type="button" onclick="toggleColumnMenu('menu-mayor')">☰</button>
                            </div>
                            <div id="menu-mayor" class="column-menu">
                                <select id="filtro-mayor-edad" class="form-select form-select-sm" onchange="aplicarFiltrosTabla()">
                                    <option value="">Todos</option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div class="mt-5">
                <h5 class="mb-3">Inactivos</h5>
                <table class="table table-striped table-bordered" id="tabla-inactivos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Grupo</th>
                            <th>Género</th>
                            <th>Mayor Edad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `;
        if (typeof renderizarModalHermano === 'function') {
            renderizarModalHermano();
        }
        renderizarTablaHermanos();
    } 
    else if (modulo === 'ajustes') {
        let nombreCongregacionActual = localStorage.getItem('app_nombre_congregacion') || 'Paraíso de Carabayllo';
        let stats = typeof obtenerEstadisticasBD === 'function' ? obtenerEstadisticasBD() : {
            activos: 0, inactivos: 0, totalHermanos: 0, asignaciones: 0, territorios: 0, asistencias: 0, tamanoKb: '0'
        };

        areaTabla.innerHTML = `
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <div>
                        <h3 class="fw-bold mb-1 header-title-primary">⚙️ Configuración y Base de Datos</h3>
                        <p class="text-muted mb-0 small">Gestión integral de persistencia, exportaciones relacionales SQL y preferencias</p>
                    </div>
                    <span class="badge badge-db-status">
                        🟢 Almacenamiento Local Activo (HTML5 + SQL Bridge)
                    </span>
                </div>

                <!-- Tarjetas de métricas de la Base de Datos -->
                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-3">
                        <div class="card card-stat-ajustes shadow-sm p-3">
                            <span class="text-muted small fw-semibold">👥 Directorio Hermanos</span>
                            <div class="fs-4 fw-bold text-dark mt-1">${stats.totalHermanos} <span class="fs-7 fw-normal text-muted">(${stats.activos} act. / ${stats.inactivos} inact.)</span></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="card card-stat-ajustes shadow-sm p-3">
                            <span class="text-muted small fw-semibold">📅 Asignaciones Guardadas</span>
                            <div class="fs-4 fw-bold text-primary mt-1">${stats.asignaciones} <span class="fs-7 fw-normal text-muted">registros</span></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="card card-stat-ajustes shadow-sm p-3">
                            <span class="text-muted small fw-semibold">📦 Tarjetas de Territorio</span>
                            <div class="fs-4 fw-bold text-success mt-1">${stats.territorios} <span class="fs-7 fw-normal text-muted">zonas</span></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-3">
                        <div class="card card-stat-ajustes shadow-sm p-3">
                            <span class="text-muted small fw-semibold">📊 Registro de Asistencia</span>
                            <div class="fs-4 fw-bold text-secondary mt-1">${stats.asistencias} <span class="fs-7 fw-normal text-muted">reuniones</span></div>
                        </div>
                    </div>
                </div>

                <div class="row g-4">
                    <!-- Panel Maestro de Base de Datos -->
                    <div class="col-lg-7">
                        <div class="card card-ajustes-panel shadow-sm h-100 p-4">
                            <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                                <h5 class="fw-bold text-dark mb-0">🗄️ Motor de Base de Datos y Respaldos</h5>
                                <span class="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 small">SQL / JSON</span>
                            </div>
                            <p class="text-muted small mb-3">
                                Los datos de tu congregación se guardan en tiempo real en la memoria interna de alta velocidad. Desde aquí puedes generar copias de seguridad portátiles o volcados SQL relacionales para servidores.
                            </p>

                            <div class="d-grid gap-2 mb-3">
                                <button class="btn btn-primary fw-bold py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm" onclick="exportarBaseDatosSQL()">
                                    <span>💾</span> Exportar Base de Datos SQL (.sql)
                                </button>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-outline-primary fw-bold py-2 flex-grow-1 rounded-3" onclick="exportarDatosRespaldo()">
                                        <span>📥</span> Copia de Seguridad JSON
                                    </button>
                                    <label class="btn btn-outline-success fw-bold py-2 flex-grow-1 rounded-3 mb-0 text-center" style="cursor: pointer;">
                                        <span>📂</span> Restaurar Base de Datos
                                        <input type="file" id="inputArchivoRestaurar" accept=".json" onchange="cambiarBaseDeDatosCongregacion(event)" hidden>
                                    </label>
                                </div>
                            </div>

                            <div class="p-3 rounded-3 bg-light-subtle border">
                                <h6 class="fw-bold text-dark mb-1 small">💡 Compatibilidad de la Base de Datos SQL:</h6>
                                <p class="text-muted small mb-0">
                                    El archivo <code>.sql</code> generado contiene la estructura de tablas relacionales (<code>hermanos_activos</code>, <code>asignaciones</code>, <code>territorios</code>, <code>asistencia</code>) compatible con <strong>MySQL, MariaDB, SQLite 3 y phpMyAdmin</strong>. También dispones del generador nativo <code>python generar_sqlite.py</code> que crea el archivo <code>datos/congregacion.db</code>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Panel de Configuración de Congregación y Tema -->
                    <div class="col-lg-5">
                        <div class="card card-ajustes-panel shadow-sm h-100 p-4 d-flex flex-column">
                            <div class="border-bottom pb-2 mb-3">
                                <h5 class="fw-bold text-dark mb-0">🏢 Congregación y Entorno</h5>
                            </div>

                            <div class="mb-4">
                                <label class="text-muted small fw-semibold d-block mb-1">Congregación Activa:</label>
                                <div class="p-3 bg-light-subtle border rounded-3 d-flex justify-content-between align-items-center">
                                    <span class="fw-bold text-primary fs-6" id="lblCongregacionActiva">${nombreCongregacionActual}</span>
                                    <button class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 fw-bold" onclick="abrirModalNombreCongregacion()">
                                        ✏️ Renombrar
                                    </button>
                                </div>
                            </div>

                            <!-- Tarjeta de PWA y Modo Offline -->
                            <div class="mb-4 p-3 bg-light-subtle border rounded-3">
                                <div class="d-flex align-items-center justify-content-between mb-2">
                                    <h6 class="fw-bold text-dark mb-0 small">📱 App Progresiva (PWA)</h6>
                                    <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1" style="font-size:0.72rem;">Offline Activo</span>
                                </div>
                                <p class="text-muted small mb-2">Instálala en tu dispositivo para abrirla directamente desde la pantalla de inicio y usarla sin conexión a internet.</p>
                                <button class="btn btn-outline-primary btn-sm w-100 fw-bold rounded-pill" id="btnInstalarPWA" onclick="ejecutarInstalacionPWA()">
                                    📲 Instalar en este Dispositivo
                                </button>
                            </div>

                            <div class="mt-auto">
                                <div class="border-top pt-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 class="fw-bold text-dark mb-0">🌙 Modo Oscuro</h6>
                                            <small class="text-muted">Ajusta la interfaz para lectura nocturna</small>
                                        </div>
                                        <div class="form-check form-switch fs-5 m-0">
                                            <input class="form-check-input" type="checkbox" id="checkModoOscuro" onchange="toggleModoOscuro(this)">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal para Cambiar Nombre de Congregación -->
            <div class="modal fade" id="modalCambiarCongregacion" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content rounded-4 border-0 shadow">
                  <div class="modal-header bg-slate-navy text-white py-3">
                    <h5 class="modal-title fw-bold">🏢 Configurar Nombre de Congregación</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body py-4">
                    <label class="form-label fw-bold text-muted small">Nombre de la Congregación:</label>
                    <input type="text" id="inputNuevoNombreCongregacion" class="form-control form-control-lg fw-bold text-primary rounded-3" value="${nombreCongregacionActual}">
                    <small class="text-muted mt-2 d-block">Este nombre aparecerá en todos los encabezados y en los respaldos oficiales.</small>
                  </div>
                  <div class="modal-footer justify-content-end bg-light-subtle">
                    <button type="button" class="btn btn-outline-secondary rounded-pill px-3" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary rounded-pill px-4 fw-bold" onclick="guardarNuevoNombreCongregacion()">Guardar y Actualizar</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        
        // Sincronizar el estado del switch de modo oscuro
        let check = document.getElementById('checkModoOscuro');
        if (check) {
            check.checked = localStorage.getItem('app_modo_oscuro') === 'true';
        }
    }
}

function sincronizarCargoFormulario() {
    const cargo = document.getElementById('inCargo')?.value || 'Publicador Bautizado';
    const precursorado = document.getElementById('inPrecursorado');

    if (!precursorado) return;

    if (cargo === 'Inactivo') {
        precursorado.disabled = true;
        precursorado.value = 'Ninguno';
    } else {
        precursorado.disabled = false;
    }
}

function abrirEdicion(index, tipo = 'activo') {
    if (!document.getElementById('modalHermano') && typeof renderizarModalHermano === 'function') {
        renderizarModalHermano();
    }
    const modalEl = document.getElementById('modalHermano');
    if (!modalEl) return;
    const modal = new bootstrap.Modal(modalEl);
    document.getElementById('editTipo').value = tipo;

    if (index === -1) {
        document.getElementById('inNombre').value = '';
        document.getElementById('inCargo').value = 'Publicador Bautizado';
        document.getElementById('inPrecursorado').value = 'Ninguno';
        document.getElementById('inGrupo').value = '';
        document.getElementById('inGenero').value = 'M';
        document.getElementById('inMayorEdad').value = 'Sí';
        document.getElementById('editIndex').value = '-1';
    } else {
        const lista = tipo === 'inactivo' ? obtenerHermanosInactivos() : obtenerHermanos();
        const h = lista[index];
        document.getElementById('inNombre').value = h.nombre;
        document.getElementById('inCargo').value = h.cargo || 'Publicador Bautizado';
        document.getElementById('inPrecursorado').value = h.precursorado || 'Ninguno';
        document.getElementById('inGrupo').value = h.grupo;
        document.getElementById('inGenero').value = h.genero;
        document.getElementById('inMayorEdad').value = h.mayorEdad;
        document.getElementById('editIndex').value = index;
    }

    sincronizarCargoFormulario();
    modal.show();
}

function guardarDatos() {
    const nombre = document.getElementById('inNombre').value;
    const cargo = document.getElementById('inCargo').value;
    const precursorado = cargo === 'Inactivo' ? 'Ninguno' : document.getElementById('inPrecursorado').value;
    const grupo = parseInt(document.getElementById('inGrupo').value);
    const genero = document.getElementById('inGenero').value;
    const mayorEdad = document.getElementById('inMayorEdad').value;
    const index = parseInt(document.getElementById('editIndex').value);
    const tipo = document.getElementById('editTipo').value || 'activo';
    const payload = { nombre, cargo, precursorado, grupo, genero, mayorEdad };

    if (cargo === 'Inactivo') {
        if (tipo === 'inactivo') {
            guardarHermanoInactivo(payload, index);
        } else {
            if (index !== -1) {
                borrarHermano(index);
            }
            guardarHermanoInactivo(payload, -1);
        }
    } else if (tipo === 'inactivo') {
        if (index !== -1) {
            borrarHermanoInactivo(index);
        }
        guardarHermano(payload, -1);
    } else {
        guardarHermano(payload, index);
    }

    bootstrap.Modal.getInstance(document.getElementById('modalHermano')).hide();
    renderizarTablaHermanos();
}

/* ==========================================================================
   PWA - EVENTOS DE INSTALACIÓN Y MANEJO DE PROMPT
   ========================================================================== */
let deferredPromptPWA = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPromptPWA = e;
    
    // Mostrar banner flotante si no ha sido descartado en la sesión
    if (!sessionStorage.getItem('pwa_prompt_dismissed')) {
        const banner = document.getElementById('banner-pwa-instalacion');
        if (banner) banner.classList.remove('d-none');
    }

    const btnInstalar = document.getElementById('btnInstalarPWA');
    if (btnInstalar) {
        btnInstalar.classList.remove('btn-outline-primary');
        btnInstalar.classList.add('btn-primary');
    }
});

function ejecutarInstalacionPWA() {
    const banner = document.getElementById('banner-pwa-instalacion');
    if (banner) banner.classList.add('d-none');

    if (deferredPromptPWA) {
        deferredPromptPWA.prompt();
        deferredPromptPWA.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ El usuario aceptó instalar la PWA');
            } else {
                console.log('ℹ️ El usuario canceló la instalación');
            }
            deferredPromptPWA = null;
        });
    } else {
        alert('ℹ️ Para instalar esta aplicación en tu dispositivo:\n\n• En Chrome / Edge (PC o Mac): Haz clic en el botón de instalación (💻 o ➕) en la barra de direcciones o en el menú de tres puntos (...) > "Instalar Gestor Congregación".\n• En Android (Chrome): Abre el menú (...) > "Instalar aplicación" o "Añadir a pantalla principal".\n• En iPhone / iPad (Safari): Pulsa el botón "Compartir" (cuadrado con flecha hacia arriba) y selecciona "Añadir a la pantalla de inicio".');
    }
}

function descartarPromptPWA() {
    const banner = document.getElementById('banner-pwa-instalacion');
    if (banner) banner.classList.add('d-none');
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
}

window.addEventListener('appinstalled', () => {
    console.log('🎉 ¡PWA instalada satisfactoriamente!');
    const banner = document.getElementById('banner-pwa-instalacion');
    if (banner) banner.classList.add('d-none');
    deferredPromptPWA = null;
});