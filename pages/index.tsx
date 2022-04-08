import Image from "next/image";

import nhost, { useAuth } from "utils/nhost";

import Login from "components/Login";
import User from "components/UserAccount";
import {
  Badge,
  Card,
  Container,
  Grid,
  Group,
  useMantineTheme,
  Text,
  Button,
  Alert,
  AppShell,
  Header,
  MediaQuery,
  Burger,
  Anchor,
  Navbar,
  Title,
} from "@mantine/core";

import React, { useEffect, useState } from "react";
import { GraphqlRequestResponse } from "@nhost/nhost-js/dist/types";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={80}>
          <Grid>
            <User />
          </Grid>
        </Header>
      }
    >
      <Title order={2}>Bash Quest</Title>
      {children}
    </AppShell>
  );
};
/**
 * List all quiz data in card format
 * @returns {React.ReactElement}
 */
const QuizesDataList = () => {
  const { isAuthenticated, user } = useAuth();

  const [error, setError] = useState<any>(false);
  const [quizes, setQuizesData] = useState<
    GraphqlRequestResponse | any | undefined
  >(undefined);

  useEffect(() => {
    try {
      async function getQuizesData() {
        const response = await nhost.graphql.request(`
        query {
          auth_quizes {
            id
            name  
            created_at
            description
          }
        }
        `);

        if (response.error) {
          setError(response.error);
          return;
        }

        //@ts-ignore
        const quizData = response?.data?.auth_quizes;

        setQuizesData(quizData ?? null);
      }

      if (isAuthenticated) {
        getQuizesData();
      }
    } catch (error) {
      setError(error);
    }
  }, [isAuthenticated]);

  return (
    <Grid>
      <Grid.Col>{error && <Alert color="red">{error}</Alert>}</Grid.Col>
      <Grid>
        {quizes?.length ? (
          quizes.map((item: any, idx: number) => {
            return (
              <Grid.Col key={idx} xs={5}>
                <Card shadow="sm" p="lg">
                  <Group position="apart">
                    <Text weight={500}>{item.name}</Text>
                    <Badge color="pink" variant="light">
                      {item.difficulty}
                    </Badge>
                  </Group>

                  <Text size="sm" style={{ lineHeight: 1.5 }}>
                    {item.description}
                  </Text>

                  <Button
                    variant="light"
                    color="blue"
                    fullWidth
                    style={{ marginTop: 14 }}
                  >
                    Quest
                  </Button>
                </Card>
              </Grid.Col>
            );
          })
        ) : (
          <Title order={3}>No quests for you here</Title>
        )}
      </Grid>
    </Grid>
  );
};
export default function Home() {
  const { user } = useAuth();

  return user ? (
    <Dashboard>
      <QuizesDataList />
    </Dashboard>
  ) : (
    <Login />
  );
}
