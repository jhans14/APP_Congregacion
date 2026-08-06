function obtenerFiltrosTabla() {
    return {
        grupo: document.getElementById('filtro-grupo')?.value || '',
        genero: document.getElementById('filtro-genero')?.value || '',
        privilegio: document.getElementById('filtro-privilegio')?.value || '',
        precursorado: document.getElementById('filtro-precursorado')?.value || '',
        mayorEdad: document.getElementById('filtro-mayor-edad')?.value || '',
        ordenNombre: document.getElementById('orden-nombre')?.value || ''
    };
}

function toggleColumnMenu(menuId) {
    document.querySelectorAll('.column-menu').forEach(menu => {
        if (menu.id === menuId) {
            menu.classList.toggle('show');
        } else {
            menu.classList.remove('show');
        }
    });
}

function llenarOpcionesFiltros(hermanos) {
    const filtroGrupo = document.getElementById('filtro-grupo');
    const filtroGenero = document.getElementById('filtro-genero');
    const filtroPrivilegio = document.getElementById('filtro-privilegio');
    const filtroPrecursorado = document.getElementById('filtro-precursorado');

    if (!filtroGrupo || !filtroGenero || !filtroPrivilegio) return;

    const valorGrupo = filtroGrupo.value;
    const valorGenero = filtroGenero.value;
    const valorPrivilegio = filtroPrivilegio.value;
    const valorPrecursorado = filtroPrecursorado?.value || '';

    const grupos = [...new Set(hermanos.map(h => Number(h.grupo)).filter(g => !isNaN(g) && g > 0))].sort((a, b) => a - b);
    const generos = [...new Set(hermanos.map(h => h.genero).filter(Boolean))].sort();
    const cargos = ['Anciano', 'Siervo Ministerial', 'Publicador Bautizado', 'Publicador No Bautizado', 'Inactivo'];

    filtroGrupo.innerHTML = '<option value="">Todos</option>' + grupos.map(grupo => `<option value="${grupo}">Grupo ${grupo}</option>`).join('');
    filtroGenero.innerHTML = '<option value="">Todos</option>' + generos.map(genero => `<option value="${genero}">${genero === 'M' ? 'Masculino' : 'Femenino'}</option>`).join('');
    filtroPrivilegio.innerHTML = '<option value="">Todos</option>' + cargos.map(cargo => `<option value="${cargo}">${cargo}</option>`).join('');

    if (filtroPrecursorado) {
        filtroPrecursorado.innerHTML = `
            <option value="">Todos</option>
            <option value="Precursor Regular">Precursor Regular</option>
            <option value="Precursor Auxiliar">Precursor Auxiliar</option>
            <option value="Ninguno">Ninguno (No precursores)</option>
        `;
        filtroPrecursorado.value = valorPrecursorado;
    }

    filtroGrupo.value = valorGrupo;
    filtroGenero.value = valorGenero;
    filtroPrivilegio.value = valorPrivilegio;
    if (filtroPrecursorado) filtroPrecursorado.value = valorPrecursorado;
}

function aplicarFiltrosTabla() {
    actualizarTituloTabla();
    renderizarTablaHermanos();
}

function actualizarTituloTabla() {
    const titulo = document.getElementById('titulo-hermanos');
    if (!titulo) return;

    const grupoSeleccionado = document.getElementById('filtro-grupo')?.value || '';
    titulo.textContent = grupoSeleccionado
        ? `Grupo ${String(grupoSeleccionado).padStart(2, '0')}`
        : 'Congregación Paraíso de Carabayllo';
}

function limpiarFiltrosTabla() {
    const selects = document.querySelectorAll('.column-menu select');
    selects.forEach(select => select.value = '');
    document.querySelectorAll('.column-menu').forEach(menu => menu.classList.remove('show'));
    actualizarTituloTabla();
    renderizarTablaHermanos();
}

function exportarTablaExcel() {
    const hermanos = obtenerHermanos();
    const filtros = obtenerFiltrosTabla();
    const hermanosFiltrados = hermanos.reduce((acc, h, index) => {
        const coincideGrupo = !filtros.grupo || Number(h.grupo) === Number(filtros.grupo);
        const coincideGenero = !filtros.genero || h.genero === filtros.genero;
        const coincidePrivilegio = !filtros.privilegio || h.cargo === filtros.privilegio;
        const coincidePrecursorado = !filtros.precursorado || (h.precursorado || 'Ninguno') === filtros.precursorado;

        if (coincideGrupo && coincideGenero && coincidePrivilegio && coincidePrecursorado) {
            acc.push({ nombre: h.nombre, cargo: h.cargo || 'Ninguno', precursorado: h.precursorado || 'Ninguno', grupo: h.grupo, genero: h.genero, mayorEdad: h.mayorEdad, index });
        }
        return acc;
    }, []);

    const datos = hermanosFiltrados.map(h => ({
        Nombre: h.nombre,
        Cargo: h.cargo || 'Publicador Bautizado',
        Precursorado: h.precursorado || 'Ninguno',
        Grupo: h.grupo,
        Género: h.genero === 'M' ? 'Masculino' : 'Femenino',
        'Mayor Edad': h.mayorEdad
    }));

    if (typeof XLSX === 'undefined') {
        const encabezados = ['Nombre', 'Cargo', 'Precursorado', 'Grupo', 'Género', 'Mayor Edad'];
        const contenido = [encabezados.join(','), ...datos.map(h => [h.Nombre, h.Cargo, h.Precursorado, h.Grupo, h.Género, h['Mayor Edad']].map(valor => `"${String(valor).replace(/"/g, '""')}"`).join(','))].join('\n');
        const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'base-de-datos.csv';
        link.click();
        URL.revokeObjectURL(link.href);
        return;
    }

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Base de Datos');
    XLSX.writeFile(libro, `base-de-datos-${new Date().toISOString().slice(0, 10)}.xlsx`);
}

function renderizarTablaHermanos() {
    const hermanos = obtenerHermanos();
    const tbody = document.querySelector("#tabla-hermanos tbody");
    if(!tbody) return;

    llenarOpcionesFiltros(hermanos);

    const filtros = obtenerFiltrosTabla();
    const hermanosFiltrados = hermanos.reduce((acc, h, index) => {
        const coincideGrupo = !filtros.grupo || Number(h.grupo) === Number(filtros.grupo);
        const coincideGenero = !filtros.genero || h.genero === filtros.genero;
        const coincidePrivilegio = !filtros.privilegio || h.cargo === filtros.privilegio;
        const coincidePrecursorado = !filtros.precursorado || (h.precursorado || 'Ninguno') === filtros.precursorado;
        const coincideMayorEdad = !filtros.mayorEdad || (filtros.mayorEdad === 'si' ? h.mayorEdad === 'Sí' : h.mayorEdad !== 'Sí');

        if (coincideGrupo && coincideGenero && coincidePrivilegio && coincidePrecursorado && coincideMayorEdad) {
            acc.push({ ...h, index });
        }
        return acc;
    }, []);

    const hermanosOrdenados = [...hermanosFiltrados].sort((a, b) => {
        if (filtros.ordenNombre === 'asc') {
            return a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' });
        }
        if (filtros.ordenNombre === 'desc') {
            return b.nombre.localeCompare(a.nombre, 'es', { sensitivity: 'base' });
        }
        return 0;
    });

    if (hermanosOrdenados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">No hay registros con esos filtros.</td></tr>`;
        return;
    }

    tbody.innerHTML = hermanosOrdenados.map((h) => `
        <tr>
            <td>${h.nombre}</td>
            <td>${renderizarBadgeCargo(h.cargo || 'Publicador Bautizado')}</td>
            <td>${renderizarBadgePrecursorado(h.precursorado || 'Ninguno')}</td>
            <td>Grupo ${h.grupo}</td>
            <td>${h.genero}</td>
            <td>${h.mayorEdad}</td>
            <td>
                <button class="btn btn-sm btn-action btn-warning" onclick="abrirEdicion(${h.index})" title="Editar">✏️</button>
                <button class="btn btn-sm btn-action btn-danger" onclick="eliminarFila(${h.index})" title="Eliminar">🗑️</button>
            </td>
        </tr>
    `).join('');

    renderizarTablaInactivos();
}

function renderizarTablaInactivos() {
    const inactivos = obtenerHermanosInactivos();
    const tbody = document.querySelector('#tabla-inactivos tbody');
    if (!tbody) return;

    if (inactivos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No hay registros inactivos.</td></tr>';
        return;
    }

    tbody.innerHTML = inactivos.map((h, index) => `
        <tr>
            <td>${h.nombre}</td>
            <td><span class="badge badge-inactivo">Inactivo</span></td>
            <td>Grupo ${h.grupo}</td>
            <td>${h.genero}</td>
            <td>${h.mayorEdad}</td>
            <td>
                <button class="btn btn-sm btn-action btn-warning" onclick="abrirEdicion(${index}, 'inactivo')" title="Editar">✏️</button>
                <button class="btn btn-sm btn-action btn-danger" onclick="eliminarFilaInactivo(${index})" title="Eliminar">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function renderizarBadgeCargo(cargo) {
    const clase = obtenerClaseCargo(cargo);
    return `<span class="badge ${clase}">${cargo}</span>`;
}

function renderizarBadgePrecursorado(precursorado) {
    const clase = obtenerClasePrecursorado(precursorado);
    return `<span class="badge ${clase}">${precursorado}</span>`;
}

function obtenerClaseCargo(cargo) {
    switch (cargo) {
        case 'Anciano': return 'badge-anciano';
        case 'Siervo Ministerial': return 'badge-siervo';
        case 'Publicador Bautizado': return 'badge-publicador-bautizado';
        case 'Publicador No Bautizado': return 'badge-publicador-no-bautizado';
        case 'Inactivo': return 'badge-inactivo';
        default: return 'badge-publicador-bautizado';
    }
}

function obtenerClasePrecursorado(precursorado) {
    switch (precursorado) {
        case 'Precursor Auxiliar': return 'badge-precursor-auxiliar';
        case 'Precursor Regular': return 'badge-precursor-regular';
        default: return 'badge-precursor-ninguno';
    }
}

function eliminarFila(index) {
    if(confirm("¿Seguro que deseas eliminar este registro?")) {
        borrarHermano(index);
        renderizarTablaHermanos();
    }
}

function eliminarFilaInactivo(index) {
    if(confirm("¿Seguro que deseas eliminar este registro inactivo?")) {
        borrarHermanoInactivo(index);
        renderizarTablaHermanos();
    }
}