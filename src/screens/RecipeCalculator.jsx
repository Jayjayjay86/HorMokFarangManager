import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, Text} from 'react-native';
import {Storage} from '../storage/Storage';

import {
  DEFAULT_RECIPE,
  RECIPE_DATA_KEY,
  INVENTORY_DATA_KEY,
  PORTION_DATA_KEY,
  DEFAULT_INVENTORY,
  DEFAULT_AMOUNT_PER_STEAM,
  CURRENT_COST_DATA_KEY,
} from '../constants/app/appConstants';
import {recipeCalculatorStyles as styles} from '../styles/Styles';
import RecipeViewer from '../components/recipeCalculator/RecipeViewer';
import PortionsCalculator from '../components/recipeCalculator/PortionsCalculator';
import IngredientCalculator from '../components/recipeCalculator/IngredientCalculator';

const RecipeCalculator = () => {
  const [showStates, setShowStates] = React.useState({
    recipeCalc: false,
    portionsCalc: false,
    ingredientCalc: false,
  });
  const [storedPortionAmount, setStoredPortionAmount] = useState(
    DEFAULT_AMOUNT_PER_STEAM,
  );
  const [recipe, setRecipe] = React.useState(() => {
    const savedRecipe = Storage.getObject(RECIPE_DATA_KEY);
    return savedRecipe || DEFAULT_RECIPE;
  });
  const [inventory, setInventory] = useState(DEFAULT_INVENTORY);
  const [costPerPortion, setCostPerPortion] = React.useState(0);
  useEffect(() => {
    const savedRecipe = Storage.getObject(RECIPE_DATA_KEY);
    if (savedRecipe) {
      setRecipe(savedRecipe);
    }

    const savedInventory = Storage.getObject(INVENTORY_DATA_KEY);
    if (savedInventory) {
      setInventory(savedInventory);
    }

    const savedPortions = Storage.getNumber(PORTION_DATA_KEY);
    if (savedPortions) {
      setStoredPortionAmount(savedPortions);
    }
  }, []);
  React.useEffect(() => {
    let total = 0;
    Object.entries(recipe).forEach(([ingredient, amount]) => {
      const inv = inventory[ingredient];
      if (inv) {
        const recipeAmount = parseFloat(amount) || 0;
        const invAmount = parseFloat(inv.amount) || 0;
        const invPrice = parseFloat(inv.price) || 0;

        if (invAmount > 0 && invPrice > 0) {
          const costPerUnit = invPrice / invAmount;
          total += (recipeAmount / storedPortionAmount) * costPerUnit;
        }
      }
    });
    setCostPerPortion(total);
    Storage.setNumber(CURRENT_COST_DATA_KEY, total);
  }, [recipe, inventory, storedPortionAmount]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {showStates.portionsCalc ||
        (!showStates.ingredientCalc && (
          <Text
            style={styles.calcTextButton}
            onPress={() =>
              setShowStates(prev => ({
                recipeCalc: !prev.recipeCalc,
                portionsCalc: false,
                ingredientCalc: false,
              }))
            }>
            {!showStates.recipeCalc ? 'Show Recipe Calculator' : 'Hide'}
          </Text>
        ))}

      {showStates.recipeCalc && (
        <RecipeViewer
          recipe={recipe}
          inventory={inventory}
          setInventory={setInventory}
          setStoredPortionAmount={setStoredPortionAmount}
          storedPortionAmount={storedPortionAmount}
          setRecipe={setRecipe}
          costPerPortion={costPerPortion}
        />
      )}
      {showStates.recipeCalc ||
        (!showStates.ingredientCalc && (
          <Text
            style={styles.calcTextButton}
            onPress={() =>
              setShowStates(prev => ({
                recipeCalc: false,
                portionsCalc: !prev.portionsCalc,
                ingredientCalc: false,
              }))
            }>
            {!showStates.portionsCalc ? 'Show Portions Calculator' : 'Hide'}
          </Text>
        ))}

      {showStates.portionsCalc && (
        <PortionsCalculator
          storedPortionAmount={storedPortionAmount}
          inventory={inventory}
          recipe={recipe}
          costPerPortion={costPerPortion}
        />
      )}
      {showStates.recipeCalc ||
        (!showStates.portionsCalc && (
          <Text
            style={styles.calcTextButton}
            onPress={() =>
              setShowStates(prev => ({
                recipeCalc: false,
                portionsCalc: false,
                ingredientCalc: !prev.ingredientCalc,
              }))
            }>
            {!showStates.ingredientCalc ? 'Show Ingredient Calculator' : 'Hide'}
          </Text>
        ))}

      {showStates.ingredientCalc && (
        <IngredientCalculator
          recipe={recipe}
          storedPortionAmount={storedPortionAmount}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default RecipeCalculator;
