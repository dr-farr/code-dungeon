import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container, Menu } from "@mantine/core";

import Stats from "./Stats";
import QNA from "./QNA";
import { useContext } from "react";
import QuizContext from "contexts/Quiz";
import Dashboard from "layout/app";

const Result = () => {
  const [activeTab, setActiveTab] = useState("Stats");

  const { replayQuiz, resetQuiz } = useContext(QuizContext);

  const handleTabClick = (name) => {
    setActiveTab(name);
  };

  const { numOfQuestions, correctAnswers, timeTaken, answers } =
    useContext(QuizContext);

  return (
    <Dashboard>
      <Menu>
        <Menu.Item onClick={handleTabClick}>Stats</Menu.Item>
        <Menu.Item onClick={handleTabClick}>Answers</Menu.Item>
      </Menu>
      {activeTab === "Stats" && <Stats />}
      {activeTab === "QNA" && <QNA />}
      <br />
    </Dashboard>
  );
};

export default Result;
