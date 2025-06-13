import React from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import { Theme } from '../../styles/Theme';
const TimingGear = ({
  size = 5,
  direction = 'cw',
  speed = 5,
  color = Theme.colors.primaryLight,
  teeth = 12,
  isRunning = true,
}) => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: speed,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  }, [isRunning, speed, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${direction === 'cw' ? 360 : -360}deg`],
  });

  const gearPath = () => {
    const radius = size / 2;
    const toothDepth = radius * 0.2;
    let path = '';

    for (let i = 0; i < teeth; i++) {
      const angle = (i * 2 * Math.PI) / teeth;

      // Outer point
      const x1 = radius + radius * Math.cos(angle);
      const y1 = radius + radius * Math.sin(angle);

      // Inner point
      const x2 =
        radius + (radius - toothDepth) * Math.cos(angle + Math.PI / teeth);
      const y2 =
        radius + (radius - toothDepth) * Math.sin(angle + Math.PI / teeth);

      if (i === 0) {
        path += `M ${x1} ${y1} `;
      } else {
        path += `L ${x1} ${y1} `;
      }

      path += `L ${x2} ${y2} `;
    }

    path += 'Z';
    return path;
  };

  return (
    <Animated.View
      style={[
        styles.gearContainer,
        {
          width: size,
          height: size,
          transform: [{rotate: spin}],
        },
      ]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 3}
          fill={Theme.colors.primary}
          stroke={color}
          strokeWidth="1.5"
        />
        <Path d={gearPath()} fill={Theme.colors.textLight} stroke={color} strokeWidth="1.5" />
        <Circle cx={size / 2} cy={size / 2} r={size / 8} fill={color} />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  gearContainer: {
    shadowColor: Theme.colors.primaryDark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default TimingGear;
