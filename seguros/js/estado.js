import { render } from './render.js';

export const solicitud = {
  paso: 0, // 0 = inicio, 1..4 = checkout, 5 = éxito, 6 = error
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
  poliza: null
};

export function irAPaso(n) {
  solicitud.paso = n;
  render(); // siempre después de cambiar el estado
}

export function reiniciarSolicitud() {
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
  render();
}
