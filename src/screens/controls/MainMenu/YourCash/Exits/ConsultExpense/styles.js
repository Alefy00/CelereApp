/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

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
    fontWeight: '900',
    color: COLORS.black,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    borderBottomWidth:1,
    borderColor: COLORS.black,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  searchIcon: {
    padding: 5,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
  },
  filterButtonText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft:15

  },
  expensesListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal:20,
    marginVertical:20,
    flexDirection: 'row',
  },
  addButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:10,
  },
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  expenseType: {
    fontSize: 14,
    color: COLORS.gray,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom:20
  },
});

export default styles;
