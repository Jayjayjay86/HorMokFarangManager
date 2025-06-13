import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Storage} from '../storage/Storage';
import {GlobalStyles} from '../styles/Styles';

import SalesForm from '../components/sales/SalesForm';
import SalesHistory from '../components/sales/SalesHistory';
import SalesTabs from '../components/sales/SalesTabs';

const SALES_DATA_KEY = 'sales_data';
const SalesSection = () => {
  const [sales, setSales] = useState(() => {
    return Storage.getArray(SALES_DATA_KEY) || [];
  });

  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={GlobalStyles.appContainer}>
      <SalesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'new' ? (
        <SalesForm sales={sales} setSales={setSales} />
      ) : (
        <SalesHistory sales={sales} setSales={setSales} />
      )}
    </KeyboardAvoidingView>
  );
};

export default SalesSection;
