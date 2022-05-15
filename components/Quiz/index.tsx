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
  Box,
  Transition,
  Space,
} from "@mantine/core";
import he from "he";

import { getLetter } from "utils/quiz";
import QuizContext from "contexts/Quiz";

import { Slider, createStyles } from "@mantine/core";
import clsx from "clsx";
import Image from "next/image";
import InfoText from "components/InfoText";
import Loader from "components/Loader";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    padding: "30px",
  },

  silver: {
    fontSize: 14,
    position: "relative",

    textAlign: "center",
    textShadow: "0 -1px 6px #000",
    backgroundClip: "text",
    color: "transparent",
    backgroundImage:
      "conic-gradient(#d7d7d7, #c3c3c3, #cccccc, #c6c6c6,	#d7d7d7, #c3c3c3, #cccccc, #c6c6c6,	#d7d7d7, #c3c3c3, #cccccc, #c6c6c6,	#d7d7d7, #c3c3c3, #cccccc, #c6c6c6)",
    "& > h3": {
      fontSize: "1.2rem",
      display: "inline-block",
      textTransform: "uppercase",
    },
  },

  active: {
    background: "radial-gradient(circle, #ec6a6a, #e52b2b)",
    boxShadow: "0px 0 5px 5px rgba(255,255,255,0.2)",
  },
  option: {
    margin: "10px auto",
    width: 250,
    letterSpacing: 2,
    borderRadius: 8,
    fontFamily: "Cinzel!important",
    fontWeight: "bold",
    color: "#eee46d",
    fontSize: 24,

    textShadow: "0 1px 3px #000",
    textAlign: "center",
    padding: 10,
    background: "radial-gradient(circle, #8b0000, #8b0000)",
    borderTop: "4px ridge #eee46d",
    borderLeft: "4px groove #eee46d",
    borderRight: "4px ridge #eee46d",
    borderBottom: "4px groove #eee46d",
    boxShadow: "inset 0px 0px 5px 3px rgba(1,1,1,0.3)",

    ":hover": {
      background: "radial-gradient(circle, #e52b2b, #8b0000)",
      boxShadow: "0px 0 5px 5px rgba(255,255,255,0.2)",
    },

    "&:active": {
      background: "radial-gradient(circle, #ec6a6a, #e52b2b)",
      boxShadow: "0px 0 5px 5px rgba(255,255,255,0.2)",
    },
  },
  opacity: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    fontFamily: "Cinzel!important",
    fontWeight: "bold",
    color: "#eee46d",
    fontSize: 34,
    textShadow: "0 1px 3px #000",
    textAlign: "center",
    padding: 10,
    width: "100%",
  },

  container: {
    minHeight: "60vh",
  },

  questionContainer: {
    minHeight: "24vh",
  },

  button: {
    backgroundImage: "url(/assets/proceed-button.png)",
    minWidth: 200,
    cursor: "pointer",
    margin: "0 auto",
    height: 100,
    width: "20vw",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    position: "relative",

    ":hover": {
      filter: "drop-shadow( 0px 0px 5px #654321 )",
    },
  },
  disabled: {
    backgroundImage: "url(/assets/proceed-button-disabled.png)",
    ":hover": {
      filter: "none",
      cursor: "default",
    },
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
    selectedOptions,
    setSelectedOptions,
    setCorrectAnswers,
    correctAnswers,
    setLoading,
    loading,
    minutes,
    seconds,
  } = useContext(QuizContext);

  const questionData = data && data[questionIndex] ? data[questionIndex] : null;

  if (!questionData) {
    return <Title>Game Over</Title>;
  }

  const handleNext = () => {
    if (!selectedOptions) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const answer = answers;
      answer.push({
        question_id: questionData.id,
        question_option_id: selectedOptions,
      });

      if (questionIndex === data.length - 1) {
        return endQuiz({
          timeTaken,
          answers,
        });
      }

      setCorrectAnswers(correctAnswers);
      setQuestionIndex(questionIndex + 1);
      setSelectedOptions(null);
      setAnswers(answer);

      setLoading(false);
    }, 1000);
  };

  return (
    <Container classNames={classes.root}>
      <Transition
        mounted={loading}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Loader />
          </div>
        )}
      </Transition>
      {!loading && (
        <Grid>
          <Grid.Col>
            <Grid align="center" justify="space-between">
              <Grid.Col xs={2}>
                <Center>
                  <Image
                    width="246"
                    height="41"
                    src="/assets/logo.png"
                    alt="Code Dungeon"
                  />
                </Center>{" "}
              </Grid.Col>
              <Grid.Col xs={7} className={classes.silver}>
                <h3>{`Chamber ${questionIndex + 1} of ${data?.length}`}</h3>
              </Grid.Col>
              <Grid.Col xs={2} className={classes.silver}>
                <h3>{minutes}</h3>
                <h3>:{seconds}</h3>
              </Grid.Col>
            </Grid>
            <Space h="xl" />
            <Space h="xl" />
            <Space h="xl" />
          </Grid.Col>

          <Grid.Col>
            <Grid className={classes.container}>
              <Grid.Col className={classes.questionContainer}>
                <InfoText className={classes.opacity}>
                  <h1>
                    <b className={classes.title}>{`Q. ${he.decode(
                      questionData?.title
                    )}`}</b>
                  </h1>
                </InfoText>
              </Grid.Col>
              <Grid.Col>
                <InfoText>
                  <Grid gutter={20}>
                    {questionData.options.map((option, i) => {
                      return (
                        <Grid.Col key={i} xs={6}>
                          <Button
                            size="xl"
                            className={clsx(classes.option, {
                              [classes.active]: selectedOptions === option.id,
                            })}
                            onClick={() => setSelectedOptions(option.id)}
                            fullWidth
                          >
                            {option?.title}
                          </Button>
                        </Grid.Col>
                      );
                    })}
                  </Grid>
                </InfoText>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Divider />

          <Grid.Col>
            <Center>
              <Grid>
                <Box
                  className={clsx(classes.button, {
                    [classes.disabled]: !selectedOptions,
                  })}
                  onClick={handleNext}
                ></Box>
              </Grid>
            </Center>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
};

export default Quiz;
