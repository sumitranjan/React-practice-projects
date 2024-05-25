import React, { useEffect, useState } from "react";
import "./RockPaperScissor.css";
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";

const choices = ["rock", "paper", "scissor"];

const winningCombinations = {
  rock: "scissor",
  paper: "rock",
  scissor: "paper",
};

const RockPaperScissorV3 = () => {
  // const [userScore, setUserScore] = useState(0);
  // const [computerScore, setComputerScore] = useState(0);

  // const [userMessage, setUserMessage] = useState("");
  // const [computerMessage, setComputerMessage] = useState("");

  // // const [roundNo, setRoundNo] = useState(0);
  // const [roundResult, setRoundResult] = useState();

  // const [finalResult, setFinalResult] = useState("");

  const [scores, setScores] = useState({ user: 0, computer: 0 });
  const [messages, setMessages] = useState({
    user: "",
    computer: "",
    round: "",
    final: "",
  });
  const [roundNo, setRoundNo] = useState(0);

  function handlePlay(userChoice) {
    let computerChoice = computerTurn();
    setMessages((prev) => ({
      ...prev,
      user: userChoice,
      computer: computerChoice,
    }));
    // setUserMessage(userChoice);

    let resultMessage;

    if (winningCombinations[userChoice] === computerChoice) {
      //user win
      setScores((prev) => ({ ...prev, user: prev.user + 1 }));
      resultMessage = "User gets the point!";
    } else if (userChoice == computerChoice) {
      //tie
      resultMessage = "Tie!! No one gets the point";
    } else {
      //computer win
      setScores((prev) => ({ ...prev, computer: prev.computer + 1 }));
      resultMessage = "Computer gets the point!";
    }
    setMessages((prev) => ({ ...prev, round: resultMessage }));
    setRoundNo((prev) => prev + 1);
  }

  function computerTurn() {
    const choiceIndex = Math.floor(Math.random() * choices.length);

    return choices[choiceIndex];
  }

  function handleRestart() {
    setScores({ user: 0, computer: 0 });
    setMessages({ user: "", computer: "", round: "", final: "" });
    setRoundNo(0);
  }
  useEffect(() => {
    if (roundNo == 3) {
      const finalResult =
        scores.user > scores.computer
          ? "User won the game!!"
          : scores.user < scores.computer
          ? "Computer won the game!!"
          : "Game Tie!!";
      setMessages((prev) => ({ ...prev, final: finalResult }));
    }
  }, [roundNo, scores]);

  return (
    <div className="container">
      <h1 className="heading">Rock Paper Scissor</h1>
      <div className="score">
        <h3>User points: {scores.user}</h3>
        <h3>Computer points: {scores.computer}</h3>
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
        <p>User: {messages.user}</p>
        <p>Computer: {messages.computer}</p>
        <p>
          Round : {roundNo} <span>Result : {messages.round}</span>
        </p>
        <h2 className="final-result">
          Final Result :{" "}
          <span className={`${roundNo === 3 ? "win" : ""}`}>
            {roundNo == 3 ? messages.final : "Let's see who win! "}
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

export default RockPaperScissorV3;
