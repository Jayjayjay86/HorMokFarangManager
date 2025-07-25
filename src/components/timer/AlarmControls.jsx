import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { AlarmControlStyles as styles } from '../../styles/Styles';
import { Theme } from '../../styles/Theme';
const AlarmControls = ({
  alarmMinutes,
  setAlarmMinutes,
  setAlarmTime,
  setIsRunning,
  alarmTriggered,
}) => {
  const [showInput, setShowInput] = React.useState(false);
  const [inputMinutes, setInputMinutes] = React.useState('');
  const calculateAlarmTime = mins => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + mins);
    return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };
  const setAlarm = () => {
    const mins = parseInt(inputMinutes, 10);
    if (mins > 0) {
      setAlarmMinutes(mins);
      setAlarmTime(calculateAlarmTime(mins));
      setIsRunning(true);
      alarmTriggered.current = false;
      setShowInput(false);
      setInputMinutes('');
      Keyboard.dismiss();
    }
  };
  return (
    <View style={styles.alarmControls}>
      {showInput ? (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Minutes"
            value={inputMinutes}
            onChangeText={setInputMinutes}
            autoFocus
          />
          <TouchableOpacity
            style={[styles.controlButton, styles.setButton]}
            onPress={setAlarm}>
            <Ionicons name="alarm" size={Theme.typography.icon} color={Theme.colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.cancelButton]}
            onPress={() => {
              setShowInput(false);
              Keyboard.dismiss();
            }}>
            <Ionicons name="close" size={Theme.typography.icon} color={Theme.colors.textLight} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.controlButton, styles.alarmButton]}
          onPress={() => setShowInput(true)}>
          <Ionicons
            name={alarmMinutes ? 'alarm' : 'alarm-outline'}
            size={Theme.typography.icon}
            color={Theme.colors.textLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};


export default AlarmControls;
