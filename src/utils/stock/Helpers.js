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
export const calculateMaxPortions = (recipe, stock) => {
  const portions = Object.entries(recipe).map(([ingredient, amount]) => {
    if (!stock[ingredient] || amount === 0) {
      return Infinity;
    }
    return Math.floor(stock[ingredient].quantity / amount);
  });
  return Math.min(...portions);
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
export const useStockForMaxPortions = (Alert) => {
  const maxPortions = calculateMaxPortions();
  if (maxPortions === 0) {
    Alert.alert(
      'Not Enough Stock',
      "You don't have enough ingredients to make any portions",
    );
    return;
  }

  const buttons = [
    {text: 'Cancel', style: 'cancel'},
    {text: '1 Steam', onPress: () => Portions(1)},
  ];

  if (maxPortions > 1) {
    buttons.push({
      text: `${maxPortions} Steams`,
      onPress: () => Portions(maxPortions),
    });
  }

  Alert.alert(
    'Use Stock',
    'How many steams would you like to make?\n(Each steam makes 21 portions)',
    buttons,
  );
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

export const updateStock = (ingredient, isIncrement, setStock) => {
  let amount = 1;

  switch (ingredient) {
    case 'preMixedFrozen':
      amount = isIncrement ? 1 : -1;
      break;
    case 'coconutMilk':
      amount = isIncrement ? 1 : -1;
      break;
    case 'eggs':
      amount = isIncrement ? 6 : -6;
      break;
    case 'curryPaste':
      amount = isIncrement ? 100 : -100;
      break;
    case 'fish':
      amount = isIncrement ? 1 : -1;
      break;
    case 'bananaLeaves':
      amount = isIncrement ? 1 : -1;
      break;
    case 'shrimpPaste':
      amount = isIncrement ? 50 : -50;
      break;
    case 'fishSauce':
      amount = isIncrement ? 1 : -1;
      break;
    case 'palmSugar':
      amount = isIncrement ? 0.5 : -0.5;
      break;
    case 'gasCanisters':
      amount = isIncrement ? 1 : -1;
      break;
    default:
      amount = isIncrement ? 1 : -1;
  }

  setStock(prev => ({
    ...prev,
    [ingredient]: {
      ...prev[ingredient],
      quantity: Math.max(0, prev[ingredient].quantity + amount),
    },
  }));
};
