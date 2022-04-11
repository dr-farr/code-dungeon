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
  Loader,
  Title,
  Transition,
} from "@mantine/core";

import QuizContext from "contexts/Quiz";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    width: "50vw",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    "& > img": {
      width: "100%",
    },
  },
  button: {
    backgroundImage: "url(/assets/start-quiz-button.png)",
    minWidth: 400,
    cursor: "pointer",
    height: 100,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    ":hover": {
      filter: "drop-shadow( -5px -5px 5px #000 )",
    },
  },
}));

const Start = () => {
  const { startQuiz, quiz } = useContext(QuizContext);

  const { classes } = useStyles();

  return (
    <Center>
      <Container className={classes.root}>
        <Grid gutter="xl">
          <Grid.Col xs={12}>
            <Image
              width="416"
              height="71"
              src="/assets/logo.png"
              alt="Code Dungeon"
            />
          </Grid.Col>
          <Grid.Col xs={12}>
            <Group>
              <Title order={1}>{quiz?.name}</Title>
              <Title order={2}>{quiz?.description}</Title>
            </Group>
          </Grid.Col>
          <Grid.Col xs={12}>
            <Transition
              mounted={true}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  <Center>
                    <Box
                      className={classes.button}
                      onClick={() => startQuiz()}
                    ></Box>
                  </Center>
                </div>
              )}
            </Transition>
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
  } = useContext(QuizContext);

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

  return (
    <Fragment>
      <main>
        {!isQuizStarted && !isQuizCompleted && <Start />}
        {isQuizStarted && children}

        {isQuizCompleted && <Result {...resultData} />}
      </main>
    </Fragment>
  );
};

export default QuizLayout;
