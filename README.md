# V Solutions · El universo tecnológico ✦

Página web del equipo **V Solutions**: cinco integrantes que crean páginas web y soluciones
tecnológicas para micronegocios y negocios grandes.

Estilo **glassmorphism** sobre fondo negro, manchas moradas difuminadas que se mueven,
estrellas plateadas, logo metálico animado, gatito mascota en 3D y un chatbot con forma de
estrella fugaz plateada.

---

## 🌐 Página en vivo

**https://fanny-pl.github.io/vsolutions-web/**

Se publica sola con GitHub Pages: cada cambio que alguien sube a `main` aparece ahí
en 1 o 2 minutos (si no lo ves, recarga con `Ctrl + F5`).

---

## 🚀 Cómo ver la página en tu computadora

No necesita instalar nada: es HTML, CSS y JavaScript puro.

- **Opción rápida:** abre `index.html` con doble clic.
- **Recomendado (VS Code):** instala la extensión **Live Server**, haz clic derecho en
  `index.html` → *Open with Live Server*. La página se recarga sola cada vez que guardas.

---

## 📁 Estructura del proyecto

```
├── index.html          → Landing page (inicio, servicios, soluciones, proceso, tecnologías, equipo, contacto)
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
| Tarjetas de tecnologías (logos)     | `index.html` → sección `#tecnologias`      |
| Colores, tamaños, fuentes           | `css/estilos.css` → bloque `:root`         |
| Correo que recibe el formulario     | `js/main.js` → `VS_CONFIG.correoContacto`  |

---

## 🤝 Cómo trabajar en equipo (cada quien desde su laptop y su Claude)

Todos trabajamos directo en la rama `main`: lo que subes se ve en la página en vivo
en un par de minutos. No hacen falta ramas ni *pull requests*.

### 1. Una sola vez: preparar tu computadora

1. Acepta la invitación al repositorio que te llega por correo
   (la dueña, **Fanny-PL**, te agrega en *Settings → Collaborators*).
2. Instala [Git](https://git-scm.com/downloads) y la app de **Claude** para escritorio.
3. En Claude, pestaña **Code**, elige una carpeta (por ejemplo *Documentos*) y escribe:
   > *"Clona el repositorio https://github.com/Fanny-PL/vsolutions-web y ábrelo como proyecto"*
4. Cuando Claude te pida iniciar sesión en GitHub, pega el código que te da en
   [github.com/login/device](https://github.com/login/device).

### 2. Cada vez que vayas a trabajar (con Claude)

1. *"Trae lo último de GitHub"*: así empiezas con los cambios de los demás.
2. Pide tu cambio, por ejemplo: *"Pon mi nombre, mi rol y mi foto en el equipo"*.
3. *"Guarda y sube mis cambios a GitHub"*.

Claude ya conoce las reglas del equipo porque las lee del archivo [`CLAUDE.md`](CLAUDE.md).

### Sin Claude (solo con Git)

```bash
git pull                                   # 1. trae lo último del equipo
# 2. haz tus cambios y revisa que se vean bien
git add .
git commit -m "Agrego mi perfil al equipo" # 3. describe qué cambiaste
git push                                   # 4. súbelo: en 1-2 min se ve en la página
```

Si `git push` te dice *rejected*, alguien subió algo antes que tú: ejecuta `git pull`
y después `git push` otra vez.

> 💡 **Reglas de oro**
> - Trae lo último **antes** de empezar y sube tus cambios **en cuanto termines**.
> - Avisen en su grupo qué van a tocar para no editar el mismo archivo al mismo tiempo.
> - Cada quien edita solo su bloque en `js/equipo.js`.
> - Nunca subas contraseñas ni llaves: el repositorio es público.
> - La rama `main` está protegida: nadie puede borrarla ni sobrescribir el historial.

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
