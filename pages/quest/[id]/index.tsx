import React, { useContext, useState } from "react";
import {
  Button,
  Text,
  Title,
  Loader,
  Grid,
  Container,
  Card,
} from "@mantine/core";

import { useQuizCategory } from "controllers/quiz/hooks";
import Image from "next/image";
import Dashboard from "layout/app";
import Link from "next/link";
import { useRouter } from "next/router";

function QuestPage({ id }) {
  const { data, loading, error } = useQuizCategory({ id: { _eq: id } });

  const router = useRouter();

  console.log(error);
  if (!data) {
    return <Text>Nothing is real</Text>;
  }

  return (
    <Dashboard>
      <Container size="xl">
        <Grid align="center">
          <Grid.Col xs={9}>
            <Image
              width="300"
              height="90"
              alt={data?.name}
              src={data?.image_url}
            />
          </Grid.Col>
          <Grid.Col>
            {data && data?.questions?.length ? (
              <div>nah</div>
            ) : (
              <Grid>
                {data.quizes.map((quiz, idx) => {
                  return (
                    <Grid.Col key={idx}>
                      <Card
                        onClick={() => {
                          router.push(`/quiz/${quiz.id}`);
                        }}
                      >
                        <Text>{quiz?.name}</Text>
                      </Card>
                    </Grid.Col>
                  );
                })}
              </Grid>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Dashboard>
  );
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
    },
  };
};

export default QuestPage;
