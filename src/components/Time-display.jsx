import { useState, useEffect } from "react";

export default function TimeDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

const timeString = time.toLocaleTimeString("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
const [hour, minute, second] = timeString.split(":");


  return (
    <p dir="ltr">
      {`${hour} : ${minute} : ${second}`}
    </p>
  );
}
