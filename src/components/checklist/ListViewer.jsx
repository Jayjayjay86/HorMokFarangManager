import React, {useState} from 'react';
import {
  Text,
  FlatList,
  Animated,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import Item from './Item';
import {generateChecklistItems} from '../../utils/checklist/checklist';

const ListViewer = ({stock}) => {
  const [showCompletion, setShowCompletion] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [checklist, setChecklist] = useState(generateChecklistItems(stock));
  const allItemsReady = checklist.every(item => {
    if (!item.isStockItem) {
      return item.status === 'used';
    }
    return item.status === 'used' || !item.hasEnough;
  });

  React.useEffect(() => {
    setChecklist(generateChecklistItems(stock));
    return () => {};
  }, [stock]);

  React.useEffect(() => {
    if (allItemsReady) {
      setShowCompletion(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      setShowCompletion(false);
      fadeAnim.setValue(0);
    }
  }, [allItemsReady, fadeAnim]);
  const renderItem = ({item}) => {
    // Determine if the item is disabled (stock items without enough quantity)
    const isDisabled = item.isStockItem && !item.hasEnough;

    return (
      <Item
        item={item}
        styles={styles}
        stock={stock}
        isDisabled={isDisabled}
        setChecklist={setChecklist}
      />
    );
  };

  return (
    <>
      <FlatList
        data={checklist}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {showCompletion && (
        <Animated.View style={[styles.completionBanner, {opacity: fadeAnim}]}>
          <Text style={styles.completionText}>
            All items prepared! Ready to proceed
          </Text>
        </Animated.View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },

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
export default ListViewer;
