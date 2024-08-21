/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  selectedToggleButton: {
    backgroundColor: '#000',
  },
  toggleButtonText: {
    color: '#fff',
  },
  selectedToggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
