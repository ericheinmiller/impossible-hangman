import React from 'react';
import Context from '../context/mainContext';

export default () => (
  <div className="guessAttempts">
    <div className="guessAttempts--container">
      <Context.Consumer>
        { context => <h1>{context.guessAttempts}</h1> }
      </Context.Consumer>
    </div>
  </div>
);
