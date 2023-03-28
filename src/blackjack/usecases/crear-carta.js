
/**
 * Crea la representación de la carta en el div del jugador correspondiente al turno
 * @param {Number} turno Turno actual del jugador
 * @param {String} carta Carta seleccionada en el turno actual
 * @param {HTMLDivElement} divCartas Div contenedor de las cartas del jugador actual
 */
export const crearCarta = ( turno, carta, divCartas ) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartas.append(imgCarta);   
}