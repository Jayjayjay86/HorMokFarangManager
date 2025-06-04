import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  Easing,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  removeAlarm,
  playAlarmSound,
  stopAlarmSound,
} from '../../utils/timer/Sound';
import {TimerStyles as styles} from '../../styles/Styles';
const TimerComponent = ({
  isRunning,
  alarmTriggered,
  setAlarmTime,
  alarmTime,
  alarmMinutes,
  setAlarmMinutes,
  seconds,
  setSeconds,
}) => {
  const rotation = React.useRef(new Animated.Value(0)).current;

  // Timer tick
  React.useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const updated = prev + 1;

          if (
            alarmMinutes &&
            updated >= alarmMinutes * 60 &&
            !alarmTriggered.current
          ) {
            alarmTriggered.current = true;
            playAlarmSound();
            Alert.alert(
              'Alarm!',
              `Your ${alarmMinutes} minute alarm has finished!`,
              [{text: 'OK', onPress: stopAlarmSound}],
            );
          }

          return updated;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, alarmMinutes, alarmTriggered, setSeconds]);

  // Rotation animation
  React.useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation.stopAnimation();
      rotation.setValue(0);
    }
  }, [isRunning, rotation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = s => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const circleStyle = {
    transform: [{rotate: rotateInterpolation}],
    borderColor: alarmMinutes ? '#FF6D00' : '#FFD1DC',
  };
  return (
    <View style={styles.timerContainer}>
      <Animated.View style={[styles.circleProgress, circleStyle]}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </Animated.View>

      {alarmMinutes ? (
        <View style={styles.alarmInfo}>
          <Text style={styles.targetText}>
            Alarm set for {alarmMinutes} min
          </Text>
          <Text style={styles.targetText}>Will trigger @ {alarmTime}</Text>
          <TouchableOpacity
            onPress={() =>
              removeAlarm(setAlarmMinutes, setAlarmTime, alarmTriggered)
            }>
            <Ionicons name="close-circle" size={24} color="#F44336" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.targetText}>Stopwatch Mode</Text>
      )}
    </View>
  );
};

export default TimerComponent;
