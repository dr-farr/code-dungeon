import React from "react";
import { Group, AppShell, Header, createStyles } from "@mantine/core";
import User from "components/UserAccount";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    border: 0,
  },
}));

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={100} className={classes.root}>
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Image
              width="416"
              height="71"
              src="/assets/logo.png"
              alt="Code Dungeon"
            />
            <User />
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
