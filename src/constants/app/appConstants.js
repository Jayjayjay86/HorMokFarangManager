export const tabBarDetailArray = [
  {id: 'checklist', icon: 'list'},
  {id: 'timer', icon: 'time'},
  {id: 'sales', icon: 'cash'},
  {id: 'stock', icon: 'cube'},
];
// Checklist items with three states: incomplete, available, used
export const ChecklistArray = [
  {id: 1, name: 'Clean Kitchen', status: 'incomplete'},
  {id: 2, name: 'Coconut milk', status: 'incomplete'},
  {id: 3, name: 'Curry paste', status: 'incomplete'},
  {id: 4, name: 'Fish paste', status: 'incomplete'},
  {id: 5, name: 'Palm sugar', status: 'incomplete'},
  {id: 6, name: 'Eggs', status: 'incomplete'},
  {id: 7, name: 'Fish sauce', status: 'incomplete'},
  {id: 8, name: 'Mix', status: 'incomplete'},
  {id: 9, name: 'Freeze', status: 'incomplete'},
];
export const DEFAULT_STOCK = {
  preMixedFrozen: {quantity: 5, unit: 'tubs'},
  coconutMilk: {quantity: 5, unit: 'L'},
  curryPaste: {quantity: 500, unit: 'g'},
  fish: {quantity: 3, unit: 'kg'},
  bananaLeaves: {quantity: 10, unit: 'packs'},
  shrimpPaste: {quantity: 200, unit: 'g'},
  fishSauce: {quantity: 3, unit: 'bottles'},
  palmSugar: {quantity: 1, unit: 'kg'},
  gasCanisters: {quantity: 2, unit: 'cans'},
  premadeMixtures: {quantity: 15, unit: 'portions'},
  eggs: {quantity: 24, unit: 'units'},
};
export const RECIPE = {
  coconutMilk: 1,
  eggs: 6,
  curryPaste: 300,
  fish: 1,
  bananaLeaves: 1,
  shrimpPaste: 16,
  fishSauce: 1,
  palmSugar: 0.5,
  gasCanisters: 1,
};
export const NON_STOCK_ITEMS = ['Clean Kitchen', 'Mix', 'Freeze'];
export const COLORS = {
  coconutMilk: '#FFD1DC',
  curryPaste: '#B5EAD7',
  fish: '#C7CEEA',
  bananaLeaves: '#FFDAC1',
  shrimpPaste: '#FFB7B2',
  fishSauce: '#FDDFDF',
  palmSugar: '#F8E8E8',
  gasCanisters: '#DFE7FD',
  premadeMixtures: '#E8F8F8',
  eggs: '#FFF8E8',
};

export const defaultSale = {
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
