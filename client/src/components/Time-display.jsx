import { useState, useEffect } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    <div className="flex items-center gap-x-1">
      <p dir="ltr" className="font-sahel w-19">
        {`${hour} : ${minute} : ${second}`} 
      </p>
      <AccessTimeIcon fontSize="small"/>
    </div>
  );
}
