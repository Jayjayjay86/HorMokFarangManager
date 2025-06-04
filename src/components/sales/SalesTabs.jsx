import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
const SalesTabs = ({styles, activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabBar}>
        {/* N E W      T A B */}
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'new' && styles.activeTab]}
        onPress={() => setActiveTab('new')}>
        <Text
          style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
          New Sale
        </Text>
      </TouchableOpacity>
        {/* H I S T O R Y      T A B */}
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
