import React, { Fragment, useContext, useState } from "react";

import Result from "components/Result";

import {
  Alert,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Title,
} from "@mantine/core";

import QuizContext from "contexts/Quiz";
import Image from "next/image";

const Start = () => {
  const { startQuiz, quiz } = useContext(QuizContext);

  console.log(quiz);

  return (
    <Center>
      <Container size="xl" px="xs">
        <Grid align="center" gutter={5}>
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
              <Center>
                <Button onClick={async () => startQuiz()}> Begin Quest</Button>
              </Center>
            </Group>
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
