/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../../constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  containerMain:{
    flex: 1,
    backgroundColor: COLORS.background,  // Fundo claro
  },
  container: {
    flex: 1,
    padding: 20,
  },
  barTopContainer:{
    height:50,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#000',
  },
  searchButton: {
    marginLeft: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  filterButtonText: {
    marginLeft: 5,
    fontWeight: '500',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderWidth: 1,
    borderRadius:5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopEndRadius: 5,
    borderBottomRightRadius:5,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: '#000',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius:5,
  },
  tabButtonInactive: {
    backgroundColor: '#FFF',
    borderColor: '#000',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#000',
  },
 // Novo estilo para o container da despesa
 expenseCardContainer: {
  marginVertical: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  backgroundColor: '#fff',
  borderRadius: 8,
},
expenseDate: {
  fontSize: 13,
  color: COLORS.black,
  marginTop: 4,
},
expenseCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 15,
  borderRadius: 8,
  backgroundColor: '#fff',
},
expenseInfo: {
  flexDirection: 'column',
},
expenseTitle: {
  fontSize: 16,
  fontWeight: '400',
  color: '#000',
},
expenseSubtitle: {
  fontSize: 12,
  color: '#6C6C6C',
},
expenseValue: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
modalContent: {
  width: width * 0.85,
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
modalHeader: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
modalTitle: {
  fontSize: 16,
  fontWeight: '400',
  color: '#000',
},
datePickerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
},
dateLabel: {
  fontSize: 14,
  color: '#6C6C6C',
},
datePickerButton: {
  padding: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
},
separator: {
  height: 1,
  width: '100%',
  backgroundColor: '#000',
  marginVertical: 5,
},
confirmButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.primary,
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 5,
  marginTop: 20,
},
confirmButtonText: {
  fontSize: 16,
  fontWeight: '400',
  color: '#000',
  marginLeft: 10,
},
expenseInfoContainer: {
  marginBottom: 20,
  alignItems: 'center',
},
expenseInfoContainer2: {
  width: '100%',
  flexDirection: 'row',
  marginBottom: 20,
  alignItems: 'center',
  justifyContent: 'space-between',
},
containerExpenseModal:{
  
},


});

export default styles;

