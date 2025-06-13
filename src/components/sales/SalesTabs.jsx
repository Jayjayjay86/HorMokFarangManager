import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {salesStyles as styles} from '../../styles/Styles';
const SalesTabs = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'new' && styles.activeTab]}
        onPress={() => setActiveTab('new')}>
        <Text
          style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
          New Sale
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'history' && styles.activeTab]}
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
  );
};

export default SalesTabs;
