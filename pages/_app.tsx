import "../styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import { MantineProvider } from "@mantine/core";
import { NhostAuthProvider, useNhostAuth } from "@nhost/react-auth";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { AppProps } from "next/app";
import nhost, { useAuth } from "utils/nhost";
import { Fragment } from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Fragment>
      <Head>
        <title>Bash Quest</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <NhostAuthProvider nhost={nhost}>
        <NhostApolloProvider nhost={nhost}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: "dark",
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </NhostApolloProvider>
      </NhostAuthProvider>
    </Fragment>
  );
}
