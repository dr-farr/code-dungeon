import React from "react";

import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  Menu,
} from "@mantine/core";
import nhost, { useAuth } from "utils/nhost";

const Button = () => {
  const theme = useMantineTheme();
  const auth = useAuth();

  let user = auth?.user ?? undefined;
  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar src={user?.avatarUrl} radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user?.displayName}
            </Text>
            <Text color="dimmed" size="xs">
              Level 69 Bitch
              {/* {user?.email} */}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  );
};

export default function User() {
  return (
    <Menu control={<Button />}>
      <Menu.Item>
        <Text
          onClick={() => {
            nhost.auth.signOut();
          }}
          size="sm"
          weight={500}
        >
          Signout{" "}
        </Text>
      </Menu.Item>
    </Menu>
  );
}
