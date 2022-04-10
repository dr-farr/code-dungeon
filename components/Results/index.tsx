import React from "react";

import { Box, Title } from "@mantine/core";

export function Results({ score, numOfQuestions }) {
  return (
    <Box>
      <Title order={1}>Results</Title>
      <Title order={2}>
        The results are in! You Scored {score} out of {numOfQuestions}
      </Title>
    </Box>
  );
}
