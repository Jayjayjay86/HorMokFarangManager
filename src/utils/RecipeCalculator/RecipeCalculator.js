import {
  RECIPE_DATA_KEY,
  INVENTORY_DATA_KEY,
  PORTION_DATA_KEY,
  CURRENT_COST_DATA_KEY,
} from '../../constants/app/appConstants';

// Helper to get units
export const getUnit = ingredient => {
  switch (ingredient) {
    case 'coconutMilk':
      return 'L';
    case 'curryPaste':
      return 'g';
    case 'fish':
      return 'kg';
    case 'bananaLeaves':
      return 'packs';
    case 'shrimpPaste':
      return 'g';
    case 'fishSauce':
      return 'bottles';
    case 'palmSugar':
      return 'kg';
    case 'gasCanisters':
      return 'cans';
    default:
      return '';
  }
};

// Format quantity display
export const formatQuantity = quantity => {
  if (quantity < 1) {
    return quantity.toFixed(3);
  }
  return Number.isInteger(quantity) ? quantity : quantity.toFixed(2);
};
// Save recipe, inventory, and portion data
export const saveRecipeData = (
  Storage,
  recipe,
  inventory,
  storedPortionAmount,
  costPerPortion,
  setIsRecipeAltered,
) => {
  Storage.setObject(RECIPE_DATA_KEY, recipe);
  Storage.setObject(INVENTORY_DATA_KEY, inventory);
  Storage.setNumber(PORTION_DATA_KEY, storedPortionAmount);
  Storage.setNumber(CURRENT_COST_DATA_KEY, costPerPortion);
  setIsRecipeAltered(false);
};
export const formatName = name => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('Paste', ' Paste');
};
export const calculatePortionsPossible = (
  availableAmount,
  recipe,
  selectedIngredient,
  storedPortionAmount,
  setPortionsPossible,
  setAdditionalRequirements,
) => {
  const amount = parseFloat(availableAmount);
  if (isNaN(amount)) {
    return;
  }

  const recipeAmount = parseFloat(recipe[selectedIngredient]) || 0;
  if (recipeAmount <= 0) {
    return;
  }

  const portionsForSelected = Math.floor(
    (amount * storedPortionAmount) / recipeAmount,
  );

  const requirements = {};
  Object.keys(recipe).forEach(ingredient => {
    if (ingredient !== selectedIngredient) {
      const ingredientAmount = parseFloat(recipe[ingredient]) || 0;
      requirements[ingredient] =
        (ingredientAmount * portionsForSelected) / storedPortionAmount;
    }
  });

  setPortionsPossible(portionsForSelected);
  setAdditionalRequirements(requirements);
};
