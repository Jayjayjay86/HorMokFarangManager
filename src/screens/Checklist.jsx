// screens/Checklist.jsx
import React, {useState} from 'react';
import {Storage} from '../storage/Storage';
import {DEFAULT_STOCK,DEFAULT_RECIPE} from '../constants/app/appConstants';
import {STOCK_DATA_KEY,RECIPE_DATA_KEY} from '../constants/app/appConstants';
import ListViewer from '../components/checklist/ListViewer';


const Checklist = () => {
  const [stock, setStock] = useState(() => {
    const savedStock = Storage.getObject(STOCK_DATA_KEY);
    return savedStock || DEFAULT_STOCK || {}; 
  });
  const [recipe, setRecipe] = useState(() => {
    const savedRecipe = Storage.getObject(RECIPE_DATA_KEY);
    return savedRecipe || DEFAULT_RECIPE || {};
  });
  return <ListViewer stock={stock} recipe={recipe} />;
};

export default Checklist;
