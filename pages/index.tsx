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
import InfoText from "components/InfoText";
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
                          alt={item?.name}
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
      <Stack>
        <InfoText>
          <Title order={3}>
            Welcome to the Code Dungeon™ {user.displayName},{" "}
          </Title>
          <Group>
            <Space />
            <Text>
              Many have entered, few have left. The Code Dungeon is a place
              where you can test your coding skills and see how far you can go.
              You can try
            </Text>
            <Text>
              Be careful on your journey, you can only take one quiz at a time.
              Each quiz will take you further into the uncharted reaches of
              abomination. You will neeed a tremendous courage to face the
              unknown. You will need to be prepared. traps and pitfalls, as a
              user you will need to run through many challenges, these
              challenges will test your coding skills and knowledge.
            </Text>
            <Text> Be brave and have fun!</Text>
          </Group>
        </InfoText>

        <QuestList />
      </Stack>
    </Dashboard>
  ) : (
    <Login />
  );
}
