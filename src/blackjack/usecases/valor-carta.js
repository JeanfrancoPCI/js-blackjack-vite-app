/**
 * Obtener el valor númerico de una carta
 * @param {String} carta Ejemplo: QH (Queen Hearts - 12 de Corazones)
 * @returns {Number} Retorna el valor numérico de una carta Ejemplo: 12
 */
export const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor)  ) ?
            ( valor === 'A' ) ? 11 : 10 
            : valor * 1;
}