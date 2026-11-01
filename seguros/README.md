# Cubrí Seguros — Flujo de Contratación Digital

Implementación front-end del flujo completo de contratación digital de seguros para **Cubrí Seguros**, cumpliendo estrictamente con la especificación del trabajo práctico de UX/UI (Licenciatura en Sistemas de Información, FCyT - 2026).

---

## 🛠️ Stack Tecnológico

- **HTML5 semántico**: Estructura accesible con `aria-invalid`, `aria-describedby`, `role="alert"` y etiquetas `<label for>`.
- **Tailwind CSS v4 (Browser CDN)**: Utilidades de layout responsive y espaciado mobile-first.
- **Basecoat UI (CDN)**: Sistema de diseño de componentes (estilo shadcn/ui en HTML + Tailwind).
- **JavaScript Vanilla (ES Modules)**: Arquitectura limpia modular sin frameworks ni librerías de validación de terceros.
- **Tokens de Diseño**: Sobrescritura de variables CSS (`--primary: #4F46E5`, `--radius: 0.75rem`, etc.) y tipografía **Inter**.

---

## 📂 Estructura del Proyecto

```text
seguros/
├── index.html              # SPA con las 7 pantallas (secciones con data-paso y hidden)
├── css/
│   └── tokens.css          # Variables CSS, overrides de Basecoat y tipografía Inter
├── data/
│   └── planes.json         # Datos de los planes (cargados mediante fetch)
├── js/
│   ├── app.js              # Arranque, event listeners y flujo de navegación
│   ├── estado.js           # Objeto único de solicitud y mutadores
│   ├── render.js           # Sincronización del DOM, Stepper y resumen
│   ├── validaciones.js     # Funciones puras de validación
│   ├── cotizador.js        # Cálculo de cuotas y formateo de moneda
│   └── pago.js             # Simulación de pago asíncrono y generación de póliza
└── README.md
```

---

## 🚀 Cómo ejecutar el proyecto

Dado que el proyecto utiliza módulos ES (`<script type="module">`) y carga los planes mediante `fetch('data/planes.json')`, debe ejecutarse a través de un servidor local (para evitar bloqueos CORS por protocolo `file://`).

### Opción 1: Con Python (disponible en la mayoría de sistemas)
```bash
python -m http.server 3000
```
Abrir `http://localhost:3000` en el navegador.

### Opción 2: Con Node.js / npx serve
```bash
npx serve .
```

### Opción 3: Con VS Code Live Server
Abrir la carpeta en VS Code y hacer clic en **"Go Live"** en la barra inferior.

---

## 🧮 Reglas de Negocio y Casos de Prueba

### Fórmula de Cuota Mensual
$$\text{cuota} = \text{Math.round}\left(\text{valor} \times \frac{\text{tasaAnual}}{12} \times \text{factorAntiguedad}\right)$$

### Factores de Antigüedad
- **Menos de 1 año:** Factor $1.00$
- **1 a 2 años:** Factor $1.10$
- **Más de 2 años:** Factor $1.25$

### Verificación de Casos de Prueba
| Valor del equipo | Antigüedad | Básico (4%) | Plus (6%) | Premium (9%) |
| :--- | :--- | :--- | :--- | :--- |
| **\$ 600.000** | Menos de 1 año | **\$ 2.000** | **\$ 3.000** | **\$ 4.500** |
| **\$ 600.000** | 1 a 2 años | **\$ 2.200** | **\$ 3.300** | **\$ 4.950** |
| **\$ 1.200.000** | Más de 2 años | **\$ 5.000** | **\$ 7.500** | **\$ 11.250** |

---

## 💳 Simulación de Pago y Pólizas

### Tarjetas de Prueba
- `4111 1111 1111 1111` → **Aprobado**: Lleva a la pantalla de éxito (Paso 5) y genera póliza con formato `POL-AAAA-NNNNNN`.
- `4000 0000 0000 0002` → **Rechazado**: Lleva a la pantalla de error (Paso 6) con opciones de *Reintentar pago* o *Cambiar medio de pago* conservando los datos cargados.
- Cualquier otra tarjeta válida de 16 dígitos → **Aprobado**.

---

## 📱 Diseño Responsive y Accesibilidad

- **Mobile First (390px)**: Formularios de una columna, resumen compacto integrado y botones de acción accesibles.
- **Desktop (1440px)**: Grid en dos columnas (`lg:grid-cols-[1fr_380px]`) con formulario principal a la izquierda y card de resumen lateral persistente a la derecha.
- **Accesibilidad**:
  - Cada control de formulario posee su etiqueta `<label for>`.
  - Estados inválidos marcados con `aria-invalid="true"` y mensajes accesibles con `role="alert"` y `aria-describedby`.
  - Foco programático al primer campo con error al intentar avanzar.
- **Bonus incluidos**:
  - Máscaras automáticas en inputs: espaciado de tarjeta en bloques de 4 dígitos y formato automático de vencimiento `MM/AA`.
  - Formateo de moneda estricto mediante `Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })`.
  - Conservación íntegra de datos al retroceder y avanzar entre pasos.
