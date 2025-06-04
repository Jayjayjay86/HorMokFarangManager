import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import TimerControls from '../components/timer/TimerControls';
import AlarmControls from '../components/timer/AlarmControls';
import TimerComponent from '../components/timer/TimerComponent';
import {GlobalStyles as styles} from '../styles/Styles';
const AlarmTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmMinutes, setAlarmMinutes] = useState(null);
  const [alarmTime, setAlarmTime] = useState(null);
  const alarmTriggered = useRef(false);

  return (
    <View style={styles.container}>
      <TimerComponent
        isRunning={isRunning}
        alarmTriggered={alarmTriggered}
        setAlarmTime={setAlarmTime}
        alarmTime={alarmTime}
        alarmMinutes={alarmMinutes}
        setAlarmMinutes={setAlarmMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
      />
      <TimerControls
        setIsRunning={setIsRunning}
        alarmTriggered={alarmTriggered}
        isRunning={isRunning}
        seconds={seconds}
        setSeconds={setSeconds}
      />
      <AlarmControls
        alarmMinutes={alarmMinutes}
        setAlarmMinutes={setAlarmMinutes}
        setAlarmTime={setAlarmTime}
        setIsRunning={setIsRunning}
        alarmTriggered={alarmTriggered}
      />
    </View>
  );
};

export default AlarmTimer;
