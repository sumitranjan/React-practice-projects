import React, { useEffect, useState } from "react";
import "./RockPaperScissor.css";
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";

const RockPaperScissor = () => {
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [userMessage, setUserMessage] = useState("");
  const [computerMessage, setComputerMessage] = useState("");

  const [roundNo, setRoundNo] = useState(0);
  const [roundResult, setRoundResult] = useState();

  const [finalResult, setFinalResult] = useState("");
  const choices = ["rock", "paper", "scissor"];

  function handlePlay(choice) {
    setRoundNo(roundNo + 1);
    let userChoice = choice;
    let computerChoice = computerTurn();

    if (
      (userChoice == "rock" && computerChoice === "scissor") ||
      (userChoice == "scissor" && computerChoice === "paper") ||
      (userChoice == "paper" && computerChoice === "rock")
    ) {
      //user win
      setUserScore((prev) => prev + 1);
      setRoundResult("user get the point!");
    } else if (userChoice == computerChoice) {
      //tie
      setRoundResult("Tie!! No one get the point");
    } else {
      //computerwin
      setComputerScore((prev) => prev + 1);
      setRoundResult("computer get the point!");
    }
    setUserMessage(userChoice);
    setComputerMessage(computerChoice);
  }

  function computerTurn() {
    const choiceIndex = Math.floor(Math.random() * choices.length);

    return choices[choiceIndex];
  }

  function handleRestart() {
    setUserScore(0);
    setComputerScore(0);
    setUserMessage("");
    setComputerMessage("");
    setRoundNo(0);
    setRoundResult("");
    setFinalResult("");
  }
  useEffect(() => {
    if (roundNo == 3) {
      if (userScore > computerScore) {
        setFinalResult("User won the game!!");
      } else if (userScore < computerScore) {
        setFinalResult("Computer won the game!!");
      } else {
        setFinalResult("Game Tie!!");
      }
    }
  }, [roundNo]);

  return (
    <div className="container">
      <h1 className="heading">Rock Paper Scissor</h1>
      <div className="score">
        <h3>User points: {userScore}</h3>
        <h3>Computer points: {computerScore}</h3>
      </div>
      <div className="image-container">
        <FaHandRock className="hand" />
        <FaHandPaper className="hand" />
        <FaHandScissors className="hand" />
      </div>
      <div className="button-container">
        {choices.map((choice) => (
          <button
            className={`play-btn ${roundNo === 3 ? "play-btn-disabled" : ""}`}
            onClick={() => handlePlay(choice)}
            disabled={roundNo == 3}
            key={choice}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="current-status">
        <p>User: {userMessage}</p>
        <p>Computer: {computerMessage}</p>
        <p>
          Round : {roundNo} <span>Result : {roundResult}</span>
        </p>
        <h2 className="final-result">
          Final Result :{" "}
          <span className={`${roundNo === 3 ? "win" : ""}`}>
            {roundNo == 3 ? finalResult : "Let's see who win! "}
          </span>
        </h2>
      </div>
      <div>
        {roundNo == 3 && (
          <button className="restart-btn" onClick={() => handleRestart()}>
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissor;
