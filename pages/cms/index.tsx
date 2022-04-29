import React, { Fragment, useEffect, useMemo, useState } from "react";

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
  Chips,
  Chip,
  Group,
  RadioGroup,
  Checkbox,
  Switch,
  ScrollArea,
} from "@mantine/core";

import {
  useDeleteQuestionOptions,
  useInsertQuestionOptions,
  useInsertQuestions,
  useInsertQuiz,
  useQuizCategories,
  useQuizCategory,
  useQuizes,
} from "controllers/quiz/hooks";

import {
  ExternalLink,
  Plus,
  Settings,
  Ticket,
  TrashX,
  Trophy,
} from "tabler-icons-react";
import { formList, useForm } from "@mantine/form";
import {
  Auth_Question_Options_Constraint,
  Auth_Quizes,
} from "src/generated/graphql";
import { showNotification } from "@mantine/notifications";
import Dashboard from "layout/app";
import { Router } from "express";
import { useRouter } from "next/router";

const AddOption = ({ onChange, onClick, options, defaultValue, onDelete }) => {
  const [value, setValue] = useState("");
  const deleteQuestionOption = useDeleteQuestionOptions();

  const handleClick = (value) => {
    // don't allow option with the same title
    if (
      options?.length === 0 ||
      !options?.map(({ title }) => title).includes(value)
    ) {
      onClick(value);
    }

    setValue("");
  };
  const handleChange = (value) => {
    onChange(value);
  };

  const handleDeleteOption = (option) => {
    if (option?.id) {
      deleteQuestionOption(option.id);
    }

    onDelete(option);
  };

  return (
    <Fragment>
      <Grid>
        <Grid.Col xs={12}>
          <Text>Options</Text>
        </Grid.Col>

        <Grid.Col xs={12}>
          <Select
            label="Correct option"
            placeholder="Pick one"
            onChange={handleChange}
            value={defaultValue}
            data={options?.map((option) => ({
              label: option.title,
              value: option.title,
            }))}
          />
        </Grid.Col>

        <Grid.Col xs={12}>
          {options?.map((option, idx) => {
            return (
              <Grid key={idx}>
                <Grid.Col xs={10}>
                  <TextInput
                    placeholder="Option title"
                    onChange={(e) => setValue(e.target.value)}
                    value={option?.title}
                  />
                </Grid.Col>
                <Grid.Col xs={2}>
                  <ActionIcon
                    color="red"
                    onClick={() => handleDeleteOption(option)}
                  >
                    <TrashX size={16} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            );
          })}
        </Grid.Col>
        <Grid.Col xs={12}>
          <TextInput
            placeholder="Add answer"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            rightSection={
              <ActionIcon
                onClick={() => (value !== "" ? handleClick(value) : null)}
              >
                <Plus />
              </ActionIcon>
            }
          />
        </Grid.Col>
      </Grid>
    </Fragment>
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

  const form = useForm({
    initialValues: {
      id: selectedQuiz?.id,
      title: selectedQuiz?.title,
      description: selectedQuiz?.description,
      difficulty: selectedQuiz?.difficulty,
      quiz_category_id: selectedQuiz?.quiz_category_id,
      type: selectedQuiz?.type,
      published: selectedQuiz?.published,
      questions: formList(questions),
      options: formList(options),
    },
  });

  const handleCreateQuiz = async () => {
    await insertQuiz({
      data: {
        title: "new",
      },
    });
  };

  const handleSubmit = async (data) => {
    const {
      created_at,
      description,
      difficulty,
      id,
      questions,
      quiz_category_id,
      title,
      published,
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
          published,
          id: selectedQuiz?.id,
          quiz_category_id,
          title,
        },
      });

      const optionData = [];
      form.values.questions.map((option, idx) => {
        const options: any = form.values.options[idx] ?? [];

        if (options?.length > 0) {
          const { id } = form.values.questions.find((question: any) => {
            return question.order === idx;
          }) as any;

          options.map((option) => {
            delete option.__typename;
            option.question_id = id;
            return option;
          });
        }

        if (options?.length > 0) {
          //@ts-ignore
          optionData.push([...options.map((option) => option)]);
        }
      });

      const {
        data: {
          insert_auth_question_options: { returning: savedOptionsData },
        },
      } = await insertQuestionOptions({
        data: optionData.reduce((prev, next) => [...prev, ...next], []),
      });

      const questionData = [];
      form.values.questions.map((question: any, idx) => {
        question.quiz_id = id;
        question.order = idx;
        delete question.__typename;
        delete question.options;
        if (question.correct_option) {
          delete question.correct_option?.__typename;
        }
        const options = savedOptionsData.filter(
          (option) => option.quiz_id !== question.id
        );

        options.map((option) => {
          delete option.__typename;

          if (question.correct_option?.title === option.title) {
            question.correct_option_id = option.id;
            delete question.correct_option;
          }
        });

        //@ts-ignore
        questionData.push(question);
      });
      const {
        data: {
          insert_auth_questions: { returning: savedQuestionsData },
        },
      } = await insertQuestions({ data: questionData });

      setSelectedQuiz(undefined);
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Whoops",
        message: "Didn't save 🤥",
      });
    }
  };
  const router = useRouter();
  const handleSelectQuiz = (item) => {
    setSelectedQuiz(item);

    form.setValues({
      id: item.id,
      title: item?.title,
      description: item?.description,
      difficulty: item?.difficulty,
      quiz_category_id: item?.quiz_category_id,
      published: item?.published,
      type: item?.type,
      questions: formList(item.questions),
      options: formList(item.questions.map((data) => data.options)),
    });
  };

  const types =
    Array.from(new Set(quizes?.map((q) => q.difficulty).filter((q) => q))) ??
    [];

  const difficulties = types?.length > 0 ? types : ["EASY"];

  return (
    <Dashboard>
      <Modal
        size="xl"
        onClose={() => setSelectedQuiz(undefined)}
        opened={selectedQuiz !== undefined}
        withCloseButton={false}
      >
        <form className="signup-form" onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Paper>
              <Grid>
                <Grid.Col xs={10}>
                  <TextInput
                    label="Title"
                    placeholder="Title"
                    value={form.values.title as string}
                    onChange={(event) =>
                      form.setFieldValue("title", event.currentTarget.value)
                    }
                  />
                </Grid.Col>
                <Grid.Col xs={2}>
                  <Switch
                    checked={form.values.published}
                    onChange={() =>
                      form.setFieldValue("published", !form.values.published)
                    }
                  />
                </Grid.Col>
              </Grid>
            </Paper>

            <Paper>
              <Textarea
                label="Description"
                value={form.values.description as string}
                onChange={(event) =>
                  form.setFieldValue("description", event.currentTarget.value)
                }
              />
            </Paper>

            <Paper>
              <Grid>
                <Grid.Col xs={6}>
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
                </Grid.Col>
                <Grid.Col xs={6}>
                  <Text>Rating</Text>
                  <SegmentedControl
                    color="green"
                    data={difficulties as string[]}
                    value={(form.values.difficulty ?? "EASY") as any}
                    onChange={(value: any) => {
                      form.setFieldValue("difficulty", value);
                    }}
                  />
                </Grid.Col>
              </Grid>
            </Paper>

            <Paper>
              <Grid>
                <Grid.Col xs={9}>
                  <Text>Questions ({form.values.questions.length}) </Text>
                </Grid.Col>
                <Grid.Col xs={2}>
                  <Button
                    onClick={() => {
                      return form.addListItem("questions", {
                        title: "Quiz Question",
                      });
                    }}
                  >
                    Add Question
                  </Button>
                </Grid.Col>
              </Grid>
            </Paper>

            <Paper>
              <ScrollArea style={{ height: 350 }}>
                <Accordion offsetIcon={false}>
                  {form?.values.questions?.map((item: any, idx: number) => {
                    return (
                      <Accordion.Item
                        key={idx}
                        label={
                          `${idx + 1}. ${item?.title}` ?? `Question ${idx + 1}`
                        }
                      >
                        <Grid>
                          <Grid.Col xs={8}>
                            <Grid>
                              <Grid.Col xs={12}>
                                <TextInput
                                  label="Title"
                                  placeholder="Title"
                                  value={item?.title}
                                  onChange={(event) => {
                                    const updatedQuestion = {
                                      ...item,
                                      title: event.currentTarget.value,
                                    };
                                    form.setListItem(
                                      "questions",
                                      idx,
                                      updatedQuestion
                                    );
                                  }}
                                />
                              </Grid.Col>
                              <Grid.Col xs={12}>
                                <Textarea
                                  label="Description"
                                  value={item?.description}
                                  onChange={(event) => {
                                    const updatedQuestion = {
                                      ...item,
                                      description: event.currentTarget.value,
                                    };
                                    form.setListItem(
                                      "questions",
                                      idx,
                                      updatedQuestion
                                    );
                                  }}
                                />
                              </Grid.Col>
                            </Grid>
                          </Grid.Col>

                          <Grid.Col xs={4}>
                            <AddOption
                              onDelete={(option) => {
                                //@ts-ignore
                                const options = form.values.options[idx].filter(
                                  ({ title }) => option.title !== title
                                );

                                form.setListItem("options", idx, options);
                              }}
                              defaultValue={item.correct_option?.title}
                              options={form.values.options[idx]}
                              onChange={(title) => {
                                const updatedQuestion: any = item;
                                //@ts-ignore
                                updatedQuestion?.correct_option = {
                                  title,
                                };

                                console.log(title);

                                form.setListItem(
                                  "questions",
                                  idx,
                                  updatedQuestion
                                );
                              }}
                              onClick={(title) => {
                                if (!form.values.options[idx]) {
                                  console.log("kdsf");
                                  form.addListItem("options", [{ title }]);
                                } else {
                                  form.setListItem("options", idx, [
                                    ...formList(
                                      form.values.options[idx] as any
                                    ),
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
              </ScrollArea>
            </Paper>
            <Paper>
              <Button type="submit">Update</Button>
              <Button onClick={() => setSelectedQuiz(undefined)}>Cancel</Button>
            </Paper>
          </Stack>
        </form>
      </Modal>
      {categories?.map((category, key) => {
        return (
          <Container key={key} size="sm">
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
                <Grid>
                  <Grid.Col xs={6}>
                    <Text>{category?.title}</Text>
                  </Grid.Col>
                  <Grid.Col xs={6}>
                    <Button
                      component="a"
                      onClick={handleCreateQuiz}
                      variant="outline"
                      leftIcon={<ExternalLink size={14} />}
                    >
                      Add Quiz
                    </Button>
                  </Grid.Col>
                </Grid>
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
                          onChange={(event) => null}
                        />
                      </td>

                      <td>{item.difficulty}</td>
                      <td>
                        <ActionIcon
                          color="red"
                          title="Remove transaction"
                          onClick={() => handleSelectQuiz(item)}
                        >
                          Edit
                        </ActionIcon>
                        <ActionIcon
                          color="green"
                          title="Remove transaction"
                          onClick={() => router.push(`/quiz/${item.id}`)}
                        >
                          Play
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Paper>
          </Container>
        );
      })}
    </Dashboard>
  );
}

export default Quiz;
