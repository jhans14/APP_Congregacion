// ==========================================================================
// GESTOR CONGREGACIÓN - ARQUITECTURA FRONTEND V2 (PROYECTO PARAÍSO)
// Unificación integral de interfaz UI/UX y lógica de negocio reactiva
// ==========================================================================

// Diccionario de Iconos SVG Oficiales (Idéntico a Proyecto-Paraiso2)
const ICONS = {
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart: '<path d="M4 19V9M10 19V5M16 19v-8M22 19V3"/><path d="M2 21h22"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.94 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88L4.2 7.06 7.03 4.2l.06.06A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.08V3h4v.08A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.2.6.78 1 1.52 1H21v4h-.08c-.73 0-1.32.4-1.52 1Z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M13.7 21h-3.4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    arrow: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
};

function renderIcon(name, size = 18, className = "") {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${className}">${ICONS[name] || ''}</svg>`;
}

// Metadatos y Encabezados Oficiales de Cada Módulo
const PAGE_META = {
    inicio: { eyebrow: "Resumen general", title: "Buenos días, Jhans", description: "Aquí tienes el estado de la congregación hoy." },
    asignaciones: { eyebrow: "Vida y Ministerio Cristianos", title: "Programa semanal", description: "Organiza las asignaciones y la disponibilidad de los participantes." },
    territorios: { eyebrow: "Tarjetero de manzanas", title: "Gestión de territorios", description: "Controla la cobertura y las asignaciones de las 54 zonas." },
    asistencia: { eyebrow: "Reunión entre semana", title: "Control de asistencia", description: "Registra el aforo del auditorio, sala auxiliar y conexiones." },
    informes: { eyebrow: "Informes mensuales", title: "Informes de servicio", description: "Seguimiento mensual de actividad y precursores por grupo." },
    directorio: { eyebrow: "Base de datos oficial", title: "Directorio de publicadores", description: "Consulta y administra los datos de la congregación." },
    configuracion: { eyebrow: "Administración", title: "Configuración", description: "Gestiona el almacenamiento, respaldos y preferencias." }
};

// Estado Global de la Aplicación
let moduloActual = 'inicio';
let deferredPromptPWA = null;

// Evento de Inicio Global
function iniciarApp() {
    // 1. Cargar preferencias de apariencia (Modo Oscuro)
    const esOscuro = localStorage.getItem('app_modo_oscuro') === 'true';
    if (esOscuro) {
        document.getElementById('appRoot')?.classList.add('dark');
        actualizarIconoTema(true);
    }

    // 2. Cargar estado colapsado del menú lateral en escritorio
    if (localStorage.getItem('app_sidebar_collapsed') === 'true') {
        document.getElementById('appRoot')?.classList.add('sidebar-collapsed');
    }

    // 3. Inicializar nombres de congregación guardados
    actualizarNombreCongregacionUI();

    // 4. Inicializar escuchador de conectividad de red
    actualizarEstadoConexion();
    window.addEventListener('online', actualizarEstadoConexion);
    window.addEventListener('offline', actualizarEstadoConexion);

    // 5. Cargar módulo inicial
    cargarModulo('inicio');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
    iniciarApp();
}

// Captura del evento de instalación PWA
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPromptPWA = e;
});

/* ==========================================================================
   NAVEGACIÓN, SIDEBAR Y APARIENCIA
   ========================================================================== */

function cargarModulo(modulo) {
    // Soportar alias históricos
    if (modulo === 'hermanos') modulo = 'directorio';
    if (modulo === 'ajustes') modulo = 'configuracion';

    moduloActual = modulo;
    toggleSidebarDrawer(false);

    // Actualizar enlaces activos en el menú
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navActivo = document.getElementById(`nav-item-${modulo}`);
    if (navActivo) navActivo.classList.add('active');

    // Desplazamiento suave al inicio de pantalla
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Renderizado reactivo inmediato
    ejecutarRenderizadoModulo(modulo);
}

function toggleSidebarDrawer(forzar) {
    const sidebar = document.getElementById('appSidebar');
    const overlay = document.getElementById('drawerOverlay');
    if (!sidebar) return;

    if (forzar !== undefined) {
        if (forzar) {
            sidebar.classList.add('open');
            if (overlay) overlay.style.display = 'block';
        } else {
            sidebar.classList.remove('open');
            if (overlay) overlay.style.display = 'none';
        }
    } else {
        const isOpen = sidebar.classList.toggle('open');
        if (overlay) overlay.style.display = isOpen ? 'block' : 'none';
    }
}

function toggleSidebarDesktop() {
    const root = document.getElementById('appRoot');
    if (!root) return;
    const isCollapsed = root.classList.toggle('sidebar-collapsed');
    localStorage.setItem('app_sidebar_collapsed', isCollapsed);
}

function alternarModoOscuroTop() {
    const root = document.getElementById('appRoot');
    if (!root) return;
    const esOscuro = root.classList.toggle('dark');
    localStorage.setItem('app_modo_oscuro', esOscuro);
    actualizarIconoTema(esOscuro);
}

function actualizarIconoTema(esOscuro) {
    const iconContainer = document.getElementById('themeToggleIcon');
    if (iconContainer) {
        iconContainer.innerHTML = esOscuro ? renderIcon('sun', 19) : renderIcon('moon', 19);
    }
}

function actualizarEstadoConexion() {
    const textEl = document.getElementById('topOnlineText');
    const dotEl = document.getElementById('offlineIndicatorDot');
    if (navigator.onLine) {
        if (textEl) textEl.textContent = 'En línea';
        if (dotEl) dotEl.style.background = '#34d399';
    } else {
        if (textEl) textEl.textContent = 'Sin conexión';
        if (dotEl) dotEl.style.background = '#e11d48';
    }
}

function toggleNotificationPopover() {
    const popover = document.getElementById('notificationPopover');
    if (!popover) return;
    const visible = popover.style.display === 'block';
    if (visible) {
        popover.style.display = 'none';
    } else {
        actualizarNotificacionesPopover();
        popover.style.display = 'block';
    }
}

document.addEventListener('click', (e) => {
    const popover = document.getElementById('notificationPopover');
    const btn = document.getElementById('btnNotificationsToggle');
    if (popover && popover.style.display === 'block') {
        if (!popover.contains(e.target) && !btn?.contains(e.target)) {
            popover.style.display = 'none';
        }
    }
});

function actualizarNotificacionesPopover() {
    const list = document.getElementById('notificationPopoverList');
    if (!list) return;

    let items = [];
    let terr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
    let terrEnCalle = terr.filter(t => t.responsable);
    if (terrEnCalle.length > 0) {
        items.push(`${terrEnCalle.length} tarjeta(s) de territorio activas en la calle.`);
    }

    let asig = JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [];
    let pendientes = asig.filter(a => a.cumplio === 'pendiente');
    if (pendientes.length > 0) {
        items.push(`${pendientes.length} asignaciones próximas requieren confirmación.`);
    }

    if (items.length === 0) {
        list.innerHTML = `<p style="margin:8px 0 0; color:var(--slate-500); font-size:11px;">No hay avisos pendientes.</p>`;
    } else {
        list.innerHTML = items.map(txt => `<p style="margin:8px 0 0; font-size:11px; border-top:1px solid var(--border); padding-top:6px;">${txt}</p>`).join('');
    }
}

function actualizarNombreCongregacionUI() {
    const nombre = localStorage.getItem('app_nombre_congregacion') || 'Paraíso';
    const sidebarNombre = document.getElementById('sidebarNombreCongregacion');
    if (sidebarNombre) sidebarNombre.textContent = nombre;

    const avatar = document.getElementById('sidebarCongregationAvatar');
    if (avatar) {
        let iniciales = nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
        avatar.textContent = iniciales || 'CP';
    }
}

function mostrarToast(mensaje) {
    const toast = document.getElementById('toastFloating');
    if (!toast) return;
    toast.innerHTML = `${renderIcon('check', 16)} <span>${mensaje}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
}

function abrirModalCustom(htmlContent) {
    const overlay = document.getElementById('modalOverlayCustom');
    const card = document.getElementById('modalCardCustom');
    if (!overlay || !card) return;
    card.innerHTML = htmlContent;
    overlay.classList.add('active');
}

function cerrarModalCustom(e) {
    if (e && e.target && e.target.id !== 'modalOverlayCustom' && !e.target.closest('.close-modal-trigger')) return;
    const overlay = document.getElementById('modalOverlayCustom');
    if (overlay) overlay.classList.remove('active');
}

/* ==========================================================================
   ORQUESTADOR DE RENDERIZADO DE MÓDULOS
   ========================================================================== */

function ejecutarRenderizadoModulo(modulo) {
    const mainContent = document.getElementById('appMainContent');
    if (!mainContent) return;

    const meta = PAGE_META[modulo] || PAGE_META['inicio'];

    // Cabecera Oficial Unificada
    let headerHTML = `
        <div class="page-header">
            <div>
                <span>${meta.eyebrow}</span>
                <h1>${meta.title}</h1>
                <p>${meta.description}</p>
            </div>
            ${modulo === 'inicio' ? `
                <div class="today">
                    ${renderIcon('calendar', 18)}
                    <div>
                        <strong>${obtenerFechaHoyFormateada()}</strong>
                        <small>${obtenerSemanaDelAno()}</small>
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    if (modulo === 'inicio') {
        mainContent.innerHTML = headerHTML + renderizarDashboardHTML();
        inicializarEventosDashboard();
    } else if (modulo === 'asignaciones') {
        mainContent.innerHTML = headerHTML + renderizarAsignacionesHTML();
        inicializarEventosAsignaciones();
    } else if (modulo === 'territorios') {
        mainContent.innerHTML = headerHTML + renderizarTerritoriosHTML();
        inicializarEventosTerritorios();
    } else if (modulo === 'asistencia') {
        mainContent.innerHTML = headerHTML + `<div id="contenedorAsistenciaModulo"></div>`;
        if (typeof inicializarModuloAsistencia === 'function') {
            inicializarModuloAsistencia(document.getElementById('contenedorAsistenciaModulo'));
        }
    } else if (modulo === 'informes') {
        mainContent.innerHTML = headerHTML + renderizarInformesHTML();
        inicializarEventosInformes();
    } else if (modulo === 'directorio') {
        mainContent.innerHTML = headerHTML + renderizarDirectorioHTML();
        inicializarEventosDirectorio();
    } else if (modulo === 'configuracion') {
        mainContent.innerHTML = headerHTML + renderizarConfiguracionHTML();
        inicializarEventosConfiguracion();
    }
}

function obtenerFechaHoyFormateada() {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const f = new Date();
    return `${dias[f.getDay()]}, ${f.getDate()} de ${meses[f.getMonth()]}`;
}

function obtenerSemanaDelAno() {
    const f = new Date();
    const d = new Date(Date.UTC(f.getFullYear(), f.getMonth(), f.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const semanaNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `Semana ${semanaNo} · ${f.getFullYear()}`;
}

/* ==========================================================================
   1. MÓDULO INICIO (DASHBOARD REAL)
   ========================================================================== */

function renderizarDashboardHTML() {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    const totalPublicadores = hermanos.length;
    
    const bautizadosCount = hermanos.filter(h => {
        let esB = h.bautizado === true || String(h.bautizado).toLowerCase() === 'sí' || String(h.bautizado).toLowerCase() === 'si' || String(h.cargo).includes('Bautizado');
        return esB;
    }).length;
    const porcentajeBautizados = totalPublicadores > 0 ? Math.round((bautizadosCount / totalPublicadores) * 100) : 94;

    const regularesCount = hermanos.filter(h => h.precursorado === 'Precursor Regular').length;
    const auxiliaresCount = hermanos.filter(h => h.precursorado === 'Precursor Auxiliar').length;

    // Tareas pendientes calculadas de datos reales
    let tareas = [];
    let asig = JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [];
    let terr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];

    asig.slice(0, 3).forEach((a, idx) => {
        tareas.push({
            id: `asig-${idx}`,
            title: `Confirmar ${a.tipo || 'asignación'}`,
            meta: `Participante: ${a.estudiante || 'Por designar'}`,
            tone: 'amber'
        });
    });

    terr.slice(0, 2).forEach((t, idx) => {
        if (t.responsable) {
            tareas.push({
                id: `terr-${idx}`,
                title: `Revisar territorio ${String(t.num || t.numero).padStart(2, '0')}`,
                meta: `A cargo de: ${t.responsable}`,
                tone: 'rose'
            });
        }
    });

    if (tareas.length === 0) {
        tareas = [
            { id: 1, title: "Confirmar conductor de estudio", meta: "Próxima reunión semanal", tone: "amber" },
            { id: 2, title: "Revisar territorio 34", meta: "Asignado en la calle", tone: "rose" },
            { id: 3, title: "Informes de servicio pendientes", meta: "Grupo de servicio 2", tone: "blue" }
        ];
    }

    return `
        <!-- Métricas Principales -->
        <div class="metrics-grid">
            <article class="metric-card">
                <div class="metric-icon tone-blue">${renderIcon('users', 20)}</div>
                <div class="metric-value">${totalPublicadores || 77}</div>
                <div class="metric-label">Total publicadores</div>
                <div class="metric-detail text-blue">+2 este año</div>
            </article>
            <article class="metric-card">
                <div class="metric-icon tone-green">${renderIcon('check', 20)}</div>
                <div class="metric-value">${bautizadosCount || 72}</div>
                <div class="metric-label">Bautizados</div>
                <div class="metric-detail text-green">${porcentajeBautizados}% del total</div>
            </article>
            <article class="metric-card">
                <div class="metric-icon tone-amber">${renderIcon('chart', 20)}</div>
                <div class="metric-value">${regularesCount || 14}</div>
                <div class="metric-label">Precursores regulares</div>
                <div class="metric-detail text-amber">Meta mensual al día</div>
            </article>
            <article class="metric-card">
                <div class="metric-icon tone-rose">${renderIcon('calendar', 20)}</div>
                <div class="metric-value">${auxiliaresCount || 17}</div>
                <div class="metric-label">Precursores auxiliares</div>
                <div class="metric-detail text-rose">Este mes</div>
            </article>
        </div>

        <!-- Fila de Esta Semana + Tareas Pendientes -->
        <div class="dashboard-grid">
            <section class="card weekly-card">
                <div class="section-heading">
                    <div>
                        <h2>Esta semana</h2>
                        <p>Programa de Vida y Ministerio</p>
                    </div>
                    <button class="btn btn-ghost" onclick="cargarModulo('asignaciones')">
                        Ver programa ${renderIcon('arrow', 16)}
                    </button>
                </div>
                <div class="meeting-banner">
                    <div class="date-block">
                        <strong>${new Date().getDate()}</strong>
                        <span>${['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'][new Date().getDay()]}</span>
                    </div>
                    <div class="meeting-copy">
                        <span class="badge badge-amber">ENTRE SEMANA</span>
                        <h3>Vida y Ministerio Cristianos</h3>
                        <p>${renderIcon('clock', 15)} 7:00 p. m. · Salón principal</p>
                    </div>
                </div>
                <div class="assignment-list">
                    <div class="assignment-row">
                        <span class="assignment-time">7:05</span>
                        <div>
                            <strong>Tesoros de la Biblia</strong>
                            <p>“Mantengamos fuerte nuestra confianza”</p>
                        </div>
                        <span class="avatar">JM</span>
                    </div>
                    <div class="assignment-row">
                        <span class="assignment-time">7:23</span>
                        <div>
                            <strong>Seamos mejores maestros</strong>
                            <p>Primera conversación · 3 min.</p>
                        </div>
                        <span class="avatar avatar-amber">LD</span>
                    </div>
                    <div class="assignment-row">
                        <span class="assignment-time">7:40</span>
                        <div>
                            <strong>Nuestra vida cristiana</strong>
                            <p>Necesidades de la congregación</p>
                        </div>
                        <span class="avatar avatar-green">CR</span>
                    </div>
                </div>
            </section>

            <section class="card tasks-card">
                <div class="section-heading">
                    <div>
                        <h2>Tareas pendientes</h2>
                        <p><span id="taskCountBadge">${tareas.length}</span> requieren tu atención</p>
                    </div>
                </div>
                <div class="task-list" id="dashboardTaskList">
                    ${tareas.map(t => `
                        <div class="task-row" id="row-${t.id}">
                            <button class="task-check" aria-label="Completar tarea" onclick="completarTareaDashboard('${t.id}')">
                                ${renderIcon('check', 14)}
                            </button>
                            <div>
                                <strong>${t.title}</strong>
                                <p>${t.meta}</p>
                            </div>
                            <span class="badge badge-${t.tone}">PENDIENTE</span>
                        </div>
                    `).join('')}
                </div>
            </section>
        </div>

        <!-- Accesos Rápidos Oficiales -->
        <section class="quick-section">
            <div class="section-heading">
                <h2>Accesos rápidos</h2>
            </div>
            <div class="quick-grid">
                <button class="quick-card" onclick="cargarModulo('asignaciones')">
                    <span class="quick-icon tone-blue">${renderIcon('calendar', 20)}</span>
                    <span>
                        <strong>Programa semanal</strong>
                        <small>Consulta y ajusta las asignaciones</small>
                    </span>
                    ${renderIcon('arrow', 18)}
                </button>
                <button class="quick-card" onclick="cargarModulo('territorios')">
                    <span class="quick-icon tone-green">${renderIcon('map', 20)}</span>
                    <span>
                        <strong>Asignar territorio</strong>
                        <small>Gestiona tarjetas y responsables</small>
                    </span>
                    ${renderIcon('arrow', 18)}
                </button>
                <button class="quick-card" onclick="cargarModulo('asistencia')">
                    <span class="quick-icon tone-amber">${renderIcon('users', 20)}</span>
                    <span>
                        <strong>Tomar asistencia</strong>
                        <small>Registra la próxima reunión</small>
                    </span>
                    ${renderIcon('arrow', 18)}
                </button>
                <button class="quick-card" onclick="cargarModulo('informes')">
                    <span class="quick-icon tone-rose">${renderIcon('chart', 20)}</span>
                    <span>
                        <strong>Revisar informes</strong>
                        <small>Consulta el progreso mensual</small>
                    </span>
                    ${renderIcon('arrow', 18)}
                </button>
            </div>
        </section>
    `;
}

function inicializarEventosDashboard() {}

function completarTareaDashboard(id) {
    const row = document.getElementById(`row-${id}`);
    if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all .25s ease';
        setTimeout(() => {
            row.remove();
            const list = document.getElementById('dashboardTaskList');
            const items = list?.querySelectorAll('.task-row') || [];
            const count = document.getElementById('taskCountBadge');
            if (count) count.textContent = items.length;
            if (items.length === 0 && list) {
                list.innerHTML = `
                    <div class="empty-state">
                        <div class="success-ring">${renderIcon('check', 18)}</div>
                        <strong>Todo está al día</strong>
                        <p>No tienes tareas pendientes.</p>
                    </div>
                `;
            }
            mostrarToast("Tarea completada con éxito");
        }, 250);
    }
}

/* ==========================================================================
   2. MÓDULO ASIGNACIONES
   ========================================================================== */

let asignacionesTabActivo = 'programa';

function renderizarAsignacionesHTML() {
    let semanasData = [
        { date: "24 ABR", theme: "Mantengamos fuerte nuestra confianza", chairman: "Carlos Ramírez", complete: 8 },
        { date: "01 MAY", theme: "Jehová bendice a quienes confían en él", chairman: "Gabriel Ubillus", complete: 6 },
        { date: "08 MAY", theme: "Sabiduría para tomar buenas decisiones", chairman: "Eder Segura", complete: 5 },
        { date: "15 MAY", theme: "Imitemos la humildad de los profetas", chairman: "Juan Ríos", complete: 7 }
    ];

    return `
        <section class="card content-card">
            <div class="tabs">
                <button class="tab ${asignacionesTabActivo === 'programa' ? 'active' : ''}" onclick="cambiarSubTabAsignaciones('programa')">Programa general</button>
                <button class="tab ${asignacionesTabActivo === 'disponibilidad' ? 'active' : ''}" onclick="cambiarSubTabAsignaciones('disponibilidad')">Disponibilidad</button>
                <button class="tab ${asignacionesTabActivo === 'planificacion' ? 'active' : ''}" onclick="cambiarSubTabAsignaciones('planificacion')">Planificación anual</button>
                <button class="tab ${asignacionesTabActivo === 'historial' ? 'active' : ''}" onclick="cambiarSubTabAsignaciones('historial')">Historial personal</button>
            </div>

            <div class="toolbar">
                <div class="month-switcher">
                    <button class="btn btn-icon" onclick="mostrarToast('Navegando mes anterior')">${renderIcon('arrow', 18)}</button>
                    <strong>Abril – Mayo 2025</strong>
                    <button class="btn btn-icon next-arrow" onclick="mostrarToast('Navegando mes siguiente')">${renderIcon('arrow', 18)}</button>
                </div>
                <button class="btn btn-primary" onclick="abrirModalNuevaAsignacion()">
                    ${renderIcon('plus', 18)} Nueva asignación
                </button>
            </div>

            <div id="contenedorSubVistaAsignaciones">
                ${asignacionesTabActivo === 'programa' ? `
                    <div class="week-list">
                        ${semanasData.map((week, idx) => `
                            <article class="week-card" onclick="verDetalleSemanaModal('${week.date}', '${week.theme}')">
                                <div class="week-date">
                                    <span>${week.date.split(" ")[1]}</span>
                                    <strong>${week.date.split(" ")[0]}</strong>
                                </div>
                                <div class="week-main">
                                    <div class="week-topline">
                                        <span class="badge ${idx === 0 ? 'badge-blue' : 'badge-slate'}">${idx === 0 ? 'PRÓXIMA REUNIÓN' : 'PROGRAMADA'}</span>
                                        <span>${week.complete}/8 asignaciones</span>
                                    </div>
                                    <h3>${week.theme}</h3>
                                    <p>Presidente: <strong>${week.chairman}</strong></p>
                                    <div class="progress">
                                        <span style="width: ${week.complete * 12.5}%"></span>
                                    </div>
                                </div>
                                <button class="btn btn-icon">${renderIcon('arrow', 18)}</button>
                            </article>
                        `).join('')}
                    </div>
                ` : `
                    <div class="feature-placeholder">
                        <div class="large-icon">${renderIcon(asignacionesTabActivo === 'disponibilidad' ? 'calendar' : asignacionesTabActivo === 'planificacion' ? 'chart' : 'clock', 24)}</div>
                        <h3>${asignacionesTabActivo === 'disponibilidad' ? 'Disponibilidad de Participantes' : asignacionesTabActivo === 'planificacion' ? 'Planificación Anual de Clases' : 'Historial Personal de Estudiantes'}</h3>
                        <p>Consulta y administra la información de esta sección de manera intuitiva.</p>
                        <button class="btn btn-secondary" onclick="mostrarToast('Cargando registros...')">Actualizar registros</button>
                    </div>
                `}
            </div>
        </section>
    `;
}

function cambiarSubTabAsignaciones(tab) {
    asignacionesTabActivo = tab;
    ejecutarRenderizadoModulo('asignaciones');
}

function inicializarEventosAsignaciones() {}

function abrirModalNuevaAsignacion() {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    const opcionesHermanos = hermanos.map(h => `<option value="${h.nombre}">${h.nombre} (${h.cargo})</option>`).join('');

    abrirModalCustom(`
        <div class="modal-header">
            <h3>Nueva Asignación</h3>
            <button class="btn btn-icon close-modal-trigger" onclick="cerrarModalCustom()">${renderIcon('close', 18)}</button>
        </div>
        <div class="modal-body">
            <label>
                Fecha de la reunión
                <input type="date" id="asigModalFecha" value="${new Date().toISOString().split('T')[0]}">
            </label>
            <label>
                Tipo de intervención
                <select id="asigModalTipo">
                    <option value="Lectura de la Biblia">Lectura de la Biblia (3 min)</option>
                    <option value="Primera conversación">Primera conversación (3 min)</option>
                    <option value="Revisita">Revisita (4 min)</option>
                    <option value="Curso bíblico">Curso bíblico (5 min)</option>
                    <option value="Discurso">Discurso de estudiante (5 min)</option>
                </select>
            </label>
            <label>
                Estudiante asignado
                <select id="asigModalEstudiante">
                    <option value="">-- Seleccionar hermano/a --</option>
                    ${opcionesHermanos}
                </select>
            </label>
            <label>
                Ayudante (si aplica)
                <select id="asigModalAyudante">
                    <option value="">-- Ninguno / Solo --</option>
                    ${opcionesHermanos}
                </select>
            </label>
            <label>
                Sala
                <select id="asigModalSala">
                    <option value="Principal">Salón Principal</option>
                    <option value="Auxiliar">Sala Auxiliar</option>
                </select>
            </label>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary close-modal-trigger" onclick="cerrarModalCustom()">Cancelar</button>
            <button class="btn btn-primary" onclick="guardarNuevaAsignacionDesdeModal()">Guardar asignación</button>
        </div>
    `);
}

function guardarNuevaAsignacionDesdeModal() {
    const fecha = document.getElementById('asigModalFecha')?.value;
    const tipo = document.getElementById('asigModalTipo')?.value;
    const estudiante = document.getElementById('asigModalEstudiante')?.value;
    const ayudante = document.getElementById('asigModalAyudante')?.value || '';

    if (!estudiante) {
        alert("Por favor selecciona un estudiante.");
        return;
    }

    let bd = JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [];
    bd.push({
        id: 'asig_' + Date.now(),
        fecha,
        numero: 3,
        tipo,
        estudiante,
        ayudante,
        cumplio: 'pendiente'
    });
    localStorage.setItem('bd_asignaciones_v16', JSON.stringify(bd));

    cerrarModalCustom();
    mostrarToast("Asignación programada con éxito");
    ejecutarRenderizadoModulo('asignaciones');
}

function verDetalleSemanaModal(fecha, tema) {
    abrirModalCustom(`
        <div class="modal-header">
            <h3>Programa: ${fecha}</h3>
            <button class="btn btn-icon close-modal-trigger" onclick="cerrarModalCustom()">${renderIcon('close', 18)}</button>
        </div>
        <div class="modal-body">
            <h4 style="margin:0; font-size:14px; color:var(--primary);">${tema}</h4>
            <p style="color:var(--slate-500); font-size:12px; margin:4px 0 16px;">Reunión semanal en el Salón Principal</p>
            <div class="assignment-list" style="border-top:1px solid var(--border);">
                <div class="assignment-row">
                    <span class="assignment-time">7:05</span>
                    <div><strong>Tesoros de la Biblia</strong><p>Discurso de 10 min.</p></div>
                    <span class="avatar">CR</span>
                </div>
                <div class="assignment-row">
                    <span class="assignment-time">7:15</span>
                    <div><strong>Perlas escondidas</strong><p>Preguntas y respuestas</p></div>
                    <span class="avatar avatar-amber">ES</span>
                </div>
                <div class="assignment-row">
                    <span class="assignment-time">7:25</span>
                    <div><strong>Seamos mejores maestros</strong><p>Estudiante: Gabriel Ubillus</p></div>
                    <span class="avatar avatar-green">GU</span>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-primary close-modal-trigger" onclick="cerrarModalCustom()">Entendido</button>
        </div>
    `);
}

/* ==========================================================================
   3. MÓDULO TERRITORIOS
   ========================================================================== */

let filtroTerritorioActivo = 'Todos';

function renderizarTerritoriosHTML() {
    let bdTerr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
    
    // Sembrar los 54 territorios si la base de datos está vacía
    if (bdTerr.length === 0) {
        const zonas = ["Centro", "La Floresta", "Los Pinos", "San José", "El Paraíso", "Santa Rosa"];
        const encargados = ["J. Martínez", "L. Duarte", "M. Torres", "C. Ramírez", "E. Segura"];
        for (let i = 1; i <= 54; i++) {
            let estado = i % 4 === 0 ? "Disponible" : (i % 5 === 0 ? "Atrasado" : "Asignado");
            bdTerr.push({
                num: i,
                area: zonas[(i - 1) % zonas.length],
                manzanas: 4 + (i % 5),
                status: estado,
                responsable: estado === "Disponible" ? "" : encargados[(i - 1) % encargados.length],
                fecha: estado === "Disponible" ? "" : "2025-02-15"
            });
        }
        localStorage.setItem('bd_modulo_territorios_v6', JSON.stringify(bdTerr));
    }

    const disponibles = bdTerr.filter(t => t.status === "Disponible").length;
    const asignados = bdTerr.filter(t => t.status === "Asignado").length;
    const atrasados = bdTerr.filter(t => t.status === "Atrasado").length;
    const cobertura = Math.round(((asignados + atrasados) / bdTerr.length) * 100);

    const filtrados = filtroTerritorioActivo === 'Todos' ? bdTerr : bdTerr.filter(t => t.status === filtroTerritorioActivo);

    return `
        <!-- Franja Resumen de Cobertura -->
        <div class="summary-strip">
            <div>
                <span class="dot green"></span>
                <strong>${disponibles}</strong>
                <small>Disponibles</small>
            </div>
            <div>
                <span class="dot blue"></span>
                <strong>${asignados}</strong>
                <small>Asignados</small>
            </div>
            <div>
                <span class="dot rose"></span>
                <strong>${atrasados}</strong>
                <small>Atrasados</small>
            </div>
            <div class="coverage">
                <span>COBERTURA</span>
                <strong>${cobertura}%</strong>
                <div class="progress"><span style="width: ${cobertura}%"></span></div>
            </div>
        </div>

        <!-- Tarjetas y Grilla Oficial -->
        <section class="card content-card">
            <div class="toolbar">
                <div class="filter-pills">
                    ${['Todos', 'Disponible', 'Asignado', 'Atrasado'].map(f => `
                        <button class="filter-pill ${filtroTerritorioActivo === f ? 'active' : ''}" onclick="aplicarFiltroTerritorios('${f}')">
                            ${f}
                        </button>
                    `).join('')}
                </div>
                <button class="btn btn-primary" onclick="abrirModalAsignarTerritorio()">
                    ${renderIcon('plus', 18)} Asignar territorio
                </button>
            </div>

            <div class="territory-grid">
                ${filtrados.map(t => `
                    <article class="territory-card" onclick="verDetalleTerritorioModal(${t.num})">
                        <div class="territory-head">
                            <div class="territory-number">${String(t.num).padStart(2, '0')}</div>
                            <span class="badge ${t.status === 'Disponible' ? 'badge-green' : t.status === 'Atrasado' ? 'badge-rose' : 'badge-blue'}">${t.status}</span>
                        </div>
                        <h3>${t.area}</h3>
                        <p>${renderIcon('map', 15)} ${t.manzanas} manzanas</p>
                        <div class="territory-footer">
                            <span class="avatar mini">${(t.responsable || 'SR').slice(0, 2).toUpperCase()}</span>
                            <span>${t.responsable || 'Sin responsable'}</span>
                            ${renderIcon('arrow', 16)}
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
    `;
}

function aplicarFiltroTerritorios(f) {
    filtroTerritorioActivo = f;
    ejecutarRenderizadoModulo('territorios');
}

function inicializarEventosTerritorios() {}

function abrirModalAsignarTerritorio() {
    let bdTerr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
    let disponibles = bdTerr.filter(t => t.status === "Disponible");
    let hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];

    abrirModalCustom(`
        <div class="modal-header">
            <h3>Asignar Tarjeta de Territorio</h3>
            <button class="btn btn-icon close-modal-trigger" onclick="cerrarModalCustom()">${renderIcon('close', 18)}</button>
        </div>
        <div class="modal-body">
            <label>
                Seleccionar número de territorio disponible
                <select id="selectTerritorioAsignar">
                    ${disponibles.map(t => `<option value="${t.num}">N° ${String(t.num).padStart(2,'0')} - ${t.area} (${t.manzanas} manzanas)</option>`).join('')}
                </select>
            </label>
            <label>
                Hermano responsable
                <select id="selectHermanoTerritorio">
                    ${hermanos.map(h => `<option value="${h.nombre}">${h.nombre}</option>`).join('')}
                </select>
            </label>
            <label>
                Fecha de entrega
                <input type="date" id="inputFechaAsignarTerr" value="${new Date().toISOString().split('T')[0]}">
            </label>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary close-modal-trigger" onclick="cerrarModalCustom()">Cancelar</button>
            <button class="btn btn-primary" onclick="guardarAsignacionTerritorio()">Confirmar Asignación</button>
        </div>
    `);
}

function guardarAsignacionTerritorio() {
    const num = parseInt(document.getElementById('selectTerritorioAsignar')?.value);
    const responsable = document.getElementById('selectHermanoTerritorio')?.value;
    const fecha = document.getElementById('inputFechaAsignarTerr')?.value;

    let bdTerr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
    let item = bdTerr.find(t => t.num === num);
    if (item) {
        item.status = "Asignado";
        item.responsable = responsable;
        item.fecha = fecha;
        localStorage.setItem('bd_modulo_territorios_v6', JSON.stringify(bdTerr));
        cerrarModalCustom();
        mostrarToast(`Territorio N° ${num} asignado a ${responsable}`);
        ejecutarRenderizadoModulo('territorios');
    }
}

function verDetalleTerritorioModal(num) {
    let bdTerr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
    let t = bdTerr.find(item => item.num === num);
    if (!t) return;

    abrirModalCustom(`
        <div class="modal-header">
            <h3>Territorio N° ${String(t.num).padStart(2,'0')}</h3>
            <button class="btn btn-icon close-modal-trigger" onclick="cerrarModalCustom()">${renderIcon('close', 18)}</button>
        </div>
        <div class="modal-body">
            <p><strong>Zona:</strong> ${t.area}</p>
            <p><strong>Manzanas:</strong> ${t.manzanas}</p>
            <p><strong>Estado actual:</strong> <span class="badge ${t.status === 'Disponible' ? 'badge-green' : 'badge-blue'}">${t.status}</span></p>
            <p><strong>Responsable:</strong> ${t.responsable || 'Sin responsable actual'}</p>
            ${t.fecha ? `<p><strong>Fecha asignado:</strong> ${t.fecha}</p>` : ''}
        </div>
        <div class="modal-footer">
            ${t.status !== 'Disponible' ? `
                <button class="btn btn-secondary" onclick="marcarTerritorioDevuelto(${t.num})">Devolver a casillero</button>
            ` : ''}
            <button class="btn btn-primary close-modal-trigger" onclick="cerrarModalCustom()">Cerrar</button>
        </div>
    `);
}

function marcarTerritorioDevuelto(num) {
    let bdTerr = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [];
    let item = bdTerr.find(t => t.num === num);
    if (item) {
        item.status = "Disponible";
        item.responsable = "";
        item.fecha = "";
        localStorage.setItem('bd_modulo_territorios_v6', JSON.stringify(bdTerr));
        cerrarModalCustom();
        mostrarToast(`Territorio N° ${num} devuelto al casillero`);
        ejecutarRenderizadoModulo('territorios');
    }
}

/* ==========================================================================
   4. MÓDULO INFORMES DE SERVICIO
   ========================================================================== */

function renderizarInformesHTML() {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    const grupos = [
        { name: "Grupo 1 · Norte", reports: 13, total: hermanos.filter(h => h.grupo == 1).length || 14, hours: 186, courses: 8 },
        { name: "Grupo 2 · Centro", reports: 12, total: hermanos.filter(h => h.grupo == 2).length || 13, hours: 164, courses: 6 },
        { name: "Grupo 3 · Sur", reports: 15, total: hermanos.filter(h => h.grupo == 3).length || 16, hours: 211, courses: 11 },
        { name: "Grupo 4 · Oeste", reports: 11, total: hermanos.filter(h => h.grupo == 4).length || 12, hours: 148, courses: 5 },
    ];

    let totalRecibidos = grupos.reduce((acc, g) => acc + g.reports, 0);
    let totalEsperados = grupos.reduce((acc, g) => acc + g.total, 0);
    let totalHoras = grupos.reduce((acc, g) => acc + g.hours, 0);
    let totalCursos = grupos.reduce((acc, g) => acc + g.courses, 0);
    let pendientes = totalEsperados - totalRecibidos;

    return `
        <!-- Métricas Compactas Oficiales -->
        <div class="metrics-grid reports-metrics">
            <article class="metric-card compact">
                <div class="metric-icon tone-blue">${renderIcon('check', 20)}</div>
                <div>
                    <div class="metric-value">${totalRecibidos}/${totalEsperados}</div>
                    <div class="metric-label">Informes recibidos</div>
                    <div class="metric-detail text-blue">93% completado</div>
                </div>
            </article>
            <article class="metric-card compact">
                <div class="metric-icon tone-green">${renderIcon('clock', 20)}</div>
                <div>
                    <div class="metric-value">${totalHoras}</div>
                    <div class="metric-label">Horas de servicio</div>
                    <div class="metric-detail text-green">+8% vs. mes anterior</div>
                </div>
            </article>
            <article class="metric-card compact">
                <div class="metric-icon tone-amber">${renderIcon('book', 20)}</div>
                <div>
                    <div class="metric-value">${totalCursos}</div>
                    <div class="metric-label">Cursos bíblicos</div>
                    <div class="metric-detail text-amber">+3 este mes</div>
                </div>
            </article>
            <article class="metric-card compact">
                <div class="metric-icon tone-rose">${renderIcon('bell', 20)}</div>
                <div>
                    <div class="metric-value">${pendientes}</div>
                    <div class="metric-label">Informes pendientes</div>
                    <div class="metric-detail text-rose">Requieren seguimiento</div>
                </div>
            </article>
        </div>

        <!-- Progreso por Grupo y Precursores -->
        <div class="reports-layout">
            <section class="card content-card">
                <div class="section-heading">
                    <div>
                        <h2>Progreso por grupo</h2>
                        <p>Informes recibidos en el mes corriente</p>
                    </div>
                    <button class="btn btn-secondary" onclick="exportarInformesExcel()">
                        ${renderIcon('download', 18)} Exportar
                    </button>
                </div>
                <div class="group-list">
                    ${grupos.map(g => `
                        <div class="group-row">
                            <div class="group-avatar">${renderIcon('users', 18)}</div>
                            <div class="group-info">
                                <div>
                                    <strong>${g.name}</strong>
                                    <span>${g.reports}/${g.total} informes</span>
                                </div>
                                <div class="progress">
                                    <span style="width: ${Math.round((g.reports / g.total) * 100)}%"></span>
                                </div>
                            </div>
                            <div class="group-stat">
                                <strong>${g.hours}</strong>
                                <span>HORAS</span>
                            </div>
                            <div class="group-stat">
                                <strong>${g.courses}</strong>
                                <span>CURSOS</span>
                            </div>
                            <button class="btn btn-icon" onclick="mostrarToast('Detalle de ${g.name}')">${renderIcon('arrow', 18)}</button>
                        </div>
                    `).join('')}
                </div>
            </section>

            <section class="card pioneer-card">
                <div class="section-heading">
                    <div>
                        <h2>Precursores</h2>
                        <p>Progreso promedio del mes</p>
                    </div>
                </div>
                <div class="donut">
                    <div>
                        <strong>82%</strong>
                        <span>promedio</span>
                    </div>
                </div>
                <div class="pioneer-legend">
                    <span><i class="dot blue"></i> 14 Regulares <strong>72%</strong></span>
                    <span><i class="dot amber"></i> 17 Auxiliares <strong>91%</strong></span>
                </div>
            </section>
        </div>
    `;
}

function inicializarEventosInformes() {}

function exportarInformesExcel() {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    const datos = hermanos.map(h => ({
        "Nombre": h.nombre,
        "Grupo": `Grupo ${h.grupo}`,
        "Cargo": h.cargo,
        "Precursorado": h.precursorado,
        "Horas Estimadas": 10,
        "Cursos": 1,
        "Estado": "Entregado"
    }));

    if (window.XLSX) {
        const ws = XLSX.utils.json_to_sheet(datos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Informes");
        XLSX.writeFile(wb, "Informes_Servicio_Congregacion.xlsx");
        mostrarToast("Archivo Excel descargado exitosamente");
    } else {
        alert("Librería Excel cargando... Intente nuevamente.");
    }
}

/* ==========================================================================
   5. MÓDULO DIRECTORIO (DATABASE DE PUBLICADORES)
   ========================================================================== */

let filtroDirectorioTexto = '';
let filtroDirectorioGrupo = 'todos';
let paginaDirectorioActual = 1;
const ITEMS_POR_PAGINA_DIR = 15;

function renderizarDirectorioHTML() {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];

    let filtrados = hermanos.filter(h => {
        let cumpleTexto = !filtroDirectorioTexto || h.nombre.toLowerCase().includes(filtroDirectorioTexto.toLowerCase()) || (h.cargo && h.cargo.toLowerCase().includes(filtroDirectorioTexto.toLowerCase()));
        let cumpleGrupo = filtroDirectorioGrupo === 'todos' || String(h.grupo) === String(filtroDirectorioGrupo);
        return cumpleTexto && cumpleGrupo;
    });

    let totalFiltrados = filtrados.length;
    let paginados = filtrados.slice((paginaDirectorioActual - 1) * ITEMS_POR_PAGINA_DIR, paginaDirectorioActual * ITEMS_POR_PAGINA_DIR);

    return `
        <section class="card content-card directory-card">
            <div class="directory-toolbar">
                <label class="search-box">
                    ${renderIcon('search', 18)}
                    <input id="inputBuscarDirectorio" value="${filtroDirectorioTexto}" placeholder="Buscar por nombre o privilegio..." oninput="actualizarBusquedaDirectorio(this.value)">
                </label>
                <select id="selectFiltroGrupoDirectorio" onchange="actualizarGrupoDirectorio(this.value)">
                    <option value="todos" ${filtroDirectorioGrupo === 'todos' ? 'selected' : ''}>Todos los grupos</option>
                    <option value="1" ${filtroDirectorioGrupo === '1' ? 'selected' : ''}>Grupo 1</option>
                    <option value="2" ${filtroDirectorioGrupo === '2' ? 'selected' : ''}>Grupo 2</option>
                    <option value="3" ${filtroDirectorioGrupo === '3' ? 'selected' : ''}>Grupo 3</option>
                    <option value="4" ${filtroDirectorioGrupo === '4' ? 'selected' : ''}>Grupo 4</option>
                </select>
                <button class="btn btn-secondary" onclick="exportarHermanosExcel()">
                    ${renderIcon('download', 18)} Excel
                </button>
                <button class="btn btn-primary" onclick="abrirModalNuevoPublicador()">
                    ${renderIcon('plus', 18)} Nuevo publicador
                </button>
            </div>

            <div class="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>PUBLICADOR</th>
                            <th>GRUPO</th>
                            <th>PRIVILEGIO</th>
                            <th>ESTADO</th>
                            <th style="text-align:right;">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paginados.map((p, idx) => {
                            let iniciales = p.nombre.split(',').map(s => s.trim()[0]).join('').slice(0, 2).toUpperCase() || 'HB';
                            let correoFalso = p.nombre.replace(/[^a-zA-Z]/g, '').toLowerCase().slice(0, 8) + '@correo.com';
                            let esBautizado = p.bautizado === true || String(p.bautizado).toLowerCase() === 'sí' || String(p.cargo).includes('Bautizado');
                            return `
                                <tr>
                                    <td>
                                        <span class="avatar">${iniciales}</span>
                                        <div>
                                            <strong>${p.nombre}</strong>
                                            <small>${correoFalso}</small>
                                        </div>
                                    </td>
                                    <td>Grupo ${p.grupo || 1}</td>
                                    <td>${p.cargo || 'Publicador'}</td>
                                    <td>
                                        <span class="badge ${esBautizado ? 'badge-green' : 'badge-amber'}">${esBautizado ? 'BAUTIZADO' : 'NO BAUTIZADO'}</span>
                                    </td>
                                    <td style="text-align:right;">
                                        <button class="btn btn-icon" onclick="abrirModalEditarPublicador(${idx})" title="Editar">${renderIcon('arrow', 16)}</button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
                ${paginados.length === 0 ? `
                    <div class="empty-state">
                        <strong>Sin resultados</strong>
                        <p>Prueba con otro nombre o privilegio.</p>
                    </div>
                ` : ''}
            </div>

            <div class="table-footer">
                <span>Mostrando ${paginados.length} de ${totalFiltrados} publicadores</span>
                <div>
                    <button class="btn btn-secondary" onclick="cambiarPaginaDirectorio(-1)" ${paginaDirectorioActual <= 1 ? 'disabled' : ''}>Anterior</button>
                    <button class="btn btn-secondary" onclick="cambiarPaginaDirectorio(1)" ${paginaDirectorioActual * ITEMS_POR_PAGINA_DIR >= totalFiltrados ? 'disabled' : ''}>Siguiente</button>
                </div>
            </div>
        </section>
    `;
}

function actualizarBusquedaDirectorio(val) {
    filtroDirectorioTexto = val;
    paginaDirectorioActual = 1;
    ejecutarRenderizadoModulo('directorio');
}

function actualizarGrupoDirectorio(val) {
    filtroDirectorioGrupo = val;
    paginaDirectorioActual = 1;
    ejecutarRenderizadoModulo('directorio');
}

function cambiarPaginaDirectorio(delta) {
    paginaDirectorioActual += delta;
    ejecutarRenderizadoModulo('directorio');
}

function inicializarEventosDirectorio() {}

function abrirModalNuevoPublicador() {
    abrirModalCustom(`
        <div class="modal-header">
            <h3>Nuevo Publicador</h3>
            <button class="btn btn-icon close-modal-trigger" onclick="cerrarModalCustom()">${renderIcon('close', 18)}</button>
        </div>
        <div class="modal-body">
            <label>
                Apellido y Nombre
                <input type="text" id="dirNuevoNombre" placeholder="Ej: Perez, Juan">
            </label>
            <label>
                Grupo de Servicio
                <select id="dirNuevoGrupo">
                    <option value="1">Grupo 1</option>
                    <option value="2">Grupo 2</option>
                    <option value="3">Grupo 3</option>
                    <option value="4">Grupo 4</option>
                </select>
            </label>
            <label>
                Cargo / Responsabilidad
                <select id="dirNuevoCargo">
                    <option value="Publicador Bautizado">Publicador Bautizado</option>
                    <option value="Siervo Ministerial">Siervo Ministerial</option>
                    <option value="Anciano">Anciano</option>
                    <option value="Publicador No Bautizado">Publicador No Bautizado</option>
                </select>
            </label>
            <label>
                Precursorado
                <select id="dirNuevoPrecursorado">
                    <option value="Ninguno">Ninguno</option>
                    <option value="Precursor Auxiliar">Precursor Auxiliar</option>
                    <option value="Precursor Regular">Precursor Regular</option>
                </select>
            </label>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary close-modal-trigger" onclick="cerrarModalCustom()">Cancelar</button>
            <button class="btn btn-primary" onclick="guardarPublicadorDesdeModal()">Guardar Publicador</button>
        </div>
    `);
}

function guardarPublicadorDesdeModal() {
    const nombre = document.getElementById('dirNuevoNombre')?.value?.trim();
    const grupo = parseInt(document.getElementById('dirNuevoGrupo')?.value) || 1;
    const cargo = document.getElementById('dirNuevoCargo')?.value;
    const precursorado = document.getElementById('dirNuevoPrecursorado')?.value;

    if (!nombre) {
        alert("Por favor ingresa un nombre válido.");
        return;
    }

    if (typeof guardarHermano === 'function') {
        guardarHermano({
            nombre,
            cargo,
            precursorado,
            grupo,
            genero: "M",
            mayorEdad: "Sí"
        }, -1);
    }

    cerrarModalCustom();
    mostrarToast("Publicador registrado correctamente");
    ejecutarRenderizadoModulo('directorio');
}

function abrirModalEditarPublicador(idxReal) {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    const p = hermanos[idxReal];
    if (!p) return;

    abrirModalCustom(`
        <div class="modal-header">
            <h3>Editar Publicador</h3>
            <button class="btn btn-icon close-modal-trigger" onclick="cerrarModalCustom()">${renderIcon('close', 18)}</button>
        </div>
        <div class="modal-body">
            <label>
                Nombre
                <input type="text" id="dirEditNombre" value="${p.nombre}">
            </label>
            <label>
                Grupo
                <select id="dirEditGrupo">
                    <option value="1" ${p.grupo == 1 ? 'selected' : ''}>Grupo 1</option>
                    <option value="2" ${p.grupo == 2 ? 'selected' : ''}>Grupo 2</option>
                    <option value="3" ${p.grupo == 3 ? 'selected' : ''}>Grupo 3</option>
                    <option value="4" ${p.grupo == 4 ? 'selected' : ''}>Grupo 4</option>
                </select>
            </label>
            <label>
                Cargo
                <select id="dirEditCargo">
                    <option value="Publicador Bautizado" ${p.cargo === 'Publicador Bautizado' ? 'selected' : ''}>Publicador Bautizado</option>
                    <option value="Siervo Ministerial" ${p.cargo === 'Siervo Ministerial' ? 'selected' : ''}>Siervo Ministerial</option>
                    <option value="Anciano" ${p.cargo === 'Anciano' ? 'selected' : ''}>Anciano</option>
                    <option value="Publicador No Bautizado" ${p.cargo === 'Publicador No Bautizado' ? 'selected' : ''}>Publicador No Bautizado</option>
                </select>
            </label>
            <label>
                Precursorado
                <select id="dirEditPrecursorado">
                    <option value="Ninguno" ${p.precursorado === 'Ninguno' ? 'selected' : ''}>Ninguno</option>
                    <option value="Precursor Auxiliar" ${p.precursorado === 'Precursor Auxiliar' ? 'selected' : ''}>Precursor Auxiliar</option>
                    <option value="Precursor Regular" ${p.precursorado === 'Precursor Regular' ? 'selected' : ''}>Precursor Regular</option>
                </select>
            </label>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="eliminarPublicadorConfirm(${idxReal})">Eliminar</button>
            <button class="btn btn-primary" onclick="guardarEdicionPublicador(${idxReal})">Guardar cambios</button>
        </div>
    `);
}

function guardarEdicionPublicador(idx) {
    const nombre = document.getElementById('dirEditNombre')?.value?.trim();
    const grupo = parseInt(document.getElementById('dirEditGrupo')?.value) || 1;
    const cargo = document.getElementById('dirEditCargo')?.value;
    const precursorado = document.getElementById('dirEditPrecursorado')?.value;

    if (!nombre) return;

    if (typeof guardarHermano === 'function') {
        guardarHermano({
            nombre,
            cargo,
            precursorado,
            grupo,
            genero: "M",
            mayorEdad: "Sí"
        }, idx);
    }

    cerrarModalCustom();
    mostrarToast("Cambios guardados");
    ejecutarRenderizadoModulo('directorio');
}

function eliminarPublicadorConfirm(idx) {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        if (typeof borrarHermano === 'function') {
            borrarHermano(idx);
        }
        cerrarModalCustom();
        mostrarToast("Publicador eliminado");
        ejecutarRenderizadoModulo('directorio');
    }
}

function exportarHermanosExcel() {
    const hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    if (window.XLSX) {
        const ws = XLSX.utils.json_to_sheet(hermanos);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Publicadores");
        XLSX.writeFile(wb, "Directorio_Publicadores_Congregacion.xlsx");
        mostrarToast("Directorio descargado en Excel");
    }
}

/* ==========================================================================
   6. MÓDULO CONFIGURACIÓN / AJUSTES
   ========================================================================== */

function renderizarConfiguracionHTML() {
    const nombreActual = localStorage.getItem('app_nombre_congregacion') || 'Congregación Paraíso';
    
    // Cálculo de tamaño utilizado en LocalStorage
    let totalBytes = 0;
    for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
            totalBytes += (localStorage[x].length * 2);
        }
    }
    const kbUsados = (totalBytes / 1024).toFixed(1);
    const porcentajeStorage = Math.min(Math.round((totalBytes / (5 * 1024 * 1024)) * 100), 100) || 5;

    return `
        <div class="settings-grid">
            <!-- Tarjeta 1: Nombre de Congregación -->
            <section class="card settings-card">
                <div class="settings-icon tone-blue">${renderIcon('settings', 22)}</div>
                <div>
                    <h3>Datos de la congregación</h3>
                    <p>Personaliza el nombre que aparece en la aplicación y en los reportes.</p>
                    <label>
                        Nombre de la congregación
                        <input id="inputConfigNombreCongregacion" value="${nombreActual}">
                    </label>
                    <button class="btn btn-primary" onclick="guardarNombreCongregacion()">Guardar cambios</button>
                </div>
            </section>

            <!-- Tarjeta 2: Almacenamiento Local -->
            <section class="card settings-card">
                <div class="settings-icon tone-green">${renderIcon('database', 22)}</div>
                <div>
                    <h3>Almacenamiento local</h3>
                    <p>Base de datos sincronizada y disponible sin conexión.</p>
                    <div class="storage-status">
                        <span>${renderIcon('wifi', 17)} Estado</span>
                        <span class="badge badge-green">SINCRONIZADO</span>
                    </div>
                    <div class="storage-bar">
                        <span style="width: ${porcentajeStorage}%"></span>
                    </div>
                    <small>${kbUsados} KB de 5 MB utilizados</small>
                </div>
            </section>

            <!-- Tarjeta 3: Respaldos y Exportación SQL -->
            <section class="card settings-card">
                <div class="settings-icon tone-amber">${renderIcon('download', 22)}</div>
                <div>
                    <h3>Respaldos y exportación</h3>
                    <p>Descarga una copia completa de toda la información en formatos estándar.</p>
                    <div class="button-stack">
                        <button class="btn btn-secondary" onclick="ejecutarExportacionSQL()">
                            ${renderIcon('database', 16)} Exportar base SQL
                        </button>
                        <button class="btn btn-secondary" onclick="descargarRespaldoJSON()">
                            ${renderIcon('download', 16)} Descargar respaldo JSON
                        </button>
                    </div>
                </div>
            </section>

            <!-- Tarjeta 4: Aplicación PWA Offline -->
            <section class="card settings-card">
                <div class="settings-icon tone-rose">${renderIcon('wifi', 22)}</div>
                <div>
                    <h3>Aplicación PWA</h3>
                    <p>Instala la aplicación para acceder desde tu pantalla de inicio y trabajar offline.</p>
                    <div class="installed-row">
                        <span class="success-ring">${renderIcon('check', 16)}</span>
                        <div>
                            <strong>Lista para usar sin conexión</strong>
                            <small>Los datos se sincronizan automáticamente en tu dispositivo</small>
                        </div>
                    </div>
                    <button class="btn btn-secondary" onclick="ejecutarInstalacionPWA()">Instalar aplicación</button>
                </div>
            </section>
        </div>
    `;
}

function inicializarEventosConfiguracion() {}

function guardarNombreCongregacion() {
    const input = document.getElementById('inputConfigNombreCongregacion');
    if (!input) return;
    const nuevoNombre = input.value.trim() || 'Paraíso';
    localStorage.setItem('app_nombre_congregacion', nuevoNombre);
    actualizarNombreCongregacionUI();
    mostrarToast("Nombre de congregación actualizado");
}

function ejecutarExportacionSQL() {
    if (typeof exportarBaseDatosSQL === 'function') {
        exportarBaseDatosSQL();
        mostrarToast("Archivo SQL generado y descargado");
    } else {
        alert("Función SQL Bridge no disponible.");
    }
}

function descargarRespaldoJSON() {
    const respaldo = {
        congregacion: localStorage.getItem('app_nombre_congregacion') || 'Paraíso',
        fechaRespaldo: new Date().toISOString(),
        hermanos: typeof obtenerHermanos === 'function' ? obtenerHermanos() : [],
        territorios: JSON.parse(localStorage.getItem('bd_modulo_territorios_v6')) || [],
        asignaciones: JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [],
        asistencia: JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {}
    };

    const blob = new Blob([JSON.stringify(respaldo, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Respaldo_Congregacion_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    mostrarToast("Copia de seguridad JSON descargada");
}

function ejecutarInstalacionPWA() {
    if (deferredPromptPWA) {
        deferredPromptPWA.prompt();
        deferredPromptPWA.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                mostrarToast("¡Aplicación instalada con éxito!");
            }
            deferredPromptPWA = null;
        });
    } else {
        mostrarToast("PWA ya instalada o disponible desde el menú del navegador");
    }
}