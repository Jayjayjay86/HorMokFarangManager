import React, {useState} from 'react';
import {View} from 'react-native';
import StockCheckModal from '../components/stockcheck/StockCheckModal';
import {Storage} from '../storage/Storage';
import {
  DEFAULT_STOCK,
  DEFAULT_RECIPE,
  STOCK_DATA_KEY,
  PORTION_DATA_KEY,
  RECIPE_DATA_KEY,
  DEFAULT_AMOUNT_PER_STEAM,
} from '../constants/app/appConstants';
import {GlobalStyles} from '../styles/Styles';
import Header from '../components/stockcheck/็Header';
import StockCheckViewer from '../components/stockcheck/StockCheckViewer';
const StockCheck = () => {
  const [recipe, setRecipe] = React.useState(() => {
    const savedRecipe = Storage.getObject(RECIPE_DATA_KEY);
    return savedRecipe || DEFAULT_RECIPE;
  });
  const [stock, setStock] = useState(() => {
    const savedStock = Storage.getObject(STOCK_DATA_KEY);
    return savedStock || DEFAULT_STOCK;
  });
  const [currentPerPortionAmount, setCurrentPerPortionAmount] = useState(() => {
    const savedAmount = Storage.getObject(RECIPE_DATA_KEY);
    return savedAmount || DEFAULT_AMOUNT_PER_STEAM;
  });

  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    const loadedStockData = Storage.getObject(STOCK_DATA_KEY);
    if (loadedStockData) {
      setStock(loadedStockData);
    }
    const loadedRecipeData = Storage.getObject(RECIPE_DATA_KEY);
    if (loadedRecipeData) {
      setRecipe(loadedRecipeData);
    } else {
      Storage.setObject(RECIPE_DATA_KEY, DEFAULT_RECIPE);
    }
    const savedPortionPerSteamAmount = Storage.getNumber(PORTION_DATA_KEY);
    if (savedPortionPerSteamAmount) {
      setCurrentPerPortionAmount(savedPortionPerSteamAmount);
    }
  }, []);

  React.useEffect(() => {
    Storage.setObject(STOCK_DATA_KEY, stock);
    return () => {};
  }, [stock]);
  return (
    <View style={GlobalStyles.appContainer}>
      <Header
        currentPerPortionAmount={currentPerPortionAmount}
        stock={stock}
        setStock={setStock}
        setShowModal={setShowModal}
        recipe={recipe}
      />
      <StockCheckViewer stock={stock} setStock={setStock} />
      <StockCheckModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        stock={stock}
        setStock={setStock}
        setShowModal={setShowModal}
        portions={currentPerPortionAmount}
      />
    </View>
  );
};

export default StockCheck;
