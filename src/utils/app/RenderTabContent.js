import Timer from '../../components/Timer';
import StockCheck from '../../components/StockCheck';
import SalesSection from '../../components/SalesSection';
import Checklist from '../../components/Checklist';

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

      default:
        return null;
    }
  };
