import { pedirCarta } from "./pedir-carta";
import { crearCarta } from "./crear-carta";
import { acumularPuntos } from "./acumular-puntos";

/**
 * 
 * @param {Number} turno Turno del jugador actual
 * @param {Number} puntosMinimos Puntos mínimos a derrotar por la computadora
 * @param {Array<String>} deck Deck de cartas restantes luego de los turnos anteriores
 * @param {Array<Number>} puntosJugadores Arreglo de puntos de todos los jugadores
 * @param {HTMLElement} puntosHtml Colección de html small donde se muestran los puntos de cada jugador
 * @param {HTMLDivElement} divCartasJugador Div html donde se representan las cartas del jugador actual
 */
export const turnoComputadora = ( turno, deck, puntosJugadores, puntosHtml, divCartasJugador ) => {
    let puntosComputadora = 0;
    let puntosMinimos = puntosJugadores[turno];
    do {
        let carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1, puntosJugadores, puntosHtml);        
        crearCarta(turno, carta, divCartasJugador);

        if( puntosMinimos > 21 ) {
            break;
        }
    } 
    while ( puntosComputadora < puntosMinimos && (puntosMinimos <= 21) );
    // determinarGanador();
}