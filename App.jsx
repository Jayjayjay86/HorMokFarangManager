import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Timer from './src/screens/Timer';
import StockCheck from './src/screens/StockCheck';
import SalesSection from './src/screens/SalesSection';
import Checklist from './src/screens/Checklist';

const HorMokApp = () => {
  // App state
  const [activeTab, setActiveTab] = useState('timer');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timer':
        return <Timer />;
      case 'stock':
        return <StockCheck />;

      case 'sales':
        return <SalesSection />;

      case 'checklist':
        return <Checklist />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hor Mok Manager</Text>
      </View>

      {/* Main Content */}
      {renderTabContent()}

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {[
          {id: 'checklist', icon: 'list'},
          {id: 'timer', icon: 'time'},
          {id: 'sales', icon: 'cash'},
          {id: 'stock', icon: 'cube'},
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}>
            <Ionicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? '#FF6D00' : '#757575'}
            />
            <Text
              style={[
                styles.tabButtonText,
                activeTab === tab.id && styles.activeTabText,
              ]}>
              {tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FF6D00',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabContent: {
    flex: 1,
    padding: 15,
  },
  // Tab Bar Styles
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#EEE',
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    padding: 5,
  },
  activeTab: {
    // Highlight handled by icon/text colors
  },
  tabButtonText: {
    fontSize: 12,
    color: '#757575',
    marginTop: 5,
  },
  activeTabText: {
    color: '#FF6D00',
    fontWeight: 'bold',
  },
});

export default HorMokApp;
