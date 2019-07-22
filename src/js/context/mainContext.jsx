import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import axios from 'axios';

const Context = React.createContext({});
const axiosConfig = {
  headers: {
    'X-RapidAPI-Key': '883211d6c0msh2bb181a550e208cp1df6cdjsnf1210d05437d',
  },
};
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const MainStore = (props) => {
  const [greeting, setGreeting] = useState('Tough and Completely Unfair Hangman');
  const [guessedLetters, setGuessedLetters] = useState({ ' ': 'correct', '-': 'correct' });
  const [guessAttempts, setGuessAttempts] = useState(6);
  const [word, setWord] = useState('');
  const [acceptingInput, setAcceptingInput] = useState(false);
  const [alphabetArray, setAlphabetArray] = useState(alphabet);

  const fetchRandomWord = async () => {
    const response = await axios.get('https://wordsapiv1.p.rapidapi.com/words/?random=true', axiosConfig);
    setWord(response.data.word);
    setAcceptingInput(true);
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const letters = /^[A-Za-z]+$/;
      if (!acceptingInput) {
        return;
      }
      if (!e.key.match(letters) || e.key.length > 1) {
        return;
      }
      if (guessAttempts === 0) {
        setAcceptingInput(false);
        setAlphabetArray(alphabet);
        fetchRandomWord();
        setGuessedLetters({ ' ': 'correct', '-': 'correct' });
        setGuessAttempts(6);
        return;
      }
      if (word.includes(e.key) && !guessedLetters[e.key]) {
        const newObj = { ...guessedLetters, [e.key]: 'correct' };
        const newArray = alphabetArray.filter(letter => e.key.toUpperCase() !== letter);
        setAlphabetArray(newArray);
        setGuessedLetters(newObj);
      } else if (!word.includes(e.key) && !guessedLetters[e.key]) {
        const newObj = { ...guessedLetters, [e.key]: 'wrong' };
        const newArray = alphabetArray.filter(letter => e.key.toUpperCase() !== letter);
        setAlphabetArray(newArray);
        setGuessedLetters(newObj);
        setGuessAttempts(guessAttempts - 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessAttempts, word, guessedLetters, acceptingInput]);

  return (
    <Context.Provider value={{
      greeting,
      alphabetArray,
      setGreeting,
      word,
      guessedLetters,
      guessAttempts,
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
