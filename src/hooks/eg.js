// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import { usePersistedState } from './src/hooks/usePersistedState';

const App = () => {
  // Timer state (not persisted)
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Persisted states
  const [stock, setStock] = usePersistedState('stock', {
    coconutMilk: { quantity: 5, unit: 'L' },
    curryPaste: { quantity: 500, unit: 'g' },
    fish: { quantity: 3, unit: 'kg' },
    chicken: { quantity: 2, unit: 'kg' },
    bananaLeaves: { quantity: 10, unit: 'packs' },
    shrimpPaste: { quantity: 200, unit: 'g' },
    fishSauce: { quantity: 3, unit: 'bottles' },
    palmSugar: { quantity: 1, unit: 'kg' },
    gasCanisters: { quantity: 2, unit: 'cans' },
    premadeMixtures: { quantity: 15, unit: 'portions' }
  });

  const [recipe, setRecipe] = usePersistedState('recipe', {
    coconutMilk: 0.5, // L per portion
    curryPaste: 50, // g per portion
    fish: 0.2, // kg per portion
    chicken: 0.2, // kg per portion
    bananaLeaves: 1, // pack per portion
    shrimpPaste: 10, // g per portion
    fishSauce: 0.1, // bottles per portion
    palmSugar: 0.05, // kg per portion
    gasCanisters: 0.01 // cans per portion
  });

  const [sales, setSales] = usePersistedState('sales', []);
  
  const [checklist, setChecklist] = usePersistedState('checklist', [
    { id: 1, name: 'Prepare coconut milk', completed: false },
    { id: 2, name: 'Mix curry paste', completed: false },
    { id: 3, name: 'Add fish', completed: false },
    { id: 4, name: 'Add chicken', completed: false },
    { id: 5, name: 'Mix all ingredients', completed: false },
    { id: 6, name: 'Portion into banana leaves', completed: false },
    { id: 7, name: 'Steam mixture', completed: false },
    { id: 8, name: 'Freeze portions', completed: false }
  ]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate maximum portions based on current stock
  const calculateMaxPortions = () => {
    const portions = Object.entries(recipe).map(([ingredient, amount]) => {
      if (amount === 0 || !stock[ingredient]) return Infinity;
      return Math.floor(stock[ingredient].quantity / amount);
    });
    return Math.min(...portions);
  };

  // Record a new sale
  const recordSale = () => {
    if (!newSale.quantity || !newSale.price) {
      Alert.alert('Error', 'Please enter quantity and price');
      return;
    }
    
    const sale = {
      ...newSale,
      id: Date.now(),
      date: new Date().toLocaleString(),
      total: (parseFloat(newSale.price) * parseInt(newSale.quantity)) + 
             (newSale.deliveryOption === 'self' ? 0 : parseFloat(newSale.deliveryCost || 0))
    };
    
    setSales(prev => [...prev, sale]);
    
    // Deduct from premade mixtures
    setStock(prev => ({
      ...prev,
      premadeMixtures: {
        ...prev.premadeMixtures,
        quantity: prev.premadeMixtures.quantity - parseInt(newSale.quantity)
      }
    }));

    // Reset form
    setNewSale({
      quantity: '',
      price: '',
      deliveryCost: '',
      deliveryOption: 'self',
      customer: ''
    });
  };

  // Update stock manually
  const updateStock = (ingredient, amount) => {
    setStock(prev => ({
      ...prev,
      [ingredient]: {
        ...prev[ingredient],
        quantity: Math.max(0, prev[ingredient].quantity + amount)
      }
    }));
  };

  // Complete checklist item
  const toggleChecklistItem = (id) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Reset all data
  const resetAppData = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all app data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          onPress: () => {
            setStock({
              coconutMilk: { quantity: 5, unit: 'L' },
              curryPaste: { quantity: 500, unit: 'g' },
              fish: { quantity: 3, unit: 'kg' },
              chicken: { quantity: 2, unit: 'kg' },
              bananaLeaves: { quantity: 10, unit: 'packs' },
              shrimpPaste: { quantity: 200, unit: 'g' },
              fishSauce: { quantity: 3, unit: 'bottles' },
              palmSugar: { quantity: 1, unit: 'kg' },
              gasCanisters: { quantity: 2, unit: 'cans' },
              premadeMixtures: { quantity: 15, unit: 'portions' }
            });
            setSales([]);
            setChecklist([
              { id: 1, name: 'Prepare coconut milk', completed: false },
              { id: 2, name: 'Mix curry paste', completed: false },
              { id: 3, name: 'Add fish', completed: false },
              { id: 4, name: 'Add chicken', completed: false },
              { id: 5, name: 'Mix all ingredients', completed: false },
              { id: 6, name: 'Portion into banana leaves', completed: false },
              { id: 7, name: 'Steam mixture', completed: false },
              { id: 8, name: 'Freeze portions', completed: false }
            ]);
          }
        }
      ]
    );
  };

  // Sales form state
  const [newSale, setNewSale] = useState({
    quantity: '',
    price: '',
    deliveryCost: '',
    deliveryOption: 'self',
    customer: ''
  });

  // Active tab state
  const [activeTab, setActiveTab] = useState('timer');

  // Render current tab
  const renderTab = () => {
    switch (activeTab) {
      case 'timer':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.timerDisplay}>{formatTime(timer)}</Text>
            <View style={styles.timerControls}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setIsTimerRunning(!isTimerRunning)}
              >
                <Text>{isTimerRunning ? 'Pause' : 'Start'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setTimer(0)}
              >
                <Text>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'stock':
        return (
          <ScrollView style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Max Portions Possible: {calculateMaxPortions()}</Text>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current Stock</Text>
              {Object.entries(stock).map(([ingredient, data]) => (
                <View key={ingredient} style={styles.stockItem}>
                  <Text style={styles.stockName}>{ingredient}:</Text>
                  <Text style={styles.stockQuantity}>{data.quantity} {data.unit}</Text>
                  <View style={styles.stockControls}>
                    <TouchableOpacity 
                      style={styles.stockButton} 
                      onPress={() => updateStock(ingredient, -1)}
                    >
                      <Text>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.stockButton} 
                      onPress={() => updateStock(ingredient, 1)}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recipe (per portion)</Text>
              {Object.entries(recipe).map(([ingredient, amount]) => (
                <Text key={ingredient} style={styles.recipeItem}>
                  {ingredient}: {amount} {stock[ingredient]?.unit || ''}
                </Text>
              ))}
            </View>
          </ScrollView>
        );

      case 'sales':
        return (
          <ScrollView style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>New Sale</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={newSale.quantity}
                onChangeText={text => setNewSale({...newSale, quantity: text})}
                keyboardType="numeric"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Price per unit (THB)"
                value={newSale.price}
                onChangeText={text => setNewSale({...newSale, price: text})}
                keyboardType="numeric"
              />
              
              <TextInput
                style={styles.input}
                placeholder="Customer name"
                value={newSale.customer}
                onChangeText={text => setNewSale({...newSale, customer: text})}
              />
              
              <View style={styles.deliveryContainer}>
                <Text style={styles.deliveryLabel}>Delivery:</Text>
                <TouchableOpacity 
                  style={[
                    styles.deliveryOption, 
                    newSale.deliveryOption === 'self' && styles.selectedOption
                  ]}
                  onPress={() => setNewSale({...newSale, deliveryOption: 'self'})}
                >
                  <Text>Self Delivery</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.deliveryOption, 
                    newSale.deliveryOption === 'other' && styles.selectedOption
                  ]}
                  onPress={() => setNewSale({...newSale, deliveryOption: 'other'})}
                >
                  <Text>Other Delivery</Text>
                </TouchableOpacity>
              </View>
              
              {newSale.deliveryOption === 'other' && (
                <TextInput
                  style={styles.input}
                  placeholder="Delivery cost (THB)"
                  value={newSale.deliveryCost}
                  onChangeText={text => setNewSale({...newSale, deliveryCost: text})}
                  keyboardType="numeric"
                />
              )}
              
              <TouchableOpacity style={styles.addButton} onPress={recordSale}>
                <Text style={styles.buttonText}>Record Sale</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Sales</Text>
              {sales.length === 0 ? (
                <Text style={styles.emptyText}>No sales recorded yet</Text>
              ) : (
                <FlatList
                  data={sales.slice(0, 10)}
                  renderItem={({ item }) => (
                    <View style={styles.saleItem}>
                      <Text style={styles.saleQuantity}>{item.quantity}x</Text>
                      <Text style={styles.salePrice}>{item.price} THB each</Text>
                      <Text style={styles.saleTotal}>Total: {item.total} THB</Text>
                      <Text style={styles.saleCustomer}>Customer: {item.customer}</Text>
                      <Text style={styles.saleDate}>{item.date}</Text>
                    </View>
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              )}
            </View>
          </ScrollView>
        );

      case 'checklist':
        return (
          <ScrollView style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Preparation Checklist</Text>
            <View style={styles.checklistContainer}>
              {checklist.map(item => (
                <TouchableOpacity 
                  key={item.id}
                  style={[
                    styles.checklistItem, 
                    item.completed && styles.completedItem
                  ]}
                  onPress={() => toggleChecklistItem(item.id)}
                >
                  <Text style={styles.checklistText}>
                    {item.completed ? '✓ ' : '○ '} {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hor Mok Manager</Text>
        <TouchableOpacity onPress={resetAppData}>
          <Text style={styles.resetButton}>Reset Data</Text>
        </TouchableOpacity>
      </View>

      {/* Tab navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'timer' && styles.activeTab]}
          onPress={() => setActiveTab('timer')}
        >
          <Text>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'stock' && styles.activeTab]}
          onPress={() => setActiveTab('stock')}
        >
          <Text>Stock</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'sales' && styles.activeTab]}
          onPress={() => setActiveTab('sales')}
        >
          <Text>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'checklist' && styles.activeTab]}
          onPress={() => setActiveTab('checklist')}
        >
          <Text>Checklist</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {renderTab()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF6D00',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  resetButton: {
    color: 'white',
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#FF6D00',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  timerDisplay: {
    fontSize: 48,
    textAlign: 'center',
    marginVertical: 24,
    fontFamily: 'monospace',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  controlButton: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  stockName: {
    flex: 2,
    fontWeight: '500',
  },
  stockQuantity: {
    flex: 1,
    textAlign: 'right',
    marginRight: 16,
  },
  stockControls: {
    flexDirection: 'row',
    gap: 8,
  },
  stockButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
  },
  recipeItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryLabel: {
    marginRight: 12,
  },
  deliveryOption: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#64b5f6',
  },
  addButton: {
    padding: 14,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
  },
  saleItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  saleQuantity: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  salePrice: {
    color: '#4CAF50',
  },
  saleTotal: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  saleCustomer: {
    marginTop: 4,
  },
  saleDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  checklistContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  checklistItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  completedItem: {
    backgroundColor: '#f0fff4',
  },
  checklistText: {
    fontSize: 16,
  },
});

export default App;