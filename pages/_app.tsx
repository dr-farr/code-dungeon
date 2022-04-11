import "../styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import { MantineProvider } from "@mantine/core";
import { NhostNextProvider } from "@nhost/nextjs";
import { NhostApolloProvider } from "@nhost/react-apollo";

import { AppProps } from "next/app";
import nhost from "utils/nhost";
import { Fragment } from "react";
import { QuizProvider } from "contexts/Quiz";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

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
