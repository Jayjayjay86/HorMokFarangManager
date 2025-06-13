import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { tabStyles as styles } from '../../styles/Styles';
import { Theme } from '../../styles/Theme';
const TabNavigator = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabBar}>
      {[
        {id: 'recipe', icon: 'restaurant'},
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
            color={
              activeTab === tab.id ? Theme.colors.pastelBlue : Theme.colors.textMuted
            }
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
  );
};



export default TabNavigator;
