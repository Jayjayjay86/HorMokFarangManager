import React, {useState} from 'react';
import {Modal, View, Text, TextInput, Button} from 'react-native';
import {stockCheckStyles as styles} from '../../styles/Styles';
import {DEFAULT_RECIPE} from '../../constants/app/appConstants';

const StockCheckModal = ({
  visible,
  onCancel,
  setShowModal,
  stock,
  setStock,
}) => {
  const maxPortions = React.useMemo(() => {
    const calculateMaxPortions = () => {
      try {
        const portions = Object.entries(DEFAULT_RECIPE).map(
          ([ingredient, amount]) => {
            if (!stock[ingredient] || amount === 0) {
              return Infinity;
            }
            return Math.floor(stock[ingredient].quantity / amount);
          },
        );
        return Math.min(...portions);
      } catch (error) {
        console.error(error);
      }
    };
    calculateMaxPortions(stock);
  }, [stock]);
  const [customPortions, setCustomPortions] = useState('');
  const [input, setInput] = useState(
    customPortions ? String(customPortions) : '',
  );
  const UsePortions = pns => {
    try {
      const newStock = {...stock};
      Object.entries(DEFAULT_RECIPE).forEach(([ingredient, amount]) => {
        if (newStock[ingredient]) {
          newStock[ingredient].quantity = Math.max(
            0,
            newStock[ingredient].quantity - amount * pns,
          );
        }
      });
      newStock.preMixedFrozen.quantity += pns;
      setStock(newStock);
      setCustomPortions('');
    } catch (error) {
      console.error(error);
    }
  };
  const onConfirm = pns => {
    UsePortions(pns);
    setShowModal(false);
  };
  const handleMake = () => {
    try {
      const pns = parseInt(input, 10);
      if (pns > 0 && pns <= maxPortions) {
        onConfirm(pns);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Use Stock</Text>
          <Text style={styles.subtitle}>
            How many steams would you like to make?
          </Text>
          <Text style={styles.info}>
            (Max available: {maxPortions}){'\n'}(Each steam makes 21 portions)
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={input}
            onChangeText={setInput}
            placeholder="Enter number"
          />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Make" onPress={handleMake} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StockCheckModal;
