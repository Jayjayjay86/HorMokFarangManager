// theme.js
import {StyleSheet} from 'react-native';

export const Theme = {
  flex: {
    on: 1,
    off: 0,
    half: 0.5,
    over: 2,
  },
  colors: {
    // Primary
    primary: 'rgba(218, 75, 65, 0.91)',
    secondary: 'rgba(75, 65, 218, 0.91)',
    primaryDark: 'rgba(216, 67, 21, 1)',
    primaryLight: 'rgba(255, 152, 0, 1)',

    // Status
    success: 'rgba(76, 175, 80, 1)',
    error: 'rgba(244, 67, 54, 1)',
    warning: 'rgba(255, 193, 7, 1)',
    info: 'rgba(33, 150, 243, 1)',

    // Text
    text: 'rgb(97, 90, 90)',
    textSecondary: 'rgba(85, 85, 85, 1)',
    textMuted: 'rgba(148, 137, 137, 0.7)',
    textLight: 'rgba(255, 255, 255, 1)',

    // Backgrounds
    background: 'rgba(248, 249, 250, 1)',
    backgroundLight: 'rgba(255, 255, 255, 1)',
    backgroundDark: 'rgba(58, 49, 49, 0.9)',

    // Borders
    border: 'rgba(221, 221, 221, 1)',
    borderLight: 'rgba(238, 238, 238, 1)',
    borderDark: 'rgb(0, 0, 0)',

    // Pastels (from your stock cards)
    pastelPink: 'rgba(255, 209, 220, 1)',
    pastelGreen: 'rgba(181, 234, 215, 1)',
    pastelBlue: 'rgba(199, 206, 234, 1)',
    pastelPeach: 'rgba(255, 218, 193, 1)',
    pastelCoral: 'rgba(255, 183, 178, 1)',
    pastelLavender: 'rgba(253, 223, 223, 1)',
    pastelBeige: 'rgba(248, 232, 232, 1)',
    pastelIce: 'rgba(223, 231, 253, 1)',
    pastelMint: 'rgba(232, 248, 248, 1)',
    pastelCream: 'rgba(255, 248, 232, 1)',
    pastelOrange: 'rgb(240, 209, 141)',

    pastelPinkBorder: 'rgb(68, 54, 57)',
    pastelGreenBorder: 'rgb(123, 187, 163)',
    pastelBlueBorder: 'rgb(129, 136, 163)',
    pastelPeachBorder: 'rgb(167, 100, 56)',
    pastelCoralBorder: 'rgb(201, 129, 123)',
    pastelLavenderBorder: 'rgb(235, 175, 175)',
    pastelBeigeBorder: 'rgb(179, 137, 137)',
    pastelIceBorder: 'rgb(157, 167, 197)',
    pastelMintBorder: 'rgba(243, 200, 222, 0.78)',
    pastelCreamBorder: 'rgb(192, 179, 149)',
    pastelOrangeBorder: 'rgb(179, 151, 91)',
    // Specials
    gold: 'rgba(211, 183, 60, 0.99)',
    darkGold: 'rgba(211, 163, 60, 0.99)',
    brown: 'rgba(94, 91, 88, 1)',
    lightBrown: 'rgba(138, 129, 120, 1)',
    paleRed: 'rgba(173, 55, 55, 0.69)',
    paleGreen: 'rgba(55, 173, 75, 0.69)',
    paleOrange: 'rgba(218, 181, 112, 0.99)',
    paleBlue: 'rgba(125, 135, 190, 0.99)',
  },

  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
    xxxxl: 45,
  },

  typography: {
    tiny: 10,
    caption: 12,
    body: 14,
    subheader: 16,
    header: 18,
    title: 20,
    largeTitle: 22,
    icon: 24,
    headingTitle: 38,
    display: 42,
  },
  gears: {
    xxs: 5,
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
    xxl: 60,
    xxxl: 80,
  },
  borders: {
    width: {
      thin: StyleSheet.hairlineWidth,
      regular: 1,
      thick: 2,
      thickest:3,
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      circle: 100,
    },
  },

  elevation: {
    low: {
      elevation: 1,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    medium: {
      elevation: 3,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    high: {
      elevation: 6,
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
  },
};
