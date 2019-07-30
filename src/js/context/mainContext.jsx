import React, { useState, useEffect } from 'react';
import '@babel/polyfill';
import axios from 'axios';

const Context = React.createContext({});
const axiosConfig = {
  headers: {
    'X-RapidAPI-Key': '883211d6c0msh2bb181a550e208cp1df6cdjsnf1210d05437d',
  },
};

const createNewObject = (theArray, letter) => ({ ...theArray, [letter]: letter });
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export const MainStore = (props) => {
  const [guessedLetters, setGuessedLetters] = useState({ ' ': ' ', '-': '-' });
  const [alphabetArray, setAlphabetArray] = useState(alphabet);
  const [guessAttempts, setGuessAttempts] = useState(6);
  const [wordArray, setWordArray] = useState([]);
  const [word, setWord] = useState('');
  const [acceptingInput, setAcceptingInput] = useState(false);
  const [status, setStatus] = useState('pending');
  const [points, setPoints] = useState(0);

  const fetchRandomWord = async () => {
    const response = await axios.get('https://wordsapiv1.p.rapidapi.com/words/?random=true', axiosConfig);
    setWordArray(response.data.word.toUpperCase().split('').filter(letter => letter !== '-' || letter !== ' '));
    setWord(response.data.word.toUpperCase());
    setAcceptingInput(true);
    setAlphabetArray(alphabet);
    setGuessedLetters({ ' ': ' ', '-': '-' });
    setGuessAttempts(6);
    setStatus('pending');
    console.log(response.data.word);
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const regexFilter = /^[A-Za-z]+$/;
      if (!e.key.match(regexFilter) || e.key.length > 1 || !acceptingInput) {
        return;
      }
      if (status === 'gameOver' || status === 'winner') {
        setAcceptingInput(false);
        fetchRandomWord();
        return;
      }
      if (!guessedLetters[e.key.toUpperCase()]) {
        setAlphabetArray(alphabetArray.filter(letter => e.key.toUpperCase() !== letter));
        setWordArray(wordArray.filter(letter => e.key.toUpperCase() !== letter));
        setGuessedLetters(createNewObject(guessedLetters, e.key.toUpperCase()));
        if (!word.includes(e.key.toUpperCase())) {
          setGuessAttempts(guessAttempts - 1);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [guessAttempts, word, guessedLetters, acceptingInput, alphabetArray, wordArray, status]);

  useEffect(() => {
    if (guessAttempts <= 0) {
      setStatus('gameOver');
      return;
    }
    if (wordArray <= 0 && word !== '' && status !== 'winner') {
      const newPoints = points + 1;
      setStatus('winner');
      setPoints(newPoints);
    }
  }, [guessAttempts, wordArray, word, points, status]);

  return (
    <Context.Provider value={{
      alphabetArray,
      wordArray,
      word,
      status,
      guessedLetters,
      guessAttempts,
      points,
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
