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
} from "@mantine/core";

import React from "react";
import { useQuizes } from "controllers/quiz/hooks";
import Link from "next/link";

import Dashboard from "layout/app";

/**
 * List all quiz data in card format
 * @returns {React.ReactElement}
 */
const QuizesDataList = () => {
  const { loading, error, data } = useQuizes();

  if (loading) {
    return (
      <Center>
        <Loader />;
      </Center>
    );
  }

  return (
    <Container size="xl" px="xs">
      <Grid>
        <Grid.Col>
          {error && <Alert color="red">{JSON.stringify(error)}</Alert>}
        </Grid.Col>
        <Grid align="center">
          {data?.length ? (
            data.map((item: any, idx: number) => {
              return (
                <Grid.Col key={idx} xs={6}>
                  <Card shadow="sm" p="lg">
                    <Title order={3}>{item.name}</Title>
                    <Group position="apart">
                      <Badge color="pink" variant="light">
                        {item?.difficulty}
                      </Badge>

                      <Badge color="blue" variant="light">
                        {item.questions?.length}
                      </Badge>
                    </Group>

                    <Link href={`/quiz/${item.id}`} passHref>
                      <Button
                        variant="light"
                        color="blue"
                        fullWidth
                        style={{ marginTop: 14 }}
                      >
                        Quest
                      </Button>
                    </Link>
                  </Card>
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
      <Container>
        <Title order={1}>Welcome to the Code Dungeon, {user.displayName}</Title>
        <Group>
          <Text>
            Many have entered, few have left. The Code Dungeon is a place where
            you can test your coding skills and see how far you can go. You can
            try
          </Text>
          <Text>
            Be careful on your journey, you can only take one quiz at a time.
            Each quiz will take you further into the uncharted reaches of
            abomination. You will neeed a tremendous courage to face the
            unknown. You will need to be prepared. traps and pitfalls, as a user
            you will need to run through many challenges, these challenges will
            test your coding skills and knowledge.
          </Text>
          <Text> Be brave and have fun!</Text>
        </Group>
      </Container>

      <QuizesDataList />
    </Dashboard>
  ) : (
    <Login />
  );
}
