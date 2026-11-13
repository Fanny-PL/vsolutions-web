/* ==========================================================
   INICIO DE SESIÓN / REGISTRO
   ----------------------------------------------------------
   ⚠️ Por ahora es solo la parte visual (frontend).
   Para que funcione de verdad hay que conectarlo a un servicio
   de autenticación (por ejemplo Firebase Auth o Supabase).
   Busca el comentario "CONECTAR AQUÍ" más abajo.
   ========================================================== */
(() => {
  const form = document.getElementById('form-login');
  if (!form) return;

  const titulo = document.getElementById('login-titulo');
  const sub = document.getElementById('login-sub');
  const boton = document.getElementById('login-boton');
  const altTexto = document.getElementById('alt-texto');
  const cambiar = document.getElementById('cambiar-modo');
  const nombre = document.getElementById('l-nombre');
  const usuario = document.getElementById('l-usuario');
  const clave = document.getElementById('l-clave');
  const verClave = document.getElementById('ver-clave');

  const TEXTOS = {
    login: {
      titulo: 'Iniciar sesión', sub: 'Bienvenido de nuevo', boton: 'Entrar',
      alt: '¿No tienes cuenta?', cambiar: 'Regístrate', usuario: 'Usuario', autocompletar: 'current-password'
    },
    registro: {
      titulo: 'Crear cuenta', sub: 'Únete al universo V', boton: 'Registrarme',
      alt: '¿Ya tienes cuenta?', cambiar: 'Inicia sesión', usuario: 'Correo electrónico', autocompletar: 'new-password'
    }
  };

  function aplicarModo(modo) {
    const t = TEXTOS[modo];
    form.dataset.modo = modo;
    titulo.textContent = t.titulo;
    sub.textContent = t.sub;
    boton.textContent = t.boton;
    altTexto.textContent = t.alt;
    cambiar.textContent = t.cambiar;
    usuario.placeholder = t.usuario;
    usuario.type = modo === 'registro' ? 'email' : 'text';
    usuario.autocomplete = modo === 'registro' ? 'email' : 'username';
    clave.autocomplete = t.autocompletar;
    nombre.disabled = modo !== 'registro';
    nombre.required = modo === 'registro';
    document.title = `${t.titulo} · V Solutions`;
    form.classList.remove('cambiando');
    void form.offsetWidth;
    form.classList.add('cambiando');
  }

  cambiar.addEventListener('click', () => {
    aplicarModo(form.dataset.modo === 'login' ? 'registro' : 'login');
    (form.dataset.modo === 'registro' ? nombre : usuario).focus();
  });

  // Si llegan con login.html#registro se abre directo el registro
  if (location.hash === '#registro') aplicarModo('registro');

  // Mostrar / ocultar contraseña (ícono del ojo)
  verClave.addEventListener('click', () => mostrarClave(clave.type === 'password'));

  function mostrarClave(mostrar) {
    clave.type = mostrar ? 'text' : 'password';
    verClave.setAttribute('aria-pressed', String(mostrar));
    verClave.setAttribute('aria-label', mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña');
    verClave.querySelector('.icono-oculto').hidden = mostrar;
    verClave.querySelector('.icono-visible').hidden = !mostrar;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // CONECTAR AQUÍ: enviar los datos a Firebase / Supabase / su propio servidor.
    // Nunca guarden contraseñas en el navegador ni en el código.
    const mensaje = form.dataset.modo === 'registro'
      ? '✦ Registro en modo demostración: el acceso se conectará próximamente.'
      : '✦ Inicio de sesión en modo demostración: el acceso se conectará próximamente.';
    if (window.vsAviso) window.vsAviso(mensaje, 5000);
    clave.value = '';
    mostrarClave(false);
  });
})();
