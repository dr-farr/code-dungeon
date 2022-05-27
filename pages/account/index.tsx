import {
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Space,
  TextInput,
  Text,
  Title,
  Paper,
  Stack,
  CheckboxGroup,
  SimpleGrid,
  Grid,
  Avatar,
} from "@mantine/core";
import Image from "next/image";
import { useForm } from "@mantine/form";
import InfoText from "components/InfoText";
import { useQuizCategories, useUserQuizes } from "controllers/quiz/hooks";
import Dashboard from "layout/app";
import Link from "next/link";
import React, { Fragment } from "react";
import { calculateGrade } from "utils/quiz";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

import { useUserData } from "@nhost/react";
import { groupBy, isNumber } from "@s-libs/micro-dash";

const Email = () => {
  const user = useUserData();

  const form = useForm({
    initialValues: {
      email: user?.email,
      emailSettings: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <Title order={6}>Email Settings</Title>
        <Box>
          <TextInput disabled label="Email" {...form.getInputProps("email")} />
        </Box>
        <CheckboxGroup
          defaultValue={["bi-weekly"]}
          label="Update your email settings"
          description="We will send you emails to keep you up to date with your progress."
        >
          <Checkbox value="weekly" label="Weekly" />
          <Checkbox value="bi-weekly" label="Bi-Weekly" />
          <Checkbox value="monthly" label="Monthly" />
        </CheckboxGroup>
        <Button>Save</Button>
      </Stack>
    </form>
  );
};
const Quizes = () => {
  const { data: userQuizes } = useUserQuizes();
  const { data: categories } = useQuizCategories();
  const quizes = userQuizes?.map(({ quiz }) => quiz);
  const data = groupBy(quizes, ({ quiz_category }) => quiz_category?.id);

  return (
    <Stack>
      <Title order={6}>Progress</Title>
      <Grid>
        <Grid.Col xs={4}>Title </Grid.Col>
        <Grid.Col xs={4}>Rank</Grid.Col>
        <Grid.Col xs={3}>Activity</Grid.Col>
      </Grid>
      {categories?.map((category, idx) => {
        return (
          <Fragment key={idx}>
            <Title order={6}>{category?.title}</Title>

            {category?.quizes?.map((quiz, idx) => {
              const quizData = userQuizes?.find((q) => q.quiz_id === quiz?.id);

              const grade = isNumber(quizData?.score) ? (
                calculateGrade(quizData?.score)
              ) : (
                <i>
                  <small>Start Quest</small>
                </i>
              );
              return (
                <Link key={idx} href={`/quiz/${quiz.id}`} passHref>
                  <Paper p={8}>
                    <SimpleGrid cols={3} spacing="xs">
                      <div>{quiz?.title}</div>
                      <div>{grade}</div>
                      <div>
                        {quizData?.completed_at &&
                        dayjs(quizData?.completed_at).isValid()
                          ? //@ts-ignore
                            dayjs(quizData?.completed_at).fromNow()
                          : ""}
                      </div>
                    </SimpleGrid>
                  </Paper>
                </Link>
              );
            })}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default function SettingsPage() {
  return (
    <Dashboard>
      <Container>
        <InfoText>
          <Stack>
            <Title order={6}>Character</Title>
            <Grid>
              <Grid.Col xs={6}>
                <Avatar
                  size="xl"
                  src="https://user-images.githubusercontent.com/78376735/162839437-7bea91c7-be0a-4d35-b2b9-89cb239b0a07.jpeg"
                />
              </Grid.Col>
              <Grid.Col xs={6}>
                <Title order={6}> Level 3</Title>
              </Grid.Col>
            </Grid>
          </Stack>
        </InfoText>
        <Space h="xl" />
        <InfoText>
          <Quizes />
        </InfoText>

        <Space h="xl" />
        <InfoText>
          <Email />
        </InfoText>
      </Container>
    </Dashboard>
  );
}
