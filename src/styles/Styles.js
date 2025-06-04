import {Dimensions, StyleSheet, Platform} from 'react-native';

// -------------------------------------------------------
//   G L O B A L    S T Y L E S :
// -------------------------------------------------------

const {width} = Dimensions.get('window');

const circleSize = Math.min(width * 0.6, 250);

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

// -------------------------------------------------------
//   T I M E R    S T Y L E S :
// -------------------------------------------------------

export const TimerStyles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  circleProgress: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 40,
    fontWeight: '200',
    color: '#333',
    fontFamily: 'monospace',
  },
  alarmInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  targetText: {
    fontSize: 14,
    color: '#666',
  },
});

// -------------------------------------------------------
//   T I M E R   C O N T R O L   S T Y L E S :
// -------------------------------------------------------

export const TimerControlStyles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  controlButton: {
    padding: 12,
    borderRadius: 30,
    marginHorizontal: 8,
    marginVertical: 5,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#607D8B',
  },
  goAgainButton: {
    backgroundColor: '#FF9800',
  },
});

// -------------------------------------------------------
//   A L A R M   C O N T R O L   S T Y L E S :
// -------------------------------------------------------

export const AlarmControlStyles = StyleSheet.create({
  controlButton: {
    padding: 12,
    borderRadius: 30,
    marginHorizontal: 8,
    marginVertical: 5,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  alarmButton: {
    backgroundColor: '#2196F3',
  },
  setButton: {
    backgroundColor: '#FF6D00',
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
    marginLeft: 10,
  },
  alarmControls: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    padding: 10,
    width: 120,
    backgroundColor: 'white',
    textAlign: 'center',
  },
});

// -------------------------------------------------------
//   C H E C K L I S T   V I E W E R
// -------------------------------------------------------

export const CheckListViewerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  completionBanner: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  completionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// -------------------------------------------------------
//   C H E C K L I S T   I T E M
// -------------------------------------------------------

export const CheckListItemStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#B0BEC5',
    minHeight: 48,
  },
  disabledRow: {
    opacity: 0.5,
  },
  rowPressed: {
    opacity: 0.6,
  },
  statusIndicatorContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSymbol: {
    textAlign: 'center',
    color: '#B0BEC5',
  },
  disabled: {
    color: '#9E9E9E',
  },
  available: {
    color: '#4CAF50', // Green for available items
  },
  used: {
    color: '#FF6D00', // Orange for used items
  },
  itemText: {
    flex: 1,
    color: '#37474F',
  },
  disabledText: {
    color: '#9E9E9E',
  },
  quantityText: {
    fontSize: 12,
    color: '#757575',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  availableText: {
    color: '#4CAF50', // Green text for available items
  },
  usedText: {
    color: '#FF6D00', // Orange text for used items
  },
});
