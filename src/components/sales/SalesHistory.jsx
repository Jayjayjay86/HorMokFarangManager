import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert} from 'react-native';
import {salesStyles as styles} from '../../styles/Styles';
import {Storage} from '../../storage/Storage';
import {CURRENT_COST_DATA_KEY} from '../../constants/app/appConstants';
import {formatDate} from '../../utils/sales/salesSection';
import {SALES_DATA_KEY} from '../../constants/app/appConstants';

const SalesHistory = ({sales, setSales}) => {
  const [currentCostPerPortion, setCurrentCostPerPortion] = React.useState(0);
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
  React.useEffect(() => {
    const savedCostOfPortion = Storage.getNumber(CURRENT_COST_DATA_KEY);
    if (savedCostOfPortion) {
      setCurrentCostPerPortion(savedCostOfPortion.toFixed(2));
    }
  }, []);
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
                <Text style={styles.saleQuantity}>
                  {item.quantity} {item.quantity === 1 ? 'portion' : 'portions'}
                </Text>
                <Text style={styles.saleTotal}>{item.total} THB</Text>
              </View>
              <View style={styles.costHeader}>
                <Text style={styles.costQuantity}>Costs</Text>
                <Text style={styles.costTotal}>
                  {(Number(item.quantity) * currentCostPerPortion).toFixed(2)}{' '}
                  THB
                </Text>
              </View>
              <View style={styles.profitHeader}>
              <Text style={styles.profitQuantity}>Profit</Text>
                <Text style={styles.profitTotal}>
                  {item.total -
                    (Number(item.quantity) * currentCostPerPortion).toFixed(
                      2,
                    )}{' '}
                  THB
                </Text>
              </View>
              {item.customer && (
                <Text style={styles.saleCustomer}>
                  Customer: {item.customer}
                </Text>
              )}
              <Text style={styles.saleDetailHeader}>Unit Price</Text>
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
      <View style={styles.totalSummary}>
        <Text style={styles.totalText}>
          Total Sales:{' '}
          <Text style={styles.amountText}>
            {sales.reduce((sum, s) => sum + parseFloat(s.total), 0).toFixed(2)}{' '}
            THB
          </Text>
        </Text>
        <Text style={styles.totalText}>
          Total Costs:{' '}
          <Text style={styles.costText}>
            {sales
              .reduce(
                (sum, s) => sum + Number(s.quantity) * currentCostPerPortion,
                0,
              )
              .toFixed(2)}{' '}
            THB
          </Text>
        </Text>
        <Text style={styles.totalText}>
          Total Profits:{' '}
          <Text style={styles.profitText}>
            {sales
              .reduce(
                (sum, s) =>
                  sum +
                  (parseFloat(s.total) -
                    Number(s.quantity) * currentCostPerPortion),
                0,
              )
              .toFixed(2)}{' '}
            THB
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SalesHistory;
