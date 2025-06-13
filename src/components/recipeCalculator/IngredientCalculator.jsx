import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {recipeCalculatorStyles as styles} from '../../styles/Styles';
import {Picker} from '@react-native-picker/picker';
import {
  formatName,
  calculatePortionsPossible,
  getUnit,
  formatQuantity,
} from '../../utils/RecipeCalculator/RecipeCalculator';
const IngredientCalculator = ({
  recipe,

  storedPortionAmount,
}) => {
  
  const [availableAmount, setAvailableAmount] = React.useState('');
  const [portionsPossible, setPortionsPossible] = React.useState(0);
  const [additionalRequirements, setAdditionalRequirements] = React.useState(
    {},
  );
  const [selectedIngredient, setSelectedIngredient] =
    React.useState('coconutMilk');
  return (
    <>
      <Text style={styles.sectionTitle}>Ingredient Calculator</Text>
      <View style={styles.calculatorContainer}>
        <Picker
          selectedValue={selectedIngredient}
          style={styles.picker}
          onValueChange={setSelectedIngredient}>
          {Object.keys(recipe).map((ingredient,index) => (
            <Picker.Item
              key={`${ingredient}-${index}`}
              label={formatName(ingredient)}
              value={ingredient}
            />
          ))}
        </Picker>

        <TextInput
          style={styles.portionsInput}
          placeholder="Amount available"
          value={availableAmount}
          onChangeText={setAvailableAmount}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          style={styles.calculateButtonContainer}
          onPress={() =>
            calculatePortionsPossible(
              availableAmount,
              recipe,
              selectedIngredient,
              storedPortionAmount,
              setPortionsPossible,
              setAdditionalRequirements,
            )
          }>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      {/* Ingredient Calculator Results */}
      {portionsPossible > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            Can make: {portionsPossible} portions
          </Text>
          <Text style={styles.resultsSubtitle}>
            Additional ingredients needed:
          </Text>
          {Object.entries(additionalRequirements).map(
            ([ingredient, quantity]) => (
              <Text key={ingredient} style={styles.resultItem}>
                {formatName(ingredient)}: {formatQuantity(quantity)}{' '}
                {getUnit(ingredient)}
              </Text>
            ),
          )}
        </View>
      )}
    </>
  );
};

export default IngredientCalculator;
