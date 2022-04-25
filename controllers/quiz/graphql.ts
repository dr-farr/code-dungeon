import { gql } from "@apollo/client";

export const GET_QUIZ_CATEGORIES = gql`
  query auth_quiz_categories {
    auth_quiz_categories {
      id
      title
      image_url
    }
  }
`;

export const GET_QUIZ_CATEGORY = gql`
  query auth_quiz_categories($where: auth_quiz_categories_bool_exp) {
    auth_quiz_categories(where: $where) {
      id
      title
      image_url
      quizes {
        id
        title
        created_at
        description
        difficulty
        questions {
          id
          title
        }
      }
    }
  }
`;

export const UPDATE_QUIZES = gql`
  mutation UpdateQuizes($data: auth_quiz_bool_exp!) {
    update_auth_quizes(where: $data) {
      affected_rows
    }
  }
`;

export const INSERT_QUIZ = gql`
  mutation insertQuiz($data: auth_quizes_insert_input!) {
    insert_auth_quizes_one(
      object: $data
      on_conflict: {
        constraint: quizes_yd_key
        update_columns: [title, description, difficulty, quiz_category_id, type]
      }
    ) {
      id
      title
    }
  }
`;

export const INSERT_QUESTIONS = gql`
  mutation insertQuestions($data: [auth_questions_insert_input!]!) {
    insert_auth_questions(
      objects: $data
      on_conflict: {
        constraint: questions_pkey
        update_columns: [
          updated_at
          created_at
          quiz_id
          title
          type
          correct_option_id
          description
        ]
      }
    ) {
      returning {
        id
        title
      }
    }
  }
`;
export const INSERT_QUESTION_OPTIONS = gql`
  mutation insertQuestionOptions(
    $data: [auth_question_options_insert_input!]!
  ) {
    insert_auth_question_options(
      objects: $data
      on_conflict: { constraint: question_options_pkey }
    ) {
      returning {
        id
        title
      }
    }
  }
`;

// export const INSERT_QUESTION = gql`
//   mutation MyMutation($data: auth_quizes_insert_input!) {
//     insert_auth_quizes_one(
//       object: $data
//       on_conflict: {
//         constraint: quizes_yd_key
//         update_columns: [title, description, difficulty, quiz_category_id, type]
//       }
//     ) {
//       id
//       title
//     }
//   }
// `;

export const GET_QUIZES = gql`
  query getQuizes($where: auth_quizes_bool_exp) {
    auth_quizes(where: $where) {
      id
      title
      created_at
      description
      difficulty
      quiz_category {
        id
        title
        image_url
      }
      questions {
        id
        title

        options {
          id
          title
        }
      }
    }
  }
`;
export const COMPLETE_QUIZ = gql`
  mutation completeQuiz($data: [auth_completed_quizes_insert_input!]!) {
    insert_auth_completed_quizes(objects: $data) {
      affected_rows
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createOneQuestion($data: auth_questions_insert_input!) {
    insert_auth_questions_one(object: $data) {
      id
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateOneQuestion($data: auth_questions_insert_input!) {
    update_auth_questions(data: $data) {
      affected_rows
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestions($data: auth_questions_insert_input!) {
    delete_auth_questions(data: $data) {
      affected_rows
    }
  }
`;
// insert_auth_question_options(objects: {}) {
//   affected_rows
// }
// insert_auth_question_options_one(object: {}) {
//   id
// }
export const GET_QUIZ = GET_QUIZES;
