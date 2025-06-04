import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import StockCheckModal from '../components/stockcheck/StockCheckModal';
import {Storage} from '../storage/Storage';
const defaultStock = {
  preMixedFrozen: {quantity: 0, unit: 'tubs'},
  coconutMilk: {quantity: 1, unit: 'L'},
  curryPaste: {quantity: 300, unit: 'g'},
  fish: {quantity: 1, unit: 'kg'},
  bananaLeaves: {quantity: 1, unit: 'packs'},
  shrimpPaste: {quantity: 50, unit: 'g'},
  fishSauce: {quantity: 1, unit: 'bottles'},
  palmSugar: {quantity: 1, unit: 'kg'},
  gasCanisters: {quantity: 1, unit: 'cans'},

  eggs: {quantity: 6, unit: 'units'},
};
const STOCK_DATA_KEY = 'Stock_data';
const recipe = {
  coconutMilk: 1,
  eggs: 6,
  curryPaste: 300,
  fish: 1,
  bananaLeaves: 1,
  shrimpPaste: 16,
  fishSauce: 1,
  palmSugar: 0.5,
  gasCanisters: 1,
};

const colors = {
  coconutMilk: '#FFD1DC',
  curryPaste: '#B5EAD7',
  fish: '#C7CEEA',
  bananaLeaves: '#FFDAC1',
  shrimpPaste: '#FFB7B2',
  fishSauce: '#FDDFDF',
  palmSugar: '#F8E8E8',
  gasCanisters: '#DFE7FD',
  premadeMixtures: '#E8F8F8',
  eggs: '#FFF8E8',
};

const StockCheck = () => {
  const [showModal, setShowModal] = useState(false);
  const [stock, setStock] = useState(() => {
    const savedStock = Storage.getObject(STOCK_DATA_KEY);
    return savedStock || defaultStock; // Use saved data if exists
  });
  const [customPortions, setCustomPortions] = useState('');

  const updateStock = (ingredient, isIncrement) => {
    let amount = 1;

    switch (ingredient) {
      case 'preMixedFrozen':
        amount = isIncrement ? 1 : -1;
        break;
      case 'coconutMilk':
        amount = isIncrement ? 1 : -1;
        break;
      case 'eggs':
        amount = isIncrement ? 6 : -6;
        break;
      case 'curryPaste':
        amount = isIncrement ? 100 : -100;
        break;
      case 'fish':
        amount = isIncrement ? 1 : -1;
        break;
      case 'bananaLeaves':
        amount = isIncrement ? 1 : -1;
        break;
      case 'shrimpPaste':
        amount = isIncrement ? 50 : -50;
        break;
      case 'fishSauce':
        amount = isIncrement ? 1 : -1;
        break;
      case 'palmSugar':
        amount = isIncrement ? 0.5 : -0.5;
        break;
      case 'gasCanisters':
        amount = isIncrement ? 1 : -1;
        break;
      default:
        amount = isIncrement ? 1 : -1;
    }

    setStock(prev => ({
      ...prev,
      [ingredient]: {
        ...prev[ingredient],
        quantity: Math.max(0, prev[ingredient].quantity + amount),
      },
    }));
  };
  const handleClearStock = () => {
    Alert.alert('Clear Stock and Freezer', 'Revert Stock to Default Setting?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => setStock(defaultStock),
      },
    ]);
  };
  const roundToZero = ingredient => {
    Alert.alert(
      'Round to Zero',
      `Set ${formatName(ingredient)} to 0 ${stock[ingredient].unit}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            setStock(prev => ({
              ...prev,
              [ingredient]: {
                ...prev[ingredient],
                quantity: 0,
              },
            })),
        },
      ],
    );
  };
  const useStockForMaxPortions = () => {
    const maxPortions = calculateMaxPortions();
    if (maxPortions === 0) {
      Alert.alert(
        'Not Enough Stock',
        "You don't have enough ingredients to make any portions",
      );
      return;
    }

    setShowModal(true);
  };

  const UsePortions = portions => {
    const newStock = {...stock};
    Object.entries(recipe).forEach(([ingredient, amount]) => {
      if (newStock[ingredient]) {
        newStock[ingredient].quantity = Math.max(
          0,
          newStock[ingredient].quantity - amount * portions,
        );
      }
    });
    newStock.preMixedFrozen.quantity += portions;
    setStock(newStock);
    setCustomPortions('');
  };

  const calculateMaxPortions = () => {
    const portions = Object.entries(recipe).map(([ingredient, amount]) => {
      if (!stock[ingredient] || amount === 0) {
        return Infinity;
      }
      return Math.floor(stock[ingredient].quantity / amount);
    });
    return Math.min(...portions);
  };

  const formatName = name => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace('Paste', ' Paste');
  };

  const formatQuantity = quantity => {
    if (quantity < 1) {
      return quantity.toFixed(2);
    }
    return Number.isInteger(quantity) ? quantity : quantity.toFixed(1);
  };
  React.useEffect(() => {
    const loadedData = Storage.getObject(STOCK_DATA_KEY);
    if (loadedData) {
      setStock(loadedData);
    }
    return () => {};
  }, []);
  React.useEffect(() => {
    Storage.setObject(STOCK_DATA_KEY, stock);
    return () => {};
  }, [stock]); // Saves whenever stock changes
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerStats, styles.availableStats]}>
            <Text style={styles.headerStatText}>
              {calculateMaxPortions()} Available
            </Text>
            <Text style={styles.headerStatItalic}>
              {calculateMaxPortions() * 21} portions
            </Text>
          </View>
          <View style={[styles.headerStats, styles.frozenStats]}>
            <Text style={styles.headerStatText}>
              {stock.preMixedFrozen.quantity} Pre-Frozen
            </Text>
            <Text style={styles.headerStatItalic}>
              {stock.preMixedFrozen.quantity * 21} portions
            </Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.frozenContainer}>
            <Text style={styles.frozenLabel}>Frozen:</Text>
            <View style={styles.frozenControls}>
              <TouchableOpacity
                onPress={() => updateStock('preMixedFrozen', true)}>
                <Text style={styles.frozenArrow}>＋</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.frozenCount}>
              {stock.preMixedFrozen.quantity}
            </Text>
            <View style={styles.frozenControls}>
              <TouchableOpacity
                onPress={() => updateStock('preMixedFrozen', false)}>
                <Text style={styles.frozenArrow}>−</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.useButton}
            onPress={useStockForMaxPortions}>
            <Text style={styles.useButtonText}>Make</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.stockGrid}>
          {Object.entries(stock)
            .filter(([ingredient]) => ingredient !== 'preMixedFrozen')
            .map(([ingredient, data]) => (
              <View
                key={ingredient}
                style={[
                  styles.stockCard,
                  {backgroundColor: colors[ingredient]},
                ]}>
                <Text style={styles.stockName}>{formatName(ingredient)}</Text>

                <View style={styles.cardBottomRow}>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => updateStock(ingredient, false)}
                      activeOpacity={0.7}>
                      <Text style={styles.controlText}>-</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={() => updateStock(ingredient, true)}
                      activeOpacity={0.7}>
                      <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.quantityContainer}>
                    <Text style={styles.stockQuantity}>
                      {formatQuantity(data.quantity)}
                    </Text>
                    <Text style={styles.stockUnit}>{data.unit}</Text>
                  </View>
                </View>

                {data.quantity > 0 && data.quantity < 1 && (
                  <TouchableOpacity
                    style={styles.roundButton}
                    onPress={() => roundToZero(ingredient)}>
                    <Text style={styles.roundButtonText}>Round to 0</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </View>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => handleClearStock()}
          activeOpacity={0.7}>
          <Text style={styles.clearText}>Clear All Stock</Text>
        </TouchableOpacity>
      </ScrollView>
      <StockCheckModal
        visible={showModal}
        maxPortions={calculateMaxPortions()}
        defaultValue={customPortions}
        onCancel={() => setShowModal(false)}
        onConfirm={portions => {
          UsePortions(portions);
          setShowModal(false);
        }}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const cardWidth = width / 2 - 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#GG8BAB',
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {},
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headerStats: {
    flexDirection: 'row',
    gap: 10,
    padding: 6,
    borderRadius: 8,
  },
  availableStats: {
    backgroundColor: '#B5EAD7', // Pastel green
  },
  frozenStats: {
    backgroundColor: '#C7CEEA', // Pastel blue
    marginTop: 4,
  },
  headerStatText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '500',
  },
  headerStatItalic: {
    color: '#333',
    fontSize: 12,
    fontStyle: 'italic',
  },
  frozenContainer: {
    alignItems: 'center',
  },
  frozenLabel: {
    fontSize: 10,
    color: '#FF6D00',
    marginBottom: 2,
  },
  frozenControls: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FF6D00',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 2,
  },
  frozenArrow: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  frozenCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6D00',
    minWidth: 20,
    textAlign: 'center',
  },
  useButton: {
    backgroundColor: 'white',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 1,
  },
  clearButton: {
    backgroundColor: 'rgb(173, 55, 55)',
    textAlign: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 1,
  },
  clearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(214, 192, 192)',
  },
  useButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6D00',
  },
  scrollContent: {
    padding: 8,
    paddingBottom: 20,
  },
  stockGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  stockCard: {
    width: cardWidth,
    borderRadius: 8,
    padding: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 8,
  },
  stockName: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    alignItems: 'flex-end',
  },
  stockQuantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stockUnit: {
    fontSize: 12,
    color: '#555',
  },
  quantityControls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 6,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  controlText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundButton: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'center',
  },
  roundButtonText: {
    color: '#FF6D00',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default StockCheck;
