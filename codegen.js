module.exports = {
  schema: [
    {
      "https://whflujlkvojfebejcjmk.nhost.run/v1/graphql": {
        headers: {
          "x-hasura-admin-secret": process.env.AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ["./**/*.tsx", "./**/*.ts"],
  overwrite: true,
  generates: {
    "./src/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
