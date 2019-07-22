import React from 'react';
import Context, { MainStore } from '../context/mainContext';
import Body from './body';
import Guess from './guess';

export default () => (
  <MainStore>
    <div className="title">
      <Context.Consumer>
        { context => <h1>{ context.greeting }</h1> }
      </Context.Consumer>
    </div>
    <div className="main">
      <Guess />
      <Body />
    </div>
  </MainStore>
);
