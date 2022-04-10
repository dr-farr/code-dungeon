import React, { useContext, useState } from "react";
import { Button, Text, Title, Loader, Grid } from "@mantine/core";

import QuizLayout from "layout/quiz";
import QuizContext from "contexts/Quiz";

import Quiz from "components/Quiz";

function QuizPage({ id }) {
  const { setQuizId } = useContext(QuizContext);

  if (!id) {
    return <Text>No quiz id</Text>;
  }

  setQuizId(id);

  return (
    <QuizLayout>
      <Quiz />
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
