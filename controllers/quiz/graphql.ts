import { gql } from "@apollo/client";

export const DELETE_QUESTION_OPTION = gql`
  mutation delete_auth_question_options_by_pk($id: uuid!) {
    delete_auth_question_options_by_pk(id: $id) {
      id
    }
  }
`;

export const GET_QUIZ_CATEGORIES = gql`
  query auth_quiz_categories {
    auth_quiz_categories {
      id
      title
      image_url
      quizes {
        id
        title
        created_at
        description
        difficulty
      }
    }
  }
`;

export const GET_QUIZ_CATEGORY = gql`
  query auth_quiz_categories_by_pk($id: uuid!) {
    auth_quiz_categories_by_pk(id: $id) {
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
          correct_option {
            id
            title
          }
          id
          title
        }
      }
    }
  }
`;

export const UPDATE_QUIZES = gql`
  mutation UpdateQuizes($data: auth_quizes_bool_exp!) {
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
        constraint: quizes_pkey
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
          order
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
        order
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
      on_conflict: {
        constraint: question_options_id_title_key
        update_columns: [id, title]
      }
    ) {
      returning {
        id
        title
        question_id
      }
    }
  }
`;

export const INSERT_QUESTION = gql`
  mutation MyMutation($data: auth_quizes_insert_input!) {
    insert_auth_quizes_one(
      object: $data
      on_conflict: {
        constraint: quizes_pkey
        update_columns: [title, description, difficulty, quiz_category_id, type]
      }
    ) {
      id
      title
    }
  }
`;

export const GET_BASIC_QUIZ = gql`
  query getBasicQuiz($id: uuid!) {
    auth_quizes_by_pk(id: $id) {
      id
      title
      description
      questions {
        id
        title
        description
        type
        order
        options {
          id
          title
        }
      }
    }
  }
`;

export const GET_QUIZ = gql`
  query getQuiz($id: uuid!) {
    auth_quizes_by_pk(id: $id) {
      id
      title
      created_at
      description
      published
      difficulty
      quiz_category_id
      quiz_category {
        id
        title
        image_url
      }
      questions {
        id
        title
        description
        quiz_id

        correct_option {
          title
          id
        }
        type
        order

        options {
          id
          title
          question_id
        }
      }
    }
  }
`;
export const GET_QUIZES = gql`
  query getQuizes($where: auth_quizes_bool_exp) {
    auth_quizes(where: $where) {
      id
      title
      created_at
      description
      published
      difficulty
      quiz_category_id
      quiz_category {
        id
        title
        image_url
      }
      questions {
        id
        title
        description
        quiz_id

        correct_option {
          title
          id
        }
        type
        order

        options {
          id
          title
          question_id
        }
      }
    }
  }
`;

export const COMPLETE_QUIZ = gql`
  mutation insert_auth_user_quizes($data: [auth_user_quizes_insert_input!]!) {
    insert_auth_user_quizes(objects: $data) {
      returning {
        id
      }
    }
  }
`;

export const GET_COMPLETED_QUIZES = gql`
  query completedQuizes($where: auth_user_quizes_bool_exp) {
    auth_user_quizes(where: $where) {
      id
      score
      quiz_id
      quiz {
        id
        title
        quiz_category {
          id
          title
        }
      }
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

// export const DELETE_QUESTION = gql`
//   mutation deleteQuestions($data: auth_questions_insert_input!) {
//     delete_auth_questions(data: $data) {
//       affected_rows
//     }
//   }
// `;
// insert_auth_question_options(objects: {}) {
//   affected_rows
// }
// insert_auth_question_options_one(object: {}) {
//   id
// }
