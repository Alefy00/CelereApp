/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    marginBottom:40
  },
  section: {
    marginVertical: 10,
    marginLeft: 20,
    borderBottomWidth:1,
    paddingBottom: 10,
    borderColor:COLORS.lightGray
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionValue: {
    fontSize: 18,
    color: COLORS.black,
  },
  summaryBox: {
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    borderWidth: 1,
    width: '80%',
    marginLeft: 40,
    borderColor: COLORS.gray,
    marginVertical: 10,
  },
  summaryItem: {
    alignItems: 'flex-start',
  },
  summaryText: {
    fontSize: 16,
    color: COLORS.black,
  },
  summaryItemValue: {
    alignItems: 'flex-end',
  },
  summaryValue: {
    fontSize: 18,
    color: COLORS.green,
  },
  summaryValueRed: {
    fontSize: 18,
    color: COLORS.red,
  },
  dailyTransactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    padding:30
  },
  dailyTransactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    padding:30,

  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionValue: {
    fontSize: 14,
    color: COLORS.black,
  },
  today: {
    color: COLORS.black,
  },
  futureDate: {
    color: COLORS.blue,
  },
  saldoPositivo: {
    color: COLORS.green,
  },
  saldoNegativo: {
    color: COLORS.red,
  },
});

export default styles;