import React, { useEffect, useState } from 'react';

interface Props {
  initialSeconds: number;
  onTimerComplete: () => void;
}

const OtpTimer: React.FC<Props> = ({ initialSeconds, onTimerComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      onTimerComplete();
    }
  }, [seconds, onTimerComplete]);

  return (
    <span className=' ml-1 font-semibold text-blue-500'>
      Please wait {seconds} seconds
    </span>
  );
};

export default OtpTimer;
