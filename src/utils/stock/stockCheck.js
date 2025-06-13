import {AMOUNTS} from '../../constants/app/appConstants';

export const updateStock = (ingredient, isIncrement, setStock) => {
  const baseAmount = AMOUNTS[ingredient] ?? 1;
  const amount = isIncrement ? baseAmount : -baseAmount;

  setStock(prev => {
    // For eggs, ensure we're working with integers
    const newQuantity =
      ingredient === 'eggs'
        ? Math.max(0, Math.floor(prev[ingredient].quantity + amount))
        : Math.max(0, prev[ingredient].quantity + amount);

    return {
      ...prev,
      [ingredient]: {
        ...prev[ingredient],
        quantity: newQuantity,
      },
    };
  });
};

export const roundToZero = (ingredient, Alert, formatName, stock, setStock) => {
  Alert.alert(
    'Round to Zero',
    `Set ${formatName(ingredient)} to 0 ${stock[ingredient].unit}?`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () =>
          setStock(prev => ({
            ...prev,
            [ingredient]: {
              ...prev[ingredient],
              quantity: 0,
            },
          })),
      },
    ],
  );
};

export const Portions = (portions, setStock, stock, recipe) => {
  const newStock = {...stock};
  Object.entries(recipe).forEach(([ingredient, amount]) => {
    if (newStock[ingredient]) {
      newStock[ingredient].quantity = Math.max(
        0,
        newStock[ingredient].quantity - amount * portions,
      );
    }
  });
  newStock.preMixedFrozen.quantity += portions;
  setStock(newStock);
};

export const formatName = name => {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('Paste', ' Paste');
};

export const formatQuantity = quantity => {
  if (quantity < 1) {
    return quantity.toFixed(2);
  }
  return Number.isInteger(quantity) ? quantity : quantity.toFixed(1);
};
