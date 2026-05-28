// ============================================
// SCRIPT SEGUIMIENTO - Tutorías Académicas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initModalFeedback();
    initFormFeedback();
    initFiltroSesiones();
    initRangeValue();
});

// --- Modal de Retroalimentación ---
function initModalFeedback() {
    const modal = document.getElementById('modal-retroalimentacion');
    const botonesVer = document.querySelectorAll('.btn-ver-feedback');
    const closeBtn = document.querySelector('.close-modal');

    // Datos de retroalimentación simulados
    const dataRetroalimentacion = {
        1: {
            materia: 'Matemática - Cálculo Diferencial',
            docente: 'Prof. Carlos García',
            fecha: '28 de Mayo, 2026',
            retroalimentacion: [
                {
                    aspecto: 'Comprensión de Conceptos',
                    calificacion: 8.5,
                    comentario: 'Excelente comprensión de las derivadas parciales. Sugiero profundizar más en las aplicaciones prácticas.'
                },
                {
                    aspecto: 'Resolución de Problemas',
                    calificacion: 8,
                    comentario: 'Buen desempeño en los ejercicios. Trabajar más en la presentación ordenada de los pasos.'
                },
                {
                    aspecto: 'Participación',
                    calificacion: 9,
                    comentario: 'Muy activo y participativo. ¡Excelente actitud!'
                }
            ]
        },
        2: {
            materia: 'Inglés - Escritura Académica',
            docente: 'Prof. María López',
            fecha: '26 de Mayo, 2026',
            retroalimentacion: [
                {
                    aspecto: 'Estructura de Ensayos',
                    calificacion: 8,
                    comentario: 'Has mejorado significativamente en la organización de tus ideas. Mantén este nivel.'
                },
                {
                    aspecto: 'Gramática y Vocabulario',
                    calificacion: 7.5,
                    comentario: 'Buen uso de vocabulario académico. Revisar concordancia verbal en algunos párrafos.'
                }
            ]
        },
        3: {
            materia: 'Programación - Python Avanzado',
            docente: 'Prof. Juan Martínez',
            fecha: '24 de Mayo, 2026',
            retroalimentacion: [
                {
                    aspecto: 'Lógica de Programación',
                    calificacion: 9,
                    comentario: 'Excelente manejo de programación orientada a objetos. Código limpio y bien estructurado.'
                },
                {
                    aspecto: 'Manejo de Excepciones',
                    calificacion: 8.5,
                    comentario: 'Muy bien. Tus excepciones están bien manejadas. Considera agregar más validaciones.'
                },
                {
                    aspecto: 'Documentación',
                    calificacion: 7,
                    comentario: 'Mejorar en la documentación del código. Agregar más comentarios explicativos.'
                }
            ]
        }
    };

    // Abrir modal
    botonesVer.forEach(btn => {
        btn.addEventListener('click', function() {
            const sesionId = this.getAttribute('data-sesion');
            const datos = dataRetroalimentacion[sesionId];

            if (datos) {
                mostrarRetroalimentacion(datos);
                modal.style.display = 'flex';
            }
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function mostrarRetroalimentacion(datos) {
        const contenido = document.getElementById('contenido-retroalimentacion');
        let html = `
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #eee;">
                <h3 style="margin: 0 0 10px 0;">${datos.materia}</h3>
                <p style="margin: 5px 0; color: #666;"><strong>Docente:</strong> ${datos.docente}</p>
                <p style="margin: 5px 0; color: #666;"><strong>Fecha:</strong> ${datos.fecha}</p>
            </div>
        `;

        datos.retroalimentacion.forEach(item => {
            html += `
                <div class="feedback-item">
                    <div class="feedback-header">
                        <h4>${item.aspecto}</h4>
                        <span class="feedback-rating">${item.calificacion}/10</span>
                    </div>
                    <p class="feedback-text">${item.comentario}</p>
                </div>
            `;
        });

        contenido.innerHTML = html;
    }
}

// --- Formulario de Retroalimentación ---
function initFormFeedback() {
    const formulario = document.getElementById('formulario-retroalimentacion');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const sesion = document.getElementById('sesion-select').value;
        const calificacion = document.getElementById('calificacion').value;
        const aspectos = Array.from(document.querySelectorAll('input[name="aspectos"]:checked'))
            .map(cb => cb.value);
        const comentarios = document.getElementById('comentarios').value;

        // Validaciones
        if (!sesion) {
            mostrarMensajeFormulario('Por favor selecciona una sesión', 'error');
            return;
        }

        if (aspectos.length === 0) {
            mostrarMensajeFormulario('Selecciona al menos un aspecto', 'error');
            return;
        }

        if (!comentarios.trim()) {
            mostrarMensajeFormulario('Por favor comparte tus comentarios', 'error');
            return;
        }

        // Simular envío
        mostrarMensajeFormulario('Enviando retroalimentación...', 'info');

        setTimeout(() => {
            // Guardar en localStorage (simulación)
            const feedback = {
                sesion,
                calificacion,
                aspectos,
                comentarios,
                fecha: new Date().toLocaleString('es-ES')
            };

            let feedbackGuardado = JSON.parse(localStorage.getItem('feedbackGuardado') || '[]');
            feedbackGuardado.push(feedback);
            localStorage.setItem('feedbackGuardado', JSON.stringify(feedbackGuardado));

            mostrarMensajeFormulario('¡Retroalimentación enviada exitosamente!', 'success');
            formulario.reset();
            document.getElementById('valor-calificacion').textContent = '5';
        }, 1000);
    });

    function mostrarMensajeFormulario(mensaje, tipo) {
        const mensajeAnterior = document.querySelector('.mensaje-formulario');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }

        const div = document.createElement('div');
        div.className = `mensaje-formulario mensaje-${tipo}`;
        div.textContent = mensaje;
        div.style.cssText = `
            padding: 15px 20px;
            margin: 15px 0;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
            animation: slideDown 0.3s ease;
        `;

        if (tipo === 'error') {
            div.style.backgroundColor = '#f8d7da';
            div.style.color = '#721c24';
            div.style.border = '1px solid #f5c6cb';
        } else if (tipo === 'success') {
            div.style.backgroundColor = '#d4edda';
            div.style.color = '#155724';
            div.style.border = '1px solid #c3e6cb';
        } else if (tipo === 'info') {
            div.style.backgroundColor = '#d1ecf1';
            div.style.color = '#0c5460';
            div.style.border = '1px solid #bee5eb';
        }

        formulario.insertBefore(div, formulario.firstChild);

        if (tipo !== 'info') {
            setTimeout(() => div.remove(), 4000);
        }
    }
}

// --- Filtro de Sesiones ---
function initFiltroSesiones() {
    const buscarInput = document.getElementById('buscar-sesion');
    const filtroSelect = document.getElementById('filtro-materia');
    const sesiones = document.querySelectorAll('.sesion-item');

    function filtrarSesiones() {
        const termino = buscarInput.value.toLowerCase();
        const materia = filtroSelect.value;

        sesiones.forEach(sesion => {
            const texto = sesion.textContent.toLowerCase();
            const tituloMateria = sesion.querySelector('h3').textContent.toLowerCase();

            const coincideTexto = termino === '' || texto.includes(termino);
            const coincideMateria = materia === '' || tituloMateria.includes(materia);

            if (coincideTexto && coincideMateria) {
                sesion.style.display = 'block';
                sesion.style.animation = 'fadeIn 0.3s ease';
            } else {
                sesion.style.display = 'none';
            }
        });
    }

    buscarInput.addEventListener('input', filtrarSesiones);
    filtroSelect.addEventListener('change', filtrarSesiones);
}

// --- Actualizar valor del rango ---
function initRangeValue() {
    const rangeInput = document.getElementById('calificacion');
    const valorSpan = document.getElementById('valor-calificacion');

    if (rangeInput) {
        rangeInput.addEventListener('input', function() {
            valorSpan.textContent = this.value;
        });
    }
}

// Agregar animación CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
