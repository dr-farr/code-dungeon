import { Button, Container, Group, TextInput } from "@mantine/core";
import Dashboard from "layout/app";
import React from "react";
import { useForm } from "@mantine/hooks";

export default function QuizUpdate() {
  let form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
    },
  });
  return (
    <Dashboard>
      <Container size="xl">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Group spacing={2}>
            <TextInput
              required
              label="Category"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
            <TextInput
              required
              label="Type"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
            <TextInput
              required
              label="Difficulty"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
          </Group>
          <Group>
            <TextInput
              required
              label="Question intro"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
          </Group>
          <Group>
            <TextInput
              required
              label="Question"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
          </Group>
          <Group>
            <TextInput
              required
              label="Email"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
            <TextInput
              required
              label="Correct answer"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
            <TextInput
              required
              label="Incorrect answer"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
            <TextInput
              required
              label="Incorrect answer"
              error={form.errors.email && "Please specify valid email"}
              placeholder="Your email"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
            />
          </Group>
          <Group direction="column" grow>
            <Button type="submit" style={{ marginTop: 25 }}>
              Hello world!
            </Button>
          </Group>
        </form>
      </Container>
    </Dashboard>
  );
}
