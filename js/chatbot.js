/* ==========================================================
   CHATBOT "ESTRELLA V" (estrella fugaz plateada)
   ----------------------------------------------------------
   Responde preguntas frecuentes buscando palabras clave.
   👉 Para agregar o cambiar respuestas, edita RESPUESTAS:
      - claves: palabras que activan la respuesta
                (escríbelas en minúsculas y SIN acentos)
      - respuesta: el texto (puede llevar <a href="#seccion">enlaces</a>)
   👉 Las preguntas rápidas que aparecen como botones están en SUGERENCIAS.
   ========================================================== */
(() => {
  const NOMBRE_BOT = 'Estrella V';

  const RESPUESTAS = [
    {
      claves: ['hola', 'buenas', 'buenos dias', 'hey', 'saludos', 'que tal', 'holi'],
      respuesta: '¡Hola! ✦ Soy la <strong>Estrella V</strong>, la asistente de V Solutions. Pregúntame sobre nuestros servicios, precios, tiempos de entrega o cómo contactarnos.'
    },
    {
      claves: ['servicio', 'que hacen', 'ofrecen', 'a que se dedican', 'pagina web', 'sitio web', 'paginas'],
      respuesta: 'Creamos <strong>páginas web</strong>, <strong>tiendas en línea</strong>, diseño <strong>UI/UX</strong>, identidad digital, experiencias móviles y consultoría tecnológica. Mira los detalles en <a href="#servicios">Servicios</a>.'
    },
    {
      claves: ['precio', 'costo', 'cuesta', 'cuanto sale', 'cotiza', 'cotizacion', 'presupuesto', 'pagar', 'tarifa'],
      respuesta: 'Cada proyecto es único, así que el precio depende de lo que necesites (número de secciones, tienda en línea, funciones especiales…). Escríbenos en <a href="#contacto">Contacto</a> y te preparamos una cotización a la medida.'
    },
    {
      claves: ['tiempo', 'tarda', 'tardan', 'dias', 'semanas', 'cuando', 'entrega', 'rapido', 'plazo'],
      respuesta: 'Depende del tamaño del proyecto: una landing page sencilla se entrega mucho más rápido que una tienda en línea o un sistema a la medida. En la cotización te damos un calendario claro con cada etapa.'
    },
    {
      claves: ['micro', 'pequeno', 'emprend', 'chico', 'changarro', 'local', 'apenas empiezo'],
      respuesta: '¡Claro! Nos encanta trabajar con <strong>micronegocios</strong> y emprendimientos: landing pages, catálogos y presencia en internet con botón de WhatsApp y mapa. Ver <a href="#soluciones">Soluciones</a>.'
    },
    {
      claves: ['grande', 'empresa', 'corporativ', 'sistema', 'a la medida', 'integracion', 'escalab'],
      respuesta: 'También trabajamos con <strong>negocios grandes</strong>: sistemas y plataformas a la medida, integraciones con tus herramientas y paneles con reportes. Ver <a href="#soluciones">Soluciones</a>.'
    },
    {
      claves: ['tienda en linea', 'ecommerce', 'e-commerce', 'vender en linea', 'carrito', 'pagos', 'catalogo'],
      respuesta: 'Sí hacemos <strong>tiendas en línea</strong>: catálogo de productos, carrito de compras y pagos en línea para que vendas las 24 horas.'
    },
    {
      claves: ['equipo', 'quienes son', 'quienes', 'integrantes', 'personas', 'trabajan ahi'],
      respuesta: () => {
        const eq = Array.isArray(window.VS_EQUIPO) ? window.VS_EQUIPO : [];
        if (!eq.length) return 'Somos un equipo de cinco integrantes. Conócenos en <a href="#equipo">Equipo</a>.';
        const lista = eq.map((p) => `<strong>${escapar(p.nombre)}</strong> (${escapar(p.rol)})`).join(', ');
        return `Somos ${eq.length} integrantes: ${lista}. Conócenos mejor en <a href="#equipo">Equipo</a>.`;
      }
    },
    {
      claves: ['contacto', 'contactar', 'correo', 'email', 'whatsapp', 'telefono', 'llamar', 'escribir', 'comunico'],
      respuesta: 'Puedes escribirnos desde el formulario de <a href="#contacto">Contacto</a>. ¡Te respondemos lo antes posible!'
    },
    {
      claves: ['hosting', 'dominio', 'mantenimiento', 'soporte', 'actualiza', 'servidor', 'despues de'],
      respuesta: 'Te orientamos para elegir dominio y hosting, y podemos acompañarte después del lanzamiento con mantenimiento y actualizaciones. Pregúntanos por esto al pedir tu cotización.'
    },
    {
      claves: ['tecnologia', 'lenguaje', 'html', 'react', 'wordpress', 'framework', 'programan', 'con que'],
      respuesta: 'Usamos tecnologías web modernas (HTML, CSS, JavaScript y frameworks actuales) y elegimos la herramienta adecuada para cada proyecto.'
    },
    {
      claves: ['login', 'sesion', 'cuenta', 'registr', 'entrar', 'acceso', 'iniciar'],
      respuesta: 'Para entrar a tu cuenta usa el botón <a href="login.html">Iniciar sesión</a> en la parte superior de la página.'
    },
    {
      claves: ['gato', 'gatito', 'mascota', 'michi', 'miau'],
      respuesta: '¡Ese es nuestro gatito! 🐾 Es la mascota de V Solutions y vive flotando en el universo tecnológico. Prueba hacerle clic.'
    },
    {
      claves: ['gracias', 'genial', 'perfecto', 'excelente', 'super', 'muy bien'],
      respuesta: '¡Con gusto! Si tienes otra pregunta, aquí sigo brillando ✦'
    },
    {
      claves: ['adios', 'bye', 'hasta luego', 'nos vemos', 'chao'],
      respuesta: '¡Hasta pronto! Que tu negocio brille como una estrella ✦'
    }
  ];

  const SUGERENCIAS = [
    '¿Qué servicios ofrecen?',
    '¿Cuánto cuesta una página?',
    '¿Cuánto tiempo tardan?',
    '¿Trabajan con micronegocios?',
    '¿Cómo los contacto?'
  ];

  const NO_ENTENDI = 'Mmm, esa pregunta se me escapó de la órbita 🌌. Prueba con alguna sugerencia o escríbenos en <a href="#contacto">Contacto</a> para que el equipo te responda.';

  /* ---------- Iconos ---------- */
  const ESTRELLA = 'M12 1C12.8 8 16 11.2 23 12 16 12.8 12.8 16 12 23 11.2 16 8 12.8 1 12 8 11.2 11.2 8 12 1Z';
  const SVG_FUGAZ = `
    <svg class="estrella-fugaz__svg" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <linearGradient id="ef-cola" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
          <stop offset=".65" stop-color="#d4d3e6" stop-opacity=".5"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
        </linearGradient>
        <linearGradient id="ef-plata" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff"/>
          <stop offset=".5" stop-color="#b9b8cc"/>
          <stop offset="1" stop-color="#f6f6ff"/>
        </linearGradient>
        <radialGradient id="ef-halo">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".85"/>
          <stop offset=".45" stop-color="#d9d6ff" stop-opacity=".3"/>
          <stop offset="1" stop-color="#a78bfa" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g class="ef__cola">
        <polygon points="12,12 74,66 66,74" fill="url(#ef-cola)"/>
        <line x1="26" y1="36" x2="62" y2="70" stroke="url(#ef-cola)" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="36" y1="26" x2="70" y2="62" stroke="url(#ef-cola)" stroke-width="1.4" stroke-linecap="round"/>
      </g>
      <circle cx="70" cy="70" r="20" fill="url(#ef-halo)"/>
      <path class="ef__estrella" d="M70 54C71.3 64.5 75.5 68.7 86 70 75.5 71.3 71.3 75.5 70 86 68.7 75.5 64.5 71.3 54 70 64.5 68.7 68.7 64.5 70 54Z" fill="url(#ef-plata)"/>
    </svg>`;

  /* ---------- Construye la interfaz ---------- */
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'estrella-fugaz';
  boton.setAttribute('aria-label', 'Abrir chat de preguntas');
  boton.setAttribute('aria-expanded', 'false');
  boton.setAttribute('aria-controls', 'chat-v');
  boton.innerHTML = SVG_FUGAZ;

  const globo = document.createElement('div');
  globo.className = 'estrella-fugaz__globo';
  globo.textContent = '¿Tienes preguntas? ✦';

  const panel = document.createElement('section');
  panel.className = 'chat vidrio';
  panel.id = 'chat-v';
  panel.setAttribute('aria-label', `Chat con ${NOMBRE_BOT}`);
  panel.innerHTML = `
    <header class="chat__cabecera">
      <div class="chat__avatar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ESTRELLA}" fill="#f4f3ff"/></svg></div>
      <div class="chat__titulo"><strong>${NOMBRE_BOT}</strong><span>Asistente de V Solutions</span></div>
      <button type="button" class="chat__cerrar" aria-label="Cerrar chat">
        <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </header>
    <div class="chat__mensajes" role="log" aria-live="polite"></div>
    <div class="chat__sugerencias"></div>
    <form class="chat__formulario" autocomplete="off">
      <label class="sr-only" for="chat-entrada">Escribe tu pregunta</label>
      <input id="chat-entrada" type="text" placeholder="Escribe tu pregunta…" maxlength="300">
      <button type="submit" class="chat__enviar" aria-label="Enviar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </form>`;

  document.body.append(panel, globo, boton);

  const mensajes = panel.querySelector('.chat__mensajes');
  const sugerencias = panel.querySelector('.chat__sugerencias');
  const formulario = panel.querySelector('.chat__formulario');
  const entrada = panel.querySelector('#chat-entrada');
  let saludado = false;

  SUGERENCIAS.forEach((texto) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = texto;
    b.addEventListener('click', () => preguntar(texto));
    sugerencias.appendChild(b);
  });

  /* ---------- Abrir / cerrar ---------- */
  function abrir() {
    panel.classList.add('abierto');
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar chat de preguntas');
    globo.classList.remove('visible');
    if (!saludado) {
      saludado = true;
      responder('¡Hola! ✦ Soy la <strong>Estrella V</strong>. ¿En qué te puedo ayudar? Elige una pregunta o escribe la tuya.');
    }
    setTimeout(() => entrada.focus(), 250);
  }
  function cerrar() {
    panel.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir chat de preguntas');
  }
  boton.addEventListener('click', () => (panel.classList.contains('abierto') ? cerrar() : abrir()));
  panel.querySelector('.chat__cerrar').addEventListener('click', () => { cerrar(); boton.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('abierto')) cerrar(); });

  // Si tocan un enlace dentro del chat (por ejemplo #contacto), se cierra para ver la sección
  mensajes.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) cerrar(); });

  // Globito de invitación
  setTimeout(() => { if (!panel.classList.contains('abierto')) globo.classList.add('visible'); }, 3500);
  setTimeout(() => globo.classList.remove('visible'), 11000);

  /* ---------- Conversación ---------- */
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = entrada.value.trim();
    if (!texto) return;
    entrada.value = '';
    preguntar(texto);
  });

  function preguntar(texto) {
    agregar(texto, 'usuario');
    const r = buscarRespuesta(texto);
    responder(typeof r === 'function' ? r() : r);
  }

  function responder(html) {
    const escribiendo = document.createElement('div');
    escribiendo.className = 'msg msg--bot msg--escribiendo';
    escribiendo.innerHTML = '<i></i><i></i><i></i>';
    escribiendo.setAttribute('aria-label', `${NOMBRE_BOT} está escribiendo`);
    mensajes.appendChild(escribiendo);
    bajar();
    setTimeout(() => {
      escribiendo.remove();
      agregar(html, 'bot');
    }, 550 + Math.random() * 500);
  }

  function agregar(contenido, quien) {
    const m = document.createElement('div');
    m.className = `msg msg--${quien}`;
    if (quien === 'bot') m.innerHTML = contenido;  // respuestas escritas por el equipo
    else m.textContent = contenido;                // lo que escribe el visitante (seguro)
    mensajes.appendChild(m);
    bajar();
  }

  function bajar() { mensajes.scrollTop = mensajes.scrollHeight; }

  function normalizar(t) {
    return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function buscarRespuesta(texto) {
    const t = ' ' + normalizar(texto) + ' ';
    let mejor = null, puntos = 0;
    for (const item of RESPUESTAS) {
      let p = 0;
      for (const clave of item.claves) if (t.includes(clave)) p += clave.length;
      if (p > puntos) { puntos = p; mejor = item; }
    }
    return mejor ? mejor.respuesta : NO_ENTENDI;
  }

  function escapar(texto) {
    return String(texto ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
})();
