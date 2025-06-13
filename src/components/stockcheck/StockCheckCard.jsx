import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {stockCheckStyles as styles} from '../../styles/Styles';
import {formatName, updateStock} from '../../utils/stock/stockCheck';
import {COLORS} from '../../constants/app/appConstants';
const StockCheckCard = ({
  index,
  ingredient,
  stock,
  setStock,
  setQuantities,
  quantities,
  data,
}) => {
  return (
    <View
      key={`${ingredient}-${index}`}
      style={[
        styles.stockCard,
        {
          backgroundColor: COLORS[ingredient].background,
          borderColor: COLORS[ingredient].border,
        },
      ]}>
      <Text style={[styles.stockName, {color:COLORS[ingredient].border}]}>
        {formatName(ingredient)}
      </Text>

      <View style={styles.cardBottomRow}>
        <View style={styles.quantityContainer}>
          {ingredient === 'eggs' ? (
            <TextInput
              style={styles.stockQuantity}
              keyboardType="number-pad"
              value={stock[ingredient].quantity.toString()}
              onChangeText={text => {
                // Only allow integers for eggs
                if (/^\d*$/.test(text)) {
                  const parsed = text === '' ? 0 : parseInt(text, 10);
                  if (!isNaN(parsed)) {
                    setStock(prev => ({
                      ...prev,
                      [ingredient]: {
                        ...prev[ingredient],
                        quantity: parsed,
                      },
                    }));
                  }
                }
              }}
              onBlur={() => {
                // Fallback to 0 if somehow invalid
                const currentValue = stock[ingredient].quantity;
                if (isNaN(currentValue)) {
                  setStock(prev => ({
                    ...prev,
                    [ingredient]: {
                      ...prev[ingredient],
                      quantity: 0,
                    },
                  }));
                } else {
                  // Force integer value
                  setStock(prev => ({
                    ...prev,
                    [ingredient]: {
                      ...prev[ingredient],
                      quantity: Math.floor(currentValue),
                    },
                  }));
                }
              }}
            />
          ) : (
            <TextInput
              style={styles.stockQuantity}
              keyboardType="decimal-pad"
              value={stock[ingredient].quantity.toFixed(3)}
              onFocus={() => {
                setQuantities(prev => ({
                  ...prev,
                  [ingredient]:
                    prev[ingredient] === '0' || prev[ingredient] === ''
                      ? '0.0'
                      : prev[ingredient],
                }));
              }}
              onChangeText={text => {
                // Allow digits and decimal point only
                if (/^\d*\.?\d*$/.test(text)) {
                  setQuantities(prev => ({
                    ...prev,
                    [ingredient]: text,
                  }));

                  const parsed = parseFloat(text);
                  setStock(prev => ({
                    ...prev,
                    [ingredient]: {
                      ...prev[ingredient],
                      quantity: isNaN(parsed) ? 0 : parsed,
                    },
                  }));
                }
              }}
              onBlur={() => {
                // Format to 3 decimal places on blur
                const parsed = parseFloat(quantities[ingredient]);
                const formatted = isNaN(parsed) ? '0.000' : parsed.toFixed(3);
                setQuantities(prev => ({
                  ...prev,
                  [ingredient]: formatted,
                }));
              }}
            />
          )}

          <Text style={[styles.stockUnit,{color: COLORS[ingredient].border}]}>{data.unit}</Text>
        </View>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.controlButton,{borderColor: COLORS[ingredient].border}]}
            onPress={() => updateStock(ingredient, false, setStock)}
            activeOpacity={0.7}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton,{borderColor: COLORS[ingredient].border}]}
            onPress={() => updateStock(ingredient, true, setStock)}
            activeOpacity={0.7}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StockCheckCard;
