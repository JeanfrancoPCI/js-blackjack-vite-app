    /** 
     * 2C = Two of Clubs (2 de trébol)
     * 2D = Two of Diamonds (2 de diamantes)
     * 2H = Two of Hearts (2 de corazones)
     * 2S = Two of Spades (2 de espadas)
    */

const miModulo = (() => {
    'use strict'

    let deck            = [];
    let carta;
    const tipos         = ['C','D','H','S'],
          especiales    = ['A','J','Q','K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const   btnPedir    = document.querySelector('#btnPedir'),
            btnDetener  = document.querySelector('#btnDetener'),
            btnNuevo    = document.querySelector('#btnNuevo');

    const   divCartasJugador  = document.querySelectorAll('.divCartas'),
            puntosHtml        = document.querySelectorAll('small');

    // Función que crear un nuevo deck barajeado
    const crearDeck = () => {

        deck = [];

        for( let i = 2; i <= 10; i++) {
            for( let tipo of tipos ) {
                deck.push(i + tipo);
            }
        }

        for( let tipo of tipos ) {
            for(let esp of especiales) {
                deck.push( esp + tipo);
            }
        }

        return _.shuffle( deck );;
    }

    // Función que permite tomar una carta al jugador
    const pedirCarta = () => {
        if ( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    // Función que obtiene el valor numérico de una carta obtenida
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN( valor)  ) ?
                ( valor === 'A' ) ? 11 : 10 
                : valor * 1;
    }

    // Función que crear una carta en el html
    const crearCarta = ( turno, carta ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);   
    }

    // Turno 0 = primer jugador y el último será el de la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        // console.log({ puntosMinimos, puntosComputadora});
        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos ) {
                alert('Nadie gana');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            } else if ( puntosComputadora > 21 ) {
                alert('Jugador gana');
            } else if ( puntosComputadora > puntosMinimos ) {
                alert('Computadora gana');
            }
        }, 500 );
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
        do {
            carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);        
            crearCarta(divCartasJugador.length - 1, carta);

            if( puntosMinimos > 21 ) {
                break;
            }
        } 
        while ( puntosComputadora < puntosMinimos && (puntosMinimos <= 21) );
        determinarGanador();
    }

    // Función inicial del juego
    const inicializarJuego = ( numJugadores = 1) => {
        deck = crearDeck();

        puntosJugadores = [];
        for(let i = 0; i <= numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHtml.forEach( elem => elem.innerText = 0);
        divCartasJugador.forEach( elem => elem.innerHTML = "");

        btnPedir.disabled = false;   
        btnDetener.disabled = false;
    };
    
    // Eventos
    btnPedir.addEventListener('click', () => {
        let puntosJugador = 0;
        let finJuego = false;
        carta = pedirCarta();
        puntosJugador = acumularPuntos(carta, 0);
        crearCarta(0, carta);

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');   
            finJuego = true;   
        } else if ( puntosJugador === 21 ) {
            console.warn('21, genial');        
            finJuego = true;
        }

        if ( finJuego ) {
            btnPedir.disabled = true;   
            btnDetener.disabled = true;    
            turnoComputadora(puntosJugador); 
        }    
    });

    btnDetener.addEventListener('click', () => {
        console.log({puntosJugadores});
        turnoComputadora(puntosJugadores[0]); 
    });


    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };
})();






