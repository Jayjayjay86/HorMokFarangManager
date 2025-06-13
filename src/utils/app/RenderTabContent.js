import Timer from '../../screens/Timer';
import SalesSection from '../../screens/SalesSection';
import StockCheck from '../../screens/StockCheck';
import Checklist from '../../screens/Checklist';
import RecipeCalculator from '../../screens/RecipeCalculator';

export const renderTabContent = (activeTab) => {
    switch (activeTab) {
      case 'timer':
        return <Timer />;
      case 'stock':
        return <StockCheck />;

      case 'sales':
        return <SalesSection />;

      case 'checklist':
        return <Checklist />;
      case 'recipe':
        return <RecipeCalculator />;
      default:
        return null;
    }
  };
