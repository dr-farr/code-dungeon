import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Group, Title, createStyles, Center, Box } from "@mantine/core";

import { calculateScore, calculateGrade, timeConverter } from "utils/quiz";
import Link from "next/link";
import QuizContext from "contexts/Quiz";
import InfoText, { InfoScroll } from "components/InfoText";
import { QuizInfoScroll } from "layout/quiz";

const useStyles = createStyles((theme) => ({
  try: {
    backgroundImage: "url(/assets/try-button.png)",
    cursor: "pointer",
    height: 100,
    width: 200,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    maxWidth: 200,

    ":hover": {
      filter: "drop-shadow( 0px 0px 5px #654321 )",
    },
  },
  more: {
    backgroundImage: "url(/assets/more-button.png)",
    width: 200,
    cursor: "pointer",
    height: 100,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    ":hover": {
      filter: "drop-shadow( 0px 0px 5px #654321 )",
    },
  },
  category: {
    width: "100%",
    maxWidth: 400,
    height: 50,
    backgroundSize: "contain",
    position: "absolute",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    top: "5%",
    left: "50%",
    transform: "translate(-50%, 5%)",
    filter: "drop-shadow( 0px 0px 5px #654321 )",
  },
  reset: {
    filter: "drop-shadow( 0px 0px 5px #654321 )",

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
  const {
    numOfQuestions,
    correctAnswers,
    timeTaken,
    replayQuiz,
    resetQuiz,
    quiz,
  } = useContext(QuizContext);
  const score = calculateScore(numOfQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <InfoScroll
      button={
        score < 75 ? (
          <Center>
            <div className={classes.try} onClick={replayQuiz} />
          </Center>
        ) : (
          <Center>
            <div className={classes.more} onClick={replayQuiz} />
          </Center>
        )
      }
    >
      <Group>
        <Box
          className={classes.category}
          style={{
            backgroundImage: `url(${quiz?.quiz_category?.image_url})`,
          }}
        ></Box>

        <h5>{remarks}</h5>
        <h5>{` Escaped in ${Number(minutes)}:${Number()}s`}</h5>

        <h5> Grade: {grade}</h5>
        <h5>Total Questions: {numOfQuestions}</h5>
        <h5>Correct Answers: {correctAnswers}</h5>
        <h5>Your Score: {score}%</h5>
        <h5>Passing Score: 60%</h5>
      </Group>
    </InfoScroll>
  );
};

export default Stats;
