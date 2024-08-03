/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  menuContainer: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 10,
  },
  menuItemDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  menuTextDisabled: {
    color: COLORS.gray,
  },
});

export default styles;
