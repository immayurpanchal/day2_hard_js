import { Button } from 'antd';
import { FC } from 'react';
import CountDownTimer from './Components/CountDownTimer';

import './style.css';

export const App: FC= () => {
  return (
    <div>
      <CountDownTimer time={340} />
      <div>
        <Button>5 minutes</Button>
      </div>
    </div>
  );
};
