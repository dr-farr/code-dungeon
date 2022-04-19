import React, { useContext, useState } from "react";
import { Text, createStyles } from "@mantine/core";

import QuizLayout from "layout/quiz";
import QuizContext from "contexts/Quiz";

import Quiz from "components/Quiz";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundImage: "url(/assets/quiz-background.png)",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
    backgroundSize: "cover",
    padding: "10vh",
  },
}));

function QuizPage({ id }) {
  const { setQuizId } = useContext(QuizContext);
  const { classes } = useStyles();

  if (!id) {
    return <Text>No quiz id</Text>;
  }

  setQuizId(id);

  return (
    <QuizLayout>
      <div className={classes.root}>
        <Quiz />
      </div>
    </QuizLayout>
  );
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default QuizPage;
