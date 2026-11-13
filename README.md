# V Solutions · El universo tecnológico ✦

Página web del equipo **V Solutions**: cinco integrantes que crean páginas web y soluciones
tecnológicas para micronegocios y negocios grandes.

Estilo **glassmorphism** sobre fondo negro, manchas moradas difuminadas que se mueven,
estrellas plateadas, logo metálico animado, gatito mascota en 3D y un chatbot con forma de
estrella fugaz plateada.

---

## 🚀 Cómo ver la página

No necesita instalar nada: es HTML, CSS y JavaScript puro.

- **Opción rápida:** abre `index.html` con doble clic.
- **Recomendado (VS Code):** instala la extensión **Live Server**, haz clic derecho en
  `index.html` → *Open with Live Server*. La página se recarga sola cada vez que guardas.

---

## 📁 Estructura del proyecto

```
├── index.html          → Landing page (inicio, servicios, soluciones, proceso, equipo, contacto)
├── login.html          → Página de inicio de sesión / registro
├── css/
│   ├── estilos.css     → Estilos de todo el sitio (colores en :root, al inicio del archivo)
│   └── login.css       → Estilos solo de la página de login
├── js/
│   ├── equipo.js       → ⭐ Perfiles del equipo (cada quien edita el suyo)
│   ├── chatbot.js      → ⭐ Preguntas y respuestas del chatbot "Estrella V"
│   ├── main.js         → Menú, animaciones al hacer scroll, formulario de contacto
│   ├── fondo.js        → Estrellas plateadas y estrellas fugaces del fondo
│   ├── mascota.js      → Gatito 3D (sigue al ratón, salta al hacer clic)
│   └── login.js        → Cambiar entre login y registro, mostrar contraseña
└── assets/
    ├── img/            → Logo, gatito y favicon (con fondo transparente)
    └── referencias/    → Imágenes de referencia del diseño original
```

---

## ✏️ ¿Qué edita cada quien?

| Quiero cambiar…                     | Archivo                                    |
|-------------------------------------|--------------------------------------------|
| Mi nombre, rol, bio, foto y redes   | `js/equipo.js` (solo tu bloque)            |
| Mi foto de perfil                   | súbela a `assets/img/equipo/` y pon la ruta en `js/equipo.js` |
| Respuestas del chatbot              | `js/chatbot.js` → lista `RESPUESTAS`       |
| Textos de las secciones             | `index.html`                               |
| Colores, tamaños, fuentes           | `css/estilos.css` → bloque `:root`         |
| Correo que recibe el formulario     | `js/main.js` → `VS_CONFIG.correoContacto`  |

---

## 🤝 Cómo trabajar en equipo (cada quien desde su laptop)

### 1. Una sola vez: dar acceso al equipo
La persona dueña del repositorio entra a GitHub → **Settings → Collaborators → Add people**
y agrega el usuario de GitHub de cada integrante. Cada quien acepta la invitación desde su correo.

### 2. Una sola vez: descargar el proyecto
Cada integrante instala [Git](https://git-scm.com/downloads) y ejecuta:

```bash
git clone https://github.com/Fanny-PL/vsolutions-web.git
cd vsolutions-web
```

### 3. Cada vez que vayas a trabajar

```bash
git checkout main
git pull                                  # trae los cambios más recientes del equipo
git checkout -b tu-nombre/lo-que-haces    # crea tu propia rama, ej: ana/perfil
```

Haz tus cambios, revisa que se vean bien y guarda:

```bash
git add .
git commit -m "Agrego mi perfil al equipo"
git push -u origin tu-nombre/lo-que-haces
```

### 4. Unir tus cambios
En GitHub aparecerá el botón **Compare & pull request**. Crea el *Pull Request*,
pide a otro integrante que lo revise y, cuando esté aprobado, presiona **Merge**.

> 💡 **Reglas de oro:** nunca trabajes directo en `main`, haz `git pull` antes de empezar
> y usa mensajes de commit que expliquen qué cambiaste.

---

## 🌐 Publicar la página gratis (GitHub Pages)

1. El repositorio debe ser **público** (Settings → General → Danger Zone → Change visibility).
2. Ve a **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En un par de minutos la página estará en `https://fanny-pl.github.io/vsolutions-web/`.

---

## 📝 Pendientes

- [ ] Poner nombres, roles, bios, fotos y redes reales en `js/equipo.js`
- [ ] Configurar el correo del equipo en `js/main.js` (`VS_CONFIG.correoContacto`)
- [ ] Conectar el login a un servicio real (por ejemplo Firebase Auth o Supabase).
      Hoy el inicio de sesión es solo visual (modo demostración).
- [ ] Revisar y ajustar las respuestas del chatbot en `js/chatbot.js`

---

## 🎨 Guía de estilo

- **Base:** negro `#05030a`
- **Morados:** `#8b5cf6` · `#c4a7ff` · `#5b57e0` · lavanda `#dcbff0`
- **Plateado:** degradado metálico (variable `--metal`) para logo, títulos y estrellas
- **Vidrio:** fondo blanco al 4–10 %, borde blanco al 20–50 %, desenfoque de 20 px
- **Fuentes:** Inter (textos) y Montserrat (logo y etiquetas)
- **Íconos:** contorno neón con degradado y relleno oscuro (ver `assets/referencias/iconos.png`)
