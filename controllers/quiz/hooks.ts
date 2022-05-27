import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useDefaultRole, useUserData } from "@nhost/react";
import { useAuthQuery } from "@nhost/react-apollo";
import { useAccessToken } from "@nhost/nextjs";
import { DocumentNode } from "graphql";
import {
  GET_QUIZ,
  GET_QUIZES,
  COMPLETE_QUIZ,
  GET_QUIZ_CATEGORIES,
  GET_QUIZ_CATEGORY,
  INSERT_QUIZ,
  INSERT_QUESTION_OPTIONS,
  DELETE_QUESTION_OPTION,
  INSERT_QUESTIONS,
  GET_BASIC_QUIZ,
  GET_COMPLETED_QUIZES,
} from "./graphql";

const useRoleMutation = (node: DocumentNode) => {
  const role = useDefaultRole();
  const token = useAccessToken();
  const [mutation] = useMutation(node, {
    context: {
      headers: {
        "x-hasura-role": role,
        Authorization: "Bearer " + token,
      },
    },
  });
  return (variables) => {
    return mutation({ variables });
  };
};

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

export function useQuizCategory(id) {
  const token = useAccessToken();
  const role = useDefaultRole();
  const query = useAuthQuery(GET_QUIZ_CATEGORY, {
    variables: {
      id,
    },
    context: {
      headers: {
        "x-hasura-role": role,
        Authorization: "Bearer " + token,
      },
    },
  });

  return {
    ...query,
    data: query?.data?.auth_quiz_categories_by_pk ?? null,
  };
}

export function useQuiz(id) {
  const token = useAccessToken();
  const role = useDefaultRole();
  const query = useAuthQuery(
    role !== "admin_user" ? GET_QUIZ : GET_BASIC_QUIZ,
    {
      variables: {
        id,
      },
      context: {
        headers: {
          "x-hasura-role": role,
          Authorization: "Bearer " + token,
        },
      },
    }
  );

  return {
    ...query,
    data: query?.data?.auth_quizes_by_pk ?? null,
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
  const role = useDefaultRole();
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
        "X-Hasura-Role": role,
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
  const role = useDefaultRole();
  const token = useAccessToken();
  const [completeQuiz] = useMutation(COMPLETE_QUIZ, {
    context: {
      headers: {
        "X-Hasura-Role": role,
        Authorization: "Bearer " + token,
      },
    },
  });
  const user = useUserData();

  return (variables) => {
    const correctAnswerCount = variables.data.answers.data.map(
      ({ option_id }) => option_id
    );

    variables.data.user_id = user?.id;
    variables.data.completed_at = new Date();
    variables.data.created_at = new Date();
    variables.data.updated_at = new Date();

    return completeQuiz({ variables });
  };
}

export function useUserQuizes(
  where?,

  order_by?,

  limit?,

  offset?
) {
  const token = useAccessToken();
  const role = useDefaultRole();
  const user = useUserData();
  const query = useAuthQuery(GET_COMPLETED_QUIZES, {
    variables: {
      where: {
        ...where,
        user_id: { _eq: user?.id },
        quiz: { id: { _is_null: false } },
      },
      order_by: {
        ...order_by,
      },

      offset,
    },
    context: {
      headers: {
        "x-hasura-role": role,
        Authorization: "Bearer " + token,
      },
    },
  });

  return {
    ...query,
    data: query?.data?.auth_user_quizes ?? null,
  };
}

export function useInsertQuiz() {
  const token = useAccessToken();
  const role = useDefaultRole();
  const [insertQuiz] = useMutation(INSERT_QUIZ, {
    context: {
      headers: {
        "x-hasura-role": role,
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
  const role = useDefaultRole();
  const [insertQuestions] = useMutation(INSERT_QUESTIONS, {
    context: {
      headers: {
        "x-hasura-role": role,
        Authorization: "Bearer " + token,
      },
    },
  });
  return (variables) => {
    return insertQuestions({ variables });
  };
}

export function useDeleteQuestionOptions() {
  const token = useAccessToken();
  const role = useDefaultRole();
  const [deleteQuestionOption] = useMutation(DELETE_QUESTION_OPTION, {
    context: {
      headers: {
        "x-hasura-role": role,
        Authorization: "Bearer " + token,
      },
    },
  });
  return (id) => {
    return deleteQuestionOption({ variables: { id } });
  };
}

export function useInsertQuestionOptions() {
  const token = useAccessToken();
  const role = useDefaultRole();
  const [insertQuestionOptions] = useMutation(INSERT_QUESTION_OPTIONS, {
    context: {
      headers: {
        "x-hasura-role": role,
        Authorization: "Bearer " + token,
      },
    },
  });
  return (variables) => {
    return insertQuestionOptions({ variables });
  };
}
