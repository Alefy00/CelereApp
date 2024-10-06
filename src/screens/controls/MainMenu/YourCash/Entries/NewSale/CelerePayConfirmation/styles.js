/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../../constants';

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.primary,  // Fundo amarelo
  },
  containerBartop: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  iconStyle: {
    marginBottom: 20,
  },
  valueLabel: {
    fontSize: 24,
    color: COLORS.black,
    textAlign: 'center',
    fontWeight:'900',
  },
  valueText: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default styles;
