/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Fundo claro, quase branco
    width: "100%",
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Mantém o fundo branco
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 10,
  },
  textDate: {
    fontSize: 16,
    color: COLORS.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    elevation: 3, // Sombra leve
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#FFC700', // Amarelo
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#000', // Texto preto
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseContainer: {
    padding: 15,
    backgroundColor: '#fff', // Fundo branco para os cards
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Sombra para destacar os cards
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 5,
  },
  valueText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.green,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
    elevation: 5, // Sombra para o modal
  },
  modalContent: {
    width: '100%',
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.black,
  },
  modalExpenseItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  liquidateButton: {
    backgroundColor: '#FFC700', // Amarelo
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  liquidateButtonText: {
    color: '#000', // Texto preto
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButtonBottom: {
    marginTop: 20,
    backgroundColor: '#FFC700', // Amarelo para manter o design
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000', // Texto preto
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#000', // Borda preta
  },
  tabButtonActive: {
    backgroundColor: '#FFC700', // Ativo em amarelo
  },
  tabButtonInactive: {
    backgroundColor: '#fff', // Inativo em branco
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default styles;

