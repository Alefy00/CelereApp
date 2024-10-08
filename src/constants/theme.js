/* eslint-disable prettier/prettier */
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#FADC00',
  secondary: '#212121',
  background: '#FDFCF0',

  white: '#FFFFFF',
  black: '#000000',
  green: '#5ED070',
  red: '#FF6B6B',
  orange: '#FA9600',
  purple: '#9747ff',
  gray: '#939393',
  gray2: '#767676',
  lightGray: '#BCBCB3',
  lightGray2: '#F5F5F5',
  lightGray3: '#F2F2F2',
  lightGray4: '#909090',
  lightGray5: '#FFFEF1',
  lightYellow: '#FEF445',
  lightYellow2: '#FFFFC8',
};

export const SIZES = {
  // global sizes
  s08: 8,
  s10: 10,
  s12: 12,
  s14: 14,
  s16: 16,
  s18: 18,
  s20: 20,
  s22: 22,
  s24: 24,
  s30: 30,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  fblack: 'Rubik-Black',
  fregular: 'Rubik-Regular',
  fsmbold: 'Rubik-SemiBold',
  fbold: 'Rubik-Bold',
  flight: 'Rubik-Light',
  fmedium: 'Rubik-Medium',
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
