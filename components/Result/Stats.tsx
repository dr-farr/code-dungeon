import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import {
  Header,
  Button,
  Group,
  Title,
  Stack,
  createStyles,
  Space,
  Grid,
} from "@mantine/core";

import { calculateScore, calculateGrade, timeConverter } from "utils/quiz";
import Link from "next/link";
import QuizContext from "contexts/Quiz";
import InfoText from "components/InfoText";

const useStyles = createStyles((theme) => ({
  try: {
    backgroundImage: "url(/assets/try-button.png)",

    cursor: "pointer",
    height: 100,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    ":hover": {
      filter: "drop-shadow( -5px -5px 5px #000 )",
    },
  },
  more: {
    backgroundImage: "url(/assets/more-button.png)",

    cursor: "pointer",
    height: 100,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    ":hover": {
      filter: "drop-shadow( -5px -5px 5px #000 )",
    },
  },
  reset: {
    backgroundImage: "url(/assets/proceed-button.png)",

    cursor: "pointer",
    height: 100,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    ":hover": {
      filter: "drop-shadow( -5px -5px 5px #000 )",
    },
  },
}));

const Stats = () => {
  const { classes } = useStyles();
  const { numOfQuestions, correctAnswers, timeTaken, replayQuiz, resetQuiz } =
    useContext(QuizContext);
  const score = calculateScore(numOfQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <Fragment>
      <InfoText>
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
        </Stack>
      </InfoText>
      <Space h="xl" />
      <InfoText>
        <div style={{ marginTop: 35 }}>
          <Grid>
            <Grid.Col
              xs={4}
              className={classes.try}
              onClick={replayQuiz}
              style={{ marginRight: 15, marginBottom: 8 }}
            />
            <Grid.Col
              xs={3}
              className={classes.reset}
              onClick={resetQuiz}
              style={{ marginBottom: 8 }}
            />
            <Link href="/" passHref>
              <Grid.Col
                xs={4}
                className={classes.more}
                onClick={resetQuiz}
                style={{ marginBottom: 8 }}
              />
            </Link>
          </Grid>

          {/* <ShareButton /> */}
        </div>
      </InfoText>
    </Fragment>
  );
};

export default Stats;
