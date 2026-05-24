const formulario = document.getElementById('tutorias-form');
const tbody = document.getElementById('tutorias-tbody');
const STORAGE_KEY = 'tutoriasProgramadas';

const estadoBadge = (estado) => {
    if (estado === 'Confirmada') return '<span class="badge bg-success">Confirmada</span>';
    if (estado === 'Pendiente') return '<span class="badge bg-warning text-dark">Pendiente</span>';
    return '<span class="badge bg-secondary">Sin estado</span>';
};

const crearFila = (tutoria, index) => {
    const row = document.createElement('tr');
    row.dataset.index = index;
    row.innerHTML = `
        <td>${tutoria.estudiante}</td>
        <td>${tutoria.docente}</td>
        <td>${tutoria.materia}</td>
        <td>${tutoria.fecha}</td>
        <td>${tutoria.hora}</td>
        <td>${estadoBadge(tutoria.estado)}</td>
        <td>
            <button type="button" class="btn btn-sm btn-outline-secondary me-2 btn-editar"><i class="bi bi-pencil"></i> Editar</button>
            <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar"><i class="bi bi-trash"></i> Eliminar</button>
        </td>
    `;
    return row;
};

const guardarTutorias = (tutorias) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tutorias));
};

const cargarTutorias = () => {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
};

const renderizarTutorias = () => {
    tbody.innerHTML = '';
    const tutorias = cargarTutorias();
    tutorias.forEach((tutoria, index) => tbody.appendChild(crearFila(tutoria, index)));
};

const limpiarFormulario = () => {
    formulario.reset();
};

const validarCampos = (formData) => {
    return formData.estudiante && formData.docente && formData.materia && formData.fecha && formData.hora && formData.objetivo;
};

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const tutoria = {
        estudiante: document.getElementById('estudiante').value.trim(),
        docente: document.getElementById('docente').value.trim(),
        materia: document.getElementById('materia').value.trim(),
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        objetivo: document.getElementById('objetivo').value.trim(),
        estado: 'Pendiente'
    };

    if (!validarCampos(tutoria)) {
        alert('Por favor completa todos los campos antes de agregar la tutoría.');
        return;
    }

    const tutorias = cargarTutorias();
    tutorias.push(tutoria);
    guardarTutorias(tutorias);
    renderizarTutorias();
    limpiarFormulario();
});

tbody.addEventListener('click', (event) => {
    const target = event.target.closest('button');
    if (!target) return;

    const fila = target.closest('tr');
    const index = Number(fila.dataset.index);
    const tutorias = cargarTutorias();

    if (target.classList.contains('btn-eliminar')) {
        tutorias.splice(index, 1);
        guardarTutorias(tutorias);
        renderizarTutorias();
    }

    if (target.classList.contains('btn-editar')) {
        const tutoria = tutorias[index];
        document.getElementById('estudiante').value = tutoria.estudiante;
        document.getElementById('docente').value = tutoria.docente;
        document.getElementById('materia').value = tutoria.materia;
        document.getElementById('fecha').value = tutoria.fecha;
        document.getElementById('hora').value = tutoria.hora;
        document.getElementById('objetivo').value = tutoria.objetivo;
        tutorias.splice(index, 1);
        guardarTutorias(tutorias);
        renderizarTutorias();
    }
});

renderizarTutorias();
