/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';
import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => `${props.backColor}`};
  justify-content: flex-start;
`;
export const Scroller = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  monthButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray3,
  },
  selectedMonthButton: {
    backgroundColor: COLORS.primary,
  },
  monthButtonText: {
    color: COLORS.black,
  },
  selectedMonthButtonText: {
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    borderColor: COLORS.gray,
    padding: 5,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray3,
    marginHorizontal: 5,
  },
  selectedToggleButton: {
    backgroundColor: COLORS.green,
  },
  toggleButtonText: {
    color: COLORS.black,
  },
  selectedToggleButtonText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
  },
  section: {
    marginVertical: 10,
    marginLeft: 20,
  },
  section2: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
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
  },
  summaryItem: {
    alignItems: 'flex-start',
  },
  summaryText: {
    fontSize: 16,
    color: COLORS.black,
  },
  summaryValue: {
    fontSize: 18,
    color: COLORS.green,
  },
  summaryValueRed: {
    fontSize: 18,
    color: COLORS.red,
  },
  entrySection: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent:'center'
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green,
    marginLeft: 5,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    
  },
  entryHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  entryItemText: {
    width: '40%',
    textAlign: 'left',
  },
  entryItemValue: {
    width: '30%',
    textAlign: 'right',
  },
  entryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 5,
  },
  entryTotalText: {
    width: '40%',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  entryTotalValue: {
    width: '30%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  exitSection: {
    marginVertical: 10,
    marginHorizontal: 20,
    marginBottom:70
  },
  exitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
    marginLeft: 5,
  },
  exitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  exitHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  exitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  exitItemText: {
    width: '40%',
    textAlign: 'left',
  },
  exitItemValue: {
    width: '30%',
    textAlign: 'right',
  },
});

export default styles;
