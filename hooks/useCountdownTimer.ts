import dayjs from "dayjs";
import { useEffect, useState } from "react";

const defaultDate = dayjs().add(0.2, "minutes").toDate();
const useCountdown = (targetDate?: any) => {
  const countDownDate = new Date(targetDate ?? defaultDate).getTime();
  const [isRunning, setIsRunning] = useState(false);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDownDate, isRunning]);

  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {
    start,
    stop,
    minutes,
    seconds,
    running: isRunning,
  };
};

export default useCountdown;
