import React from 'react';
import { Storage } from '../storage/Storage';

const [data, setData] = React.useState(() => {
  return Storage.getObject('myData') || { default: 'value' };
});

React.useEffect(() => {
  Storage.setObject('myData', data);
}, [data]);