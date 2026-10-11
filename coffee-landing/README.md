# Coffea — Specialty Coffee

Landing page estática para Coffea, una marca ficticia de café de especialidad. Está construida con HTML5 semántico y CSS3, sin JavaScript ni frameworks, e incluye una página 404 con la identidad visual compartida.

## Estructura

```text
.
├── index.html
├── 404.html
├── netlify.toml
└── css/
    ├── main.css
    ├── tokens.css
    ├── base.css
    ├── layout.css
    ├── utilities.css
    └── components/
        ├── header.css
        ├── hero.css
        ├── categories.css
        ├── product-card.css
        ├── carousel.css
        ├── promo.css
        ├── testimonial-card.css
        ├── newsletter.css
        ├── footer.css
        ├── cta.css
        └── not-found.css
```

`index.html` contiene las nueve áreas visuales de la landing: header, hero, categorías, cafés, postres, promoción, testimonios, newsletter y footer. `404.html` reutiliza el header y footer y carga la misma hoja de estilos de entrada.

## Convenciones de desarrollo

- **BEM:** los componentes usan bloques, elementos y modificadores, por ejemplo `product-card`, `product-card__media` y `button--dark`.
- **Tokens:** colores, tipografías, escalas, medidas reutilizables y breakpoints se centralizan en `css/tokens.css` como custom properties.
- **Capas:** los estilos se organizan con `@layer` (`tokens`, `base`, `layout`, `utilities` y `components`).
- **Mobile-first:** las reglas base cubren pantallas pequeñas; los ajustes de tablet y escritorio se agregan con media queries de ancho mínimo.
- **Sin JavaScript:** la navegación plegable usa el elemento nativo `<details>`; no se incorporan scripts ni dependencias de frontend.

## Ejecutar en local

Abrí `index.html` con la extensión **Live Server** de VS Code, o iniciá un servidor estático desde la carpeta raíz del proyecto:

```powershell
py -m http.server 8000
```

Visitá [http://localhost:8000](http://localhost:8000). También se puede usar cualquier servidor estático equivalente; no hay paso de compilación ni instalación de paquetes.

## Desplegar en Netlify

1. Subí el proyecto a un repositorio Git.
2. En Netlify, elegí **Add new site → Import an existing project** y conectá el repositorio.
3. Configurá el directorio de publicación como `.` y dejá vacío el comando de build.
4. Desplegá el sitio. Netlify publicará automáticamente cada cambio integrado al branch configurado y generará Deploy Previews para pull requests.
5. Verificá que el sitio publicado y las Deploy Previews se sirvan por HTTPS.

La configuración de headers y caché se encuentra en `netlify.toml`.

## Checklist de QA y Definition of Done

Marcar cada criterio solo después de completar la prueba correspondiente. Los valores son umbrales de aceptación, no resultados de mediciones todavía no registradas.

- [x] Las nueve áreas visuales están implementadas y aprobadas contra Figma.
- [ ] El validador W3C informa **0 errores HTML** y **0 errores CSS**.
- [x] Lighthouse alcanza **Performance ≥ 90** y **Accessibility, Best Practices y SEO ≥ 95**.
- [x] El proyecto no contiene JavaScript (sin archivos JS ni scripts en el marcado).
- [ ] No hay valores de diseño fuera de los tokens definidos en `css/tokens.css`.
- [ ] La landing y la página 404 fueron probadas en Chrome, Firefox, Safari y Samsung Internet.
- [x] El sitio está publicado en Netlify con HTTPS y Deploy Previews habilitadas.

## DESVIACIÓN DEL PRD (moneda):
- Se cambió "Rs." (rupias) por "$" (pesos argentinos), según decisión abierta en el PRD (sección 11).