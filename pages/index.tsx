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
                    <Group position="apart">
                      <Text weight={500}>{item.name}</Text>
                      <Badge color="pink" variant="light">
                        {item?.difficulty}
                      </Badge>

                      <Badge color="blue" variant="light">
                        {item.questions?.length}
                      </Badge>
                    </Group>

                    <Text size="sm" style={{ lineHeight: 1.5 }}>
                      {item?.description}
                    </Text>
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
      <QuizesDataList />
    </Dashboard>
  ) : (
    <Login />
  );
}
