import React, { useState, useEffect } from 'react';
import Quiz from './Components/Quiz';
import QuizQuestions from './Components/QuizQuestions';
import Result from './Components/Result';

function generateAnswerArray(question) {
  // answers = ["answer1", "answer2", "answer2"]
  const answers = [...question.incorrect_answers];
  // get random number base on the length of answers
  const correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
  // use .spilce in answer to add the question.correct_answer in the array answer
  answers.splice(correctAnswerIndex, 0, question.correct_answer);
  // console.log('Answer Array:', answers);
  console.log('Correct answer:', question.correct_answer);
  return answers;
}


export default function App() {
  const [quizStart, setQuizStart] = useState({ isStart: false }); //to start the quiz
  const [questions, setQuestions] = useState([]); //for all question and answer in API
  console.log(questions)
  const [currentQuestion, setCurrentQuestion] = useState(0); //for number of question
  const [score, setScore] = useState(0); //for score of quiz
  const [clickedOption, setClickedOption] = useState(null); //for answer button
  const [shuffledAnswers, setShuffledAnswers] = useState([]); //for shuffleAnswer
  //const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);//for the final result of quiz
  // console.log(shuffledAnswers)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results))
      .catch(error => console.log('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    //check if the questions.length has have any items
    if (questions.length > 0) {
      // retrieve the questions[currentQuestion] and put it in variable called currentQuestionData
      const currentQuestionData = questions[currentQuestion];
      // get the answer-option based on the currentQuestionData
      const answers = generateAnswerArray(currentQuestionData);
      // put all the answer-option in setShuffledAnswers(answers)
      setShuffledAnswers(answers);
    }
    //The useEffect hook with the dependency array [questions, currentQuestion] 
    //is responsible for shuffling the answers once when the component mounts or 
    //when the questions or currentQuestion variables change
  }, [questions, currentQuestion]);

  //to start the quiz 
  function quizStartBtn() {
    setQuizStart({ isStart: true });
  }

  //to handle the choices btn
  function handleChoiceSelection(choice) {
    //disable btn after you select your answer
    setClickedOption(choice);
    //if choice you select is equal to questions[currentQuestion].correct_answer
    if (choice === questions[currentQuestion].correct_answer) {
      console.log("Correct answer");
      //add plus 1 to your score
      setScore(score + 1);
    } else {
      console.log("Wrong answer");
    }
  }

  //for next btn
  function nextQuestionBtn() {
    if(currentQuestion < questions.length - 1) {
      //the question and answer will be change 
      setCurrentQuestion(currentQuestion + 1);
      //the choices btn will di clickable
      setClickedOption(null);
    } else{
      //if the question is no more then setQuizCompleted will be true
      setQuizCompleted(true);
    }
  }

  //to restart btn
  function restartQuiz() {
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setClickedOption(null);
  }

  // get one question on API base on the currentQuestion
  const currentQuestionData = questions[currentQuestion];

  //if !quizStart.isStart is true execute this (quizCompleted ? <Result/> : <QuizQuestions/>)
  //if quizCompleted is true execute <Result>
  return (
    <div>
      {!quizStart.isStart ? <Quiz quizStartBtn={quizStartBtn} /> :
        (quizCompleted ? 
          <Result score={score} 
                  totalQuestions={questions.length} 
                  restartQuiz={restartQuiz} 
          /> :
          <div>
            {currentQuestionData &&
              <QuizQuestions
                // nextButtonText={quizCompleted ? "Restart" : "Next"}
                numberQuestion={currentQuestion + 1}
                quizQuestion={currentQuestionData.question}
                choices={shuffledAnswers}
                onChoiceSelection={handleChoiceSelection} //to handle answer choices
                // score={score} //for score of quiz
                nextQuestionBtn={nextQuestionBtn} //for next btn 
                contQuestions={currentQuestion + 1} //
                clickedOption={clickedOption}//
                questions={questions}//for question
              />}
       </div>)}
    </div>
  );
}

// style={{
//   backgroundColor:
//     props.clickedOption !== null &&
//     choice === props.questions[props.contQuestions - 1].correct_answer
//       ? "green"
//       : props.clickedOption === choice
//       ? "red"
//       : "",
// }}






// import React from 'react';
// import Quiz from './Components/Quiz';
// import QuizQuestions from './Components/QuizQuestions';

// export default function App() {

//   const [quizStart, setQuizStart] = React.useState({isStart: false}) //to start the quiz
//   const [questions, setQuestions] = React.useState([]) // for all question and answer in API
//   const [currentQuestion, setCurrentQuestion] = React.useState(0) //for number of question
//   const [score, setScore] = React.useState(0) //for score of quiz
//   const [clickedOption, setClickedOption] = React.useState(null);
//   // console.log(questions.length-1)
//   // console.log(currentQuestion)
//   function quizStartBtn(){
//     setQuizStart({isStart: true})
//   }

//   React.useEffect(() => {
//     fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple")
//       .then(res => res.json())
//       .then(data => setQuestions(data.results))
//       .catch(error => console.log('Error fetching questions:', error));
//   }, []);

//   const generateAnswerArray = (question) => {
//     // answers = ["answer1", "answer2", "answer2"]
//     const answers = [...question.incorrect_answers];
//     // get random number base on the length of answers
//     const correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
//     // use .spilce in answer to add the question.correct_answer in the array answer
//     answers.splice(correctAnswerIndex, 0, question.correct_answer);
//     // console.log('Answer Array:', answers);
//     console.log('Correct answer:', question.correct_answer);
//     return answers;
//   };



//   //const shuffledAnswerArray = generateAnswerArray(currentQuestionData);

//   const handleChoiceSelection = (choice) => {
//     setClickedOption(choice); //disable the buttons
//     if(choice === currentQuestionData.correct_answer){
//       console.log("Correct answer")
//       setScore(score+1)
//     } else {
//       console.log("Wrong answer")
//     }
//     //setClickedOption(choice); //disable btn
//     // Handle the selected choice here
//     // console.log("Selected choice:", choice);
//   };


//   function nextQuestionBtn(){
//     //check if the currentQuestion < questions.length-1 then stop/disable btn
//     if(currentQuestion < questions.length-1){
//       setCurrentQuestion(currentQuestion+1)
//       //setClickedOption(null); //disable btn
//     }
//   }

//   function checkAnswer(){
//     console.log("Check Answer")
//   }

//   function updateScore(){
//   }

//   // get one question base on the currentQuestion
//   const currentQuestionData = questions[currentQuestion];
//   // if the currentQuestionData is true/"Question" then execute generateAnswerArray(currentQuestionData) else []
//   // get the answer-option based on the currentQuestion
//   const answerArray = currentQuestionData ? generateAnswerArray(currentQuestionData) : [];
//   // const answerArray = generateAnswerArray(currentQuestionData);

//   // const quizElements = questions.map((question, index) => {  
//   //   const answerArray = generateAnswerArray(question); 
//   //   return(
//   //     <QuizQuestions key={index} 
//   //       quizQuestion={question.question} 
//   //       //  choicesAnswer={[...question.incorrect_answers, question.correct_answer]}
//   //       //  choices={question.incorrect_answers.concat(question.correct_answer)}
//   //       choices={answerArray}
//   //       onChoiceSelection={handleChoiceSelection}
//   //     />
//   //   )
//   // });

//   return (
//     <div>
//       {!quizStart.isStart ? (<Quiz quizStartBtn={quizStartBtn}/>) :
//       (<div>
//         {currentQuestionData && 
//         <QuizQuestions numberQuestion={currentQuestion + 1}
//                        quizQuestion={currentQuestionData.question}
//                        choices={answerArray}
//                        onChoiceSelection={handleChoiceSelection} 
//                        score={score}
//                        nextQuestionBtn={nextQuestionBtn}
//                        contQuestions={currentQuestion + 1}
//                        //clickedOption={clickedOption}
//         />}
//       </div>)}      
//     </div>
//   );
// }





      // {/* {!quizStart.isStart ? <Quiz quizStartBtn={quizStartBtn}/> :
      // <QuizQuestions quizQuestion={questions[0].question}/>} */}

      // {/* {questions.length > 0 && (
      //   <div>
      //     <div>Question: {questions[0].question}</div>
      //     <div>Choices:</div>
      //     <ul>
      //       {questions[0].incorrect_answers.map((answer, index) => (
      //         <li key={index}>{answer}</li>
      //       ))}
      //       <li>{questions[0].correct_answer}</li>
      //     </ul>
      //   </div>
      // )} */}
      // {/* <div>{questions[0].question}</div>
      // <div>{questions[0].incorrect_answers}</div> */}

      
      // {/* <h1>Trivia Answers</h1>
      // <ul>
      //   {questions.map((question, questionIndex) => (
      //     <li key={questionIndex}>
      //       <strong>Question:</strong> {question.question}
      //       <br />
      //       <strong>Choices:</strong> 
      //       {generateAnswerArray(question).map((answer, answerIndex) => (
      //         <span key={answerIndex}>{answer}, </span>
      //       ))}
      //     </li>
      //   ))}
      // </ul> */}


