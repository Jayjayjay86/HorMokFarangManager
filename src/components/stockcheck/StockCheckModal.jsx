import React, {useState} from 'react';
import {Modal, View, Text, TextInput, Button, StyleSheet} from 'react-native';

const StockCheckModal = ({
  visible,
  maxPortions,
  onCancel,
  onConfirm,
  defaultValue,
}) => {
  const [input, setInput] = useState(defaultValue ? String(defaultValue) : '');

  const handleMake = () => {
    const portions = parseInt(input, 10);
    if (portions > 0 && portions <= maxPortions) {
      onConfirm(portions);
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 15,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StockCheckModal;
