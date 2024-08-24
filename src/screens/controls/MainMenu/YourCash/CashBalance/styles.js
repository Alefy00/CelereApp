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
    backgroundColor: COLORS.primary,
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
    borderRadius: 5,
    margin: 12,
    borderWidth: 0.2,
    borderColor: '#ccc',
  },
  todayItem: {
    backgroundColor: COLORS.primary,
  },
  todayText: {
    color: '#000',
    fontWeight: 'bold',
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
    color: COLORS.green,
  },
  negative: {
    color: COLORS.red,
  },
  value: {
    color: '#FFF',
    fontSize: 16,
  },
  starIcon: {
    marginRight: 10,
  },
  arrowIcon: {
    marginRight: 4, // Pequeno espaço entre o ícone e a porcentagem
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: -10,
    height: 90,
  },
  footerText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerValue: {
    color: '#000',
    fontSize: 16,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  textSaldo:{
    color: 'white',
    marginLeft: 30,
    fontSize: 22,
    margin:5,
    fontWeight: 'bold',
    marginTop:15,
  },
  textModo:{
    color:'#ffffff',
    marginLeft: 30,
  },
});

export default styles;
