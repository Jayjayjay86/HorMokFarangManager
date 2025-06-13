// components/ListViewer.jsx
import React, {useState} from 'react';
import {Text, FlatList, Animated} from 'react-native';
import Item from './Item';
import {generateChecklistItems} from '../../utils/checklist/checklist';
import {CheckListViewerStyles as styles} from '../../styles/Styles';
const ListViewer = ({stock, recipe}) => {
  const [showCompletion, setShowCompletion] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [checklist, setChecklist] = useState(generateChecklistItems(stock));
  const allItemsReady = checklist.every(item => {
    if (!item.isStockItem) {
      return item.status === 'used';
    }
    return item.status === 'used' || !item.hasEnough;
  });

  React.useEffect(() => {
    setChecklist(generateChecklistItems(stock));
    return () => {};
  }, [stock]);

  React.useEffect(() => {
    if (allItemsReady) {
      setShowCompletion(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      setShowCompletion(false);
      fadeAnim.setValue(0);
    }
  }, [allItemsReady, fadeAnim]);
  const renderItem = ({item}) => {
    // Determine if the item is disabled (stock items without enough quantity)
    const isDisabled = item.isStockItem && !item.hasEnough;

    return (
      <Item
        item={item}
        styles={styles}
        stock={stock}
        isDisabled={isDisabled}
        setChecklist={setChecklist}
        recipe={recipe}
      />
    );
  };

  return (
    <>
      <FlatList
        data={checklist}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {showCompletion && (
        <Animated.View style={[styles.completionBanner, {opacity: fadeAnim}]}>
          <Text style={styles.completionText}>
            All items prepared! Ready to proceed
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default ListViewer;
