import { useState } from 'react';
import './App.css';
import Card from './components/card';
import flashCards from '../public/cardData.json'; // Import the JSON flashcard data
import react from './assets/react.svg'

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track current card index
  const [resetFlip, setResetFlip] = useState(false); // Track if card should reset

  // Handle flipping to the next card and resetting the flip
  const handleNextCard = () => {
    const randomIndex = Math.floor(Math.random() * flashCards.length);
    setCurrentCardIndex(randomIndex);
    setResetFlip(true); // Trigger the card to reset to front
  };

  // Get the current card data
  const currentCard = flashCards[currentCardIndex];

  return (
    <div className="App">
      <h2>The Ultimate Coding Parent!</h2>
      <h3>Can you ace this code quiz? Put your programming smarts to the test!</h3>
      <h4>Number of cards: {flashCards.length}</h4>

      {/* Pass question, answer, level, resetFlip, and onFlipReset to Card */}
      <Card 
        question={currentCard.question} 
        answer={currentCard.answer} 
        level={currentCard.level} 
        image={currentCard.img ? currentCard.img : null}
        resetFlip={resetFlip} 
        onFlipReset={() => setResetFlip(false)} 
      />
      <button onClick={handleNextCard}>Next</button>
    </div>
  );
}

export default App;
