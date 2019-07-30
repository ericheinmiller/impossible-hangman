import React from 'react';
import Context from '../context/mainContext';

export default () => (
  <Context.Consumer>
    { (context) => {
      if (context.status === 'gameOver') {
        return <div className="modal">Game Over! Press any Button to Try Again! :(</div>;
      }
      if (context.status === 'winner') {
        return <div className="modal">Winner!</div>;
      }
    }}
  </Context.Consumer>
);
