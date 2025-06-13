import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {Storage} from '../../storage/Storage';
import {salesStyles as styles} from '../../styles/Styles';
import {DEFAULT_SALE, SALES_DATA_KEY} from '../../constants/app/appConstants';

const SalesForm = ({sales, setSales}) => {
  const [newSale, setNewSale] = React.useState(DEFAULT_SALE);
  const recordSale = async () => {
    if (!newSale.quantity || !newSale.price) {
      Alert.alert('Error', 'Please enter quantity and price');
      return;
    }

    const total =
      parseFloat(newSale.price) * parseInt(newSale.quantity, 10) +
      (newSale.deliveryOption === 'self'
        ? 0
        : parseFloat(newSale.deliveryCost || '0'));

    const sale = {
      ...newSale,
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: total.toFixed(2),
    };

    const updatedSales = [...sales, sale];
    setSales(updatedSales);
    Storage.setArray(SALES_DATA_KEY, updatedSales);

    setNewSale({
      quantity: '',
      price: '',
      deliveryCost: '',
      deliveryOption: 'self',
      customer: '',
    });

    Alert.alert('Success', 'Sale recorded successfully');
  };
  return (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled">

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5"
          value={newSale.quantity}
          onChangeText={text =>
            setNewSale({...newSale, quantity: text.replace(/[^0-9]/g, '')})
          }
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Price per unit (THB)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 120"
          value={newSale.price}
          onChangeText={text =>
            setNewSale({...newSale, price: text.replace(/[^0-9.]/g, '')})
          }
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Customer Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Optional"
          value={newSale.customer}
          onChangeText={text => setNewSale({...newSale, customer: text})}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Delivery Method</Text>
        <View style={styles.deliveryOptions}>
          <TouchableOpacity
            style={[
              styles.deliveryButton,
              newSale.deliveryOption === 'self' && styles.selectedDelivery,
            ]}
            onPress={() =>
              setNewSale({
                ...newSale,
                deliveryOption: 'self',
                deliveryCost: '',
              })
            }>
            <Text
              style={
                newSale.deliveryOption === 'self'
                  ? styles.selectedDeliveryText
                  : styles.deliveryText
              }>
              Self Pickup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.deliveryButton,
              newSale.deliveryOption === 'other' && styles.selectedDelivery,
            ]}
            onPress={() => setNewSale({...newSale, deliveryOption: 'other'})}>
            <Text
              style={
                newSale.deliveryOption === 'other'
                  ? styles.selectedDeliveryText
                  : styles.deliveryText
              }>
              Delivery
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {newSale.deliveryOption === 'other' && (
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Delivery Cost (THB)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 50"
            value={newSale.deliveryCost}
            onChangeText={text =>
              setNewSale({
                ...newSale,
                deliveryCost: text.replace(/[^0-9.]/g, ''),
              })
            }
            keyboardType="decimal-pad"
          />
        </View>
      )}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total:{' '}
          {parseFloat(newSale.price || 0) *
            parseInt(newSale.quantity || 0, 10) +
            (newSale.deliveryOption === 'other'
              ? parseFloat(newSale.deliveryCost || 0)
              : 0)}{' '}
          THB
        </Text>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={recordSale}
        disabled={!newSale.quantity || !newSale.price}>
        <Text style={styles.submitButtonText}>Record Sale</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SalesForm;
