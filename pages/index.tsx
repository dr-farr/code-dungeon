import { useUserData } from "@nhost/nextjs";

import Login from "components/Login";

import {
  Badge,
  Card,
  Grid,
  Group,
  Text,
  Button,
  Alert,
  Title,
  Loader,
  Center,
  Container,
  createStyles,
  Space,
  Stack,
} from "@mantine/core";

import React from "react";
import { useQuizCategories, useQuizes } from "controllers/quiz/hooks";
import Link from "next/link";

import Dashboard from "layout/app";
import InfoText, { InfoScroll } from "components/InfoText";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  button: {
    cursor: "pointer",
    ":hover": {
      filter: "drop-shadow( 0px 0px 5px yellowgreen )",
    },
  },
}));

/**
 * List all quiz data in card format
 * @returns {React.ReactElement}
 */
const QuestList = () => {
  const { loading, error, data } = useQuizCategories();

  const { classes } = useStyles();

  if (loading) {
    return (
      <Center>
        <Loader />;
      </Center>
    );
  }

  return (
    <Container size="xl" px="xs">
      <Grid align="center">
        <Grid.Col>
          {error && <Alert color="red">{JSON.stringify(error)}</Alert>}
        </Grid.Col>
        <Grid align="center">
          <Grid.Col>
            <InfoText>
              <Center>
                <Image
                  alt="Dungeon Quests"
                  width="416"
                  height="71"
                  src="https://user-images.githubusercontent.com/78376735/162835967-2d554350-f168-4743-ac8e-913582dbde49.png"
                />
              </Center>
            </InfoText>
          </Grid.Col>
          {data?.length ? (
            data.map((item: any, idx: number) => {
              return (
                <Grid.Col key={idx} xs={12}>
                  <InfoText>
                    <Center>
                      <Link href={`/quest/${item.id}`} passHref>
                        <Image
                          width="716"
                          height="91"
                          className={classes.button}
                          alt={item?.title}
                          src={item?.image_url}
                        />
                      </Link>
                      <Text>{item?.description}</Text>
                    </Center>
                  </InfoText>
                </Grid.Col>
              );
            })
          ) : (
            <Title order={3}>No quests for you here</Title>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
export default function Home() {
  const user = useUserData();

  return user ? (
    <Dashboard>
      {process.env.LIVE ? (
        <InfoScroll>
          <div>Greetings traveller,</div>
          <Space h={1} />
          <div>
            The Code Dungeon is a place where you can test your skills to their
            full potential. Many have walked through these hallowed chambers,
            very few have managed to escape them. For those who did; none with
            their sanity intact.
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
        </InfoScroll>
      ) : (
        <Stack>
          <InfoText>
            <Title order={1}>
              Welcome to the Code Dungeon™ {user?.displayName},
            </Title>
          </InfoText>

          <QuestList />
        </Stack>
      )}
    </Dashboard>
  ) : (
    <Login />
  );
}
