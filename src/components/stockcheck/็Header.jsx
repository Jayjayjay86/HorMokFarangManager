import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React from 'react';

import {stockCheckStyles as styles} from '../../styles/Styles';
import {updateStock} from '../../utils/stock/stockCheck';

const Header = ({
  recipe,
  setShowModal,
  currentPerPortionAmount,
  stock,
  setStock,
}) => {
  const calculateMaxPortions = () => {
    const portions = Object.entries(recipe).map(([ingredient, amount]) => {
      if (!stock[ingredient] || amount === 0) {
        return Infinity;
      }
      return Math.floor(stock[ingredient].quantity / amount);
    });
    return Math.min(...portions);
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
  return (
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
              onPress={() => updateStock('preMixedFrozen', true, setStock)}>
              <Text style={styles.frozenArrow}>＋</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.frozenCount}>
            {stock.preMixedFrozen.quantity}
          </Text>
          <View style={styles.frozenControls}>
            <TouchableOpacity
              onPress={() => updateStock('preMixedFrozen', false, setStock)}>
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
  );
};

export default Header;
