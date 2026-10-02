// ==========================================================================
// MÓDULO DE CUENTA Y AJUSTES (Configuración, Apariencia y Gestión de Datos)
// ==========================================================================

let modalCongregacionInstancia = null; // Instancia global para controlar el modal de configuración

/* --------------------------------------------------------------------------
   1. GESTIÓN DE APARIENCIA (Manejo del Modo Oscuro)
   -------------------------------------------------------------------------- */

/** Alterna el estado del modo oscuro y guarda la preferencia localmente */
function toggleModoOscuro(element) {
    let activo = element.checked;
    localStorage.setItem('app_modo_oscuro', activo); // Guarda la preferencia del usuario
    aplicarEstiloModoOscuro(activo);
}

/** Aplica o remueve la clase global 'modo-oscuro' al body del documento */
function aplicarEstiloModoOscuro(activo) {
    if (activo) {
        document.body.classList.add('modo-oscuro');
    } else {
        document.body.classList.remove('modo-oscuro');
    }
}

/** Evento al cargar la página: aplica el tema guardado anteriormente */
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('app_modo_oscuro') === 'true') {
        let check = document.getElementById('checkModoOscuro');
        if (check) check.checked = true;
        aplicarEstiloModoOscuro(true);
    }
});


/* --------------------------------------------------------------------------
   2. GESTIÓN DE CONGREGACIÓN (Cambio de nombres y configuración)
   -------------------------------------------------------------------------- */

/** Inicializa y muestra el modal de Bootstrap para renombrar la congregación */
function abrirModalNombreCongregacion() {
    let modalEl = document.getElementById('modalCambiarCongregacion');
    if (modalEl) {
        modalCongregacionInstancia = new bootstrap.Modal(modalEl);
        let inputNombre = document.getElementById('inputNuevoNombreCongregacion');
        if (inputNombre) {
            // Carga el nombre actual guardado o un valor por defecto
            inputNombre.value = localStorage.getItem('app_nombre_congregacion') || 'Paraíso de Carabayllo';
        }
        modalCongregacionInstancia.show();
    }
}

/** Valida, guarda el nuevo nombre de la congregación y reinicia la app */
function guardarNuevoNombreCongregacion() {
    let inputNombre = document.getElementById('inputNuevoNombreCongregacion');
    if (!inputNombre) return;

    let nuevoNombre = inputNombre.value.trim();
    if (nuevoNombre === "") {
        alert("⚠️ Por favor ingresa un nombre válido.");
        return;
    }

    localStorage.setItem('app_nombre_congregacion', nuevoNombre); // Persistencia del nuevo nombre

    if (modalCongregacionInstancia) {
        modalCongregacionInstancia.hide(); // Cierra el modal tras el guardado
    }

    alert(`✅ Congregación actualizada a: ${nuevoNombre}`);
    location.reload(); // Recarga para actualizar etiquetas en toda la UI
}


/* --------------------------------------------------------------------------
   3. GESTIÓN DE BASE DE DATOS (Respaldos JSON y Exportación SQL)
   -------------------------------------------------------------------------- */

/** Retorna estadísticas consolidadas del motor de base de datos */
function obtenerEstadisticasBD() {
    let hermanosAct = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    let hermanosInact = typeof obtenerHermanosInactivos === 'function' ? obtenerHermanosInactivos() : [];
    let asignaciones = JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [];
    let territorios = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6'));
    if (!territorios || territorios.length === 0) {
        if (typeof inicializar54Territorios === 'function') {
            territorios = inicializar54Territorios();
            localStorage.setItem('bd_modulo_territorios_v6', JSON.stringify(territorios));
        } else {
            territorios = [];
        }
    }
    let asistencia = JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {};
    let fechasAsistencia = Object.keys(asistencia).length;

    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let k = localStorage.key(i);
        totalBytes += (k.length + (localStorage.getItem(k) || '').length) * 2;
    }
    let tamanoKb = (totalBytes / 1024).toFixed(1);

    return {
        activos: hermanosAct.length,
        inactivos: hermanosInact.length,
        totalHermanos: hermanosAct.length + hermanosInact.length,
        asignaciones: asignaciones.length,
        territorios: territorios.length,
        asistencias: fechasAsistencia,
        tamanoKb: tamanoKb
    };
}

/** Exporta todo el contenido activo a un script SQL compatible con MySQL, MariaDB y SQLite */
function exportarBaseDatosSQL() {
    let nombreCongregacion = localStorage.getItem('app_nombre_congregacion') || 'Paraíso de Carabayllo';
    let fechaHoy = new Date().toISOString().split('T')[0];
    
    let hermanos = typeof obtenerHermanos === 'function' ? obtenerHermanos() : [];
    let hermanosInactivos = typeof obtenerHermanosInactivos === 'function' ? obtenerHermanosInactivos() : [];
    let asignaciones = JSON.parse(localStorage.getItem('bd_asignaciones_v16')) || [];
    let territorios = JSON.parse(localStorage.getItem('bd_modulo_territorios_v6'));
    if (!territorios || territorios.length === 0) {
        if (typeof inicializar54Territorios === 'function') {
            territorios = inicializar54Territorios();
            localStorage.setItem('bd_modulo_territorios_v6', JSON.stringify(territorios));
        } else {
            territorios = [];
        }
    }
    let asistencia = JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {};

    let sql = `-- =====================================================================\n`;
    sql += `-- BASE DE DATOS RELACIONAL - CONGREGACIÓN: ${nombreCongregacion.toUpperCase()}\n`;
    sql += `-- Exportado el: ${fechaHoy} a las ${new Date().toLocaleTimeString()}\n`;
    sql += `-- Compatible con: MySQL 5.7+, MySQL 8+, MariaDB, phpMyAdmin, SQLite 3\n`;
    sql += `-- =====================================================================\n\n`;
    sql += `CREATE DATABASE IF NOT EXISTS db_congregacion CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n`;
    sql += `USE db_congregacion;\n\n`;

    // 1. Hermanos Activos
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `-- Tabla: hermanos_activos (${hermanos.length} registros)\n`;
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `CREATE TABLE IF NOT EXISTS hermanos_activos (\n`;
    sql += `    id INT AUTO_INCREMENT PRIMARY KEY,\n`;
    sql += `    nombre VARCHAR(150) NOT NULL,\n`;
    sql += `    cargo VARCHAR(60) NOT NULL,\n`;
    sql += `    precursorado VARCHAR(60) NOT NULL,\n`;
    sql += `    grupo INT NOT NULL,\n`;
    sql += `    genero ENUM('M', 'F') NOT NULL,\n`;
    sql += `    mayor_edad VARCHAR(5) NOT NULL\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

    if (hermanos.length > 0) {
        sql += `INSERT INTO hermanos_activos (nombre, cargo, precursorado, grupo, genero, mayor_edad) VALUES\n`;
        let filasH = hermanos.map(h => {
            let n = (h.nombre || '').replace(/'/g, "''");
            let c = (h.cargo || 'Publicador Bautizado').replace(/'/g, "''");
            let p = (h.precursorado || 'Ninguno').replace(/'/g, "''");
            let g = parseInt(h.grupo) || 1;
            let gen = (h.genero === 'F' ? 'F' : 'M');
            let m = (h.mayorEdad || 'Sí').replace(/'/g, "''");
            return `('${n}', '${c}', '${p}', ${g}, '${gen}', '${m}')`;
        });
        sql += filasH.join(',\n') + ';\n\n';
    }

    // 2. Hermanos Inactivos
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `-- Tabla: hermanos_inactivos (${hermanosInactivos.length} registros)\n`;
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `CREATE TABLE IF NOT EXISTS hermanos_inactivos (\n`;
    sql += `    id INT AUTO_INCREMENT PRIMARY KEY,\n`;
    sql += `    nombre VARCHAR(150) NOT NULL,\n`;
    sql += `    cargo VARCHAR(60) NOT NULL,\n`;
    sql += `    precursorado VARCHAR(60) NOT NULL,\n`;
    sql += `    grupo INT NOT NULL,\n`;
    sql += `    genero ENUM('M', 'F') NOT NULL,\n`;
    sql += `    mayor_edad VARCHAR(5) NOT NULL\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

    if (hermanosInactivos.length > 0) {
        sql += `INSERT INTO hermanos_inactivos (nombre, cargo, precursorado, grupo, genero, mayor_edad) VALUES\n`;
        let filasHI = hermanosInactivos.map(h => {
            let n = (h.nombre || '').replace(/'/g, "''");
            let c = (h.cargo || 'Inactivo').replace(/'/g, "''");
            let p = (h.precursorado || 'Ninguno').replace(/'/g, "''");
            let g = parseInt(h.grupo) || 1;
            let gen = (h.genero === 'F' ? 'F' : 'M');
            let m = (h.mayorEdad || 'Sí').replace(/'/g, "''");
            return `('${n}', '${c}', '${p}', ${g}, '${gen}', '${m}')`;
        });
        sql += filasHI.join(',\n') + ';\n\n';
    }

    // 3. Asignaciones
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `-- Tabla: asignaciones (${asignaciones.length} registros)\n`;
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `CREATE TABLE IF NOT EXISTS asignaciones (\n`;
    sql += `    id VARCHAR(50) PRIMARY KEY,\n`;
    sql += `    fecha DATE NOT NULL,\n`;
    sql += `    numero INT NOT NULL,\n`;
    sql += `    tipo VARCHAR(100) NOT NULL,\n`;
    sql += `    estudiante VARCHAR(150) NOT NULL,\n`;
    sql += `    ayudante VARCHAR(150) DEFAULT '',\n`;
    sql += `    cumplio VARCHAR(30) DEFAULT 'pendiente',\n`;
    sql += `    reemplazo VARCHAR(150) DEFAULT '',\n`;
    sql += `    ayudante_cumplio BOOLEAN DEFAULT TRUE,\n`;
    sql += `    reemplazo_ayudante VARCHAR(150) DEFAULT ''\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

    if (asignaciones.length > 0) {
        sql += `INSERT INTO asignaciones (id, fecha, numero, tipo, estudiante, ayudante, cumplio, reemplazo, ayudante_cumplio, reemplazo_ayudante) VALUES\n`;
        let filasA = asignaciones.map(a => {
            let id = (a.id || '').replace(/'/g, "''");
            let f = (a.fecha || '2026-01-01');
            let num = parseInt(a.numero) || 3;
            let t = (a.tipo || '').replace(/'/g, "''");
            let est = (a.estudiante || '').replace(/'/g, "''");
            let ayu = (a.ayudante || '').replace(/'/g, "''");
            let c = (a.cumplio || 'pendiente').replace(/'/g, "''");
            let r = (a.reemplazo || '').replace(/'/g, "''");
            let ac = a.ayudanteCumplio !== false ? 1 : 0;
            let ra = (a.reemplazoAyudante || '').replace(/'/g, "''");
            return `('${id}', '${f}', ${num}, '${t}', '${est}', '${ayu}', '${c}', '${r}', ${ac}, '${ra}')`;
        });
        sql += filasA.join(',\n') + ';\n\n';
    }

    // 4. Territorios
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `-- Tabla: territorios (${territorios.length} tarjetas de territorio)\n`;
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `CREATE TABLE IF NOT EXISTS territorios (\n`;
    sql += `    numero INT PRIMARY KEY,\n`;
    sql += `    responsable VARCHAR(150) DEFAULT '',\n`;
    sql += `    fecha_salida DATE DEFAULT NULL,\n`;
    sql += `    estado VARCHAR(30) DEFAULT 'disponible'\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

    if (territorios.length > 0) {
        sql += `INSERT INTO territorios (numero, responsable, fecha_salida, estado) VALUES\n`;
        let filasT = territorios.map(t => {
            let num = parseInt(t.num || t.numero) || 1;
            let resp = (t.responsable || '').replace(/'/g, "''");
            let fs = t.fecha ? `'${t.fecha}'` : 'NULL';
            let est = (t.responsable ? 'asignado' : 'disponible');
            return `(${num}, '${resp}', ${fs}, '${est}')`;
        });
        sql += filasT.join(',\n') + ';\n\n';
    }

    // 5. Asistencia
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `-- Tabla: asistencia a reuniones (${Object.keys(asistencia).length} fechas)\n`;
    sql += `-- -------------------------------------------------------------------\n`;
    sql += `CREATE TABLE IF NOT EXISTS asistencia (\n`;
    sql += `    fecha DATE PRIMARY KEY,\n`;
    sql += `    total_asistentes INT NOT NULL DEFAULT 0,\n`;
    sql += `    dia_semana VARCHAR(30) DEFAULT '',\n`;
    sql += `    asientos_ocupados INT DEFAULT 0\n`;
    sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

    let fechasAsis = Object.keys(asistencia);
    if (fechasAsis.length > 0) {
        sql += `INSERT INTO asistencia (fecha, total_asistentes, dia_semana, asientos_ocupados) VALUES\n`;
        let filasAsis = fechasAsis.map(f => {
            let item = asistencia[f];
            let tot = typeof item === 'object' ? (parseInt(item.total) || 0) : (parseInt(item) || 0);
            let dia = typeof item === 'object' && item.dia ? item.dia : '';
            let asientos = typeof item === 'object' && item.asientos ? item.asientos.length : tot;
            return `('${f}', ${tot}, '${dia}', ${asientos})`;
        });
        sql += filasAsis.join(',\n') + ';\n\n';
    }

    // Descarga directa del archivo .sql
    let blob = new Blob([sql], { type: 'text/sql;charset=utf-8;' });
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    let nombreArchivo = `bd_${nombreCongregacion.toLowerCase().replace(/\s+/g, '_')}_${fechaHoy}.sql`;
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/** Exporta todo el localStorage a un archivo .json para seguridad del usuario */
function exportarDatosRespaldo() {
    let nombreCongregacion = localStorage.getItem('app_nombre_congregacion') || 'congregacion';
    let nombreLimpio = nombreCongregacion.toLowerCase().replace(/\s+/g, '_');
    
    let datosBackup = {};
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        datosBackup[clave] = localStorage.getItem(clave);
    }

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(datosBackup, null, 2));
    let downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `respaldo_${nombreLimpio}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

/** Lee un archivo .json externo y sobrescribe el localStorage local */
function cambiarBaseDeDatosCongregacion(event) {
    let archivo = event.target.files[0];
    if (!archivo) return;

    let lector = new FileReader();
    lector.onload = function(e) {
        try {
            let datosRestaurados = JSON.parse(e.target.result);
            Object.keys(datosRestaurados).forEach(clave => {
                localStorage.setItem(clave, datosRestaurados[clave]);
            });

            alert("✅ ¡Base de datos cargada con éxito! La aplicación se actualizará.");
            location.reload();
        } catch (error) {
            alert("❌ Error al leer el archivo JSON de la congregación.");
        }
    };
    lector.readAsText(archivo);
}