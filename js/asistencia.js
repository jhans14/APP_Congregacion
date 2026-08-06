// --- MÓDULO DE ASISTENCIA INTERACTIVA POR FECHAS (PLANO EXACTO Y LIMPIO) ---

let baseDatosAsistenciasPorFecha = JSON.parse(localStorage.getItem('bd_asistencia_fechas_v1')) || {};
let modalGuardarInstancia = null;

function inicializarModuloAsistencia() {
    modalGuardarInstancia = new bootstrap.Modal(document.getElementById('modalGuardarAsistencia'));
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

    // 1. FILA SUPERIOR (PLATAFORMA): Asientos en columna 1 y columna 5
    let filaPlat = document.createElement('div');
    filaPlat.className = "d-flex justify-content-center gap-3 mb-4 w-100";
    
    for (let col = 1; col <= 8; col++) {
        let colDiv = document.createElement('div');
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
            colDiv.style.width = "34px";
            colDiv.style.display = "flex";
            colDiv.style.justifyContent = "center";

            // En la última fila (10), agregamos un asiento extra aislado en la primera columna izquierda
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

        // --- SECCIÓN CENTRAL (8 columnas perfectamente separadas) ---
        let secCent = document.createElement('div');
        secCent.className = "d-flex gap-1";
        
        // Si estamos en la última fila (10), solo pintamos 1 asiento en la columna 5
        let totalColumnasCentro = (fila === 10) ? 8 : 8; 

        for (let c = 1; c <= 8; c++) {
            let colDiv = document.createElement('div');
            colDiv.style.width = "34px";
            colDiv.style.display = "flex";
            colDiv.style.justifyContent = "center";

            let pintarAsiento = true;
            if (fila === 10) {
                // En la fila 10, solo se dibuja el asiento si es exactamente la columna 5
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
            colDiv.style.width = "34px";
            colDiv.style.display = "flex";
            colDiv.style.justifyContent = "center";

            // En la última fila (10), colocamos 2 asientos en las últimas columnas separadas
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
    btnAsiento.className = `btn btn-sm text-white ${ocupado ? 'bg-danger' : 'bg-success'}`;
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
    let ocupados = Object.values(estadoDia).filter(val => val === true).length;
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

    document.getElementById('modalTextoFechaGuardar').textContent = fechaFormateada;
    
    let total = window._totalAsientosAforo || 0;
    let estadoDia = obtenerEstadoAsientosActuales();
    let ocupados = Object.values(estadoDia).filter(val => val === true).length;
    
    document.getElementById('modalResumenOcupados').textContent = ocupados;
    document.getElementById('modalResumenLibres').textContent = total - ocupados;

    // Cargar datos de parados y zoom si ya se habían registrado para esta fecha
    document.getElementById('inputParados').value = estadoDia._parados || 0;
    document.getElementById('inputZoom').value = estadoDia._zoom || 0;

    modalGuardarInstancia.show();
}

function confirmarGuardadoAsistenciaHistorial() {
    let fecha = obtenerFechaSeleccionada();
    if (!baseDatosAsistenciasPorFecha[fecha]) {
        baseDatosAsistenciasPorFecha[fecha] = {};
    }

    // Guardar también los valores adicionales ingresados
    baseDatosAsistenciasPorFecha[fecha]._parados = parseInt(document.getElementById('inputParados').value) || 0;
    baseDatosAsistenciasPorFecha[fecha]._zoom = parseInt(document.getElementById('inputZoom').value) || 0;

    localStorage.setItem('bd_asistencia_fechas_v1', JSON.stringify(baseDatosAsistenciasPorFecha));
    modalGuardarInstancia.hide();

    alert("✅ ¡Asistencia guardada correctamente con éxito!");
    
    // Limpieza automática de la pantalla para un nuevo conteo limpio
    delete baseDatosAsistenciasPorFecha[fecha];
    localStorage.setItem('bd_asistencia_fechas_v1', JSON.stringify(baseDatosAsistenciasPorFecha));
    renderizarMapaAsientos();
    actualizarContadoresAsistencia();
}