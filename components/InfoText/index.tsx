import { ClassNames } from "@emotion/react";
import { Center, Container, createStyles, Grid, Stack } from "@mantine/core";
import clsx from "clsx";

import React, { Fragment } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "30px!important",
    borderRadius: 20,
  },
  scroll: {
    position: "relative",
    backgroundImage: "url(/assets/scroll-background.png)",
    backgroundPosition: "center top",
    maxWidth: "650px!important",
    margin: "auto",
    width: "70vw",

    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    fontFamily: "Cinzel !important",
    color: "#654321",
    filter: "drop-shadow( 0px 0px 5px #000 )",

    "& > * h1, & > * h2, ": {
      fontFamily: "Cinzel!important",
    },
  },
  overflow: {
    maxHeight: "50%",
    height: "50%",
    overflow: "scroll",
    margin: "10vw",
    paddingTop: "5%",
  },
  text: {
    "& > *": {
      fontFamily: theme.other.fontFamilyPronounced,
    },
  },
  button: {
    top: "-7vh",
    position: "relative",
  },
}));

export default function InfoText({
  className,
  children,
}: {
  className?: any;
  children: any;
}) {
  const { classes } = useStyles();
  return (
    <Container className={clsx(classes.root, className)}>
      <div className={classes.text}>{children}</div>
    </Container>
  );
}

export const InfoScroll = ({
  children,
  button,
}: {
  children: any;
  button?: any;
}) => {
  const { classes } = useStyles();
  return (
    <Grid>
      <Grid.Col className={classes.scroll} xs={12}>
        <Stack className={classes.overflow}>{children}</Stack>
        <div className={classes.button}>{button && button}</div>
      </Grid.Col>
    </Grid>
  );
};
