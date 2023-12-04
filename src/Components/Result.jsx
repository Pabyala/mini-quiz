import React from "react";

export default function Result(props){
    return(
        <div className="result-container">
            <div className="result-header">
                <h2>Congratulations</h2>
            </div>
            <div className="result-info">
                <p className="result-completed">You have completed the quiz.</p>
                <p className="result-score">Your score: {props.score}/{props.totalQuestions}</p>
                <button className="restart-btn" onClick={props.restartQuiz}>Restart</button>
            </div>
        </div>
    )
}