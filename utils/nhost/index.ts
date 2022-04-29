import { NhostClient } from "@nhost/nextjs";

import { BACKEND_URL } from "utils/constants/env";

if (!BACKEND_URL) {
  throw new Error("BACKEND_URL is not defined");
}
const nhost = new NhostClient({
  backendUrl: BACKEND_URL as string,
});

export default nhost;
