import {
  solicitud,
  cargarEstado,
  guardarEstado,
  navegarA,
  reiniciarSolicitud
} from './estado.js';
import { render, setPlanes, actualizarEstadoBotones } from './render.js';
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
  validarTerminos,
  validarTarjeta,
  validarVencimiento,
  validarCVV,
  validarTitular
} from './validaciones.js';
import { formatearMoneda } from './cotizador.js';
import { simularPago, generarPoliza } from './pago.js';

const PLANES_DEFAULT = [
  {
    id: 'basico',
    nombre: 'Básico',
    tasaAnual: 0.04,
    coberturas: ['Robo con violencia']
  },
  {
    id: 'plus',
    nombre: 'Plus',
    tasaAnual: 0.06,
    recomendado: true,
    coberturas: ['Robo con violencia', 'Rotura de pantalla']
  },
  {
    id: 'premium',
    nombre: 'Premium',
    tasaAnual: 0.09,
    coberturas: ['Robo con violencia', 'Rotura total', 'Hurto / pérdida']
  }
];

function mostrarErrorCampo(campoId, errorMsg) {
  const fieldEl = document.getElementById(`field-${campoId}`);
  const inputEl = document.getElementById(campoId);
  const errorEl = document.getElementById(`${campoId}-error`);

  if (!inputEl || !errorEl) return;

  if (errorMsg) {
    if (fieldEl) fieldEl.setAttribute('data-invalid', '');
    inputEl.setAttribute('aria-invalid', 'true');
    inputEl.setAttribute('aria-describedby', `${campoId}-error`);
    errorEl.textContent = errorMsg;
    errorEl.classList.remove('hidden');
  } else {
    if (fieldEl) fieldEl.removeAttribute('data-invalid');
    inputEl.removeAttribute('aria-invalid');
    inputEl.removeAttribute('aria-describedby');
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }
}

async function cargarPlanes() {
  try {
    const res = await fetch('data/planes.json');
    if (!res.ok) throw new Error('Error al cargar planes.json');
    const planes = await res.json();
    setPlanes(planes);
  } catch (err) {
    console.warn('Fetch local falló o sin servidor web, utilizando datos por defecto:', err);
    setPlanes(PLANES_DEFAULT);
  }
}

function inicializarCatalogo() {
  const btnCelular = document.getElementById('btn-iniciar-celular');
  if (btnCelular) {
    btnCelular.addEventListener('click', () => {
      solicitud.paso = 1;
      navegarA('cotizacion.html');
    });
  }
}

function inicializarCotizacion() {
  const marcaEl = document.getElementById('marca');
  const modeloEl = document.getElementById('modelo');
  const valorEl = document.getElementById('valor');
  const radiosAntiguedad = document.querySelectorAll('input[name="antiguedad"]');
  const btnVolver = document.getElementById('btn-volver-paso-1');
  const btnContinuar = document.getElementById('btn-continuar-paso-1');

  if (marcaEl) {
    marcaEl.addEventListener('change', () => {
      solicitud.equipo.marca = marcaEl.value;
      guardarEstado();
      mostrarErrorCampo('marca', validarMarca(marcaEl.value));
      actualizarEstadoBotones();
    });
    marcaEl.addEventListener('blur', () => {
      mostrarErrorCampo('marca', validarMarca(marcaEl.value));
      actualizarEstadoBotones();
    });
  }

  if (modeloEl) {
    modeloEl.addEventListener('input', () => {
      solicitud.equipo.modelo = modeloEl.value;
      guardarEstado();
      actualizarEstadoBotones();
    });
    modeloEl.addEventListener('blur', () => {
      mostrarErrorCampo('modelo', validarModelo(modeloEl.value));
      actualizarEstadoBotones();
    });
  }

  if (valorEl) {
    valorEl.addEventListener('input', (e) => {
      const raw = e.target.value.replace(/\D/g, '');
      const num = raw ? Number(raw) : 0;
      solicitud.equipo.valor = num;
      guardarEstado();
      actualizarEstadoBotones();
    });

    valorEl.addEventListener('blur', () => {
      const num = solicitud.equipo.valor;
      if (num > 0) {
        valorEl.value = formatearMoneda(num);
      }
      mostrarErrorCampo('valor', validarValorEquipo(num));
      actualizarEstadoBotones();
    });

    valorEl.addEventListener('focus', () => {
      if (solicitud.equipo.valor > 0) {
        valorEl.value = String(solicitud.equipo.valor);
      }
    });
  }

  radiosAntiguedad.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        solicitud.equipo.antiguedad = radio.value;
        guardarEstado();
        const errorEl = document.getElementById('antiguedad-error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.add('hidden');
        }
        actualizarEstadoBotones();
      }
    });
  });

  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      solicitud.paso = 0;
      navegarA('index.html');
    });
  }

  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
      const errMarca = validarMarca(solicitud.equipo.marca);
      const errModelo = validarModelo(solicitud.equipo.modelo);
      const errValor = validarValorEquipo(solicitud.equipo.valor);
      const errAnt = validarAntiguedad(solicitud.equipo.antiguedad);

      mostrarErrorCampo('marca', errMarca);
      mostrarErrorCampo('modelo', errModelo);
      mostrarErrorCampo('valor', errValor);

      const errorAntEl = document.getElementById('antiguedad-error');
      if (errAnt && errorAntEl) {
        errorAntEl.textContent = errAnt;
        errorAntEl.classList.remove('hidden');
      }

      if (errMarca) {
        marcaEl?.focus();
        return;
      }
      if (errModelo) {
        modeloEl?.focus();
        return;
      }
      if (errValor) {
        valorEl?.focus();
        return;
      }
      if (errAnt) {
        radiosAntiguedad[0]?.focus();
        return;
      }

      solicitud.paso = 2;
      navegarA('planes.html');
    });
  }
}

function inicializarPlanes() {
  const containerPlanes = document.getElementById('planes-cards-container');
  const btnVolver = document.getElementById('btn-volver-paso-2');
  const btnContinuar = document.getElementById('btn-continuar-paso-2');

  if (containerPlanes) {
    containerPlanes.addEventListener('change', (e) => {
      if (e.target.name === 'plan') {
        solicitud.plan = e.target.value;
        guardarEstado();
        render();
      }
    });
  }

  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      solicitud.paso = 1;
      navegarA('cotizacion.html');
    });
  }

  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
      solicitud.paso = 3;
      navegarA('datos.html');
    });
  }
}

function inicializarDatos() {
  const campos = [
    { id: 'nombre', validador: validarNombre, campoEstado: 'nombre' },
    { id: 'apellido', validador: validarApellido, campoEstado: 'apellido' },
    { id: 'dni', validador: validarDNI, campoEstado: 'dni' },
    { id: 'nacimiento', validador: validarFechaNacimiento, campoEstado: 'nacimiento', evento: 'change' },
    { id: 'email', validador: validarEmail, campoEstado: 'email' },
    { id: 'celular', validador: validarCelular, campoEstado: 'celular' }
  ];

  campos.forEach(({ id, validador, campoEstado, evento }) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener(evento || 'input', () => {
      solicitud.titular[campoEstado] = el.value.trim();
      guardarEstado();
      actualizarEstadoBotones();
    });

    el.addEventListener('blur', () => {
      mostrarErrorCampo(id, validador(solicitud.titular[campoEstado]));
      actualizarEstadoBotones();
    });
  });

  const terminosEl = document.getElementById('terminos');
  if (terminosEl) {
    terminosEl.addEventListener('change', () => {
      solicitud.titular.terminos = terminosEl.checked;
      guardarEstado();
      const errorTerm = validarTerminos(terminosEl.checked);
      const errorEl = document.getElementById('terminos-error');
      if (errorEl) {
        if (errorTerm) {
          errorEl.textContent = errorTerm;
          errorEl.classList.remove('hidden');
        } else {
          errorEl.textContent = '';
          errorEl.classList.add('hidden');
        }
      }
      actualizarEstadoBotones();
    });
  }

  const btnVolver = document.getElementById('btn-volver-paso-3');
  const btnContinuar = document.getElementById('btn-continuar-paso-3');

  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      solicitud.paso = 2;
      navegarA('planes.html');
    });
  }

  if (btnContinuar) {
    btnContinuar.addEventListener('click', () => {
      let primerInvalido = null;

      for (const { id, validador, campoEstado } of campos) {
        const error = validador(solicitud.titular[campoEstado]);
        mostrarErrorCampo(id, error);
        if (error && !primerInvalido) {
          primerInvalido = document.getElementById(id);
        }
      }

      const errTerm = validarTerminos(solicitud.titular.terminos);
      const errTermEl = document.getElementById('terminos-error');
      if (errTerm && errTermEl) {
        errTermEl.textContent = errTerm;
        errTermEl.classList.remove('hidden');
        if (!primerInvalido) primerInvalido = terminosEl;
      }

      if (primerInvalido) {
        primerInvalido.focus();
        return;
      }

      solicitud.paso = 4;
      navegarA('pago.html');
    });
  }
}

function inicializarPago() {
  const tarjetaEl = document.getElementById('tarjeta');
  const vencimientoEl = document.getElementById('vencimiento');
  const cvvEl = document.getElementById('cvv');
  const titularEl = document.getElementById('titular_tarjeta');
  const radiosMetodo = document.querySelectorAll('input[name="metodo_pago"]');
  const btnVolver = document.getElementById('btn-volver-paso-4');
  const btnPagar = document.getElementById('btn-pagar');

  radiosMetodo.forEach((r) => {
    r.addEventListener('change', () => {
      if (r.checked) {
        solicitud.pago.metodo = r.value;
        guardarEstado();
      }
    });
  });

  if (tarjetaEl) {
    tarjetaEl.addEventListener('input', (e) => {
      const digitos = e.target.value.replace(/\D/g, '').slice(0, 16);
      const partes = digitos.match(/.{1,4}/g);
      const formateado = partes ? partes.join(' ') : digitos;
      e.target.value = formateado;
      solicitud.pago.tarjeta = formateado;
      guardarEstado();
    });

    tarjetaEl.addEventListener('blur', () => {
      mostrarErrorCampo('tarjeta', validarTarjeta(tarjetaEl.value));
    });
  }

  if (vencimientoEl) {
    vencimientoEl.addEventListener('input', (e) => {
      let digitos = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (digitos.length >= 3) {
        digitos = digitos.slice(0, 2) + '/' + digitos.slice(2);
      }
      e.target.value = digitos;
      solicitud.pago.vencimiento = digitos;
      guardarEstado();
    });

    vencimientoEl.addEventListener('blur', () => {
      mostrarErrorCampo('vencimiento', validarVencimiento(vencimientoEl.value));
    });
  }

  if (cvvEl) {
    cvvEl.addEventListener('input', (e) => {
      const digitos = e.target.value.replace(/\D/g, '').slice(0, 3);
      e.target.value = digitos;
      solicitud.pago.cvv = digitos;
      guardarEstado();
    });

    cvvEl.addEventListener('blur', () => {
      mostrarErrorCampo('cvv', validarCVV(cvvEl.value));
    });
  }

  if (titularEl) {
    titularEl.addEventListener('input', (e) => {
      solicitud.pago.titular = e.target.value;
      guardarEstado();
    });

    titularEl.addEventListener('blur', () => {
      mostrarErrorCampo('titular_tarjeta', validarTitular(titularEl.value));
    });
  }

  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      solicitud.paso = 3;
      navegarA('datos.html');
    });
  }

  if (btnPagar) {
    btnPagar.addEventListener('click', async (e) => {
      e.preventDefault();

      const errTarjeta = validarTarjeta(solicitud.pago.tarjeta);
      const errVenc = validarVencimiento(solicitud.pago.vencimiento);
      const errCvv = validarCVV(solicitud.pago.cvv);
      const errTitular = validarTitular(solicitud.pago.titular);

      mostrarErrorCampo('tarjeta', errTarjeta);
      mostrarErrorCampo('vencimiento', errVenc);
      mostrarErrorCampo('cvv', errCvv);
      mostrarErrorCampo('titular_tarjeta', errTitular);

      if (errTarjeta) {
        tarjetaEl?.focus();
        return;
      }
      if (errVenc) {
        vencimientoEl?.focus();
        return;
      }
      if (errCvv) {
        cvvEl?.focus();
        return;
      }
      if (errTitular) {
        titularEl?.focus();
        return;
      }

      btnPagar.disabled = true;
      const textoOriginal = btnPagar.innerHTML;
      btnPagar.innerHTML = `
        <span class="inline-flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Procesando...
        </span>
      `;

      try {
        const resultado = await simularPago(solicitud.pago.tarjeta);
        if (resultado.ok) {
          solicitud.poliza = generarPoliza();
          solicitud.errorPago = null;
          solicitud.paso = 5;
          guardarEstado();
          navegarA('exito.html');
        } else {
          solicitud.errorPago = resultado.motivo || 'Tarjeta rechazada';
          solicitud.paso = 6;
          guardarEstado();
          navegarA('error-pago.html');
        }
      } catch (err) {
        console.error('Error al simular pago:', err);
        solicitud.errorPago = 'Error de conexión en la pasarela de pagos';
        solicitud.paso = 6;
        guardarEstado();
        navegarA('error-pago.html');
      } finally {
        btnPagar.disabled = false;
        btnPagar.innerHTML = textoOriginal;
      }
    });
  }
}

function inicializarExito() {
  const btnInicio = document.getElementById('btn-exito-inicio');
  if (btnInicio) {
    btnInicio.addEventListener('click', () => {
      reiniciarSolicitud();
    });
  }
}

function inicializarErrorPago() {
  const btnReintentar = document.getElementById('btn-error-reintentar');
  const btnCambiarMedio = document.getElementById('btn-error-cambiar-medio');

  if (btnReintentar) {
    btnReintentar.addEventListener('click', () => {
      solicitud.paso = 4;
      navegarA('pago.html');
    });
  }

  if (btnCambiarMedio) {
    btnCambiarMedio.addEventListener('click', () => {
      solicitud.paso = 4;
      navegarA('pago.html');
    });
  }
}

function verificarGuardasDeRuta(pagina) {
  // Verificación de integridad de flujo ante recargas directas
  if (pagina === 'planes') {
    if (!solicitud.equipo.marca || !solicitud.equipo.modelo || !solicitud.equipo.valor || !solicitud.equipo.antiguedad) {
      window.location.replace('cotizacion.html');
      return false;
    }
  }

  if (pagina === 'datos') {
    if (!solicitud.equipo.valor) {
      window.location.replace('cotizacion.html');
      return false;
    }
  }

  if (pagina === 'pago') {
    if (!solicitud.equipo.valor) {
      window.location.replace('cotizacion.html');
      return false;
    }
    if (!solicitud.titular.dni || !solicitud.titular.email) {
      window.location.replace('datos.html');
      return false;
    }
  }

  if (pagina === 'exito') {
    if (!solicitud.poliza) {
      window.location.replace('index.html');
      return false;
    }
  }

  if (pagina === 'error-pago') {
    if (!solicitud.equipo.valor) {
      window.location.replace('index.html');
      return false;
    }
  }

  return true;
}

document.addEventListener('DOMContentLoaded', async () => {
  cargarEstado();
  await cargarPlanes();

  const paginaActual = document.body?.dataset?.page || 'catalogo';

  // Si la guarda de ruta redirige, no inicializamos eventos innecesarios
  if (!verificarGuardasDeRuta(paginaActual)) {
    return;
  }

  switch (paginaActual) {
    case 'catalogo':
      inicializarCatalogo();
      break;
    case 'cotizacion':
      inicializarCotizacion();
      break;
    case 'planes':
      inicializarPlanes();
      break;
    case 'datos':
      inicializarDatos();
      break;
    case 'pago':
      inicializarPago();
      break;
    case 'exito':
      inicializarExito();
      break;
    case 'error-pago':
      inicializarErrorPago();
      break;
    default:
      console.warn('Página no reconocida:', paginaActual);
  }

  render();
});
