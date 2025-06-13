import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {recipeCalculatorStyles as styles} from '../../styles/Styles';
import {
  formatName,
  formatQuantity,
  getUnit,
} from '../../utils/RecipeCalculator/RecipeCalculator';
const PortionsCalculator = ({
  storedPortionAmount,
  inventory,
  recipe,
  costPerPortion,
}) => {
  const [totalCost, setTotalCost] = React.useState(0);
  const [requiredIngredients, setRequiredIngredients] = React.useState({});
  const [portions, setPortions] = React.useState('');
  const calculateIngredients = () => {
    if (!portions) {
      return;
    }

    const numPortions = parseFloat(portions);
    if (isNaN(numPortions)) {
      return;
    }

    const calculated = {};
    let cost = 0;

    Object.keys(recipe).forEach(ingredient => {
      const recipeValue =
        typeof recipe[ingredient] === 'string'
          ? parseFloat(recipe[ingredient]) || 0
          : recipe[ingredient];

      const required = (recipeValue * numPortions) / storedPortionAmount;
      calculated[ingredient] = required;

      const inv = inventory[ingredient];
      const invAmount =
        typeof inv.amount === 'string'
          ? parseFloat(inv.amount) || 0
          : inv.amount;
      const invPrice =
        typeof inv.price === 'string' ? parseFloat(inv.price) || 0 : inv.price;

      if (invAmount > 0 && invPrice > 0) {
        const costPerUnit = invPrice / invAmount;
        cost += required * costPerUnit;
      }
    });

    setRequiredIngredients(calculated);
    setTotalCost(cost);
  };
  return (
    <>
      <Text style={styles.sectionTitle}>Portions Calculator</Text>
      <View style={styles.calculatorContainer}>
        <TextInput
          style={styles.portionsInput}
          placeholder="Enter portions"
          value={portions}
          onChangeText={setPortions}
          keyboardType="decimal-pad"
        />
        <TouchableOpacity
          style={styles.calculateButtonContainer}
          onPress={calculateIngredients}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
      {portions && (
        <View style={styles.summaryRow}>
          <Text>Total cost for {portions} portions:</Text>
          <Text style={styles.costValue}>
            ฿{(costPerPortion * parseFloat(portions)).toFixed(2)}
          </Text>
        </View>
      )}
      {/* Results */}
      {Object.keys(requiredIngredients).length > 0 && (
        <View style={styles.resultsContainer} >
          <Text style={styles.resultsTitle}>Ingredients Required:</Text>
          {Object.entries(requiredIngredients).map(([ingredient, quantity],index) => (
            <View style={styles.resultItemContainer} key={`${ingredient}-${index}`}>
              <Text style={styles.resultItem}>
                {formatName(ingredient)}:
              </Text>
              <Text style={styles.resultItemCost}>
                {formatQuantity(quantity)} {getUnit(ingredient)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default PortionsCalculator;
