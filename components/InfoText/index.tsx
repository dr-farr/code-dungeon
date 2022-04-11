import { ClassNames } from "@emotion/react";
import { Container, createStyles, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  root: {
    // font-family: 'Cinzel', serif;

    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "30px!important",
    borderRadius: 20,
  },
  text: {
    "& > *": {
      fontFamily: "Beau Rivage!important",
    },
  },
}));

export default function InfoText({ children }) {
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <Text className={classes.text}>{children}</Text>
    </Container>
  );
}
