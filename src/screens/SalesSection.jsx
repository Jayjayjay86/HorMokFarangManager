import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  // Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {Storage} from '../storage/Storage';

const SALES_DATA_KEY = 'sales_data';
const SalesSection = () => {
  const [sales, setSales] = useState(() => {
    return Storage.getArray(SALES_DATA_KEY) || [];
  });
  const [newSale, setNewSale] = useState({
    quantity: '',
    price: '',
    deliveryCost: '',
    deliveryOption: 'self',
    customer: '',
  });
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'

  // -------------------------------------------------------------------------
  // S A L E S
  // -------------------------------------------------------------------------
  // Record a new sale
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

  // Handle delete sale
  const handleDelete = async id => {
    Alert.alert('Delete Sale', 'Are you sure you want to delete this sale?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: async () => {
          const updatedSales = sales.filter(sale => sale.id !== id);
          setSales(updatedSales);
          Storage.setArray(SALES_DATA_KEY, updatedSales);
        },
      },
    ]);
  };

  // Format date for display
  const formatDate = dateString => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'new' && styles.activeTab]}
          onPress={() => setActiveTab('new')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'new' && styles.activeTabText,
            ]}>
            New Sale
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'history' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('history')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText,
            ]}>
            Sales History
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'new' ? (
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.sectionTitle}>New Sale</Text>

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
                onPress={() =>
                  setNewSale({...newSale, deliveryOption: 'other'})
                }>
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
      ) : (
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Sales History</Text>
          {sales.length === 0 ? (
            <Text style={styles.emptyMessage}>No sales recorded yet</Text>
          ) : (
            <FlatList
              data={sales.sort((a, b) => b.id - a.id)}
              contentContainerStyle={styles.listContent}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <View style={styles.saleCard}>
                  <View style={styles.saleHeader}>
                    <Text style={styles.saleQuantity}>{item.quantity}x</Text>
                    <Text style={styles.saleTotal}>{item.total} THB</Text>
                  </View>
                  {item.customer && (
                    <Text style={styles.saleCustomer}>
                      Customer: {item.customer}
                    </Text>
                  )}
                  <Text style={styles.saleDetails}>
                    {item.price} THB each •{' '}
                    {item.deliveryOption === 'self'
                      ? 'Self pickup'
                      : `Delivery (+${item.deliveryCost} THB)`}
                  </Text>
                  <View style={styles.saleFooter}>
                    <Text style={styles.saleDate}>{formatDate(item.date)}</Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item.id)}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

// const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6D00',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FF6D00',
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  historyContainer: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  deliveryOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  deliveryButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedDelivery: {
    backgroundColor: '#FF6D00',
    borderColor: '#FF6D00',
  },
  deliveryText: {
    color: '#333',
  },
  selectedDeliveryText: {
    color: '#fff',
  },
  summaryContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FF6D00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  saleCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  saleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  saleQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saleTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  saleCustomer: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  saleDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  saleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saleDate: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    color: '#F44336',
    fontSize: 12,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 16,
  },
});

export default SalesSection;
