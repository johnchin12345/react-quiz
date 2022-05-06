import React from "react"

export default function Start(props) {
    return (
        <div className="start-div">
            <h1>Quizzical</h1>
            <p>This is a quiz game</p>
            
            <button className="quiz-button" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}