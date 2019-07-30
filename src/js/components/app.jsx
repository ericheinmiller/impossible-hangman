import React from 'react';
import { MainStore } from '../context/mainContext';
import GuessAttempts from './guessAttempts';
import GuessBoard from './guessBoard';
import Modal from './modal';
import Points from './points';
import Hint from './hint';

export default () => (
  <MainStore>
    <Modal />
    <Hint />
    <Points />
    <div className="title">
      <h1>Tough and Completely Unfair Hangman</h1>
    </div>
    <div className="main">
      <GuessBoard />
      <GuessAttempts />
    </div>
  </MainStore>
);
