/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    padding: width * 0.05,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: width * 0.055,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: height * -0.01,
  },
  headerSubtitle: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.015,
    marginTop: height * -0.01,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: width * 0.025,
    marginRight: width * 0.025,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  searchInput: {
    flex: 1,
    paddingVertical: height * 0.012,
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  searchIcon: {
    padding: width * 0.015,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderRadius: 5,
    flexDirection: 'row',
  },
  filterButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.04,
  },
  expensesListContainer: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.01,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: height * 0.02,
    left: width * 0.05,
    right: width * 0.05,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.02,
    flexDirection: 'row',
  },
  addButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginLeft: width * 0.025,
  },
  expenseContainer: {
    padding: width * 0.04,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: height * 0.015,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expenseInfo: {
    flexDirection: 'column',
  },
  expenseName: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  expenseType: {
    fontSize: width * 0.035,
    color: COLORS.gray,
    marginTop: height * 0.005,
    width: width * 0.65,
  },
  expenseReference: {
    fontSize: width * 0.035,
    marginTop: height * 0.005,
    color: COLORS.black,
  },
  expenseDueDate: {
    fontSize: width * 0.035,
    marginTop: height * 0.005,
    color: COLORS.black,
  },
  expenseStatus: {
    fontSize: width * 0.035,
    marginTop: height * 0.005,
    color: COLORS.black,
  },
  expenseStatusPending: {
    color: COLORS.red,
  },
  expenseStatusPaid: {
    color: COLORS.green,
  },
  expenseAmount: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.black,
    marginTop: height * -0.05,
    marginRight: width * 0.05,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.015,
  },
  toggleButton: {
    flex: 1,
    padding: height * 0.012,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    marginLeft: width * 0.015,
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  toggleTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default styles;
