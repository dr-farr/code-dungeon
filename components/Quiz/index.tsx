import React, { useContext, useEffect, useState } from "react";

import {
  Container,
  Divider,
  Button,
  Title,
  Grid,
  Group,
  Center,
  Paper,
  Text,
} from "@mantine/core";
import he from "he";
import Countdown from "components/Countdown";
import { getLetter } from "utils/quiz";
import QuizContext from "contexts/Quiz";

import { Slider, createStyles } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import InfoText from "components/InfoText";

const useStyles = createStyles((theme) => ({
  option: {
    cursor: "pointer",
    "& > :hover": {
      backgroundColor: theme.colors.primary,
    },
  },
  active: {
    backgroundColor: theme.colors.primary,
  },
}));

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const { classes } = useStyles();
  const {
    data,
    endQuiz,
    answers,
    setAnswers,
    timeTaken,
    setUserSlectedAns,
    userSlectedAns,
    setCorrectAnswers,
    correctAnswers,
  } = useContext(QuizContext);

  const questionData = data && data[questionIndex] ? data[questionIndex] : null;

  if (!questionData) {
    return <Title>Game Over</Title>;
  }

  const handleItemClick = (name) => {
    setUserSlectedAns(name);
  };

  const handleNext = () => {
    let point = 0;
    if (userSlectedAns === he.decode(questionData.correct_answer)) {
      point = 1;
    }

    const answer = answers;
    answer.push({
      question: he.decode(questionData.question),
      user_answer: userSlectedAns,
      correct_answer: he.decode(questionData.correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: answers,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setAnswers(answer);
  };

  return (
    <Container>
      <Group>
        <Grid>
          <Grid.Col>
            <Grid.Col xs={12}>
              <Image
                width="416"
                height="71"
                src="/assets/logo.png"
                alt="Code Dungeon"
              />
            </Grid.Col>
          </Grid.Col>
          <Grid.Col>
            <Grid>
              <Grid.Col xs={6}>
                <Center>
                  {`Question No.${questionIndex + 1} of ${data?.length}`}
                </Center>
              </Grid.Col>
              <Grid.Col xs={6}>
                <Countdown />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Divider />
          <Grid.Col>
            <Title>
              <b>{`Q. ${he.decode(questionData?.question)}`}</b>
            </Title>
          </Grid.Col>
          <Grid.Col>
            <Grid>
              <InfoText>
                {questionData.options.map((option, i) => {
                  const letter = getLetter(i);
                  const decodedOption = he.decode(option);

                  return (
                    <Grid.Col key={decodedOption} xs={6}>
                      <Paper
                        className={clsx(classes.option, {
                          [classes.active]: userSlectedAns === decodedOption,
                        })}
                        onClick={() => handleItemClick(option)}
                        shadow="xl"
                        p="xl"
                      >
                        <Text> {decodedOption}</Text>
                      </Paper>
                    </Grid.Col>
                  );
                })}
              </InfoText>
            </Grid>
          </Grid.Col>
          <Divider />
          <Grid.Col>
            <Button onClick={handleNext} disabled={!userSlectedAns}>
              Proceed?
            </Button>
          </Grid.Col>
        </Grid>
      </Group>

      <br />
    </Container>
  );
};

export default Quiz;
