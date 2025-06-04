import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

const SalesHistory = ({styles, sales, formatDate, handleDelete}) => {
  return (
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
  );
};

export default SalesHistory;
