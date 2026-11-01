import { solicitud } from './estado.js';
import { calcularCuota, formatearMoneda } from './cotizador.js';
import {
  validarMarca,
  validarModelo,
  validarValorEquipo,
  validarAntiguedad,
  validarNombre,
  validarApellido,
  validarDNI,
  validarFechaNacimiento,
  validarEmail,
  validarCelular,
  validarTerminos
} from './validaciones.js';

let listaPlanes = [];

export function setPlanes(planes) {
  listaPlanes = planes;
}

export function getPlanes() {
  return listaPlanes;
}

export function render() {
  // 1. Mostrar u ocultar secciones según solicitud.paso
  document.querySelectorAll('[data-paso]').forEach((s) => {
    s.hidden = Number(s.dataset.paso) !== solicitud.paso;
  });

  // 2. Renderizar componentes compartidos
  renderStepper();
  renderPlanes();
  renderResumen();
  sincronizarCampos();
  actualizarEstadoBotones();

  // Scroll to top on step change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function renderStepper() {
  const stepperContainer = document.getElementById('stepper-container');
  if (!stepperContainer) return;

  const pasoActual = solicitud.paso;
  if (pasoActual < 1 || pasoActual > 4) {
    stepperContainer.classList.add('hidden');
    return;
  }
  stepperContainer.classList.remove('hidden');

  const pasos = [
    { num: 1, label: 'Cotizar' },
    { num: 2, label: 'Elegir plan' },
    { num: 3, label: 'Datos personales' },
    { num: 4, label: 'Pago' }
  ];

  pasos.forEach((p) => {
    const item = document.getElementById(`step-item-${p.num}`);
    const badge = document.getElementById(`step-badge-${p.num}`);
    const label = document.getElementById(`step-label-${p.num}`);
    const line = document.getElementById(`step-line-${p.num}`);

    if (!item || !badge || !label) return;

    if (p.num < pasoActual) {
      // Completo
      badge.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-emerald-600 text-white transition-all shadow-sm';
      badge.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
        </svg>
      `;
      label.className = 'text-xs md:text-sm font-medium text-emerald-700 hidden sm:inline-block';
      if (line) line.className = 'flex-1 h-0.5 bg-emerald-600 transition-all';
    } else if (p.num === pasoActual) {
      // Activo
      badge.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-indigo-600 text-white ring-4 ring-indigo-100 transition-all shadow';
      badge.textContent = p.num;
      label.className = 'text-xs md:text-sm font-bold text-indigo-700 inline-block';
      if (line) line.className = 'flex-1 h-0.5 bg-slate-200 transition-all';
    } else {
      // Pendiente
      badge.className = 'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-white border-2 border-slate-300 text-slate-500 transition-all';
      badge.textContent = p.num;
      label.className = 'text-xs md:text-sm font-medium text-slate-500 hidden sm:inline-block';
      if (line) line.className = 'flex-1 h-0.5 bg-slate-200 transition-all';
    }
  });
}

export function renderPlanes() {
  const container = document.getElementById('planes-cards-container');
  if (!container || !listaPlanes.length) return;

  const valor = solicitud.equipo.valor || 0;
  const antiguedad = solicitud.equipo.antiguedad || 'menos_1';

  container.innerHTML = listaPlanes.map((plan) => {
    const cuota = calcularCuota(valor, plan.tasaAnual, antiguedad);
    const cuotaFormateada = formatearMoneda(cuota);
    const esSeleccionado = solicitud.plan === plan.id;
    const esRecomendado = !!plan.recomendado;

    return `
      <label class="plan-card relative flex flex-col justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all ${
        esSeleccionado
          ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
      }">
        <input type="radio" name="plan" value="${plan.id}" class="sr-only" ${esSeleccionado ? 'checked' : ''}>
        
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <h4 class="text-lg font-bold text-slate-900">${plan.nombre}</h4>
            ${
              esRecomendado
                ? '<span class="badge px-2.5 py-0.5 text-xs font-semibold bg-indigo-600 text-white rounded-full">Recomendado</span>'
                : ''
            }
          </div>
          
          <div class="my-4">
            <span class="text-3xl font-extrabold text-slate-900">${cuotaFormateada}</span>
            <span class="text-sm font-medium text-slate-500"> / mes</span>
          </div>
          
          <div class="pt-3 border-t border-slate-100">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Coberturas incluidas:</p>
            <ul class="space-y-2 text-sm text-slate-700">
              ${plan.coberturas
                .map(
                  (c) => `
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>${c}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center">
          <span class="text-xs font-bold uppercase tracking-wider ${
            esSeleccionado ? 'text-indigo-600' : 'text-slate-500'
          }">
            ${esSeleccionado ? '✓ Plan seleccionado' : 'Seleccionar plan'}
          </span>
        </div>
      </label>
    `;
  }).join('');
}

export function renderResumen() {
  const planActual = listaPlanes.find((p) => p.id === solicitud.plan) || listaPlanes[1] || {
    id: 'plus',
    nombre: 'Plus',
    tasaAnual: 0.06,
    coberturas: ['Robo con violencia', 'Rotura de pantalla']
  };

  const valor = solicitud.equipo.valor || 0;
  const antiguedad = solicitud.equipo.antiguedad || 'menos_1';
  const cuota = calcularCuota(valor, planActual.tasaAnual, antiguedad);
  const cuotaFormateada = formatearMoneda(cuota);

  const equipoStr = solicitud.equipo.marca && solicitud.equipo.modelo
    ? `${solicitud.equipo.marca} ${solicitud.equipo.modelo}`
    : 'No definido';

  const titularStr = solicitud.titular.nombre && solicitud.titular.apellido
    ? `${solicitud.titular.nombre} ${solicitud.titular.apellido}`
    : 'Pendiente de carga';

  // Actualizar elementos marcados con clases comunes
  document.querySelectorAll('.resumen-equipo-nombre').forEach((el) => {
    el.textContent = equipoStr;
  });

  document.querySelectorAll('.resumen-plan-nombre').forEach((el) => {
    el.textContent = planActual.nombre;
  });

  document.querySelectorAll('.resumen-total-cuota').forEach((el) => {
    el.textContent = cuotaFormateada;
  });

  document.querySelectorAll('.resumen-titular-nombre').forEach((el) => {
    el.textContent = titularStr;
  });

  document.querySelectorAll('.resumen-coberturas-lista').forEach((el) => {
    el.innerHTML = planActual.coberturas
      .map(
        (c) => `
        <li class="flex items-center gap-1.5 text-xs text-slate-600">
          <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>${c}</span>
        </li>
      `
      )
      .join('');
  });

  // Si estamos en Paso 5 (Éxito), actualizar datos de éxito
  if (solicitud.paso === 5) {
    const exitoTitular = document.getElementById('exito-titular');
    const exitoEmail = document.getElementById('exito-email');
    const exitoPoliza = document.getElementById('exito-poliza');
    const exitoEquipo = document.getElementById('exito-equipo');
    const exitoPlan = document.getElementById('exito-plan');
    const exitoCuota = document.getElementById('exito-cuota');

    if (exitoTitular) exitoTitular.textContent = titularStr;
    if (exitoEmail) exitoEmail.textContent = solicitud.titular.email;
    if (exitoPoliza) exitoPoliza.textContent = solicitud.poliza || 'POL-2026-000000';
    if (exitoEquipo) exitoEquipo.textContent = equipoStr;
    if (exitoPlan) exitoPlan.textContent = planActual.nombre;
    if (exitoCuota) exitoCuota.textContent = cuotaFormateada;
  }
}

export function sincronizarCampos() {
  // Sincronizar inputs desde el estado para no perder datos al navegar
  const activeEl = document.activeElement;

  // Paso 1
  const marcaEl = document.getElementById('marca');
  if (marcaEl && marcaEl !== activeEl && solicitud.equipo.marca) {
    marcaEl.value = solicitud.equipo.marca;
  }

  const modeloEl = document.getElementById('modelo');
  if (modeloEl && modeloEl !== activeEl && solicitud.equipo.modelo) {
    modeloEl.value = solicitud.equipo.modelo;
  }

  const valorEl = document.getElementById('valor');
  if (valorEl && valorEl !== activeEl && solicitud.equipo.valor) {
    valorEl.value = formatearMoneda(solicitud.equipo.valor);
  }

  if (solicitud.equipo.antiguedad) {
    const radioAnt = document.querySelector(`input[name="antiguedad"][value="${solicitud.equipo.antiguedad}"]`);
    if (radioAnt) radioAnt.checked = true;
  }

  // Paso 3
  const nombreEl = document.getElementById('nombre');
  if (nombreEl && nombreEl !== activeEl) nombreEl.value = solicitud.titular.nombre || '';

  const apellidoEl = document.getElementById('apellido');
  if (apellidoEl && apellidoEl !== activeEl) apellidoEl.value = solicitud.titular.apellido || '';

  const dniEl = document.getElementById('dni');
  if (dniEl && dniEl !== activeEl) dniEl.value = solicitud.titular.dni || '';

  const nacEl = document.getElementById('nacimiento');
  if (nacEl && nacEl !== activeEl) nacEl.value = solicitud.titular.nacimiento || '';

  const emailEl = document.getElementById('email');
  if (emailEl && emailEl !== activeEl) emailEl.value = solicitud.titular.email || '';

  const celEl = document.getElementById('celular');
  if (celEl && celEl !== activeEl) celEl.value = solicitud.titular.celular || '';

  const terminosEl = document.getElementById('terminos');
  if (terminosEl) terminosEl.checked = !!solicitud.titular.terminos;

  // Paso 4
  const tarjEl = document.getElementById('tarjeta');
  if (tarjEl && tarjEl !== activeEl) tarjEl.value = solicitud.pago.tarjeta || '';

  const vencEl = document.getElementById('vencimiento');
  if (vencEl && vencEl !== activeEl) vencEl.value = solicitud.pago.vencimiento || '';

  const cvvEl = document.getElementById('cvv');
  if (cvvEl && cvvEl !== activeEl) cvvEl.value = solicitud.pago.cvv || '';

  const titularTarjEl = document.getElementById('titular_tarjeta');
  if (titularTarjEl && titularTarjEl !== activeEl) {
    titularTarjEl.value = solicitud.pago.titular || '';
  }
}

export function actualizarEstadoBotones() {
  // Botón Paso 1: "Ver planes"
  const btnPaso1 = document.getElementById('btn-continuar-paso-1');
  const hintPaso1 = document.getElementById('hint-paso-1');
  if (btnPaso1) {
    const errorMarca = validarMarca(solicitud.equipo.marca);
    const errorModelo = validarModelo(solicitud.equipo.modelo);
    const errorValor = validarValorEquipo(solicitud.equipo.valor);
    const errorAnt = validarAntiguedad(solicitud.equipo.antiguedad);

    const esPaso1Valido = !errorMarca && !errorModelo && !errorValor && !errorAnt;
    btnPaso1.disabled = !esPaso1Valido;
    if (hintPaso1) {
      hintPaso1.classList.toggle('hidden', esPaso1Valido);
    }
  }

  // Botón Paso 3: "Continuar al pago"
  const btnPaso3 = document.getElementById('btn-continuar-paso-3');
  const hintPaso3 = document.getElementById('hint-paso-3');
  if (btnPaso3) {
    const errorNom = validarNombre(solicitud.titular.nombre);
    const errorApe = validarApellido(solicitud.titular.apellido);
    const errorDni = validarDNI(solicitud.titular.dni);
    const errorNac = validarFechaNacimiento(solicitud.titular.nacimiento);
    const errorEmail = validarEmail(solicitud.titular.email);
    const errorCel = validarCelular(solicitud.titular.celular);
    const errorTerm = validarTerminos(solicitud.titular.terminos);

    const esPaso3Valido =
      !errorNom && !errorApe && !errorDni && !errorNac && !errorEmail && !errorCel && !errorTerm;
    btnPaso3.disabled = !esPaso3Valido;
    if (hintPaso3) {
      hintPaso3.classList.toggle('hidden', esPaso3Valido);
    }
  }
}
