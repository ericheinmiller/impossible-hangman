import React from 'react';
import Context, { MainStore } from '../context/mainContext';
import GuessAttempts from './guessAttempts';
import GuessBoard from './guessBoard';
import Modal from './modal';
import Points from './points';

export default () => (
  <MainStore>
    <Modal />
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
