import React, { useState } from 'react';
import './App.css';
import Card from './components/card';
import flashCards from '../public/cardData.json'; // Import the JSON flashcard data

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track current card index
  const [userGuess, setUserGuess] = useState(''); // Store user input
  const [feedback, setFeedback] = useState(''); // Store feedback (correct/incorrect)
  const [resetFlip, setResetFlip] = useState(false); // Track if card should reset
  const [streak, setStreak] = useState(0); // Track the user's correct streak
  const [maxStreak, setMaxStreak] = useState(0); // Track the user's maximum streak

  // Handle flipping to the next card in sequence
  const handleNextCard = () => {
    setCurrentCardIndex((currentCardIndex + 1) % flashCards.length); // Cycle forward
    setResetFlip(true); // Reset card flip state
    setFeedback(''); // Reset feedback
    setUserGuess(''); // Clear user guess input
  };

  // Handle flipping to the previous card in sequence
  const handleBackCard = () => {
    setCurrentCardIndex((currentCardIndex - 1 + flashCards.length) % flashCards.length); // Cycle backward
    setResetFlip(true); // Reset card flip state
    setFeedback(''); // Reset feedback
    setUserGuess(''); // Clear user guess input
  };

  // Handle flipping to a random card, excluding the current card
  const handleShuffleCard = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashCards.length);
    } while (randomIndex === currentCardIndex);
    setCurrentCardIndex(randomIndex);
    setResetFlip(true); // Reset card flip state
    setFeedback(''); // Reset feedback
    setUserGuess(''); // Clear user guess input
  };

  // Handle checking the user's guess
  const handleCheckAnswer = () => {
    const correctAnswer = flashCards[currentCardIndex].answer.toLowerCase();
    const userAnswer = userGuess.toLowerCase();
    if (correctAnswer === userAnswer) {
      setFeedback('Correct!');
      setStreak(streak + 1);
      setMaxStreak(Math.max(streak + 1, maxStreak)); // Update max streak
    } else {
      setFeedback('Incorrect!');
      setStreak(0); // Reset streak on incorrect guess
    }
  };

  // Get the current card data
  const currentCard = flashCards[currentCardIndex];

  return (
    <div className="App">
      <h2>The Ultimate Coding Parent!</h2>
      <h3>Can you ace this code quiz? Put your programming smarts to the test!</h3>
      <h4>Number of cards: {flashCards.length}</h4>
      <h4>Current streak: {streak} | Longest streak: {maxStreak}</h4>

      {/* Display the current card */}
      <Card
        question={currentCard.question}
        answer={currentCard.answer}
        level={currentCard.level}
        image={currentCard.img ? currentCard.img : null}
        resetFlip={resetFlip}
        onFlipReset={() => setResetFlip(false)}
      />

      {/* Input for user's guess */}
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleCheckAnswer}>Submit</button>

      {/* Feedback about user's guess */}
      <p>{feedback}</p>

      <div className="button-group">
        <button onClick={handleBackCard}>Back</button>
        <button onClick={handleNextCard}>Next</button>
        <button onClick={handleShuffleCard}>Shuffle</button>
      </div>
    </div>
  );
}

export default App;
