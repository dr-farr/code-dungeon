import { useForm } from "@mantine/form";
import {
  PasswordInput,
  Group,
  Button,
  Box,
  Title,
  Loader,
} from "@mantine/core";

import { useNhostAuth } from "@nhost/react-auth";

import { Fragment, useEffect } from "react";

import nhost, { useAuth } from "utils/nhost";
import { User } from "components/UserAccount";

function Login() {
  const { user, isLoading } = useAuth();
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
        <Title order={1}>Bash Quest</Title>

        <Group position="right" mt="md">
          <Button onClick={() => handleSubmit()} type="submit">
            Sign with Github
          </Button>
        </Group>
      </Box>
    </Fragment>
  );
}

export default Login;
