import { createStyles, Transition } from "@mantine/core";
import QuizContext from "contexts/Quiz";
import React, { useContext } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "black",
    zIndex: 10,
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    cursor: "pointer",

    fontFamily: "Cinzel!important",
    color: "#654321",
  },
  door: {
    backgroundImage: "url(/assets/back-button.png)",

    top: "50%",
    backgroundPosition: "center",

    backgroundRepeat: "no-repeat",
    height: 500,
    left: "50%",
    maxWidth: 336,
    position: "relative",

    transform: "translate(-50%, -50%)",
  },
}));

export default function Loader() {
  const { classes } = useStyles();
  const { loading } = useContext(QuizContext);
  return (
    <div className={classes.root}>
      <div className={classes.door}></div>
    </div>
  );
}
