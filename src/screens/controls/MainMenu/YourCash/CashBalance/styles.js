/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    
  },
  modeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  selectedModeButton: {
    backgroundColor: '#fadc00',
  },
  modeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  selectedModeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 80,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 3,
    margin:12,
    borderWidth:0.2,
    borderColor: '#ccc',
  },
  todayItem: {
    backgroundColor: '#ffffff',
  },
  todayText: {
    color: '#000',
  },
  date: {
    color: '#FFF',
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 14,
    marginRight: 10,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  value: {
    color: '#FFF',
    fontSize: 16,
  },
  starIcon: {
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: -10,
    height: 90,
  },
  footerText: {
    color: '#000',
    fontSize: 16,
  },
  footerValue: {
    color: '#000',
    fontSize: 16,
  },
  textSaldo:{
    color: 'white',
    marginLeft: 30,
    fontSize: 22,
    margin:5,
    fontWeight: 'bold'
  },
  textModo:{
    color:'#ffffff',
    marginLeft: 30,
    marginTop:10,
  },
});

export default styles;
