import React from 'react';
import {RECIPE} from '../../constants/app/appConstants';
import {
  Text,
  Pressable,
  useWindowDimensions,
  View,

} from 'react-native';
const Item = ({item, styles, stock,isDisabled,setChecklist}) => {

  const {width, fontScale} = useWindowDimensions();
  const baseFont = width >= 600 ? 20 : 16;
  const iconFont = baseFont * 1.25;
  const toggleChecklistItem = id => {
    setChecklist(prev =>
      prev.map(i => {
        if (i.id !== id) {
          return i;
        }

        // For non-stock items
        if (!i.isStockItem) {
          const nextStatus =
            i.status === 'incomplete'
              ? 'available'
              : i.status === 'available'
              ? 'used'
              : 'incomplete';
          return {...i, status: nextStatus};
        }

        // For stock items
        const nextStatus =
          i.status === 'incomplete'
            ? 'available'
            : i.status === 'available'
            ? 'used'
            : 'incomplete';

        // Only allow toggling if we have enough stock
        return i.hasEnough ? {...i, status: nextStatus} : i;
      }),
    );
  };

  return (
    <Pressable
      onPress={() => !isDisabled && toggleChecklistItem(item.id)}
      android_ripple={{color: '#ECEFF1'}}
      style={({pressed}) => [
        styles.row,
        pressed && !isDisabled && styles.rowPressed,
        isDisabled && styles.disabledRow,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{checked: item.status !== 'incomplete'}}
      accessibilityLabel={item.name}
      disabled={isDisabled}>
      <View style={styles.statusIndicatorContainer}>
        {/* Disabled state (gray cross) */}
        {isDisabled && (
          <Text
            style={[
              styles.checkboxSymbol,
              styles.disabled,
              {fontSize: iconFont},
            ]}>
            ✕
          </Text>
        )}

        {/* Incomplete state (empty circle) */}
        {!isDisabled && item.status === 'incomplete' && (
          <Text style={[styles.checkboxSymbol, {fontSize: iconFont}]}>○</Text>
        )}

        {/* Available state (green check) */}
        {!isDisabled && item.status === 'available' && (
          <Text
            style={[
              styles.checkboxSymbol,
              styles.available,
              {fontSize: iconFont},
            ]}>
            ✓
          </Text>
        )}

        {/* Used state (orange check) */}
        {!isDisabled && item.status === 'used' && (
          <Text
            style={[styles.checkboxSymbol, styles.used, {fontSize: iconFont}]}>
            ✓
          </Text>
        )}
      </View>

      <Text
        style={[
          styles.itemText,
          {fontSize: baseFont / fontScale},
          isDisabled && styles.disabledText,
          item.status !== 'incomplete' && styles.completedText,
          item.status === 'available' && styles.availableText,
          item.status === 'used' && styles.usedText,
        ]}>
        {item.name}
        {item.isStockItem && (
          <Text style={styles.quantityText}>
            {` (Need: ${RECIPE[item.name] || 0}, Have: ${
              stock[item.name]?.quantity || 0
            })`}
          </Text>
        )}
      </Text>
    </Pressable>
  );
};

export default Item;
