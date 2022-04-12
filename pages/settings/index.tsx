import {
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import InfoText from "components/InfoText";
import Dashboard from "layout/app";
import React from "react";

export default function SettingsPage() {
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
    <Dashboard>
      <Container>
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
        <Space h="xl" />
      </Container>
    </Dashboard>
  );
}
