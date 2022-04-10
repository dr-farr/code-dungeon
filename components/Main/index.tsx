// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import {
//   Container,
//   Divider,
//   Button,
//   Group,
//   Grid,
//   Alert,
//   Select,
// } from "@mantine/core";

// import {
//   CATEGORIES,
//   NUM_OF_QUESTIONS,
//   DIFFICULTY,
//   QUESTIONS_TYPE,
//   COUNTDOWN_TIME,
// } from "utils/constants";
// import { shuffle } from "utils/quiz";

// import Offline from "components/Offline";

// const Main = ({ startQuiz }) => {
//   const [category, setCategory] = useState("0");
//   const [numOfQuestions, setNumOfQuestions] = useState(5);
//   const [difficulty, setDifficulty] = useState("0");
//   const [questionsType, setQuestionsType] = useState("0");
//   const [countdownTime, setCountdownTime] = useState({
//     hours: 0,
//     minutes: 120,
//     seconds: 0,
//   });
//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState<any>(null);
//   const [offline, setOffline] = useState(false);

//   const handleTimeChange = (e, { name, value }) => {
//     setCountdownTime({ ...countdownTime, [name]: value });
//   };

//   let allFieldsSelected = false;
//   if (
//     category &&
//     numOfQuestions &&
//     difficulty &&
//     questionsType &&
//     (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
//   ) {
//     allFieldsSelected = true;
//   }

//   if (offline) return <Offline />;

//   return (
//     <Container>
//       <Group>
//         <Grid>
//           <Grid.Col>
//             <h1>The Ultimate Trivia Quiz</h1>
//           </Grid.Col>
//           {error && <Alert color="red">{error?.message}</Alert>}
//           <Divider />
//           {/* <Grid.Col>
//             <Select
//               fluid
//               selection
//               name="category"
//               placeholder="Select Quiz Category"
//               header="Select Quiz Category"
//               options={CATEGORIES}
//               value={category}
//               // onChange={(e, { value }) => setCategory(value)}
//               disabled={processing}
//             />
//             <br />
//             <Select
//               fluid
//               selection
//               name="numOfQ"
//               placeholder="Select No. of Questions"
//               header="Select No. of Questions"
//               options={NUM_OF_QUESTIONS}
//               value={numOfQuestions}
//               onChange={(e, { value }) => setNumOfQuestions(value)}
//               disabled={processing}
//             />
//             <br />
//             <Select
//               fluid
//               selection
//               name="difficulty"
//               placeholder="Select Difficulty Level"
//               header="Select Difficulty Level"
//               options={DIFFICULTY}
//               value={difficulty}
//               onChange={(e, { value }) => setDifficulty(value)}
//               disabled={processing}
//             />
//             <br />
//             <Select
//               fluid
//               selection
//               name="type"
//               placeholder="Select Questions Type"
//               header="Select Questions Type"
//               options={QUESTIONS_TYPE}
//               value={questionsType}
//               onChange={(e, { value }) => setQuestionsType(value)}
//               disabled={processing}
//             />
//             <br />
//             <Select
//               search
//               selection
//               name="hours"
//               placeholder="Select Hours"
//               header="Select Hours"
//               options={COUNTDOWN_TIME.hours}
//               value={countdownTime.hours}
//               onChange={handleTimeChange}
//               disabled={processing}
//             />
//             <Select
//               search
//               selection
//               name="minutes"
//               placeholder="Select Minutes"
//               header="Select Minutes"
//               data={COUNTDOWN_TIME.minutes}
//               value={countdownTime.minutes}
//               onChange={handleTimeChange}
//               disabled={processing}
//             />
//             <Select
//               search
//               selection
//               name="seconds"
//               placeholder="Select Seconds"
//               header="Select Seconds"
//               data={COUNTDOWN_TIME.seconds}
//               value={countdownTime.seconds}
//               onChange={handleTimeChange}
//               disabled={processing}
//             />
//           </Grid.Col> */}
//           <Divider />
//           <Grid.Col>
//             <Button
//               onClick={fetchData}
//               disabled={!allFieldsSelected || processing}
//             >
//               {processing ? "Processing..." : "Play Now"}
//             </Button>
//           </Grid.Col>
//         </Grid>
//       </Group>
//       <br />
//     </Container>
//   );
// };

// Main.propTypes = {
//   startQuiz: PropTypes.func.isRequired,
// };

// export default Main;

import React from "react";

export default function index() {
  return <div>index</div>;
}
