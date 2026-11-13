/* ==========================================================
   V SOLUTIONS · Interacciones generales
   (menú, perfiles del equipo, animaciones al hacer scroll,
    formulario de contacto y avisos)
   ========================================================== */

/* ---------- Configuración rápida ---------- */
const VS_CONFIG = {
  // Correo del equipo que recibirá los mensajes del formulario de contacto.
  // Ejemplo: "contacto@tudominio.com". Si se deja vacío, el formulario
  // funciona en modo demostración (no envía nada).
  correoContacto: ""
};

(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Avisos flotantes (toast) ---------- */
  let avisoEl, avisoTimer;
  window.vsAviso = (mensaje, duracion = 4200) => {
    if (!avisoEl) {
      avisoEl = document.createElement('div');
      avisoEl.className = 'aviso';
      avisoEl.setAttribute('role', 'status');
      document.body.appendChild(avisoEl);
    }
    avisoEl.textContent = mensaje;
    requestAnimationFrame(() => avisoEl.classList.add('visible'));
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => avisoEl.classList.remove('visible'), duracion);
  };

  /* ---------- Navegación ---------- */
  const nav = $('#nav');
  if (nav) {
    const alScroll = () => nav.classList.toggle('nav--scroll', window.scrollY > 30);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });

    const boton = $('.nav__hamburguesa', nav);
    const cerrarMenu = () => {
      nav.classList.remove('nav--abierto');
      boton?.setAttribute('aria-expanded', 'false');
      boton?.setAttribute('aria-label', 'Abrir menú');
    };
    boton?.addEventListener('click', () => {
      const abierto = nav.classList.toggle('nav--abierto');
      boton.setAttribute('aria-expanded', String(abierto));
      boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    $$('.nav__enlaces a', nav).forEach((a) => a.addEventListener('click', cerrarMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });

    // Resalta la sección en la que estás
    const enlaces = $$('.nav__enlaces a[href^="#"]', nav);
    const secciones = enlaces.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    if (secciones.length) {
      const obs = new IntersectionObserver((entradas) => {
        entradas.forEach((en) => {
          if (!en.isIntersecting) return;
          enlaces.forEach((a) => a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id));
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      secciones.forEach((s) => obs.observe(s));
    }
  }

  /* ---------- Perfiles del equipo (datos en js/equipo.js) ---------- */
  const lista = $('#equipo-lista');
  if (lista && Array.isArray(window.VS_EQUIPO)) {
    lista.innerHTML = window.VS_EQUIPO.map(tarjetaPerfil).join('');
  }

  function tarjetaPerfil(p, i) {
    const nombre = escapar(p.nombre || 'Integrante');
    const avatar = p.foto
      ? `<img src="${escapar(p.foto)}" alt="Foto de ${nombre}" loading="lazy">`
      : `<span class="avatar__iniciales" aria-hidden="true">${escapar(iniciales(p.nombre))}</span>`;
    const habilidades = (p.habilidades || []).map((h) => `<li>${escapar(h)}</li>`).join('');
    const redes = [
      ['github', 'GitHub', '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>'],
      ['linkedin', 'LinkedIn', '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>'],
      ['instagram', 'Instagram', '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>']
    ]
      .filter(([clave]) => p[clave])
      .map(([clave, etiqueta, icono]) =>
        `<a href="${escapar(p[clave])}" target="_blank" rel="noopener noreferrer" aria-label="${etiqueta} de ${nombre}"><svg viewBox="0 0 24 24" aria-hidden="true">${icono}</svg></a>`)
      .join('');

    return `
      <article class="perfil revelar" style="--d:${i % 3}">
        <div class="perfil__tarjeta vidrio vidrio--foco">
          <div class="avatar">
            <span class="avatar__aro" aria-hidden="true"></span>
            <span class="avatar__centro">${avatar}</span>
          </div>
          <h3>${nombre}</h3>
          <p class="perfil__rol">${escapar(p.rol || '')}</p>
          <p class="perfil__bio">${escapar(p.bio || '')}</p>
          ${habilidades ? `<ul class="habilidades">${habilidades}</ul>` : ''}
          ${redes ? `<div class="redes">${redes}</div>` : ''}
        </div>
      </article>`;
  }

  function iniciales(nombre = '') {
    const partes = nombre.trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return 'V';
    return ((partes[0][0] || '') + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase();
  }

  function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---------- Aparición al hacer scroll ---------- */
  const revelables = $$('.revelar');
  if ('IntersectionObserver' in window && !reducir) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revelables.forEach((el) => obs.observe(el));
  } else {
    revelables.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Luz que sigue al ratón en las tarjetas de vidrio ---------- */
  document.addEventListener('pointermove', (e) => {
    const tarjeta = e.target.closest && e.target.closest('.vidrio--foco');
    if (!tarjeta) return;
    const r = tarjeta.getBoundingClientRect();
    tarjeta.style.setProperty('--mx', `${e.clientX - r.left}px`);
    tarjeta.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- Inclinación 3D de los perfiles ---------- */
  if (!reducir && window.matchMedia('(pointer: fine)').matches) {
    $$('.perfil__tarjeta').forEach((t) => {
      t.addEventListener('pointermove', (e) => {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        t.style.transform = `rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translateY(-4px)`;
      });
      t.addEventListener('pointerleave', () => { t.style.transform = ''; });
    });
  }

  /* ---------- Formulario de contacto ---------- */
  const form = $('#form-contacto');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const datos = Object.fromEntries(new FormData(form));
      const nombre = (datos.nombre || '').trim().split(' ')[0];

      if (VS_CONFIG.correoContacto) {
        const asunto = `Nuevo proyecto · ${datos.tipo || 'V Solutions'}`;
        const cuerpo = `Nombre: ${datos.nombre}\nCorreo: ${datos.correo}\nTipo de negocio: ${datos.tipo}\n\n${datos.mensaje}`;
        window.location.href = `mailto:${VS_CONFIG.correoContacto}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        vsAviso(`¡Gracias, ${nombre}! Se abrirá tu correo para enviar el mensaje ✦`);
      } else {
        vsAviso(`¡Gracias, ${nombre}! ✦ (Formulario en modo demostración: falta configurar el correo del equipo)`, 5500);
      }
      form.reset();
    });
  }

  /* ---------- Año actual en el pie de página ---------- */
  $$('[data-anio]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
