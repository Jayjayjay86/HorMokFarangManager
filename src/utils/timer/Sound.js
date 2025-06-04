import SoundPlayer from 'react-native-sound-player';

// Play alarm sound
export const playAlarmSound = () => {
  try {
    SoundPlayer.playSoundFile('alarm', 'mp3');
    SoundPlayer.setNumberOfLoops(-1);
  } catch (e) {
    console.log('Cannot play the sound file', e);
  }
};

// Stop alarm sound
export const stopAlarmSound = () => {
  try {
    SoundPlayer.stop();
  } catch (e) {
    console.log('Cannot stop the sound', e);
  }
};

export const removeAlarm = (setAlarmMinutes, setAlarmTime, alarmTriggered) => {
  setAlarmMinutes(null);
  setAlarmTime(null);
  alarmTriggered.current = false;
  stopAlarmSound();
};
