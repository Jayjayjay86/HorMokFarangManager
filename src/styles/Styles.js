import {Dimensions, StyleSheet, Platform} from 'react-native';
import {Theme} from './Theme';
// -------------------------------------------------------
//   G L O B A L    S T Y L E S :
// -------------------------------------------------------

const {width} = Dimensions.get('window');

const circleSize = Math.min(width * 0.4, 250);

export const GlobalStyles = StyleSheet.create({
  appContainer: {
    flex: Theme.flex.on,
    backgroundColor: Theme.colors.background,
  },
});
// -------------------------------------------------------
//   A P P    S T Y L E S :
// -------------------------------------------------------
export const appStyles = StyleSheet.create({
  header: {
    backgroundColor: Theme.colors.background,
    paddingVertical: Theme.spacing.xxs,
    justifyContent: 'space-evenly',
    elevation: 3,
    flexDirection: 'row',
  },
  headerLeft: {
    paddingVertical: Theme.spacing.md,

    elevation: 3,
    flexDirection: 'row',
  },
  headerRight: {
    paddingVertical: Theme.spacing.md,

    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Theme.colors.primary,
    fontSize: Theme.typography.display,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System',
  },
  headerTitleBlue: {
    color: Theme.colors.secondary,
    fontSize: Theme.typography.display,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'openSans',
  },
});

export const tabStyles = StyleSheet.create({
  tabContent: {
    flex: Theme.flex.on,
    padding: Theme.spacing.lg,
  },
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Theme.spacing.sm,
    backgroundColor: Theme.colors.backgroundDark,
  },
  tabButton: {
    alignItems: 'center',
    padding: Theme.spacing.xs,
  },
  activeTab: {},
  tabButtonText: {
    fontSize: Theme.typography.md,
    color: Theme.colors.textMuted,
    marginTop: Theme.spacing.xs,
  },
  activeTabText: {
    color: Theme.colors.primary,
    fontWeight: 'bold',
  },
});
// -------------------------------------------------------
//   T I M E R    S T Y L E S :
// -------------------------------------------------------

export const TimerStyles = StyleSheet.create({
  timerContainer: {
    flex: Theme.flex.on,
    backgroundColor: Theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.md,
  },
  circleProgress: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: Theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: Theme.typography.display,
    fontWeight: '200',
    color: Theme.colors.textMuted,
    fontFamily: 'monospace',
  },
  alarmInfo: {
    alignItems: 'center',
    marginTop: Theme.spacing.md,
  },
  targetText: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  positionMarker: {
    position: 'absolute',
    top: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Theme.colors.pastelRed,
    shadowColor: Theme.colors.pastelRed,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },

});

export const TimerControlStyles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Theme.spacing.xl,
    flexWrap: 'wrap',
  },
  controlButton: {
    padding: Theme.spacing.md,
    borderRadius: Theme.borders.radius.xl,
    marginHorizontal: Theme.spacing.sm,
    marginVertical: Theme.spacing.xs,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: Theme.colors.pastelBlue,
    borderRadius: Theme.borders.radius.circle,
  },
  pauseButton: {
    backgroundColor: Theme.colors.paleGreen,
    borderRadius: Theme.borders.radius.circle,
  },
  resetButton: {
    backgroundColor: Theme.colors.paleRed,
    borderRadius: Theme.borders.radius.circle,
  },
  goAgainButton: {
    backgroundColor: Theme.colors.paleBlue,
    borderRadius: Theme.borders.radius.circle,
  },
});

export const AlarmControlStyles = StyleSheet.create({
  controlButton: {
    padding: Theme.spacing.xs,
    borderRadius: Theme.borders.radius.xl,
    marginHorizontal: Theme.spacing.sm,
    marginVertical: Theme.spacing.md,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alarmButton: {
    backgroundColor: Theme.colors.paleOrange,
    borderRadius: Theme.borders.radius.circle,
  },
  setButton: {
    backgroundColor: Theme.colors.pastelOrange,
    marginLeft: Theme.spacing.md,
    borderRadius: Theme.borders.radius.circle,
  },
  cancelButton: {
    backgroundColor: Theme.colors.paleRed,
    marginLeft: Theme.spacing.md,
    borderRadius: Theme.borders.radius.circle,
  },
  alarmControls: {
    width: '100%',
    marginBottom: Theme.spacing.lg,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.lightBrown,
    borderRadius: Theme.borders.radius.xl,
    padding: Theme.spacing.md,
    width: 120,
    backgroundColor: Theme.colors.textLight,
    textAlign: 'center',
  },
});

// -------------------------------------------------------
//   C H E C K L I S T   V I E W E R
// -------------------------------------------------------

export const CheckListViewerStyles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },

  completionBanner: {
    position: 'absolute',
    bottom: Theme.spacing.xl,
    left: Theme.spacing.xl,
    right: Theme.spacing.xl,
    backgroundColor: Theme.colors.success,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borders.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  completionText: {
    color: Theme.colors.textLight,
    fontSize: Theme.typography.subheader,
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
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Theme.colors.borderDark,
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
    marginRight: Theme.spacing.md,
  },
  checkboxSymbol: {
    textAlign: 'center',
    color: Theme.colors.textMuted,
  },
  disabled: {
    color: Theme.colors.primaryDark,
  },
  available: {
    color: Theme.colors.primary,
  },
  used: {
    color: Theme.colors.success,
  },
  itemText: {
    flex: Theme.flex.on,
    color: Theme.colors.textMuted,
  },
  disabledText: {
    color: Theme.colors.primaryDark,
  },
  quantityText: {
    fontSize: Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  availableText: {
    color: Theme.colors.primary,
  },
  usedText: {
    color: Theme.colors.success,
  },
});

// -------------------------------------------------------
//   R E C I P E     C A L C.
// -------------------------------------------------------

export const recipeCalculatorStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flex: Theme.flex.on,
    backgroundColor: Theme.colors.background,
    padding: Theme.spacing.sm,
  },
  scrollContent: {
    borderColor: Theme.colors.primary,
    borderWidth: Theme.borders.width.thick,
    borderRadius: Theme.borders.radius.sm,
    paddingBottom: Theme.spacing.xxxl,
    paddingTop: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.xs,
  },
  costSummary: {
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borders.radius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
    elevation: Theme.elevation.low.elevation,
  },
  costSummaryContainer: {
    marginVertical: Theme.spacing.md,
    padding: Theme.spacing.md,
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borders.radius.md,
    borderColor: Theme.colors.borderDark,
    borderWidth: Theme.borders.width.regular,
    alignItems: 'center',
  },

  costSummaryText: {
    fontSize: Theme.typography.subheader,
    color: Theme.colors.paleRed,
    fontWeight: '600',
  },

  costValue: {
    fontSize: Theme.typography.header,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginTop: Theme.spacing.sm,
  },
  summaryTitle: {
    fontSize: Theme.typography.subheader,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.md,
    color: Theme.colors.textMuted,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  portionsControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: Theme.flex.on,
  },
  portionsButton: {
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.xl,
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.paleRed,
    marginHorizontal: Theme.spacing.xs,
  },
  recipeTitle: {
    fontSize: Theme.typography.header,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginHorizontal: Theme.spacing.md,
    flex: Theme.flex.on,
  },
  portionTitle: {
    fontSize: Theme.typography.body,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginHorizontal: Theme.spacing.md,
  },
  updateButtonContainer: {
    backgroundColor: Theme.colors.brown,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.sm,
    minWidth: 120,
  },
  updateButtonText: {
    color: Theme.colors.textLight,
    fontWeight: 'bold',
    fontSize: Theme.typography.body,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: Theme.borders.width.regular,
    borderBottomColor: Theme.colors.lightBrown,
    marginBottom: Theme.spacing.sm,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    flex: Theme.flex.on,
    textAlign: 'center',
    fontSize: Theme.typography.body,
    color: Theme.colors.text,
  },
  recipeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: Theme.borders.width.thick,
    borderBottomColor: Theme.colors.borderDark,
    marginBottom: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xs,
  },
  flex1: {
    flex: Theme.flex.half,
    textAlign: 'center',
  },
  ingredientName: {
    fontSize: Theme.typography.caption,
    color: Theme.colors.text,
    fontWeight: '600',
    padding: Theme.spacing.xs,
  },
  input: {
    borderWidth: Theme.borders.width.regular,
    borderRadius: Theme.borders.radius.sm,
    padding: Theme.spacing.xxs,
    marginHorizontal: Theme.spacing.xxs,
    fontSize: Theme.typography.caption,
    textAlign: 'center',
    minHeight: 40,
    fontWeight: '600',
  },
  calculatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calcTextButton: {
    textAlign: 'center',
    fontSize: Theme.typography.largeTitle,
    margin: Theme.spacing.md,
    color: Theme.colors.text,
    borderWidth: Theme.borders.width.thin,
    borderRadius: Theme.borders.radius.md,
    backgroundColor: Theme.colors.pastelBlue,
  },
  portionsInput: {
    flex: Theme.flex.over,
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.lightBrown,
    borderRadius: Theme.borders.radius.sm,
    padding: Theme.spacing.md,
    marginRight: Theme.spacing.md,
    minWidth: 120,
  },
  picker: {
    flex: Theme.flex.over,
    height: 50,
    marginRight: Theme.spacing.md,
    minWidth: 150,
  },
  calculateButtonContainer: {
    backgroundColor: Theme.colors.paleRed,
    padding: Theme.spacing.md,
    borderRadius: Theme.borders.radius.sm,
    minWidth: 100,
    flex: Theme.flex.on,
  },
  calculateButtonText: {
    color: Theme.colors.textLight,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borders.radius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
    elevation: Theme.elevation.low.elevation,
  },
  resultsTitle: {
    fontSize: Theme.typography.subheader,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.sm,
    color: Theme.colors.primary,
  },
  resultsSubtitle: {
    fontSize: Theme.typography.body,
    fontWeight: 'bold',
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
    color: Theme.colors.text,
  },
  resultItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultItem: {
    fontSize: Theme.typography.body,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
    minWidth: 200,
  },
  resultItemCost: {
    fontSize: Theme.typography.body,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  totalCost: {
    fontSize: Theme.typography.subheader,
    fontWeight: 'bold',
    marginTop: Theme.spacing.md,
    color: Theme.colors.paleRed,
  },
});
//
// Sales Styles
//
export const salesStyles = StyleSheet.create({
  container: {
    flex: Theme.flex.on,
    backgroundColor: Theme.colors.background,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.textMuted,
  },
  saleAmounts: {
    alignItems: 'flex-end',
  },
  amountText: {
    color: Theme.colors.text,
    fontWeight: 'bold',
  },
  costText: {
    color: Theme.colors.paleRed,
    fontWeight: 'bold',
  },
  profitText: {
    color: Theme.colors.success,
    fontWeight: 'bold',
  },
  totalSummary: {
    paddingVertical: Theme.spacing.md,
    borderTopWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.lightBrown,
    marginTop: Theme.spacing.sm,
  },
  totalText: {
    fontSize: Theme.typography.subheader,
    textAlign: 'right',
    marginVertical: Theme.spacing.xxs,
  },
  tabButton: {
    flex: Theme.flex.on,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: Theme.borders.width.thin,
    borderBottomColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: Theme.typography.subheader,
    color: Theme.colors.textMuted,
    fontWeight: '600',
  },
  activeTabText: {
    color: Theme.colors.primary,
  },
  formContainer: {
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxxl,
  },
  historyContainer: {
    flex: Theme.flex.on,
    padding: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.title,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: Theme.spacing.xl,
  },
  inputLabel: {
    fontSize: Theme.typography.body,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Theme.colors.backgroundLight,
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.borderDark,
    borderRadius: Theme.borders.radius.md,
    padding: Theme.spacing.md,
    fontSize: Theme.typography.subheader,
  },
  deliveryOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.xs,
  },
  deliveryButton: {
    flex: Theme.flex.on,
    padding: Theme.spacing.md,
    borderRadius: Theme.borders.radius.md,
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.borderDark,
    alignItems: 'center',
    marginHorizontal: Theme.spacing.xs,
  },
  selectedDelivery: {
    backgroundColor: Theme.colors.pastelCream,
    borderColor: Theme.colors.primary,
  },
  deliveryText: {
    color: Theme.colors.text,
  },
  selectedDeliveryText: {
    color: Theme.colors.text,
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginVertical: Theme.spacing.md,
    padding: Theme.spacing.xs,
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borders.radius.md,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: Theme.typography.header,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  submitButton: {
    backgroundColor: Theme.colors.pastelIceBorder,
    padding: Theme.spacing.lg,
    borderRadius: Theme.borders.radius.md,
    borderColor: Theme.colors.pastelIce,
    borderWidth: Theme.borders.width.thick,
    alignItems: 'center',
    marginTop: Theme.spacing.sm,
  },
  submitButtonText: {
    color: Theme.colors.pastelIce,
    fontSize: Theme.typography.subheader,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
  saleCard: {
    backgroundColor: Theme.colors.backgroundLight,
    borderRadius: Theme.borders.radius.md,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    shadowColor: Theme.elevation.low.shadowColor,
    shadowOffset: Theme.elevation.low.shadowOffset,
    shadowOpacity: Theme.elevation.low.shadowOpacity,
    shadowRadius: Theme.elevation.low.shadowRadius,
    elevation: Theme.elevation.low.elevation,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  costHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  profitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.xs,
  },
  saleQuantity: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textMuted,
  },
  costQuantity: {
    color: Theme.colors.paleRed,
  },
  profitQuantity: {
    fontSize: Theme.typography.body,

    color: Theme.colors.success,
  },
  saleTotal: {
    fontSize: Theme.typography.body,

    color: Theme.colors.brown,
  },
  costTotal: {
    fontSize: Theme.typography.body,

    color: Theme.colors.paleRed,
  },
  profitTotal: {
    fontSize: Theme.typography.body,

    color: Theme.colors.success,
  },
  saleCustomer: {
    fontSize: Theme.typography.body,
    color: Theme.colors.textLight,
    marginBottom: Theme.spacing.xs,
  },
  saleDetails: {
    fontSize: Theme.typography.caption,
    color: Theme.colors.textMuted,
    marginBottom: Theme.spacing.sm,
  },
  saleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saleDate: {
    fontSize: Theme.typography.caption,
    color: Theme.colors.darkGold,
  },
  deleteButton: {
    padding: Theme.spacing.xs,
  },
  deleteText: {
    color: Theme.colors.textLight,
    fontSize: Theme.typography.caption,
  },
  emptyMessage: {
    textAlign: 'center',
    color: Theme.colors.darkGold,
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.subheader,
  },
});

//
// STOCKCHECK STYLES
//
const cardWidth = width / 2 - 16;

export const stockCheckStyles = StyleSheet.create({
  container: {
    flex: Theme.flex.on,
    backgroundColor: Theme.colors.background,
  },
  header: {
    backgroundColor: Theme.colors.paleYellow,
    borderBottomColor: Theme.colors.borderDark,
    borderBottomWidth: Theme.borders.width.regular,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 15,
  },
  headerRight: {
    flex: Theme.flex.on,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerStats: {
    flexDirection: 'row',
    gap: 10,
    padding: Theme.spacing.xs,
    borderRadius: Theme.borders.radius.md,
  },
  availableStats: {
    backgroundColor: Theme.colors.backgroundLight,
    borderColor: Theme.colors.borderDark,
    borderWidth: Theme.borders.width.regular,
  },
  frozenStats: {
    backgroundColor: Theme.colors.pastelCream,
    borderColor: Theme.colors.borderDark,
    borderWidth: Theme.borders.width.regular,
    marginTop: Theme.spacing.xs,
  },
  headerStatText: {
    color: Theme.colors.textMuted,
    fontSize: Theme.typography.caption,
    fontWeight: '500',
  },
  headerStatItalic: {
    color: Theme.colors.textMuted,
    fontSize: Theme.typography.caption,
    fontStyle: 'italic',
  },
  frozenContainer: {
    alignItems: 'center',
  },
  frozenLabel: {
    fontSize: Theme.typography.tiny,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xxs,
  },
  frozenControls: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    borderColor: Theme.colors.primary,
    borderWidth: Theme.borders.width.regular,
    borderRadius: Theme.borders.radius.lg,
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.xxs,
  },
  frozenArrow: {
    color: Theme.colors.textMuted,
    fontSize: Theme.typography.body,
    fontWeight: 'bold',
    marginHorizontal: Theme.spacing.xxs,
  },
  frozenCount: {
    fontSize: Theme.typography.body,
    fontWeight: '600',
    color: Theme.colors.textMuted,
    minWidth: 20,
    textAlign: 'center',
  },
  useButton: {
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.background,
    paddingVertical: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.xl,
    borderRadius: Theme.borders.radius.xl,
  },
  clearButton: {
    backgroundColor: Theme.colors.paleRed,
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xl,
    marginTop: Theme.spacing.sm,
    borderRadius: Theme.borders.radius.md,
  },
  clearText: {
    fontSize: Theme.typography.header,
    fontWeight: 'bold',
    color: Theme.colors.pastelIce,
  },
  useButtonText: {
    fontSize: Theme.typography.header,
    fontWeight: 'bold',
    color: Theme.colors.textMuted,
  },
  scrollContent: {
    padding: Theme.spacing.sm,
    paddingBottom: Theme.spacing.xl,
  },
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  stockCard: {
    borderWidth: Theme.borders.width.regular,

    width: cardWidth,
    borderRadius: Theme.borders.radius.md,
    padding: Theme.spacing.xs,
    shadowColor: Theme.elevation.low.shadowColor,
    shadowOffset: Theme.elevation.low.shadowOffset,
    shadowOpacity: Theme.elevation.low.shadowOpacity,
    shadowRadius: Theme.elevation.low.shadowRadius,
    marginBottom: Theme.spacing.sm,
  },
  stockName: {
    fontSize: Theme.typography.body,
    fontWeight: '600',
    marginBottom: Theme.spacing.sm,
  },
  cardBottomRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.lg,
  },
  stockQuantity: {
    fontSize: Theme.typography.title,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  stockUnit: {
    fontSize: Theme.typography.caption,
    color: Theme.colors.textLight,
  },
  quantityControls: {
    flexDirection: 'row',
    gap: 15,
  },
  controlButton: {
    backgroundColor: Theme.colors.pastelMint,
    borderRadius: 6,
    width: 66,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.borderDark,
  },
  controlText: {
    color: Theme.colors.textMuted,
    fontSize: Theme.typography.header,
    fontWeight: 'bold',
  },
  roundButton: {
    marginTop: Theme.spacing.sm,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borders.radius.sm,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.borderDark,
    alignSelf: 'center',
  },
  roundButtonText: {
    color: Theme.colors.paleRed,
    fontSize: Theme.typography.tiny,
    fontWeight: 'bold',
  },
  overlay: {
    flex: Theme.flex.on,
    backgroundColor: Theme.colors.backgroundDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Theme.colors.textLight,
    padding: Theme.spacing.xl,
    borderRadius: Theme.borders.radius.md,
    width: '80%',
  },
  title: {
    fontSize: Theme.typography.title,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.md,
  },
  subtitle: {
    fontSize: Theme.typography.subheader,
    marginBottom: Theme.spacing.xs,
  },
  info: {
    fontSize: Theme.typography.body,
    marginBottom: 15,
    color: Theme.colors.lightBrown,
  },
  input: {
    borderWidth: Theme.borders.width.regular,
    borderColor: Theme.colors.borderDark,
    padding: Theme.spacing.md,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
