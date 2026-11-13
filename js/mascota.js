/* ==========================================================
   MASCOTA 3D (el gatito)
   Funciona con cualquier elemento <div class="mascota">.
   Atributos opcionales:
     data-src="assets/img/gato.png"   imagen de la mascota
     data-capas="14"                  capas para el volumen 3D
     data-frases="Hola|Miau"          frases separadas por |
   Cómo funciona el efecto 3D: se apilan varias copias de la imagen
   a distintas profundidades (translateZ). Al girar, se ve el volumen.
   ========================================================== */
(() => {
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FRASES = [
    '¡Miau! Bienvenido al universo V ✦',
    '¿Tienes preguntas? Toca la estrella fugaz 🌠',
    'Hacemos que tu negocio brille en internet',
    'Prrr… me encanta el código bonito',
    '¡Conoce a mis humanos en la sección Equipo!'
  ];

  document.querySelectorAll('.mascota').forEach(iniciar);

  function iniciar(el) {
    const src = el.dataset.src || 'assets/img/gato.png';
    const capas = Math.max(1, parseInt(el.dataset.capas, 10) || 14);
    const separacion = parseFloat(el.dataset.separacion) || 1.4;
    const frases = el.dataset.frases ? el.dataset.frases.split('|') : FRASES;

    const escena = crear('div', 'mascota__escena');
    const cuerpo = crear('div', 'mascota__cuerpo');

    const brillo = imagen(src, 'mascota__brillo');
    brillo.style.transform = `translateZ(${-capas * separacion - 30}px)`;
    cuerpo.appendChild(brillo);

    // De atrás hacia adelante: las capas traseras son más oscuras (da volumen)
    for (let i = capas - 1; i >= 0; i--) {
      const capa = imagen(src, 'mascota__capa');
      capa.style.transform = `translateZ(${-i * separacion}px)`;
      if (i > 0) {
        const luz = 0.3 + 0.45 * (1 - i / capas);
        capa.style.filter = `brightness(${luz.toFixed(2)}) saturate(1.3)`;
      }
      cuerpo.appendChild(capa);
    }

    escena.appendChild(cuerpo);
    const sombra = crear('div', 'mascota__sombra');
    const globo = crear('div', 'mascota__globo');
    globo.setAttribute('aria-live', 'polite');
    el.append(escena, sombra, globo);

    // ----- Movimiento -----
    let objetivoX = 0, objetivoY = 0, rotX = 0, rotY = 0;
    let ultimoMovimiento = -Infinity;
    let visible = true;
    const inicio = performance.now();

    window.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
      objetivoY = limitar(dx, -1, 1) * 38;   // gira hacia los lados
      objetivoX = limitar(dy, -1, 1) * -22;  // inclina arriba/abajo
      ultimoMovimiento = performance.now();
    }, { passive: true });

    function cuadro(ahora) {
      if (!visible) return;
      const t = (ahora - inicio) / 1000;
      const quieto = ahora - ultimoMovimiento > 2500;
      // Si nadie mueve el ratón, el gatito gira solo suavemente
      const metaY = quieto ? Math.sin(t * 0.55) * 30 : objetivoY;
      const metaX = quieto ? Math.sin(t * 0.8) * 7 : objetivoX;
      rotY += (metaY - rotY) * 0.06;
      rotX += (metaX - rotX) * 0.06;
      const flotar = Math.sin(t * 1.6) * 10;
      const respirar = 1 + Math.sin(t * 2.2) * 0.012;
      cuerpo.style.transform =
        `translateY(${flotar.toFixed(2)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${respirar.toFixed(4)})`;
      sombra.style.transform = `scale(${(1 - flotar / 70).toFixed(3)})`;
      sombra.style.opacity = (0.85 - flotar / 60).toFixed(3);
      requestAnimationFrame(cuadro);
    }

    if (!reducir) {
      // Solo anima cuando el gatito está en pantalla
      new IntersectionObserver(([entrada]) => {
        const antes = visible;
        visible = entrada.isIntersecting;
        if (visible && !antes) requestAnimationFrame(cuadro);
      }).observe(el);
      requestAnimationFrame(cuadro);
    }

    // ----- Clic: salta y dice algo -----
    let indice = 0, temporizador;
    function saludar() {
      el.classList.remove('saltando');
      void el.offsetWidth; // reinicia la animación
      el.classList.add('saltando');
      globo.textContent = frases[indice % frases.length];
      indice++;
      globo.classList.add('visible');
      clearTimeout(temporizador);
      temporizador = setTimeout(() => globo.classList.remove('visible'), 3200);
    }
    el.addEventListener('click', saludar);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); saludar(); }
    });
    el.addEventListener('animationend', () => el.classList.remove('saltando'));

    // Saludo automático al cargar
    setTimeout(saludar, 1600);
  }

  function crear(etiqueta, clase) {
    const n = document.createElement(etiqueta);
    n.className = clase;
    return n;
  }
  function imagen(src, clase) {
    const img = new Image();
    img.src = src;
    img.alt = '';
    img.className = clase;
    img.draggable = false;
    img.decoding = 'async';
    return img;
  }
  function limitar(v, min, max) { return Math.min(max, Math.max(min, v)); }
})();
