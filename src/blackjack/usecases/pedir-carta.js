
/**
 * 
 * @param {Array<String>} deck es un arreglo de String
 * @returns {String} Retorna la carta escogida del deck y la quita del deck
 */
export const pedirCarta = (deck) => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    return deck.pop();
}