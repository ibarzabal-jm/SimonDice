let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

document.querySelector('button[type=button]').onclick = comenzarJuego;

actualizarEstado('Tocá "Empezar" para jugar!');
actualizarNumeroRonda('-');
prohibirJugada();

function comenzarJuego() {
  reiniciarJuego();
  controlRonda();
}

function reiniciarJuego() {
  secuenciaMaquina = [];
  secuenciaUsuario = [];
  ronda = 0;
}

function controlRonda() {
  actualizarEstado('Turno de la máquina');
  prohibirJugada();

  const $nuevoCuadro = obtenerCuadroAleatorio();
  secuenciaMaquina.push($nuevoCuadro);

  const RETRASO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

  secuenciaMaquina.forEach(function($cuadro, index) {
    const RETRASO_MS = (index + 1) * 1000;
    setTimeout(function() {
      resaltar($cuadro);
    }, RETRASO_MS);
  });

  setTimeout(function() {
    actualizarEstado('Turno del jugador');
    permitirJugada();
  }, RETRASO_TURNO_JUGADOR);

  secuenciaUsuario = [];
  ronda++;
  actualizarNumeroRonda(ronda);
}

function manejarAccionUsuario(event) {
  const $cuadro = event.target;
  resaltar($cuadro);
  secuenciaUsuario.push($cuadro);

  const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1];
  if ($cuadro.id !== $cuadroMaquina.id) {
    perder();
    return;
  }

  if (secuenciaUsuario.length === secuenciaMaquina.length) {
    prohibirJugada();
    setTimeout(controlRonda, 1000);
  }
}

function obtenerCuadroAleatorio() {
  const $cuadros = document.querySelectorAll('.cuadro');
  const indice = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[indice];
}

function actualizarNumeroRonda(ronda) {
  document.querySelector('#ronda').textContent = ronda;
}

function actualizarEstado(estado, error = false) {
  const $estado = document.querySelector('#estado');
  $estado.textContent = estado;
  
  if (error) {
    $estado.classList.remove('alert-primary');
    $estado.classList.add('alert-danger');
  } else {
    $estado.classList.remove('alert-danger');
    $estado.classList.add('alert-primary');
  }
}

function resaltar($cuadro) {
  $cuadro.style.opacity = 1;
  setTimeout(function() {
    $cuadro.style.opacity = 0.5;
  }, 500);
}

function prohibirJugada() {
  document.querySelectorAll('.cuadro').forEach(function($cuadro) {
    $cuadro.onclick = function() {
    };
  });
}

function permitirJugada() {
  document.querySelectorAll('.cuadro').forEach(function($cuadro) {
    $cuadro.onclick = manejarAccionUsuario;
  });
}

function perder() {
  prohibirJugada();
  actualizarEstado('Perdiste! Tocá "Empezar" para jugar de nuevo!', true);
}


