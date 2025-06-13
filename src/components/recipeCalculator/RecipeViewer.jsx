import React from 'react';
import {ScrollView} from 'react-native';

import {saveRecipeData} from '../../utils/RecipeCalculator/RecipeCalculator';
import Header from '../../components/recipeCalculator/Header';
import RecipeTable from '../../components/recipeCalculator/RecipeTable';

import {recipeCalculatorStyles as styles} from '../../styles/Styles';

const RecipeViewer = ({
  recipe,
  inventory,
  setInventory,
  costPerPortion,
  setStoredPortionAmount,
  storedPortionAmount,
  setRecipe,
}) => {
  const [isRecipeAltered, setIsRecipeAltered] = React.useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* Recipe Editor */}
      <Header
        setRecipe={setRecipe}
        setIsRecipeAltered={setIsRecipeAltered}
        setStoredPortionAmount={setStoredPortionAmount}
        recipe={recipe}
        storedPortionAmount={storedPortionAmount}
      />
      <RecipeTable
        recipe={recipe}
        inventory={inventory}
        setRecipe={setRecipe}
        setInventory={setInventory}
        setIsRecipeAltered={setIsRecipeAltered}
        isRecipeAltered={isRecipeAltered}
        saveRecipeData={saveRecipeData}
        storedPortionAmount={storedPortionAmount}
        costPerPortion={costPerPortion}
      />
    </ScrollView>
  );
};

export default RecipeViewer;
