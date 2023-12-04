import React from "react";

export default function QuizQuestions(props){
  const handleChoiceSelection = (choice) => {
    props.onChoiceSelection(choice);
  };
  
    return(
      <div className="question-container">
        <div className="question-div">
          <h2 className="question">
            <span className=".question-num">{props.numberQuestion}. </span>
            {props.quizQuestion}
          </h2>
          <div className="choicesDiv">
            {props.choices.map((choice, index) => ( 
              <button className={`option-btn ${props.clickedOption === choice ? "selected" : ""} 
                    ${props.clickedOption !== null && choice === props.questions[props.contQuestions - 1].correct_answer
                        ? "correct"
                        : ""
                    }`}
                      key={index}
                      onClick={() => handleChoiceSelection(choice)}
                      disabled={props.clickedOption !== null}
              >
                {choice}  
              </button>
            ))}
          </div>
        </div>
        <div className="score-btn-question">
          <span className="countQuestions">Question: {props.contQuestions}/5</span>
          <button className="nextQuestionBtn" onClick={props.nextQuestionBtn}>
            Next
          </button>
        </div>
      </div>
    )
}


