import {
  Group,
  Button,
  Box,
  Title,
  Container,
  Grid,
  createStyles,
  Center,
} from "@mantine/core";
import Image from "next/image";

import nhost from "utils/nhost";

const useStyles = createStyles((theme) => ({
  root: {
    width: "50vw",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    "& > img": {
      width: "100%",
    },
  },
  logo: {
    backgroundColor: theme.colors.primary,
  },
  button: {
    cursor: "pointer",
  },
}));

function Login() {
  const { classes } = useStyles();
  const handleSubmit = async () => {
    const signInResponse = await nhost.auth.signIn({
      provider: "github",
    });

    if (signInResponse.error) {
      throw signInResponse.error;
    }
  };

  return (
    <Container className={classes.root}>
      <Grid gutter="xl">
        <Grid.Col xs={12}>
          <Center>
            <Image
              className={classes.logo}
              width="700"
              height="120"
              src="/assets/logo.png"
              alt="Code Dungeon"
            />
          </Center>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Center>
            <Image
              className={classes.button}
              onClick={() => handleSubmit()}
              width="416"
              height="71"
              src="/assets/login-button.png"
              alt="Login with Github"
            />
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Login;