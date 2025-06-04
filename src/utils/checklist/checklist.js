import {RECIPE} from '../../constants/app/appConstants';
import {NON_STOCK_ITEMS} from '../../constants/app/appConstants';

export const generateChecklistItems = stock => {
  const baseItems = [
    // Always include the non-stock items first
    {id: 1, name: 'Clean Kitchen', status: 'incomplete', isStockItem: false},
  ];

  // Add stock items from RECIPE
  let id = 2;
  Object.keys(RECIPE).forEach(stockName => {
    if (NON_STOCK_ITEMS.includes(stockName)) {
      return;
    }

    const requiredQuantity = RECIPE[stockName];
    const stockQuantity = stock[stockName]?.quantity || 0;
    const hasEnough = stockQuantity >= requiredQuantity;

    baseItems.push({
      id: id++,
      name: stockName,
      status: 'incomplete',
      isStockItem: true,
      hasEnough: hasEnough,
      requiredQuantity,
      currentQuantity: stockQuantity,
    });
  });

  // Add the remaining non-stock items
  baseItems.push(
    {id: id++, name: 'Mix', status: 'incomplete', isStockItem: false},
    {id: id++, name: 'Freeze', status: 'incomplete', isStockItem: false},
  );

  return baseItems;
};
export const toggleChecklistItem = (id, setChecklist) => {
  setChecklist(prev =>
    prev.map(i => {
      if (i.id !== id) {
        return i;
      }

      // For non-stock items
      if (!i.isStockItem) {
        const nextStatus =
          i.status === 'incomplete'
            ? 'available'
            : i.status === 'available'
            ? 'used'
            : 'incomplete';
        return {...i, status: nextStatus};
      }

      // For stock items
      const nextStatus =
        i.status === 'incomplete'
          ? 'available'
          : i.status === 'available'
          ? 'used'
          : 'incomplete';

      // Only allow toggling if we have enough stock
      return i.hasEnough ? {...i, status: nextStatus} : i;
    }),
  );
};
