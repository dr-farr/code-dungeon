import React, { createContext, useState, useEffect, useMemo } from "react";
import { shuffle } from "utils/quiz";
import { useCompleteQuiz, useQuiz } from "controllers/quiz/hooks";
import { useUserData } from "@nhost/nextjs";
import { timeConverter } from "utils/quiz";
import { from } from "@apollo/client";
import useCountdownTimer from "hooks/useCountdownTimer";
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
  selectedOptions: any;
  setSelectedOptions: any;
  correctAnswers: any;

  minutes: any;
  seconds: any;
  setCategoryQuizes: any;
  categoryQuizes: any;
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
  selectedOptions: undefined,
  setSelectedOptions: undefined,
  correctAnswers: undefined,
  setCategoryQuizes: undefined,
  categoryQuizes: undefined,
  minutes: undefined,
  seconds: undefined,
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
  const [categoryQuizes, setCategoryQuizes] = useState([]);
  const [nextQuiz, setNextQuiz] = useState(undefined);

  const [answers, setAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState<null | number>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(null);

  const [offline, setOffline] = useState(false);

  const completeQuiz = useCompleteQuiz();

  const {
    data: quizData,
    error: quizDataError,
    loading: quizDataLoading,
  } = useQuiz(quizId);

  useMemo(() => {
    if (categoryQuizes?.length > 0) {
      console.log(categoryQuizes);
      const index = categoryQuizes?.findIndex(
        (quiz: any) => quiz?.id === data?.id
      );
      // const nextData = categoryQuizes[index + 1];
      // if (nextData) {
      //   console.log(nextData);
      //   setNextQuiz(nextData);
      // }
    }
  }, [categoryQuizes, data]);

  const loading = _loading || quizDataLoading;
  const error = _error || quizDataError;

  const startQuiz = async () => {
    setLoading(true);

    try {
      setData(quizData?.questions);
      setTimeout(() => {
        setCountdownTime(defaultCountdownTime);
        setIsQuizStarted(true);
        setLoading(false);
        startTimer();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const endQuiz = (resultData?: any) => {
    stopTimer();
    setLoading(true);

    try {
      setTimeout(async () => {
        setIsQuizStarted(false);
        setIsQuizCompleted(true);

        await completeQuiz({
          data: {
            quiz_id: quizData.id,
            answers: {
              data: [...answers],
            },
          },
        });
        setResultData(resultData);
        setAnswers([]);
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

  // const timeOver = () => {
  //   return endQuiz({
  //     timeTaken,
  //     answers,
  //   });
  // };

  const sum = (object: {}) =>
    Object.values(object)?.reduce(
      (prev: number, next: number) => prev + next,
      0
    ) as number;

  const totalTime = sum(countdownTime) * 1000;

  const [timerTime, setTimerTime] = useState(totalTime);

  const formattedTime = timeConverter(timerTime);
  const remainingTime = sum(formattedTime);

  const { minutes, seconds, start, stop, running } = useCountdownTimer();

  const stopTimer = () => {
    stop();
  };

  const startTimer = () => {
    start();
  };

  if (running && seconds === 0 && minutes === 0) {
    endQuiz();
  }

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
        selectedOptions,
        setSelectedOptions,
        correctAnswers,

        minutes,
        seconds,
        setCategoryQuizes,
        categoryQuizes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
export default QuizContext;
