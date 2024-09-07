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
  expensesListContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom:20,
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
  // Exemplo de estilos para o modal
modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  width: '90%',
  backgroundColor: 'white',
  borderRadius: 15,
  padding: 16,
},
modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
modalTitle: {
  fontSize: 16,
  fontWeight: '400',
  color: '#000',
},
datePickerContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 15,
  borderBottomWidth: 1,
  borderColor: COLORS.black,
  paddingHorizontal: 10,
},
datePickerButton: {
  marginBottom: 15,
  marginTop:5,
},
separator: {
  height: 1,
  backgroundColor: COLORS.black,
  marginVertical: 2,
},
input: {
  borderBottomWidth:1,
  borderColor: COLORS.black,
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 16,
  fontSize: 16,
},
confirmButton: {
  backgroundColor: COLORS.primary,
  paddingVertical: 22,
  borderRadius: 3,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
confirmButtonText: {
  fontSize: 16,
  color: '#000',
  marginLeft: 8,
},
dateLabel:{
  color: COLORS.lightGray,
},
confirmationModalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
},
confirmationModalContent: {
  width: '85%',
  padding: 20,
  backgroundColor: COLORS.white, // Fundo branco
  borderRadius: 10, // Bordas arredondadas
  alignItems: 'center',
  justifyContent: 'center',
},
confirmationModalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: COLORS.black, // Texto preto
  marginBottom: 10,
  textAlign: 'left',
  alignSelf:'flex-start',
},
confirmationModalMessage: {
  fontSize: 14,
  color: COLORS.black, // Texto cinza
  textAlign: 'left',
  marginBottom: 20,
},
confirmationModalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignSelf: 'flex-end',
  marginLeft: 80,
},
confirmationCancelButton: {
  flex: 1,
  alignItems: 'center',
  padding: 12,
},
confirmationConfirmButton: {
  flex: 1,
  alignItems: 'center',
  padding: 12,
  backgroundColor: COLORS.primary, // Cor do botão de confirmar
  borderRadius: 3,
  flexDirection: 'row', // Para ícone e texto ficarem lado a lado
  justifyContent: 'center',
},
confirmationCancelButtonText: {
  color: COLORS.black, // Cor do texto do botão de cancelar
  fontSize: 16,
  fontWeight: '500',
},
confirmationConfirmButtonText: {
  color: COLORS.black, // Cor do texto do botão de confirmar
  fontSize: 16,
  fontWeight: '500',
},
confirmationIcon: {
  marginRight: 5, // Espaçamento entre o ícone e o texto
},
});

export default styles;
