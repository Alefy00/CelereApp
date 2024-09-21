/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  barTop: {
    height: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  menuItem: {
    width: '45%',
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
    textAlign: 'center',
  },
  menuItemDescription: {
    fontSize: 12,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 5,
  },
  newSaleButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  newSaleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  newSaleButtonSubText: {
    fontSize: 12,
    color: COLORS.black,
    marginTop: 5,
  },
});

export default styles;
