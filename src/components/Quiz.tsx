import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { WrapperButton, Image, Container } from "./styles";

interface QuizProps {
  questions: {
    question: string;
    options: string[];
    answer: string;
    image: string;
  }[];
  onFinish: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  if (!questions || questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    const isCorrect = option === currentQuestion.answer;
    const updatedScore = isCorrect ? score + 1 : score;

    if (currentQuestionIndex + 1 < questions.length) {
      setScore(updatedScore);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinish(updatedScore);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Rick & Morty Quiz
      </Typography>
      <Typography variant="h6">{currentQuestion.question}</Typography>
      <Image src={currentQuestion.image} alt="character" />
      <WrapperButton>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={index}
            variant="contained"
            color="secondary"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </WrapperButton>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Question: {currentQuestionIndex + 1} / {questions.length}
      </Typography>
    </Container>
  );
};

export default Quiz;
