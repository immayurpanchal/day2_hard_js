import { Button } from 'antd';
import { useEffect, useState } from 'react';
import './CountDownTimer.css'


const DEFAULT_TIME_IN_SEC = 5;
const TIME_KEY = 'timeInSec';

const CountDownTimer = () => {
  const [currentTime, setCurrentTime] = useState<number>(+localStorage.getItem(TIME_KEY) || DEFAULT_TIME_IN_SEC);
  const [isPaused, setPaused] = useState(true);

  useEffect(() => {
    const localStorageTime = localStorage.getItem(TIME_KEY)

    if (localStorageTime) {
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
    localStorage.setItem(TIME_KEY, JSON.stringify(currentTime))
    if (!currentTime) {
      setPaused(true);
    }
  }, [currentTime]);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  const onReset = () => { 
    localStorage.setItem(TIME_KEY, JSON.stringify(DEFAULT_TIME_IN_SEC)); 
    setCurrentTime(DEFAULT_TIME_IN_SEC);
    setPaused(true)
  }

  return (
    <div className='countdown-wrapper'>
      <div className='countdown-container'>
        <span className='minutes'>
          {`${minutes}`.padStart(2, "0")}
        </span>
        <span className='separator'>:</span>
        <span className='seconds'>
          {`${seconds}`.padStart(2, "0")}
        </span>
      </div>
      <div className='actions-container'>
        <Button
          onClick={() => setPaused(false)}
          type="primary"
          disabled={!currentTime}
        >
          Start
        </Button>
        <Button disabled={!currentTime} onClick={() => setPaused(true)}>Pause</Button>
        <Button danger type="primary" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
};

export default CountDownTimer;
