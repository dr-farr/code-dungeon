import React, { Fragment, useContext, useState } from "react";

import Result from "components/Result";

import {
  Alert,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Grid,
  Group,
  Space,
  Title,
  Transition,
} from "@mantine/core";
import Loader from "components/Loader";
import QuizContext from "contexts/Quiz";
import Image from "next/image";

import { InfoScroll } from "components/InfoText";

const useStyles = createStyles((theme) => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    "& > img": {
      width: "100%",
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
  button: {
    backgroundImage: "url(/assets/start-quiz-button.png)",
    minWidth: 200,
    cursor: "pointer",

    margin: 0,
    height: 100,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    ":hover": {
      filter: "drop-shadow( 0px 0px 5px #654321 )",
    },
  },
}));

export const QuizInfoScroll = ({ children, button }) => {
  const { classes } = useStyles();
  return (
    <Center>
      <Container className={classes.root}>
        <Grid>
          <Grid.Col xs={12}>
            <Center>
              <Image
                width="516"
                height="91"
                src="/assets/logo.png"
                alt="Code Dungeon"
              />
            </Center>
            <Space h="xl" />
          </Grid.Col>
          <Grid.Col xs={12}>
            <InfoScroll button={button}>{children}</InfoScroll>
          </Grid.Col>
        </Grid>
      </Container>
    </Center>
  );
};

const QuizLayout = ({ children }) => {
  const {
    isQuizStarted,
    error,
    isQuizCompleted,
    resultData,
    countdownTime,
    startQuiz,
    quiz,
    setLoading,
  } = useContext(QuizContext);
  const { classes } = useStyles();

  if (error) {
    return (
      <Alert color="red">
        Borked
        <details>{JSON.stringify(error)}</details>
      </Alert>
    );
  }

  if (countdownTime === 0) {
    return <Title> game over</Title>;
  }

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    startQuiz();
  };

  return (
    <Fragment>
      <main>
        {!isQuizStarted && !isQuizCompleted && (
          <QuizInfoScroll
            button={
              <Center>
                <Box className={classes.button} onClick={handleClick}></Box>
              </Center>
            }
          >
            <Group>
              <Box
                className={classes.category}
                style={{
                  backgroundImage: `url(${quiz?.quiz_category?.image_url})`,
                }}
              ></Box>

              <Title order={1}>{quiz?.name}</Title>
              <Title order={2}>{quiz?.description}</Title>
            </Group>
          </QuizInfoScroll>
        )}
        {isQuizStarted && children}
        {isQuizCompleted && <Result {...resultData} />}
      </main>
    </Fragment>
  );
};

export default QuizLayout;
