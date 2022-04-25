import React, { Fragment, useEffect, useState } from "react";

import {
  Paper,
  Table,
  ActionIcon,
  Text,
  TextInput,
  Button,
  Container,
  Modal,
  Accordion,
  Box,
  Textarea,
  Select,
  SegmentedControl,
  Grid,
  Stack,
} from "@mantine/core";

import {
  useInsertQuestionOptions,
  useInsertQuestions,
  useInsertQuiz,
  useQuizCategories,
  useQuizCategory,
  useQuizes,
} from "controllers/quiz/hooks";

import { ExternalLink, Plus, Settings, Ticket } from "tabler-icons-react";
import { formList, useForm } from "@mantine/form";
import { Auth_Quizes } from "src/generated/graphql";
import { showNotification } from "@mantine/notifications";
import Dashboard from "layout/app";
import { useUserData } from "@nhost/react";

const AddOption = ({ onClick }) => {
  const [value, setValue] = useState("");

  const handleClick = (value) => {
    onClick(value);
    setValue("");
  };
  return (
    <TextInput
      placeholder="Add answer"
      onChange={(e) => setValue(e.target.value)}
      value={value}
      rightSection={
        <ActionIcon onClick={() => (value !== "" ? handleClick(value) : null)}>
          <Plus />
        </ActionIcon>
      }
    />
  );
};
function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<undefined | Auth_Quizes>(
    undefined
  );

  const [questions, setQuestions] = useState<any>([]);
  const [options, setOptions] = useState<any>([]);

  const { data: quizes, loading: quizesLoading } = useQuizes();
  const { data: categories, loading: categoriesLoading } = useQuizCategories();

  const loading = quizesLoading || categoriesLoading;
  const insertQuiz = useInsertQuiz();
  const insertQuestions = useInsertQuestions();
  const insertQuestionOptions = useInsertQuestionOptions();

  const user = useUserData();
  console.log(user);

  const form = useForm({
    initialValues: {
      id: selectedQuiz?.id,
      title: selectedQuiz?.title,
      description: selectedQuiz?.description,
      difficulty: selectedQuiz?.difficulty,
      quiz_category_id: selectedQuiz?.quiz_category_id,
      type: selectedQuiz?.type,
      questions: formList(questions),
      options: formList(options),
    },
  });

  const handleSubmit = async (data) => {
    const {
      created_at,
      description,
      difficulty,
      id,
      questions,
      quiz_category_id,
      title,
    } = data;

    try {
      showNotification({
        color: "teal",
        icon: <Ticket />,
        title: "Updated",
        message: "Nice 😏",
      });

      const {
        data: {
          insert_auth_quizes_one: { id },
        },
      } = await insertQuiz({
        data: {
          description,
          difficulty,
          id: selectedQuiz?.id,
          quiz_category_id,
          title,
        },
      });

      const questionData = [];
      form.values.questions.map((question, idx) => {
        question.quiz_id = id;
        delete question.__typename;
        delete question.options;
        questionData.push(question);
      });

      const {
        data: {
          insert_auth_questions: { returning },
        },
      } = await insertQuestions({ data: questionData });

      const optionData = [];
      returning.map((option, idx) => {
        const o = form.values.options[idx];
        console.log(o);
        // o.question_id = option.id;
        // optionData.push(o);
      });

      await insertQuestionOptions({ data: optionData });
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Whoops",
        message: "Didn't save 🤥",
      });
    }
  };

  const handleSelectQuiz = (item) => {
    setSelectedQuiz(item);

    form.setValues({
      id: item.id,
      title: item?.title,
      description: item?.description,
      difficulty: item?.difficulty,
      quiz_category_id: item?.quiz_category_id,
      type: item?.type,
      questions: formList(item.questions),
      options: formList(item.questions.map((data) => data.options)),
    });
  };

  return (
    <Dashboard>
      <Modal
        size="xl"
        onClose={() => setSelectedQuiz(undefined)}
        opened={selectedQuiz !== undefined}
        withCloseButton={false}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Paper className="signup-form" shadow="xl">
              <Paper>
                <TextInput
                  label="Title"
                  placeholder="Title"
                  value={form.values.title}
                  onChange={(event) =>
                    form.setFieldValue("title", event.currentTarget.value)
                  }
                />
              </Paper>

              <Paper>
                <Textarea
                  label="Description"
                  value={form.values.description}
                  onChange={(event) =>
                    form.setFieldValue("description", event.currentTarget.value)
                  }
                />
              </Paper>

              <Paper>
                <Select
                  label="Quiz Category"
                  placeholder="Pick one"
                  nothingFound="No options"
                  value={form.values.quiz_category_id}
                  onChange={(value) =>
                    form.setFieldValue("quiz_category_id", value as string)
                  }
                  data={
                    categories?.map((category) => ({
                      value: category.id,
                      label: category.title,
                    })) ?? []
                  }
                />
              </Paper>

              <Paper>
                <SegmentedControl
                  color="green"
                  data={["easy", "medium", "hard", "expert"]}
                />
              </Paper>
              <Paper>
                <Text>Questions ({form.values.questions.length}) </Text>
                <Button
                  onClick={() => {
                    return form.addListItem("questions", {
                      title: "Quiz Question",
                    });
                  }}
                >
                  Add Question
                </Button>
              </Paper>

              <Paper>
                <Accordion offsetIcon={false}>
                  {form?.values.questions?.map((item: any, idx: number) => {
                    return (
                      <Accordion.Item key={idx} label={`Question ${idx + 1}`}>
                        <Grid>
                          <Grid.Col xs={6}>
                            <TextInput
                              label="Title"
                              placeholder="Title"
                              value={form.values.questions[idx]?.title}
                              onChange={(event) =>
                                form.setFieldValue(
                                  form.values.questions[idx]?.title,
                                  event.currentTarget.value
                                )
                              }
                            />
                          </Grid.Col>
                          <Grid.Col>
                            <Textarea
                              label="Description"
                              value={form.values.questions[idx]?.description}
                              onChange={(event) =>
                                form.setFieldValue(
                                  "description",
                                  event.currentTarget.value
                                )
                              }
                            />
                          </Grid.Col>

                          <Grid.Col xs={3}>
                            <Text>Option</Text>
                            {form.values.options[idx]?.length > 0 && (
                              <SegmentedControl
                                orientation="vertical"
                                color="green"
                                data={[
                                  ...(form.values.options[idx]
                                    ? form.values.options[idx]?.map(
                                        (option) => option?.title ?? ""
                                      )
                                    : []),
                                ]}
                              />
                            )}
                            <AddOption
                              onClick={(title) => {
                                if (!form.values.options[idx]) {
                                  form.addListItem("options", [{ title }]);
                                } else {
                                  form.setListItem("options", idx, [
                                    ...formList(form.values.options[idx]),
                                    { title },
                                  ]);
                                }
                              }}
                            />
                          </Grid.Col>
                        </Grid>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </Paper>
            </Paper>
            <Paper>
              <Button type="submit">Update</Button>
              <Button onClick={() => setSelectedQuiz(undefined)}>Cancel</Button>
            </Paper>
          </Stack>
        </form>
      </Modal>
      <Container size="sm">
        <Paper shadow="xs" style={{ overflowX: "auto" }}>
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
              textAlign: "center",
              padding: theme.spacing.xl,
              borderRadius: theme.radius.md,
              cursor: "pointer",

              "&:hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              },
            })}
          >
            <Button
              component="a"
              href="#"
              variant="outline"
              leftIcon={<ExternalLink size={14} />}
            >
              Add Quiz
            </Button>
          </Box>
        </Paper>
        <Paper shadow="xs" style={{ overflowX: "auto" }}>
          <Table style={{ tableLayout: "fixed", minWidth: 500 }}>
            <thead>
              <tr>
                <th style={{ width: 200 }}>Title</th>
                <th style={{ width: 140 }}>Description</th>
                <th style={{ width: "100%" }}>Actions</th>
                <th style={{ width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {quizes?.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <TextInput
                      variant="unstyled"
                      value={item.title}
                      onChange={
                        (event) => null
                        // transactionsHandlers.setItemProp(
                        //   index,
                        //   "amount",
                        //   Number.isNaN(parseFloat(event.currentTarget.value))
                        //     ? 0
                        //     : parseFloat(event.currentTarget.value)
                        // )
                      }
                    />
                  </td>

                  <td>
                    <TextInput
                      placeholder="Transaction description"
                      variant="unstyled"
                      value={item.description}
                      onChange={
                        (event) => null
                        // transactionsHandlers.setItemProp(
                        //   index,
                        //   "title",
                        //   event.currentTarget.value
                        // )
                      }
                    />
                  </td>
                  <td>
                    <ActionIcon
                      color="red"
                      title="Remove transaction"
                      onClick={() => handleSelectQuiz(item)}
                    >
                      Edit
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      </Container>
    </Dashboard>
  );
}

export default Quiz;
