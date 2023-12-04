import React from "react";

export default function Quiz(props){
  return(
    <div className='app-container'>
      <h2 className='title-quiz'>Mini quiz</h2>
      <button onClick={props.quizStartBtn} className='btnQuiz'>
        Start quiz
      </button>
    </div>
  )

}