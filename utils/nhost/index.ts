import { NhostClient } from "@nhost/nextjs";

import { BACKEND_URL } from "utils/constants/env";
console.log(BACKEND_URL);
if (!BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined");
}
const nhost = new NhostClient({
  backendUrl: BACKEND_URL as string,
});

// console.log("gql", nhost.graphql.getUrl());

export default nhost;
