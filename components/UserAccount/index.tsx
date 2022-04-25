import React from "react";
import { useAuthenticated, useUserData } from "@nhost/nextjs";
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  useMantineTheme,
  Button,
  Menu,
} from "@mantine/core";
import nhost from "utils/nhost";
import Link from "next/link";
import { useRouter } from "next/router";

export default function User() {
  const user = useUserData();
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Menu
      control={
        <UnstyledButton
          sx={{
            display: "block",
            width: "100%",
            padding: theme.spacing.xl,
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
                Level 3{" "}
                <Link
                  passHref
                  href="https://user-images.githubusercontent.com/78376735/162839437-7bea91c7-be0a-4d35-b2b9-89cb239b0a07.jpeg"
                >
                  <i>Mage Toad</i>
                </Link>
              </Text>
            </Box>
          </Group>
        </UnstyledButton>
      }
    >
      {/* <Menu.Item
        sx={{
          padding: theme.spacing.xs,
        }}
      >
        <Text weight={500}>Settings</Text>
      </Menu.Item> */}
      <Menu.Item
        sx={{
          padding: theme.spacing.xs,
        }}
      >
        <Text
          onClick={() => {
            nhost.auth.signOut();
            router.push("/");
          }}
          weight={500}
        >
          Signout{" "}
        </Text>
      </Menu.Item>
    </Menu>
  );
}
