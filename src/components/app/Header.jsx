import {View, Text} from 'react-native';
import React from 'react';
import {appStyles as styles} from '../../styles/Styles';
const Header = () => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Hor</Text>
          <Text style={styles.headerTitle}>-</Text>
          <Text style={styles.headerTitle}>Mok </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.headerTitleBlue}>Farang</Text>
        </View>
      </View>
    </>
  );
};

export default Header;
