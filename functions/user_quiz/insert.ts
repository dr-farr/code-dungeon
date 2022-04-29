import { Request, Response } from "express";
import { NhostClient } from "@nhost/nhost-js";

/**
 * Function run when a user finishes a quiz, used to calculate quiz ++ update caharacter stufzzo

 * **/
const nhost = new NhostClient({
  backendUrl: process.env.NHOST_BACKEND_URL!,
});

const handler = async (req: Request, res: Response) => {
  if (
    req.headers["nhost-webhook-secret"] !== process.env.NHOST_WEBHOOK_SECRET
  ) {
    return res.status(401).send("Unauthorized");
  }

  const { id } = req.body.event.data.new;

  try {
    const GET_USER_QUIZ = `

  query MyQuery($id: uuid!){
    auth_user_quizes_by_pk(id: $id) {
      id
      answers {
        id
        option {
          id
        }
      }
      quiz {
        id
        questions {
          id
          correct_option_id
          options {
            id
          }
        }
      }
    }
  }
  `;
    const { data, error } = await nhost.graphql.request(
      GET_USER_QUIZ,
      {
        id,
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
        },
      }
    );

    const {
      auth_user_quizes_by_pk: { quiz, answers },
    } = data;

    const correctOptions = quiz?.questions.map(
      ({ correct_option_id }) => correct_option_id
    );

    const correctAnswers = answers
      ?.map(({ option }) => option?.id)
      .filter((id) => correctOptions.includes(id));

    const score =
      Number(
        ((correctAnswers?.length * 100) / quiz.questions?.length).toFixed(2)
      ) ?? 0;

    const UPDATE_USER_QUIZ = `
        mutation MyMutation($id: uuid!, $score: Int!) {
            update_auth_user_quizes_by_pk(pk_columns: {id: $id}, _set: {score: $score}) {
                id
            }
        }
    `;

    const { data: updateData, error: updateError } =
      await nhost.graphql.request(
        UPDATE_USER_QUIZ,
        {
          id,
          score,
        },
        {
          headers: {
            "x-hasura-admin-secret": process.env.NHOST_ADMIN_SECRET as string,
          },
        }
      );

    console.log("updated:", updateData, updateError);
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
  res.status(200).send(`OK`);
};

export default handler;
