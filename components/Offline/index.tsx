import React from "react";
import { Container, Grid, Header } from "@mantine/core";

const Offline = () => {
  window.addEventListener("online", () => window.location.reload());

  return (
    <Container>
      <Grid>
        <h1>Offline</h1>
        <p>
          There is no Internet connection. Well try to reload automatically once
          youre back online!{" "}
          <span role="img" aria-label="signal">
            📶
          </span>
        </p>
      </Grid>
    </Container>
  );
};

export default Offline;
