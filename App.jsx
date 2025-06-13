import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {renderTabContent} from './src/utils/app/RenderTabContent';
import TabNavigator from './src/components/app/TabNavigator';
import Header from './src/components/app/Header';
import {GlobalStyles} from './src/styles/Styles';
// import {Storage} from './src/storage/Storage';
import Loading from './src/components/loading/Loading';
// import {
//   DEFAULT_STOCK,
//   DEFAULT_RECIPE,
//   STOCK_DATA_KEY,
//   PORTION_DATA_KEY,
//   RECIPE_DATA_KEY,
//   DEFAULT_AMOUNT_PER_STEAM,
// } from './src/constants/app/appConstants';
// import {Storage} from './src/storage/Storage';
const DEFAULT_TAB = 'sales';
const HorMokApp = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  // const [recipe, setRecipe] = React.useState(() => {
  //   const savedRecipe = Storage.getObject(RECIPE_DATA_KEY);
  //   return savedRecipe || DEFAULT_RECIPE;
  // });
  // const [stock, setStock] = useState(() => {
  //   const savedStock = Storage.getObject(STOCK_DATA_KEY);
  //   return savedStock || DEFAULT_STOCK;
  // });
  // const [currentPerPortionAmount, setCurrentPerPortionAmount] = useState(() => {
  //   const savedPortionAmount = Storage.getObject(PORTION_DATA_KEY);
  //   return savedPortionAmount || DEFAULT_AMOUNT_PER_STEAM;
  // });
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const initilizeData = () => {
    setIsInitializing(true);
    try {
      // const loadedStockData = Storage.getObject(STOCK_DATA_KEY);
      // if (loadedStockData) {
      //   setStock(loadedStockData);
      // }
      // const loadedRecipeData = Storage.getObject(RECIPE_DATA_KEY);
      // if (loadedRecipeData) {
      //   setRecipe(loadedRecipeData);
      // } else {
      //   Storage.setObject(RECIPE_DATA_KEY, DEFAULT_RECIPE);
      // }
      // const savedPortionPerSteamAmount = Storage.getNumber(PORTION_DATA_KEY);
      // if (savedPortionPerSteamAmount) {
      //   setCurrentPerPortionAmount(savedPortionPerSteamAmount);
      // }
      // Storage.clearAll();
    } catch (error) {
      console.log(error);
    } finally {
      setIsInitializing(false);
    }
  };
  useEffect(() => {
    initilizeData();
  }, []);
  if (isInitializing) {
    return <Loading />;
  }
  return (
    <View style={GlobalStyles.appContainer}>
      <Header />
      {renderTabContent(activeTab)}
      <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

export default HorMokApp;
