let secuenciaMaquina = [];
let secuenciaUsuario = [];
let ronda = 0;

document.querySelector('button[type=button]').onclick = comenzarJuego;

function comenzarJuego(){
    reiniciarJuego();
    manejarRonda();
}


function manejarRonda(){
    actualizarEstado('Turno de la máquina');
    bloquearJugada();

    const $nuevoCuadro = obtenerCuadroAleatori();
    secuenciaMaquina.push($nuevoCuadro);

    const TIEMPO_TURNO_JUGADOR = (secuenciaMaquina.length + 1) * 1000;

    secuenciaMaquina.forEach( function($cuadro, index){
        
        //hacer más pausada la jugada de la máquina porque si no se muestra muy rapido
        const RETRASO_MS = (index + 1) * 1000;

        setTimeout(function(){
            resaltar($cuadro);
        },RETRASO_MS);
    });

    setTimeout( () => {
        actualizarEstado('Turno del Jugador');
        permitirJugada();
    }, TIEMPO_TURNO_JUGADOR);

    secuenciaUsuario = [];
    ronda++;
    actualizarNumeroRonda(ronda);


}


