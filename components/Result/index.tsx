import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Menu } from "@mantine/core";

import Stats from "./Stats";
import QNA from "./QNA";
import { useContext } from "react";
import QuizContext from "contexts/Quiz";

const Result = () => {
  const [activeTab, setActiveTab] = useState("Stats");

  const { replayQuiz, resetQuiz } = useContext(QuizContext);

  const handleTabClick = (name) => {
    setActiveTab(name);
  };

  const { numOfQuestions, correctAnswers, timeTaken, answers } =
    useContext(QuizContext);

  return (
    <Container>
      <Menu>
        <Menu.Item onClick={handleTabClick}>Stats</Menu.Item>
        <Menu.Item onClick={handleTabClick}>Answers</Menu.Item>
      </Menu>
      {activeTab === "Stats" && <Stats />}
      {activeTab === "QNA" && <QNA />}
      <br />
    </Container>
  );
};

export default Result;
