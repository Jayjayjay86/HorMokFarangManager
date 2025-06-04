import React, {useState} from 'react';
import {Animated} from 'react-native';
import {Storage} from '../storage/Storage';
import { DEFAULT_STOCK} from '../constants/app/appConstants';
import {STOCK_DATA_KEY} from '../constants/app/appConstants';
import ListViewer from '../components/checklist/ListViewer';
import {generateChecklistItems} from '../utils/checklist/checklist';

const Checklist = () => {
  const [stock, setStock] = useState(() => {
    const savedStock = Storage.getObject(STOCK_DATA_KEY);
    return savedStock || DEFAULT_STOCK; // Use saved data if exists
  });
 

  return (
    <ListViewer

      stock={stock}
    />
  );
};

export default Checklist;
