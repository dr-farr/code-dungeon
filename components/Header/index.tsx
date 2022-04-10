import React, { useState } from "react";
import { Menu, Button } from "@mantine/core";

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

  let isAppInstalled = false;

  if (window.matchMedia("(display-mode: standalone)").matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    // setPromptEvent(e);
  });

  const installApp = () => {
    // promptEvent.prompt();
    // promptEvent.userChoice.then((result) => {
    //   if (result.outcome === "accepted") {
    //     setAppAccepted(true);
    //     console.log("User accepted the A2HS prompt");
    //   } else {
    //     console.log("User dismissed the A2HS prompt");
    //   }
    // });
  };

  return (
    <Menu>
      <Menu.Item>
        <h1 style={{ color: "#2185D0" }}>Code Dungeon</h1>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
