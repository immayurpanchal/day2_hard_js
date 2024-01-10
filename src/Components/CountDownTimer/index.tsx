import { Button } from 'antd';
import { useEffect, useState } from 'react';

type CountDownProps = {
  time?: number;
};

const CountDownTimer = (props: CountDownProps) => {
  const { time = 0 } = props;
  const [currentTime, setCurrentTime] = useState(time);
  const [isPaused, setPaused] = useState(true);

  useEffect(() => {
    const localStorageTime = localStorage.getItem('timeInSec')
    if(localStorageTime){
      setCurrentTime(+localStorageTime)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    localStorage.setItem('timeInSec', JSON.stringify(currentTime))
    if (!currentTime) {
      setPaused(true);
    }
  }, [currentTime]);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  return (
    <div>
      <span>
        {minutes}:{seconds}
      </span>
      <Button
        onClick={() => {
          setPaused(false);
        }}
      >
        Start
      </Button>
      <Button onClick={() => setPaused(true)}>Pause</Button>
      <Button>Reset</Button>
    </div>
  );
};

export default CountDownTimer;
