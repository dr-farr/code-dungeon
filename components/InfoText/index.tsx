import { ClassNames } from "@emotion/react";
import {
  Center,
  Container,
  createStyles,
  Grid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import Dashboard from "layout/app";
import Image from "next/image";
import React, { Fragment } from "react";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "30px!important",
    borderRadius: 20,
  },
  scroll: {
    backgroundImage: "url(/assets/scroll-background.png)",
    backgroundPosition: "center",
    maxWidth: "650px!important",
    margin: "auto",
    width: "70vw",
    cursor: "pointer",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    fontFamily: "Cinzel!important",
    color: "#654321",
    filter: "drop-shadow( 0px 0px 5px #000 )",
  },
  overflow: {
    maxHeight: "55vh",
    height: "50%",
    overflow: "scroll",
    margin: "20% 20%!important",
    paddingTop: "5%",
  },
  text: {
    "& > *": {
      fontFamily: theme.other.fontFamilySecondary,
      fontSize: "1vh!important",
    },
  },
}));

export default function InfoText({ children }) {
  const { classes } = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.text}>{children}</div>
    </Container>
  );
}

export const InfoScrollText = () => {
  const { classes } = useStyles();
  return (
    <Dashboard>
      <Grid>
        <Grid.Col className={classes.scroll} xs={12}>
          <Stack className={classes.overflow}>
            <div>Greetings traveller,</div>
            <Space h={1} />
            <div>
              The Code Dungeon is a place where you can test your skills to
              their full potential. Many have walked through these hallowed
              chambers, very few have managed to escape them. For those who did;
              none with their sanity intact.
              <br /> You will need to utilise many different types of skills to
              survive down here.
            </div>
            <Space h={1} />

            <div>
              Keep an eye on your email for when new quests become available.
            </div>
            <Space h={1} />
            <div>Until we prevail,</div>
            <Space h={1} />
            <div> Samuel Von Jackson </div>
          </Stack>
        </Grid.Col>
      </Grid>
    </Dashboard>
  );
};
