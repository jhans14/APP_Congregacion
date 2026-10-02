function renderizarModalHermano() {
    // Si ya existe el modal, no lo dupliques
    if (document.getElementById('modalHermano')) return;

    const modalHTML = `
    <div class="modal fade" id="modalHermano" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Gestionar Hermano</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="editIndex" value="-1">
                    <input type="hidden" id="editTipo" value="activo">
                    
                    <label>Apellido y Nombre</label>
                    <input type="text" id="inNombre" class="form-control mb-2">
                    
                    <label>Cargo</label>
                    <select id="inCargo" class="form-select mb-2" onchange="sincronizarCargoFormulario()">
                        <option value="Anciano">Anciano</option>
                        <option value="Siervo Ministerial">Siervo Ministerial</option>
                        <option value="Publicador Bautizado">Publicador Bautizado</option>
                        <option value="Publicador No Bautizado">Publicador No Bautizado</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>

                    <label>Precursorado</label>
                    <select id="inPrecursorado" class="form-select mb-2">
                        <option value="Ninguno">Ninguno</option>
                        <option value="Precursor Regular">Precursor Regular</option>
                        <option value="Precursor Auxiliar">Precursor Auxiliar</option>
                    </select>

                    <label>Grupo</label>
                    <input type="number" id="inGrupo" class="form-control mb-2">
                    
                    <label>Género</label>
                    <select id="inGenero" class="form-select mb-2">
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>

                    <label>¿Es mayor de edad?</label>
                    <select id="inMayorEdad" class="form-select">
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="guardarDatos()">Guardar</button>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}