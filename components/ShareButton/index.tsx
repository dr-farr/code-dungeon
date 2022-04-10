import React, { Fragment } from "react";
import { Button, Modal, Title } from "@mantine/core";

const ShareButton = () => {
  const handleClick = () => {
    navigator
      .share({
        title: document.title,
        text: "Check out this quiz app — it rocks!",
        url: "https://safdarjamal.github.io/quiz-app/",
      })
      .then(() => console.log("Successfully shared"))
      .catch((error) => console.log(error.message));
  };

  return (
    <Fragment>
      <Button onClick={handleClick}>Share</Button>) : (
      <Modal
        onClose={() => {}}
        opened={true}
        size="tiny"
        // trigger={
        //   <Button
        //     title="Share"
        //     floated="right"
        //     circular
        //     icon="share alternate"
        //   />
        // }
      >
        <Title className="ui center aligned">Share on</Title>
        <Title className="ui center aligned container">
          <a
            href="https://www.facebook.com/sharer.php?u=https%3A//safdarjamal.github.io/quiz-app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="facebook" style={{ marginBottom: 8 }}>
              Facebook
            </Button>
          </a>
          <a
            href="https://twitter.com/intent/tweet?url=https%3A//safdarjamal.github.io/quiz-app/&text=Check%20out%20this%20quiz%20app%20—%20it%20rocks!&via=_safdarjamal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="twitter" style={{ marginBottom: 8 }}>
              Twitter
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fsafdarjamal.github.io%2Fquiz-app%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="linkedin">LinkedIn</Button>
          </a>
        </Title>
      </Modal>
    </Fragment>
  );
};

export default ShareButton;
