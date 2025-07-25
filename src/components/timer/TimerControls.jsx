import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {stopAlarmSound} from '../../utils/timer/Sound';
import {TimerControlStyles as styles} from '../../styles/Styles';
import {Theme} from '../../styles/Theme';
const TimerControls = ({
  setIsRunning,
  alarmTriggered,
  isRunning,
  setSeconds,
  seconds,
}) => {
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    alarmTriggered.current = false;
    stopAlarmSound();
  };
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
    if (!isRunning) {
      alarmTriggered.current = false;
    }
  };
  const goAgain = () => {
    resetTimer();
    setIsRunning(true);
  };
  return (
    <View style={styles.controls}>
      <TouchableOpacity
        style={[
          styles.controlButton,
          isRunning ? styles.pauseButton : styles.startButton,
        ]}
        onPress={toggleTimer}>
        <Ionicons name={isRunning ? 'pause' : 'play'} size={Theme.typography.icon} color={Theme.colors.textLight} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.controlButton, styles.resetButton]}
        onPress={resetTimer}>
        <Ionicons
          name="stop"
          size={Theme.typography.largeTitle}
          color={Theme.colors.pastelMint}
        />
      </TouchableOpacity>

      {!isRunning && seconds > 0 && (
        <TouchableOpacity
          style={[styles.controlButton, styles.goAgainButton]}
          onPress={goAgain}>
          <Ionicons
            name="refresh"
            size={Theme.typography.largeTitle}
            color={Theme.colors.textLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TimerControls;
