import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useAuthQuery } from "@nhost/react-apollo";
import { useAccessToken } from "@nhost/nextjs";
import nhost from "utils/nhost";
import {
  GET_QUIZES,
  COMPLETE_QUIZ,
  GET_QUIZ_CATEGORIES,
  GET_QUIZ_CATEGORY,
  CREATE_QUIZ,
  INSERT_QUIZ,
  INSERT_QUESTION_OPTIONS,
  INSERT_QUESTIONS,
} from "./graphql";

export function useQuizCategories() {
  const token = useAccessToken();
  const query = useAuthQuery(GET_QUIZ_CATEGORIES, {
    context: {
      headers: {
        "x-hasura-role": "admin_user",
        Authorization: "Bearer " + token,
      },
    },
  });

  return {
    ...query,
    data: query?.data?.auth_quiz_categories ?? null,
  };
}

export function useQuizCategory(
  //@ts-ignore
  where?,
  //@ts-ignore
  orderBy?,
  //@ts-ignore
  take?,
  //@ts-ignore
  skip?
) {
  const token = useAccessToken();
  const query = useAuthQuery(GET_QUIZ_CATEGORY, {
    variables: {
      where,
      orderBy,
      take,
      skip,
    },
    context: {
      headers: {
        "x-hasura-role": "admin_user",
        Authorization: "Bearer " + token,
      },
    },
  });

  return {
    ...query,
    data: query?.data?.auth_quiz_categories[0] ?? null,
  };
}

export function useQuiz(
  //@ts-ignore
  where?,
  //@ts-ignore
  orderBy?,
  //@ts-ignore
  take?,
  //@ts-ignore
  skip?
) {
  const query = useAuthQuery(GET_QUIZES, {
    variables: {
      where,
      orderBy,
      take,
      skip,
    },
  });

  return {
    ...query,
    data: query?.data?.auth_quizes[0] ?? null,
  };
}

export function useQuizes( //@ts-ignore
  where?,
  //@ts-ignore
  orderBy?,
  //@ts-ignore
  take?,
  //@ts-ignore
  skip?
) {
  const token = useAccessToken();
  const query = useAuthQuery(GET_QUIZES, {
    variables: {
      where,
      orderBy,
      take,
      skip,
    },
    context: {
      headers: {
        "X-Hasura-Role": "admin_user",
        Authorization: "Bearer " + token,
      },
    },
  });

  return {
    ...query,
    data: query?.data?.auth_quizes ?? null,
  };
}

export function useCompleteQuiz() {
  const [completeQuiz] = useMutation(COMPLETE_QUIZ);
  return (variables) => {
    console.log(variables);
    return completeQuiz({ variables });
  };
}

export function useInsertQuiz() {
  const token = useAccessToken();
  const [insertQuiz] = useMutation(INSERT_QUIZ, {
    context: {
      headers: {
        "x-hasura-role": "admin_user",
        Authorization: "Bearer " + token,
      },
    },
  });
  return (variables) => {
    return insertQuiz({ variables });
  };
}

export function useInsertQuestions() {
  const token = useAccessToken();
  const [insertQuestions] = useMutation(INSERT_QUESTIONS, {
    context: {
      headers: {
        "x-hasura-role": "admin_user",
        Authorization: "Bearer " + token,
      },
    },
  });
  return (variables) => {
    return insertQuestions({ variables });
  };
}

export function useInsertQuestionOptions() {
  const token = useAccessToken();
  const [insertQuestionOptions] = useMutation(INSERT_QUESTION_OPTIONS, {
    context: {
      headers: {
        "x-hasura-role": "admin_user",
        Authorization: "Bearer " + token,
      },
    },
  });
  return (variables) => {
    return insertQuestionOptions({ variables });
  };
}
