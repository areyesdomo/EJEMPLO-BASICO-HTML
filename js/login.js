// ============================================
// SCRIPT LOGIN - Sistema de Tutorías Académicas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const formularioLogin = document.getElementById('formulario-login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const recordarCheckbox = document.getElementById('recordar');

    // Cargar datos guardados si existen
    if (localStorage.getItem('email-guardado')) {
        emailInput.value = localStorage.getItem('email-guardado');
        recordarCheckbox.checked = true;
    }

    // Manejar envío del formulario
    formularioLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validaciones básicas
        if (!email || !password) {
            mostrarMensaje('Por favor completa todos los campos', 'error');
            return;
        }

        if (!validarEmail(email)) {
            mostrarMensaje('Por favor ingresa un email válido', 'error');
            return;
        }

        if (password.length < 6) {
            mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        // Guardar email si el usuario lo desea
        if (recordarCheckbox.checked) {
            localStorage.setItem('email-guardado', email);
        } else {
            localStorage.removeItem('email-guardado');
        }

        // Simular envío del formulario (en producción esto iría a un servidor)
        mostrarMensaje('¡Iniciando sesión...', 'success');
        
        // Simular redirección después de 1.5 segundos
        setTimeout(function() {
            // Aquí irías al panel principal o donde corresponda
            // window.location.href = 'dashboard.html';
            mostrarMensaje('¡Sesión iniciada exitosamente!', 'success');
            console.log('Login exitoso con:', email);
        }, 1500);
    });

    // Manejar clic en "¿Olvidaste tu contraseña?"
    const olvidastePassword = document.querySelector('.olvidaste-password');
    if (olvidastePassword) {
        olvidastePassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('Ingresa tu correo electrónico para recuperar tu contraseña:');
            if (email && validarEmail(email)) {
                mostrarMensaje('Se ha enviado un enlace de recuperación a ' + email, 'success');
            } else if (email) {
                mostrarMensaje('Por favor ingresa un email válido', 'error');
            }
        });
    }

    // Validar formato de email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Mostrar mensaje al usuario
    function mostrarMensaje(mensaje, tipo) {
        // Eliminar mensajes anteriores
        const mensajeAnterior = document.querySelector('.mensaje-login');
        if (mensajeAnterior) {
            mensajeAnterior.remove();
        }

        // Crear nuevo mensaje
        const div = document.createElement('div');
        div.className = `mensaje-login mensaje-${tipo}`;
        div.textContent = mensaje;
        
        // Insertar después del formulario
        formularioLogin.parentElement.insertBefore(div, formularioLogin.nextSibling);

        // Eliminar mensaje después de 4 segundos si es error o 3 segundos si es éxito
        const duracion = tipo === 'success' ? 3000 : 4000;
        setTimeout(() => {
            div.remove();
        }, duracion);
    }

    // Permitir envío con Enter
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') formularioLogin.submit();
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') formularioLogin.submit();
    });
});
