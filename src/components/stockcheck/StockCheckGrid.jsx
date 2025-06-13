import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {stockCheckStyles as styles} from '../../styles/Styles';
import StockCheckCard from './StockCheckCard';
import {DEFAULT_STOCK} from '../../constants/app/appConstants';
const StockCheckGrid = ({stock, setStock}) => {
  const [quantities, setQuantities] = React.useState(() => {
    const initial = {};
    Object.entries(stock).forEach(([ingredient, data]) => {
      // Handle eggs as integer, others as decimal
      initial[ingredient] =
        ingredient === 'eggs'
          ? data.quantity.toString()
          : data.quantity.toFixed(3);
    });
    return initial;
  });
  const handleClearStock = () => {
    try {
      Alert.alert(
        'Clear Stock and Freezer',
        'Revert Stock to Default Setting?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => setStock(DEFAULT_STOCK),
          },
        ],
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <View style={styles.stockGrid}>
        {Object.entries(stock)
          .filter(([ingredient]) => ingredient !== 'preMixedFrozen')
          .map(([ingredient, data], index) => (
            <StockCheckCard
              key={`${ingredient}-grid-${index}`}
              index={index}
              ingredient={ingredient}
              stock={stock}
              setStock={setStock}
              setQuantities={setQuantities}
              quantities={quantities}
              data={data}
            />
          ))}
      </View>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={() => handleClearStock()}
        activeOpacity={0.7}>
        <Text style={styles.clearText}>Clear All Stock</Text>
      </TouchableOpacity>
    </>
  );
};

export default StockCheckGrid;
