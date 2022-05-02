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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import InfoText from "components/InfoText";
import { useUserQuizes } from "controllers/quiz/hooks";
import Dashboard from "layout/app";
import Link from "next/link";
import React, { Fragment } from "react";
import { calculateGrade } from "utils/quiz";

const Email = () => {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <InfoText>
      <Title>Email Settings</Title>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />
          <Checkbox
            mt="md"
            label="I agree to sell my privacy"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </InfoText>
  );
};
const Quizes = () => {
  const { data } = useUserQuizes();

  return (
    <InfoText>
      <Title>Progress</Title>

      {data?.map((quiz, idx) => {
        const { grade } = calculateGrade(quiz?.score ?? 0);
        return (
          <Link key={idx} href={`/quiz/${quiz.id}`} passHref>
            <Paper>
              <Fragment>
                {quiz?.quiz?.quiz_category?.title} - {quiz?.quiz?.title}- Grade{" "}
                {grade}
              </Fragment>
            </Paper>
          </Link>
        );
      })}
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
