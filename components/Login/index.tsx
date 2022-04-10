import { Group, Button, Box, Title } from "@mantine/core";
import Image from "next/image";
import { Fragment } from "react";

import nhost from "utils/nhost";

function Login() {
  const handleSubmit = async () => {
    const signInResponse = await nhost.auth.signIn({
      provider: "github",
    });

    if (signInResponse.error) {
      throw signInResponse.error;
    }
  };

  return (
    <Fragment>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <Group position="right" mt="md">
          <Image
            width="416"
            height="71"
            src="/assets/logo.png"
            alt="Code Dungeon"
          />
          <Button onClick={() => handleSubmit()} type="submit">
            Continue with Github
          </Button>
        </Group>
      </Box>
    </Fragment>
  );
}

export default Login;
