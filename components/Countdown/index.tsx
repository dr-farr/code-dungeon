import React, { useState, useEffect, useContext } from "react";

import { Button, Group, Title } from "@mantine/core";

import QuizContext from "contexts/Quiz";

const Countdown = () => {
  const {
    timer: { minutes, seconds },
  } = useContext(QuizContext);
  return (
    <Group>
      <Title>{minutes}</Title>
      <Title>{seconds}</Title>
      {/* <Popup
        content="Hours"
        trigger={<Button active>{hours}</Button>}
        position="bottom left"
      />
      <Popup
        content="Minutes"
        trigger={<Button active>{minutes}</Button>}
        position="bottom left"
      />
      <Popup
        content="Seconds"
        trigger={<Button active>{seconds}</Button>}
        position="bottom left"
      /> */}
    </Group>
  );
};

export default Countdown;
