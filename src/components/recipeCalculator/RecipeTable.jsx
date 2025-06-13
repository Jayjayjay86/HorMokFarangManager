import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {recipeCalculatorStyles as styles} from '../../styles/Styles';
import {formatName} from '../../utils/RecipeCalculator/RecipeCalculator';
import {Storage} from '../../storage/Storage';
import {COLORS} from '../../constants/app/appConstants';

const RecipeTable = ({
  recipe,
  inventory,
  setRecipe,
  setInventory,
  setIsRecipeAltered,
  isRecipeAltered,
  saveRecipeData,
  storedPortionAmount,
  costPerPortion,
}) => {
  const updateRecipeIngredient = (ingredient, value) => {
    if (value === '' || /^(\d*\.?\d{0,3})$/.test(value)) {
      setRecipe(prev => ({
        ...prev,
        [ingredient]: value === '' ? '' : value,
      }));
      setIsRecipeAltered(true);
    }
  };

  const updateInventoryAmount = (ingredient, value) => {
    if (value === '' || /^(\d*\.?\d{0,3})$/.test(value)) {
      setInventory(prev => ({
        ...prev,
        [ingredient]: {
          ...prev[ingredient],
          amount: value === '' ? '' : value,
        },
      }));
    }
  };

  const updateInventoryPrice = (ingredient, value) => {
    if (value === '' || /^(\d*\.?\d{0,2})$/.test(value)) {
      setInventory(prev => ({
        ...prev,
        [ingredient]: {
          ...prev[ingredient],
          price: value === '' ? '' : value,
        },
      }));
    }
  };

  return (
    <>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Ingredient</Text>
        <Text style={styles.headerText}>Required</Text>
        <Text style={styles.headerText}>Amount Bought</Text>
        <Text style={styles.headerText}>Price</Text>
      </View>

      {Object.entries(recipe).map(([ingredient, quantity]) => (
        <View
          key={ingredient}
          style={[
            styles.recipeRow,
            {
              backgroundColor: COLORS[ingredient].background,
              borderColor: COLORS[ingredient].border,
            },
          ]}>
          <Text
            style={[
              styles.ingredientName,
              styles.flex1,
              {color: COLORS[ingredient].border},
            ]}>
            {formatName(ingredient)}
          </Text>

          <TextInput
            style={[
              styles.input,
              styles.flex1,
              {
                borderColor: COLORS[ingredient].border,
                color: COLORS[ingredient].border,
              },
            ]}
            value={String(quantity)}
            onChangeText={text => updateRecipeIngredient(ingredient, text)}
            keyboardType="decimal-pad"
            placeholder="0.000"
          />

          <TextInput
            style={[
              styles.input,
              styles.flex1,
              {
                borderColor: COLORS[ingredient].border,
                color: COLORS[ingredient].border,
              },
            ]}
            value={String(inventory[ingredient].amount)}
            onChangeText={text => updateInventoryAmount(ingredient, text)}
            keyboardType="decimal-pad"
            placeholder="0.000"
          />

          <TextInput
            style={[
              styles.input,
              styles.flex1,
              {
                borderColor: COLORS[ingredient].border,
                color: COLORS[ingredient].border,
              },
            ]}
            value={String(inventory[ingredient].price)}
            onChangeText={text => updateInventoryPrice(ingredient, text)}
            keyboardType="decimal-pad"
            placeholder="0.000"
          />
        </View>
      ))}
      {isRecipeAltered && (
        <TouchableOpacity
          style={styles.updateButtonContainer}
          onPress={() =>
            saveRecipeData(
              Storage,
              recipe,
              inventory,
              storedPortionAmount,
              costPerPortion,
              setIsRecipeAltered,
            )
          }>
          <Text style={styles.updateButtonText}>Update Recipe</Text>
        </TouchableOpacity>
      )}
      <View style={styles.costSummaryContainer}>
        <Text style={styles.costSummaryText}>Cost per portion:</Text>
        <Text style={styles.costValue}>฿{costPerPortion.toFixed(2)}</Text>
      </View>
    </>
  );
};

export default RecipeTable;
