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
import {Theme} from '../../styles/Theme';

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
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

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

  // Rotation and pulse animations
  React.useEffect(() => {
    if (isRunning) {
      // Rotation animation
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();

      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      rotation.stopAnimation();
      pulseAnim.stopAnimation();
      rotation.setValue(0);
      pulseAnim.setValue(1);
    }
  }, [isRunning, rotation, pulseAnim]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const pulseInterpolation = pulseAnim.interpolate({
    inputRange: [1, 1.1],
    outputRange: [1, 1.1],
  });

  const formatTime = s => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const circleStyle = {
    transform: [{rotate: rotateInterpolation}, {scale: pulseInterpolation}],
    borderWidth: 6,
    borderLeftColor: Theme.colors.pastelBlue,
    borderTopColor: Theme.colors.pastelGreen,
    borderRightColor: Theme.colors.pastelPink,
    borderBottomColor: Theme.colors.pastelYellow,
    backgroundColor: Theme.colors.darkBackground,
    shadowColor: Theme.colors.pastelBlue,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  };

  return (
    <View style={styles.timerContainer}>
      <Animated.View style={[styles.circleProgress, circleStyle]}>
        {/* Position marker for rotation */}
        <View style={styles.positionMarker} />
      </Animated.View>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
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
            <Ionicons
              name="close-circle"
              size={Theme.typography.icon}
              color={Theme.colors.textLight}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.targetText}>Stopwatch Mode</Text>
      )}
    </View>
  );
};

export default TimerComponent;
