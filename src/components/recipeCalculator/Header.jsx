import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {recipeCalculatorStyles as styles} from '../../styles/Styles';
import Ionicons from '@react-native-vector-icons/ionicons';
import {Theme} from '../../styles/Theme';
const currentRecipe = 'Custard';
const Header = ({
  storedPortionAmount,
  setRecipe,
  setIsRecipeAltered,
  setStoredPortionAmount,
  recipe,
}) => {
  const adjustRecipeForPortionChange = newPortionAmount => {
    const ratio = newPortionAmount / storedPortionAmount;
    const adjustedRecipe = {...recipe};

    Object.keys(adjustedRecipe).forEach(ingredient => {
      const currentValue = parseFloat(adjustedRecipe[ingredient]) || 0;
      adjustedRecipe[ingredient] = (currentValue * ratio).toFixed(3);
    });

    setRecipe(adjustedRecipe);
    setIsRecipeAltered(true);
    setStoredPortionAmount(newPortionAmount);
  };
  const incrementBasePortions = () => {
    adjustRecipeForPortionChange(storedPortionAmount + 1);
  };

  const decrementBasePortions = () => {
    if (storedPortionAmount > 1) {
      adjustRecipeForPortionChange(storedPortionAmount - 1);
    }
  };
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.portionsControlContainer}>
        <Text style={styles.recipeTitle}>{currentRecipe} </Text>
        <TouchableOpacity
          style={styles.portionsButton}
          onPress={decrementBasePortions}
          disabled={storedPortionAmount <= 1}>
          <Ionicons
            name="remove"
            size={Theme.typography.title}
            color={Theme.colors.error}
          />
        </TouchableOpacity>

        <Text style={styles.portionTitle}>
          for {storedPortionAmount} portions
        </Text>

        <TouchableOpacity
          style={styles.portionsButton}
          onPress={incrementBasePortions}>
          <Ionicons
            name="add"
            size={Theme.typography.title}
            color={Theme.colors.paleOrange}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
