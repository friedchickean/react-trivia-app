import React, { useState, useEffect } from "react";
import Powerup from "./Powerup";
import Confetti from "./Confetti";
import { Howl } from "howler";



export default function Nav() {
  // Question information
  const countdownDuration = 4;
  const [question, setQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [countdown, setCountdown] = useState(null);

  // user answer information
  const [score, setScore] = useState(500);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  
  // sounds
  const correctSound = new Howl({
    src: [process.env.PUBLIC_URL + "/sounds/correct.wav"],
  });
  const wrongSound = new Howl({
    src: [process.env.PUBLIC_URL + "/sounds/wrong.wav"],
  });

  // category colours
  const categoryStyles = {
    "General Knowledge": {
      bgColour: "bg-blue-600",
      shadow: "shadow-[1px_2px_0px_1px_rgba(3,7,4,1)]",
    },
    "Entertainment: Books": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Entertainment: Film": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Entertainment: Music": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Entertainment: Musicals & Theatres": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Entertainment: Television": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Entertainment: Video Games": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Entertainment: Board Games": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3,1)]",
    },
    "Science & Nature": {
      bgColour: "bg-green-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,0,1)]",
    },
    "Science: Computers": {
      bgColour: "bg-green-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,0,1)]",
    },
    "Science: Mathematics": {
      bgColour: "bg-red-600",
      shadow: "shadow-[1px_2px_0px_1px_rgba(10,0,0,1)]",
    },
    "Mythology": {
      bgColour: "bg-blue-300",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,1,1)]",
    },
    "Sports": {
      bgColour: "bg-orange-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(3,2,0,1)]",
    },
    "Geography": {
      bgColour: "bg-brown-300",
      shadow: "shadow-[1px_2px_0px_1px_rgba(1,1,0,1)]",
    },
    "History": {
      bgColour: "bg-yellow-400",
      shadow: "shadow-[1px_2px_0px_1px_rgba(1,1,0,1)]",
    },
    "Politics": {
      bgColour: "bg-yellow-400",
      shadow: "shadow-[1px_2px_0px_1px_rgba(1,1,0)]",
    },
    "Art": {
      bgColour: "bg-yellow-400",
      shadow: "shadow-[1px_2px_0px_1px_rgba(1,1,0)]",
    },
    "Celebrities": {
      bgColour: "bg-red-800",
      shadow: "shadow-[1px_2px_0px_1px_rgba(5,0,0)]",
    },
    "Animals": {
      bgColour: "bg-green-800",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,3,0)]",
    },
    "Vehicles": {
      bgColour: "bg-blue-600",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,4)]",
    },
    "Entertainment: Comics": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3)]",
    },
    "Science: Gadgets": {
      bgColour: "bg-green-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,0)]",
    },
    "Entertainment: Japanese Anime & Manga": {
      bgColour: "bg-red-700",
      shadow: "shadow-[1px_2px_0px_1px_rgba(5,0,0)]",
    },
    "Entertainment: Cartoon & Animations": {
      bgColour: "bg-blue-500",
      shadow: "shadow-[1px_2px_0px_1px_rgba(0,4,3)]",
    },
  };

  const difficultyColours = {"easy": "bg-green-400", "medium": "bg-orange-400", "hard": "bg-red-400"};
  

  useEffect(() => {
    fetchQuestion();
    // prevent memory leaks
    return () => {
      correctSound.unload();
      wrongSound.unload();
    };
  }, []);

  // Countdown effect
  useEffect(() => {
    if (countdown === 0) {
      setCountdown(null);
      fetchQuestion();
    }
    if (!countdown) return;

    const intervalId = setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [countdown]);

  const decodeHTMLEntities = (text) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  // Generates a new question
  const fetchQuestion = async () => {
    try {
      const apiUrl = "https://opentdb.com/api.php";
      const url = `${apiUrl}?amount=1`;

      const res = await fetch(`${url}`);
      const json = await res.json();
      const questionData = json.results[0];

      
      const questionText = decodeHTMLEntities(questionData.question);
      const difficulty = questionData.difficulty;
      const category = questionData.category;
      const correctAnswer = questionData.correct_answer;
      const correctIndex = Math.floor(Math.random() * (questionData.incorrect_answers.length + 2));
      let choices = [...questionData.incorrect_answers];
      choices.splice(correctIndex, 0, correctAnswer);
      choices = choices.map((option) => decodeHTMLEntities(option));

      setQuestion(questionText);
      setDifficulty(difficulty);
      setCategory(category);
      setChoices(choices);
      setAnswer(correctAnswer);

      // reset some things
      setShowCorrectAnswer(false);
      setCountdown(null);
      setUserAnswer(null);

    } catch (error) {
      console.error("Error when fetching a question", error);
    }
  };

  // handles the user's choice
  const handleChoiceClick = (selectedChoice, index) => {
    // Ignore clicks if the user has already selected an answer or if the correct answer is shown
    if (userAnswer !== null || showCorrectAnswer) {
      console.log("this is wrong");
      return;
    }

    if (selectedChoice === answer) {
      // User selected the correct answer
      setScore(score + 100);
      correctSound.play();
    } else {
      setScore(score - 50);
      wrongSound.play();
    }

    // Show the correct answer and store the user's choice
    setShowCorrectAnswer(true);
    setUserAnswer(selectedChoice);

    setCountdown(countdownDuration);
  };
  
  // POWERUP FUNCTIONS
  // Skip question powerup
  const skipQuestion = () => {
    if (score < 10) {
      console.log("Insufficient funds");
    } else {
      console.log("New question");
      fetchQuestion();
    }
  }

  // Remove two wrong answers
  const fiftyfifty = () => {
    
  }


  return (
    <div className="w-11/12 lg:w-2/5 flex flex-col items-center">
      
      {/* Quiz box container */}
      <div className="flex flex-col items-center shadow-[2px_4px_0px_2px_rgba(29,29,29)] bg-white border rounded-md p-10 w-full">
        <div className="px-5 py-2 text-purple-600 text-xl font-bold border-4 border-gray-200 rounded-md" id="quiz-top">
          <p className="absolute ml-11 -mt-4 hidden">test</p>
          <h2>Life: {score}</h2>
        </div>

        {/* Question information */}
        <div className="w-11/12">
          {/* Question text */}
          <h1 className="my-3 text-xl font-bold text-center" id="question">{question}</h1>
          <div className="flex mb-10 justify-center gap-5">
            <p className={`px-2 rounded-sm ${categoryStyles[category].bgColour} ${categoryStyles[category].shadow}`}>{category}</p>
            <p className={`px-2 rounded-sm ${difficultyColours[difficulty]} shadow-[1px_2px_0px_1px_rgba(0,6,7)]`}>{difficulty}</p>
          </div>

          {(answer == userAnswer) && <Confetti />}
          {/* Question choices */}
          <ul className="" id="options">
            {choices.map((choice, index) => (
              <li
                key={index}
                className={`${
                  showCorrectAnswer
                    ? choice === answer
                      ? "bg-green-500 text-white scale-105 active:scale-105 shadow-[2px_4px_0px_2px_rgba(39,79,39)]"
                      : userAnswer === choice
                      ? "bg-gray-500 text-white shadow-[2px_4px_0px_2px_rgba(69,69,69)]"
                      : "bg-purple-600 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-200 hover:text-black hover:scale-105"
                } w-10/12 py-3 px-5 my-3 mx-auto rounded-md shadow-[2px_4px_0px_2px_rgba(109,40,217)] cursor-pointer active:scale-95 ease-in-out duration-300`}
                onClick={() => {
                  if (!showCorrectAnswer) {
                    handleChoiceClick(choice, index)
                  }
                }}
              >
                {index + 1}. {choice}
              </li>
            ))}
          </ul>
          {/* Status Bar
          {showCorrectAnswer &&
          <h2>{answer == userAnswer ? "Correct!" : "Wrong!"} New question in {countdown}</h2>
          } */}
        </div>

        {/* Footer with quit button */}
        <div id="quiz-foot" className="mt-7 text-center">
          <h2 className="animate-bounce">
            {(countdown > 0) 
              ? answer == userAnswer 
                ? "Correct! New question in " + countdown
                : "Wrong! New question in " + countdown
              : "⠀"}
          </h2>
          <button type="button" id="quit" className="text-lg underline">
            Quit
          </button>
        </div>
      </div>
      
      {/* Powerup Container */}
      <div className="flex my-5 md:my-10 gap-3 md:gap-10 w-full justify-center">
        <Powerup name="Skip" cost={10} description={"Skip this question and go to the next."} onClick={skipQuestion}/>
        <Powerup name="50/50" cost={20} description={"Remove two wrong answers."} />
        <Powerup name="2x" cost={0} description={"2x point multiplier on the next question"} />
      </div>
    </div>
    
  );
}
