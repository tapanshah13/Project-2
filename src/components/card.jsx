import React, { useEffect, useState } from "react";

function Card(props) {
    const [isFront, setIsFront] = useState(true);

    // Reset the card to front when resetFlip is triggered
    useEffect(() => {
        if (props.resetFlip) {
            setIsFront(true); // Reset to front
            props.onFlipReset(); // Call parent to reset the flip state
        }
    }, [props.resetFlip, props.onFlipReset]);

    const handleClick = () => {
        setIsFront(!isFront); // Toggle between front and back
    }

    return (
        <div className={isFront ? "card" : "card flipped"} id={props.level} onClick={handleClick}>
            <div className="card-body">
                {isFront ? (
                    <div className="front">
                        {props.question}
                        {props.image && <img src={props.image} alt="flashcard visual" className="card-image" />}
                    </div>
                ) : (
                    <div className="back">{props.answer}</div>
                )}
            </div>
        </div>
    );
}

export default Card;
