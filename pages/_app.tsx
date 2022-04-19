import "../styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import {
  Center,
  Container,
  MantineProvider,
  Space,
  Title,
  createStyles,
  Grid,
} from "@mantine/core";
import { NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";

import { AppProps } from "next/app";
import nhost from "utils/nhost";
import { Fragment } from "react";
import { QuizProvider } from "contexts/Quiz";

const useStyles = createStyles((theme) => ({
  root: {
    fontFamily: "Cinzel!important",
    color: "white",
    fontSize: "1em",
  },
  footer: {
    position: "fixed",
    left: "50%",
    bottom: "0%",
  },
}));

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const { classes } = useStyles();

  return (
    <Fragment>
      <Head>
        <title>Code Dungeon</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {true && (
        //@ts-ignore
        <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
          {true && (
            //@ts-ignore
            <NhostApolloProvider nhost={nhost}>
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                  other: {
                    fontFamilySecondary: "Beau Rivage!important",
                    fontFamilyPronounced: "Cinzel",
                  },
                  spacing: {
                    xs: 2,
                    xl: 20,
                  },
                  colorScheme: "dark",
                }}
              >
                <QuizProvider>
                  <div className="app">
                    <Component {...pageProps} />
                    <div className={classes.footer}>
                      <Space h="xl" />

                      <Center>{/* <Title order={1}>🃟</Title> */}</Center>
                      <Space h="md" />
                    </div>
                  </div>
                </QuizProvider>
              </MantineProvider>
            </NhostApolloProvider>
          )}
        </NhostNextProvider>
      )}
    </Fragment>
  );
}
