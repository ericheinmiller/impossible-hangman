import React from 'react';
import Context from '../context/mainContext';

export default () => (
  <div className="points">
    <Context.Consumer>
      { context => <p>Points: { context.points }</p>}
    </Context.Consumer>
  </div>
);
