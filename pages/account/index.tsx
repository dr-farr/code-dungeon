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
} from "@mantine/core";
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
    <InfoText>
      <Title order={6}>Email Settings</Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <Box>
            <TextInput
              disabled
              label="Email"
              {...form.getInputProps("email")}
            />
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
    </InfoText>
  );
};
const Quizes = () => {
  const { data: userQuizes } = useUserQuizes();
  const { data: categories } = useQuizCategories();
  const quizes = userQuizes?.map(({ quiz }) => quiz);
  const data = groupBy(quizes, ({ quiz_category }) => quiz_category?.id);

  return (
    <InfoText>
      <Stack>
        <Title order={6}>Progress</Title>
        {categories?.map((category, idx) => {
          return (
            <Fragment key={idx}>
              <Title order={6}>{category?.title}</Title>

              {category?.quizes?.map((quiz, idx) => {
                const quizData = userQuizes?.find(
                  (q) => q.quiz_id === quiz?.id
                );

                const grade = isNumber(quizData?.score)
                  ? calculateGrade(quizData?.score)
                  : null;
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
    </InfoText>
  );
};

export default function SettingsPage() {
  return (
    <Dashboard>
      <Container>
        <Email />
        <Space h="xl" />
        <Quizes />
      </Container>
    </Dashboard>
  );
}
