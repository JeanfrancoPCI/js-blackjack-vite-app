import { valorCarta } from "./valor-carta";

/**
 * 
 * @param {String} carta Carta seleccionada en el último turno
 * @param {Number} turno Turno actual del jugador
 * @param {Array<Number>} puntosJugadores Arrego con la lista de puntos acumulados de todos los jugadores
 * @param {HTMLElement} puntosHtml Colección de etiquetas html donde se muestran los puntajes de todos los jugadores
 * @returns {Number} Retorna la cantidad de puntos acumulados para el jugador del turno actual
 */
export const acumularPuntos = ( carta, turno, puntosJugadores, puntosHtml ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}