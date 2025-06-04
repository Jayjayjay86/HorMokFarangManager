
  // Format time as MM:SS
  export const formatTime = timeInSeconds => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  // Calculate alarm time
  export const calculateAlarmTime = minutes => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  };