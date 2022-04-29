import React, { useState } from "react";
import Stats from "./Stats";
import Dashboard from "layout/app";

const Result = () => {
  const [activeTab, setActiveTab] = useState("Stats");

  return (
    <Dashboard>
      <Stats />
    </Dashboard>
  );
};

export default Result;
