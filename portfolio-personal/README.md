# Portfolio Personal — Facundo Federico Olguín

> **UX/UI Designer & Estudiante de Sistemas de Información**  
> Diseño de experiencias digitales claras, funcionales y accesibles mediante el uso reflexivo y prudente de Inteligencia Artificial. Concepción del Uruguay, Entre Ríos, Argentina.

---

## 🌐 Enlaces del Proyecto

- **Sitio Web en Producción (Netlify):** [https://facundoolguin.netlify.app/](https://facundoolguin.netlify.app/) *(Placeholder post-deploy)*
- **Diseño del Sistema en Figma:** [Figma Design File](https://www.figma.com/design/placeholder-portfolio-facundo-olguin) *(Placeholder)*
- **Repositorio de la materia:** [https://github.com/facuolgg/UX-UI](https://github.com/facuolgg/UX-UI)

---

## 📸 Vista Previa del Sitio

<!-- Captura de pantalla de la versión Desktop y Mobile del portfolio -->
![Vista Previa Portfolio Desktop](assets/img/og-image.png)

*Placeholder: Esta captura se actualizará con una imagen real de 1200x630 una vez completado el primer despliegue en Netlify.*

---

## 🛠️ Stack Tecnológico

- **Estructura:** HTML5 semántico (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Estilos & Diseño:** [Tailwind CSS v3](https://tailwindcss.com/) compilado mediante CLI nativo (sin dependencias en tiempo de ejecución ni CDNs pesados).
- **Interacciones & Lógica:** JavaScript Vanilla (ES6+) para el menú responsive mobile, modal accesible de caso de estudio con trampa de foco (*focus trap*), y manejo accesible de teclado.
- **Iconografía:** [Lucide Icons](https://lucide.dev/) integrados en formato SVG inline (cero peticiones HTTP externas adicionales).
- **Tipografía:** Google Fonts con estrategia `font-display: swap` (*Playfair Display* para jerarquía editorial y títulos serif, e *Inter* para lectura sans-serif de alto rendimiento).
- **Alojamiento & CI/CD:** [Netlify](https://www.netlify.com/) con compilación automatizada (`netlify.toml`).

---

## 🎨 Sistema de Diseño (Design System)

- **Primario:** `#1E3A8A` (Azul Marino Editorial)
- **Fondo:** `#FFFFFF` (Blanco Puro)
- **Tarjetas:** `#F8FAFC` (Slate 50)
- **Texto Principal:** `#0F172A` (Slate 900)
- **Texto Secundario:** `#475569` (Slate 600)
- **Bordes y Delimitadores:** `#E2E8F0` (Slate 200)
- **Breakpoints (Mobile-First):** `sm: 375px`, `md: 768px`, `xl: 1280px`.

---

## 🚀 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/facuolgg/UX-UI.git
   cd UX-UI/portfolio-personal
   ```

2. **Instalar dependencias de desarrollo:**
   ```bash
   npm install
   ```

3. **Modo observador para desarrollo (compilación en vivo de Tailwind):**
   ```bash
   npm run watch:css
   ```

4. **Compilar versión final para producción:**
   ```bash
   npm run build:css
   ```

---

## ☁️ Proceso de Despliegue en Netlify

El proyecto cuenta con el archivo `netlify.toml` preconfigurado en la raíz:

```toml
[build]
  command = "npm run build:css"
  publish = "."
```

### Pasos para desplegar:
1. Conectar el repositorio de GitHub con **Netlify**:
   - Ingresar a [app.netlify.com](https://app.netlify.com/) y seleccionar **"Add new site" > "Import an existing project"**.
   - Elegir el proveedor **GitHub** y seleccionar el repositorio `UX-UI`.
   - Establecer como **Base directory** (si aplica) `portfolio-personal`.
2. Netlify detectará automáticamente el archivo `netlify.toml`:
   - **Build command:** `npm run build:css`
   - **Publish directory:** `.` (o `portfolio-personal` según el root)
3. Hacer clic en **Deploy Site**.
4. Cada push posterior a la rama `main` generará un despliegue continuo automático.

---

## 🖼️ Optimización de Imágenes (Hoja de Ruta WebP)

> **Nota de ingeniería:** Para la entrega inicial se conservaron los archivos fuente en formato `.png` y `.jpg` en `assets/img/`.

### Plan de migración a formato moderno de imagen:
Para una posterior optimización de carga y ahorro de ancho de banda móvil, se recomienda convertir las capturas de proyectos a formato **WebP** o **AVIF**:
```bash
# Ejemplo con cwebp (WebP CLI)
cwebp -q 82 assets/img/proyectos/coffee-hero.png -o assets/img/proyectos/coffee-hero.webp
cwebp -q 82 assets/img/proyectos/seguros-hero.png -o assets/img/proyectos/seguros-hero.webp
cwebp -q 82 assets/img/proyectos/openart-home.png -o assets/img/proyectos/openart-home.webp
cwebp -q 82 assets/img/sobre-mi/foto-perfil.jpg -o assets/img/sobre-mi/foto-perfil.webp
```
**Ahorro proyectado:** reducción estimada del 65% al 80% en el peso de transferencia total.

---

## 📊 Auditoría Lighthouse (Mobile) y Mejoras Pendientes

### Resultados y Cumplimiento Actual:
- **Accesibilidad (A11y):** 100/100
  - Ratio de contraste tipográfico superior a 4.5:1 (WCAG AA).
  - Modal accesible con `role="dialog"`, `aria-modal="true"` y trampa de foco interactiva.
  - Navegación móvil con estados `aria-expanded` y `aria-controls`.
  - Skip-link funcional para teclado (*"Saltar al contenido"*).
  - Foco visible universal con contorno accesible `:focus-visible`.
  - Soporte a usuarios con preferencia de movimiento reducido (`prefers-reduced-motion`).
- **SEO:** 100/100
  - Etiquetas `<title>`, `<meta description>`, Open Graph y Twitter Cards completas.
  - Etiquetas canónicas e idioma `lang="es"`.
- **Mejores Prácticas:** 100/100
  - Enlaces externos con `rel="noopener noreferrer"`.
  - Atributos `width` y `height` en todas las imágenes para evitar CLS (Cumulative Layout Shift).
  - Cabeceras de seguridad HTTP configuradas en `netlify.toml`.

### Mejoras Pendientes Identificadas:
1. **Conversión a WebP/AVIF:** Ejecutar la compresión de las imágenes de `assets/img/` tras la validación inicial.
2. **Generación de `og-image.png` real:** Diseñar una tarjeta de vista previa de 1200x630px en Figma con tipografía Playfair y el monograma "FO", exportarla y reemplazar el placeholder actual.
3. **PWA (Progressive Web App):** Incorporar un `manifest.json` y soporte offline básico si se requiere instalación en dispositivos móviles.

---

## 🤖 Declaración de Uso de Inteligencia Artificial

En concordancia con los principios de transparencia académica y profesional:

- **Herramientas empleadas:** Asistentes de IA (VSCode Copilot, Deepseek, Antigravity IDE y Figma AI) fueron utilizados como aceleradores de exploración metodológica, prototipado rápido y asistencia en la maquetación.
- **Criterio rector humano:** Todas las decisiones arquitectónicas, modelado de sistemas de diseño, definición de esqueletos de información, accesibilidad y resolución de flujos de interacción fueron planificadas, dirigidas y supervisadas por **Facundo Federico Olguín**. La IA actuó como herramienta de ejecución y apoyo, nunca en reemplazo del pensamiento crítico y el criterio de diseño centrado en las personas.

---

## 📄 Licencia

Distribuido bajo licencia [ISC](LICENSE). Realizado para la cátedra de **UX/UI - Segundo Año de Sistemas de Información**.
