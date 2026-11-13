/* ==========================================================
   FONDO "EL UNIVERSO"
   - Estrellas plateadas que titilan (con un poco de paralaje)
   - Estrellas fugaces plateadas de vez en cuando
   - Una mancha de luz morada que sigue al ratón
   ========================================================== */
(() => {
  const canvas = document.getElementById('estrellas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let ancho = 0, alto = 0, dpr = 1;
  let estrellas = [];
  const fugaces = [];
  let proximaFugaz = performance.now() + 1500;

  function redimensionar() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = Math.round(ancho * dpr);
    canvas.height = Math.round(alto * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    crearEstrellas();
    if (reducir) dibujar(performance.now());
  }

  function crearEstrellas() {
    const cantidad = Math.round((ancho * alto) / 5200);
    estrellas = Array.from({ length: cantidad }, () => ({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      r: Math.random() * 1.05 + 0.25,
      alfa: Math.random() * 0.55 + 0.25,
      vel: Math.random() * 1.6 + 0.4,
      fase: Math.random() * Math.PI * 2,
      prof: Math.random() * 0.5 + 0.1,          // paralaje al hacer scroll
      destello: Math.random() < 0.035,          // algunas son estrellas de 4 puntas
      tono: Math.random() < 0.25 ? '214, 200, 255' : '236, 236, 246'
    }));
  }

  function destello(x, y, tam, alfa) {
    // Estrella de 4 puntas (como la del logo)
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alfa;
    const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, tam * 3);
    halo.addColorStop(0, 'rgba(255,255,255,0.55)');
    halo.addColorStop(1, 'rgba(196,167,255,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, tam * 3, 0, Math.PI * 2);
    ctx.fill();
    const L = tam * 3.2, k = tam * 0.35;
    ctx.fillStyle = '#f6f5ff';
    ctx.beginPath();
    ctx.moveTo(0, -L);
    ctx.quadraticCurveTo(k, -k, L, 0);
    ctx.quadraticCurveTo(k, k, 0, L);
    ctx.quadraticCurveTo(-k, k, -L, 0);
    ctx.quadraticCurveTo(-k, -k, 0, -L);
    ctx.fill();
    ctx.restore();
  }

  function lanzarFugaz() {
    // Viajan en diagonal hacia abajo a la derecha, como la del chatbot
    const angulo = (Math.random() * 18 + 22) * Math.PI / 180;
    const velocidad = Math.random() * 6 + 9;
    fugaces.push({
      x: Math.random() * ancho * 0.7 - ancho * 0.05,
      y: Math.random() * alto * 0.45 - 40,
      vx: Math.cos(angulo) * velocidad,
      vy: Math.sin(angulo) * velocidad,
      largo: Math.random() * 140 + 120,
      vida: 0,
      duracion: Math.random() * 30 + 55
    });
  }

  function dibujarFugaces() {
    for (let i = fugaces.length - 1; i >= 0; i--) {
      const f = fugaces[i];
      f.x += f.vx;
      f.y += f.vy;
      f.vida++;
      const p = f.vida / f.duracion;
      const alfa = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
      if (f.vida >= f.duracion) { fugaces.splice(i, 1); continue; }

      const norma = Math.hypot(f.vx, f.vy);
      const cx = f.x - (f.vx / norma) * f.largo;
      const cy = f.y - (f.vy / norma) * f.largo;
      const g = ctx.createLinearGradient(f.x, f.y, cx, cy);
      g.addColorStop(0, `rgba(255,255,255,${0.95 * alfa})`);
      g.addColorStop(0.25, `rgba(210,205,235,${0.5 * alfa})`);
      g.addColorStop(1, 'rgba(180,160,255,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      destello(f.x, f.y, 1.4, alfa);
    }
  }

  function dibujar(ahora) {
    const t = ahora / 1000;
    const desplazamiento = window.scrollY || 0;
    ctx.clearRect(0, 0, ancho, alto);

    for (const e of estrellas) {
      const brillo = reducir ? 1 : 0.55 + 0.45 * Math.sin(t * e.vel + e.fase);
      let y = (e.y - desplazamiento * e.prof * 0.25) % alto;
      if (y < 0) y += alto;
      const a = e.alfa * brillo;
      if (e.destello) {
        destello(e.x, y, e.r + 0.6, a);
      } else {
        ctx.fillStyle = `rgba(${e.tono},${a})`;
        ctx.beginPath();
        ctx.arc(e.x, y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (!reducir) {
      if (ahora > proximaFugaz) {
        lanzarFugaz();
        proximaFugaz = ahora + Math.random() * 5000 + 3500;
      }
      dibujarFugaces();
    }
  }

  function bucle(ahora) {
    dibujar(ahora);
    requestAnimationFrame(bucle);
  }

  window.addEventListener('resize', redimensionar);
  redimensionar();
  if (!reducir) requestAnimationFrame(bucle);
  else window.addEventListener('scroll', () => dibujar(performance.now()), { passive: true });

  /* Mancha de luz que sigue al ratón */
  const mancha = document.querySelector('.mancha--cursor');
  if (mancha && !reducir && window.matchMedia('(pointer: fine)').matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, px = mx, py = my;
    window.addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function seguir() {
      px += (mx - px) * 0.05;
      py += (my - py) * 0.05;
      mancha.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      requestAnimationFrame(seguir);
    })();
  }
})();
