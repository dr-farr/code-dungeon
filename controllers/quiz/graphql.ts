import { gql } from "@apollo/client";

export const COMPLETE_QUIZ = gql`
  mutation completeQuiz($data: [auth_completed_quizes_insert_input!]!) {
    insert_auth_completed_quizes(objects: $data) {
      affected_rows
    }
  }
`;

export const GET_QUIZES = gql`
  query getQuizes($where: auth_quizes_bool_exp) {
    auth_quizes(where: $where) {
      id
      name
      created_at
      description
      difficulty
      questions {
        id
        name
        options {
          id
          name
        }
      }
    }
  }
`;

export const GET_QUIZ = GET_QUIZES;
// export const GET_QUIZES = gql`
//   query getQuizQuery($where) {
//     auth_quizes(where: $where) {
//       id
//       created_at
//       description
//       difficulty
//       questions {
//         id
//         name
//       }
//     }
//   }
// `;

// export const GET_QUIZ = gql`
//   query getQuizQuery($where) {
//     auth_quizes(where: $where) {

//     }
//   }
// `;

// export const TEAM_GOALS_QUERY = gql`
//   query teamGoalsQuery($teamId: String) {
//     goals(where: { teamId: { equals: $teamId } }) {
//       updatedAt
//       id
//       metric {
//         id
//         name
//         isRevenue
//       }
//       value
//       target
//       funnelId
//       data {
//         id
//         year
//         month
//         type
//         updatedAt
//         data {
//           id
//           value
//           provider
//           integration {
//             id
//           }
//           funnelNode {
//             id
//             name
//             order
//             isRevenue
//           }
//         }
//       }
//     }
//   }
// `;

// export const GOALS_QUERY = gql`
//   query (
//     $where: GoalWhereInput
//     $orderBy: [GoalOrderByInput!]
//     $take: Int
//     $skip: Int
//   ) {
//     goals(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
//       id
//       metric
//       value
//       target
//       funnelId
//     }
//   }
// `;
