import React, { createContext, useState, useEffect } from "react";
import { shuffle } from "utils/quiz";
import { useCompleteQuiz, useQuiz } from "controllers/quiz/hooks";
import { useUserData } from "@nhost/nextjs";
import { timeConverter } from "utils/quiz";

interface IContextProps {
  isQuizStarted: any;
  countdownTime: any;
  startQuiz: any;
  loading: any;
  setLoading: any;
  isQuizCompleted: any;
  resultData: any;
  replayQuiz: any;
  endQuiz: any;
  resetQuiz: any;
  error: any;
  data: any;
  setData: any;
  quiz: any;
  setQuizId: any;
  answers: any;
  setAnswers: any;
  timeTaken: any;
  setTimeTaken: any;
  setCorrectAnswers: any;
  userSlectedAns: any;
  setUserSlectedAns: any;
  correctAnswers: any;
  timeOver: any;
  timer: any;
  setNumOfQuestions: any;
  numOfQuestions: any;
}

const QuizContext = createContext<IContextProps>({
  isQuizStarted: undefined,
  countdownTime: undefined,
  startQuiz: undefined,
  setLoading: undefined,
  loading: undefined,
  isQuizCompleted: undefined,
  resultData: undefined,
  replayQuiz: undefined,
  resetQuiz: undefined,
  endQuiz: undefined,
  error: undefined,
  data: undefined,
  setData: undefined,
  quiz: undefined,
  setQuizId: undefined,
  answers: undefined,
  setAnswers: undefined,
  timeTaken: undefined,
  setTimeTaken: undefined,
  setCorrectAnswers: undefined,
  userSlectedAns: undefined,
  setUserSlectedAns: undefined,
  correctAnswers: undefined,
  timeOver: undefined,
  timer: undefined,
  setNumOfQuestions: undefined,
  numOfQuestions: undefined,
});

export const QuizProvider = ({ children }) => {
  const [_error, setError] = useState(null);
  const [_loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const defaultCountdownTime = {
    hours: 0,
    minutes: 120,
    seconds: 0,
  };
  const [countdownTime, setCountdownTime] = useState(defaultCountdownTime);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [quizId, setQuizId] = useState(null);

  const [category, setCategory] = useState("0");
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("0");
  const [questionsType, setQuestionsType] = useState("0");
  const [answers, setAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);

  const [offline, setOffline] = useState(false);

  const {
    data: quizData,
    error: quizDataError,
    loading: quizDataLoading,
  } = useQuiz({ id: { _eq: quizId } });

  const loading = _loading || quizDataLoading;
  const error = _error || quizDataError;

  const user = useUserData();

  const completeQuiz = useCompleteQuiz();

  const startQuiz = async () => {
    setLoading(true);
    setCountdownTime(defaultCountdownTime);
    await fetchData();
    setTimeout(() => {
      setIsQuizStarted(true);
      setLoading(false);
    }, 1000);
  };

  const endQuiz = (resultData) => {
    setLoading(true);

    try {
      setTimeout(() => {
        setIsQuizStarted(false);
        setIsQuizCompleted(true);

        completeQuiz({
          data: { quiz_id: quizData.id, user_id: user?.id },
        });
        setResultData(resultData);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError(error);
    }
  };

  const replayQuiz = () => {
    setLoading(true);

    const shuffledData = shuffle(data);
    shuffledData.forEach((element) => {
      element.options = shuffle(element.options);
    });

    setData(shuffledData);

    setTimeout(() => {
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  const resetQuiz = () => {
    setLoading(true);

    setTimeout(() => {
      setData(null);
      setCountdownTime(defaultCountdownTime);
      setIsQuizStarted(false);
      setIsQuizCompleted(false);
      setResultData(null);
      setLoading(false);
    }, 1000);
  };

  const timeOver = () => {
    return endQuiz({
      totalQuestions: data?.length,
      correctAnswers,
      timeTaken,
      answers,
    });
  };

  const fetchData = async () => {
    setLoading(true);

    if (error) {
      setError(null);
    }

    const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    try {
      const response = await fetch(API);
      const data = await response.json();

      const { response_code, results: question } = data;

      if (response_code === 1) {
        const message = (
          <p>
            The API doesnt have enough questions for your query. (Ex. Asking for
            50 Questions in a Category that only has 20.)
            <br />
            <br />
            Please change the <strong>No. of Questions</strong>,{" "}
            <strong>Difficulty Level</strong>, or{" "}
            <strong>Type of Questions</strong>.
          </p>
        );

        setLoading(false);
        //@ts-ignore
        setError(message);

        return;
      }

      setData(
        question.map((el) => {
          el.options = shuffle([el.correct_answer, ...el.incorrect_answers]);
          return el;
        })
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const sum = (object: {}) =>
    Object.values(object)?.reduce(
      (prev: number, next: number) => prev + next,
      0
    ) as number;

  const totalTime = sum(countdownTime) * 1000;

  const [timerTime, setTimerTime] = useState(totalTime);

  const formattedTime = timeConverter(timerTime);
  const remainingTime = sum(formattedTime);

  useEffect(() => {
    if (remainingTime === 0) {
      timeOver();
    }
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      //@ts-ignore
      setTimeTaken(totalTime - timerTime + 1000);
    };

    // eslint-disable-next-line
  }, [timerTime]);

  return (
    <QuizContext.Provider
      value={{
        startQuiz,
        endQuiz,
        resetQuiz,
        replayQuiz,
        resultData,
        isQuizCompleted,
        isQuizStarted,
        error,
        countdownTime,
        loading,
        setLoading,
        data,
        setData,
        quiz: quizData,
        setQuizId,
        answers,
        setAnswers,
        timeTaken,
        setTimeTaken,
        setCorrectAnswers,
        userSlectedAns,
        setUserSlectedAns,
        correctAnswers,
        timeOver,
        timer: formattedTime,
        setNumOfQuestions,
        numOfQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export default QuizContext;
