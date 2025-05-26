import { Button } from "@mui/material";
import React from "react";
import { Container } from "./styles";
interface ResultProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, total, onRestart }) => {
  return (
    <Container>
      <h1>Quiz Finished!</h1>
      <p>
        Your score: {score} / {total}
      </p>
      <Button variant="contained" color="secondary" onClick={onRestart}>
        PLAY AGAIN!
      </Button>
    </Container>
  );
};

export default Result;
