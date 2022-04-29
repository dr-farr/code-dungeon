import { ApolloServer } from "apollo-server";
import gql from "graphql-tag";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

const typeDefs = gql`
  type auth0_profile {
    email: String
    picture: String
  }

  type Query {
    auth0: auth0_profile
  }
`;

function getProfileInfo(user_id) {
  const headers = {
    Authorization: `Bearer ${process.env.TASTY_TOKEN}`,
  };
  console.log(headers);

  return fetch(process.env.NEXT_PUBLIC_NHOST_BACKEND_URL, {
    headers,
  });
}

const resolvers = {
  Query: {
    auth0: (parent, args, context) => {
      // read the authorization header sent from the client
      const authHeaders = context.headers.authorization || "";
      const token = authHeaders.replace("Bearer ", "");

      // decode the token to find the user_id
      try {
        if (!token) {
          return "Authorization token is missing!";
        }

        const decoded = jwt.decode(token);
        const user_id = decoded?.sub;

        // make a rest api call to auth0
        return getProfileInfo(user_id)
          .then((resp) => resp.json())
          .then((resp) => {
            console.log(resp);
            if (!resp) {
              return null;
            }

            return { email: resp.email, picture: resp.picture };
          });
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },
};

const context = ({ req }) => {
  return { headers: req.headers };
};

const schema = new ApolloServer({ typeDefs, resolvers, context });
schema.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
