import React from 'react';
import {View, StyleSheet} from 'react-native';
import TimingGear from './TimingGear';
import { Theme } from '../../styles/Theme';
const TimingGearAssembly = ({isRunning}) => {
  // Gear ratios for realistic movement
  const mainGearTeeth = 24;
  const smallGearTeeth = 12;

  // Calculate relative speeds based on tooth count
  const smallGearSpeed = 3000 * (mainGearTeeth / smallGearTeeth);
  const mainCenter = {left: 80, top: 40};
  const smallBottom = {left: 40, top: 80};
  const smallTop = {left: 130, top: 20};
  return (
    <View style={styles.gearContainer}>
      {/* Main Center Gear */}
      <View style={[styles.gearPosition, mainCenter]}>
        <TimingGear
          size={Theme.gears.xxl}
          direction="cw"
          speed={3000}
          color={Theme.colors.primary}
          teeth={mainGearTeeth}
          isRunning={isRunning}
        />
      </View>

      {/* Small Top Right Gear */}
      <View style={[styles.gearPosition, smallTop]}>
        <TimingGear
          size={Theme.gears.md}
          direction="ccw"
          speed={smallGearSpeed}
          color={Theme.colors.primaryDark}
          teeth={smallGearTeeth}
          isRunning={isRunning}
        />
      </View>

      {/* Small Bottom Left Gear */}
      <View style={[styles.gearPosition, smallBottom]}>
        <TimingGear
          size={Theme.gears.xl}
          direction="ccw"
          speed={smallGearSpeed * 1.2}
          color={Theme.colors.primaryLight}
          teeth={smallGearTeeth - 2}
          isRunning={isRunning}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gearContainer: {
    position: 'relative',
    height: 150,
    width: 200,
    marginTop: 20,
    marginBottom: 30,
  },
  gearPosition: {
    position: 'absolute',
  },
});

export default TimingGearAssembly;
