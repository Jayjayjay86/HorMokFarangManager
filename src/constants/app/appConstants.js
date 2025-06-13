import {Theme} from '../../styles/Theme';

export const tabBarDetailArray = [
  {id: 'checklist', icon: 'list'},
  {id: 'timer', icon: 'time'},
  {id: 'sales', icon: 'cash'},
  {id: 'stock', icon: 'cube'},
  {id: 'recipe', icon: 'restraunt'},
];
// Checklist items with three states: incomplete, available, used
export const ChecklistArray = [
  {id: 1, name: 'Clean Kitchen', status: 'incomplete'},
  {id: 2, name: 'Coconut milk', status: 'incomplete'},
  {id: 3, name: 'Yellow Curry paste', status: 'incomplete'},
  {id: 4, name: 'Red Curry paste', status: 'incomplete'},
  {id: 5, name: 'Fish paste', status: 'incomplete'},
  {id: 6, name: 'Palm sugar', status: 'incomplete'},
  {id: 8, name: 'Eggs', status: 'incomplete'},
  {id: 10, name: 'Fish sauce', status: 'incomplete'},
  {id: 11, name: 'Mix', status: 'incomplete'},
  {id: 12, name: 'Freeze', status: 'incomplete'},
];
export const DEFAULT_STOCK = {
  preMixedFrozen: {quantity: 0, unit: 'tubs'},
  coconutMilk: {quantity: 0.0, unit: 'L'},
  yellowCurryPaste: {quantity: 0.0, unit: 'kg'},
  redCurryPaste: {quantity: 0.0, unit: 'kg'},
  shrimpPaste: {quantity: 0.0, unit: 'kg'},
  fishPaste: {quantity: 0.0, unit: 'kg'},
  fishSauce: {quantity: 0.0, unit: 'L'},
  palmSugar: {quantity: 0.0, unit: 'kg'},
  eggs: {quantity: 0, unit: 'units'},
};
export const AMOUNTS = {
  preMixedFrozen: 1,
  coconutMilk: 1,
  eggs: 30,
  yellowCurryPaste: 0.100,
  redCurryPaste: 0.100,
  shrimpPaste: 0.100,
  fishSauce: 0.700,
  fishPaste: 0.500,
  palmSugar: 0.050,
};
// Default recipe for steaming 21 portions ( 7X7X7 )
export const DEFAULT_RECIPE = {

  coconutMilk: 1.0, // L
  eggs: 6, // units
  yellowCurryPaste: 0.216, // kg
  redCurryPaste: 0.04, // kg
  shrimpPaste: 0.016, // g
  fishSauce: 0.015, // L
  fishPaste: 0.25, // kg
  palmSugar: 0.086, // kg
};
// Default inventory values
export const DEFAULT_INVENTORY = Object.keys(DEFAULT_RECIPE).reduce(
  (acc, ingredient) => {
    acc[ingredient] = {amount: 0, price: 0};
    return acc;
  },
  {},
);
export const DEFAULT_AMOUNT_PER_STEAM = 21;
export const NON_STOCK_ITEMS = ['Clean Kitchen', 'Mix', 'Freeze'];
export const COLORS = {
  coconutMilk: {
    background: Theme.colors.pastelBeige,
    border: Theme.colors.pastelBeigeBorder,
  },
  yellowCurryPaste: {
    background: Theme.colors.pastelBlue,
    border: Theme.colors.pastelBlueBorder,
  },
  redCurryPaste: {
    background: Theme.colors.pastelCoral,
    border: Theme.colors.pastelCoralBorder,
  },
  shrimpPaste: {
    background: Theme.colors.pastelCream,
    border: Theme.colors.pastelCreamBorder,
  },
  fishSauce: {
    background: Theme.colors.pastelGreen,
    border: Theme.colors.pastelGreenBorder,
  },
  fishPaste: {
    background: Theme.colors.pastelIce,
    border: Theme.colors.pastelIceBorder,
  },
  palmSugar: {
    background: Theme.colors.pastelLavender,
    border: Theme.colors.pastelLavenderBorder,
  },
  premadeMixtures: {
    background: Theme.colors.pastelMint,
    border: Theme.colors.pastelMintBorder,
  },
  eggs: {
    background: Theme.colors.pastelOrange,
    border: Theme.colors.pastelOrangeBorder,
  },
};

export const DEFAULT_SALE = {
  quantity: '',
  price: '',
  deliveryCost: '',
  deliveryOption: 'self',
  customer: '',
};
export const ERROR = {
  INVALIDINPUT: 'Please enter quantity and price',
};
export const SUCCESS = {
  SALE: 'Sale recorded successfully',
};

export const CONFIRMATION = {
  Delete: 'Are you sure you want to delete this sale?',
};
export const STOCK_DATA_KEY = 'Stock_data';
export const RECIPE_DATA_KEY = 'recipe_data';
export const INVENTORY_DATA_KEY = 'inventory_data';
export const PORTION_DATA_KEY = 'portion_data';
export const CURRENT_COST_DATA_KEY = 'current_costs_data';
export const SALES_DATA_KEY = 'sales_data';
