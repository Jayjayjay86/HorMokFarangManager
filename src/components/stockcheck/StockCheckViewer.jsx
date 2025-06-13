import {ScrollView} from 'react-native';
import React from 'react';
import {stockCheckStyles as styles} from '../../styles/Styles';
import StockCheckGrid from '../../components/stockcheck/StockCheckGrid';
const StockCheckViewer = ({stock, setStock}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <StockCheckGrid stock={stock} setStock={setStock} />
    </ScrollView>
  );
};

export default StockCheckViewer;
