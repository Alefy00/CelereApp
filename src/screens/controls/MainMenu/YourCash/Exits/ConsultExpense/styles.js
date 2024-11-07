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
    marginTop: -10,
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
    marginTop: -10,
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
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expenseInfo: {
    flexDirection: 'column',
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  expenseType: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
    width: 250
  },
  expenseReference: {
    fontSize: 14,
    marginTop: 5,
    color: COLORS.black,
  },
  expenseDueDate: {
    fontSize: 14,
    marginTop: 5,
    color: COLORS.black,
  },
  expenseStatus: {
    fontSize: 14,
    marginTop: 5,
    color: COLORS.black,
  },
  expenseStatusPending: {
    color: COLORS.red,
  },
  expenseStatusPaid: {
    color: COLORS.green,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.black,
    marginTop: "-32%",
    marginRight: '12%',

  },
  //toggle botão
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    marginLeft: 5,
    fontSize: 16,
    color: COLORS.black,
  },
  toggleTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default styles;
