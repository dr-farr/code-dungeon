import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useAuthQuery } from "@nhost/react-apollo";

import {
  GET_QUIZES,
  COMPLETE_QUIZ,
  GET_QUIZ_CATEGORIES,
  GET_QUIZ_CATEGORY,
} from "./graphql";

export function useQuizCategories() {
  const query = useQuery(GET_QUIZ_CATEGORIES);

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
  const query = useQuery(GET_QUIZ_CATEGORY, {
    variables: {
      where,
      orderBy,
      take,
      skip,
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
  const query = useQuery(GET_QUIZES, {
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
  const query = useQuery(GET_QUIZES, {
    variables: {
      where,
      orderBy,
      take,
      skip,
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
