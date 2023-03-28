import _ from 'underscore';
import { crearDeck, pedirCarta, acumularPuntos, crearCarta, turnoComputadora } from './usecases';

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

      // Función inicial del juego
      const inicializarJuego = ( numJugadores = 1) => {
          deck = crearDeck(tipos, especiales);
  
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
          carta = pedirCarta(deck);
          puntosJugador = acumularPuntos(carta, 0, puntosJugadores, puntosHtml);
          crearCarta(0, carta, divCartasJugador[0]);
  
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
              turnoComputadora(puntosJugadores.length - 1, deck, puntosJugadores, puntosHtml, divCartasJugador[divCartasJugador.length - 1]);
              determinarGanador(); 
          }    
      });
  
      btnDetener.addEventListener('click', () => {
          turnoComputadora(0, deck, puntosJugadores, puntosHtml, divCartasJugador[divCartasJugador.length - 1]);
          determinarGanador(); 
      });
  
  
      btnNuevo.addEventListener('click', () => {
          inicializarJuego();
      });
  
      return {
          nuevoJuego: inicializarJuego
      };
  })();  
