const STORAGE_KEY = 'cubri_seguros_solicitud';

export const solicitud = {
  paso: 0, // 0 = inicio, 1 = cotizar, 2 = planes, 3 = datos, 4 = pago, 5 = éxito, 6 = error
  equipo: {
    marca: '',
    modelo: '',
    valor: 0,
    antiguedad: ''
  },
  plan: 'plus',
  titular: {
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: '',
    email: '',
    celular: '',
    terminos: false
  },
  pago: {
    metodo: 'credito',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    titular: ''
  },
  poliza: null,
  errorPago: null
};

export function guardarEstado() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(solicitud));
  } catch (err) {
    console.error('Error al guardar el estado en localStorage:', err);
  }
}

export function cargarEstado() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return solicitud;
    const guardado = JSON.parse(raw);

    // Deep merge para mantener la reactividad del objeto exportado
    if (typeof guardado.paso === 'number') solicitud.paso = guardado.paso;
    if (guardado.plan) solicitud.plan = guardado.plan;
    if (guardado.poliza !== undefined) solicitud.poliza = guardado.poliza;
    if (guardado.errorPago !== undefined) solicitud.errorPago = guardado.errorPago;

    if (guardado.equipo) {
      solicitud.equipo.marca = guardado.equipo.marca || '';
      solicitud.equipo.modelo = guardado.equipo.modelo || '';
      solicitud.equipo.valor = guardado.equipo.valor || 0;
      solicitud.equipo.antiguedad = guardado.equipo.antiguedad || '';
    }

    if (guardado.titular) {
      solicitud.titular.nombre = guardado.titular.nombre || '';
      solicitud.titular.apellido = guardado.titular.apellido || '';
      solicitud.titular.dni = guardado.titular.dni || '';
      solicitud.titular.nacimiento = guardado.titular.nacimiento || '';
      solicitud.titular.email = guardado.titular.email || '';
      solicitud.titular.celular = guardado.titular.celular || '';
      solicitud.titular.terminos = !!guardado.titular.terminos;
    }

    if (guardado.pago) {
      solicitud.pago.metodo = guardado.pago.metodo || 'credito';
      solicitud.pago.tarjeta = guardado.pago.tarjeta || '';
      solicitud.pago.vencimiento = guardado.pago.vencimiento || '';
      solicitud.pago.cvv = guardado.pago.cvv || '';
      solicitud.pago.titular = guardado.pago.titular || '';
    }

    return solicitud;
  } catch (err) {
    console.error('Error al cargar el estado desde localStorage:', err);
    return solicitud;
  }
}

export function navegarA(pagina) {
  guardarEstado();
  window.location.href = pagina;
}

export function reiniciarSolicitud() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error al limpiar localStorage:', err);
  }

  solicitud.paso = 0;
  solicitud.equipo = { marca: '', modelo: '', valor: 0, antiguedad: '' };
  solicitud.plan = 'plus';
  solicitud.titular = {
    nombre: '',
    apellido: '',
    dni: '',
    nacimiento: '',
    email: '',
    celular: '',
    terminos: false
  };
  solicitud.pago = {
    metodo: 'credito',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
    titular: ''
  };
  solicitud.poliza = null;
  solicitud.errorPago = null;

  window.location.href = 'index.html';
}
