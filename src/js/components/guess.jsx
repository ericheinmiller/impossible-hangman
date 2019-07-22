import React from 'react';
import Context from '../context/mainContext';

const buildGuesses = (word, guessedLetters, guessAttempts) => {
  const wordArray = word.split('');
  return wordArray.map(x => <div className="guessedLetters">{ guessedLetters[x] || guessAttempts === 0 ? x : '_' }</div>);
};

export default () => (
  <div className="guesses-container">
    <div className="guesses">
    <Context.Consumer>
      { context => buildGuesses(context.word, context.guessedLetters, context.guessAttempts) }
    </Context.Consumer>
    </div>
    <Context.Consumer>
      { context => <p>[ { context.alphabetArray } ]</p>}
    </Context.Consumer>
  </div>
);
