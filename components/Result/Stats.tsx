import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Header, Button, Group, Title, Stack } from "@mantine/core";

import { calculateScore, calculateGrade, timeConverter } from "utils/quiz";
import Link from "next/link";
import QuizContext from "contexts/Quiz";

const Stats = () => {
  const { numOfQuestions, correctAnswers, timeTaken, replayQuiz, resetQuiz } =
    useContext(QuizContext);
  const score = calculateScore(numOfQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <Stack>
      <Title>{remarks}</Title>
      <Title>Grade: {grade}</Title>
      <Title>Total Questions: {numOfQuestions}</Title>
      <Title>Correct Answers: {correctAnswers}</Title>
      <Title>Your Score: {score}%</Title>
      <Title>Passing Score: 60%</Title>
      <Title>
        Time Taken:{" "}
        {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
      </Title>
      <div style={{ marginTop: 35 }}>
        <Stack>
          <Button
            onClick={replayQuiz}
            style={{ marginRight: 15, marginBottom: 8 }}
          >
            Play Again
          </Button>
          <Button color="teal" onClick={resetQuiz} style={{ marginBottom: 8 }}>
            Reset
          </Button>
          <Link href="/" passHref>
            <Button
              color="teal"
              onClick={resetQuiz}
              style={{ marginBottom: 8 }}
            >
              More quests
            </Button>
          </Link>
        </Stack>

        {/* <ShareButton /> */}
      </div>
    </Stack>
  );
};

export default Stats;
