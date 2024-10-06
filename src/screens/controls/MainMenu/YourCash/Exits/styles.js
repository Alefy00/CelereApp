/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop:-10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: -20,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  menuItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemDisabled: {
    backgroundColor: COLORS.lightGray2,
    opacity: 0.6,
  },
  menuIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  menuTextDisabled: {
    color: COLORS.gray,
  },
  menuDescription: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
});

export default styles;
