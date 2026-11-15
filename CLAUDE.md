# Instrucciones para Claude · Proyecto V Solutions

Página web estática del equipo **V Solutions** (5 integrantes, cada quien trabaja desde su
computadora y su propio Claude). Es HTML + CSS + JavaScript puro: sin build, sin npm, sin
dependencias. Se publica sola con GitHub Pages desde la rama `main`:
https://fanny-pl.github.io/vsolutions-web/

Habla con el equipo en **español**.

## Flujo de trabajo (obligatorio)

1. **Antes de cualquier cambio:** `git pull` en `main` para traer lo último del equipo.
2. Trabajamos **directo en `main`**: no crees ramas ni pull requests salvo que te lo pidan.
3. **Al terminar y probar el cambio:** haz commit con un mensaje en español que explique qué
   cambió y haz `git push`. No esperes a que te lo pidan: el equipo necesita ver los cambios
   en GitHub y en la página en vivo.
4. Si el push es rechazado porque hay cambios nuevos: `git pull` (merge), resuelve los
   conflictos **conservando el trabajo de ambas personas**, prueba de nuevo y vuelve a subir.
5. **Nunca** uses `git push --force` ni borres `main` (además está bloqueado en GitHub).
6. **Nunca** subas contraseñas, llaves de API, tokens ni datos personales: el repositorio es público.

## Estilo de la página (no romperlo)

- Base negra, difuminados morados, estrellas plateadas y **glassmorphism**.
  Reutiliza las clases `.vidrio`, `.vidrio--foco`, `.btn`, `.btn--primario` y `.campo`.
- Colores, fuentes y tamaños están en las variables `:root` de `css/estilos.css`: úsalas
  en lugar de inventar colores nuevos.
- **Íconos y logos:** SVG en línea, estilo neón (contorno con degradado + relleno oscuro +
  resplandor). Los degradados están en `<svg class="svg-defs">` al inicio de `index.html`
  (patrón `g-<color>-t` para el contorno y `g-<color>-r` para el relleno) y el resplandor se
  controla con `style="--brillo:<color>"`.
- **Secciones nuevas:** `<section class="seccion" id="...">` con `seccion__cabecera`
  (`.ceja`, `.titulo`, `.lead`). Agrega `.revelar` a los elementos para la animación de
  aparición. Pon el enlace en el menú (`.nav__enlaces`) y en el pie (`.pie__enlaces`).
- Todo debe verse bien en celular (prueba a 375 px de ancho) y respetar `prefers-reduced-motion`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Perfiles del equipo | `js/equipo.js` (cada integrante edita solo su bloque) |
| Fotos del equipo | `assets/img/equipo/` |
| Preguntas del chatbot | `js/chatbot.js` → `RESPUESTAS` (claves en minúsculas y sin acentos) |
| Correo del formulario | `js/main.js` → `VS_CONFIG.correoContacto` |
| Fondo animado y estrellas | `css/estilos.css` (sección 3) y `js/fondo.js` |
| Gatito 3D | `js/mascota.js` |
| Login (solo visual por ahora) | `login.html`, `css/login.css`, `js/login.js` |
| Referencias de diseño originales | `assets/referencias/` |

## Antes de subir

- Abre la página con un servidor local (Live Server o `python -m http.server`) y revisa
  que se vea bien en computadora y celular y que no haya errores en la consola.
