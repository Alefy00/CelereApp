/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Define a cor de fundo de toda a tela
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  saleDetailsContainer: {
    marginVertical: 10,
    
  },
  saleDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  saleDate: {
    fontSize: 14,
    color: COLORS.black,
    marginTop: 5,
  },
  saleDateValue: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderColor: COLORS.black,
    alignItems: 'center',
    
  },
  activeButton: {
    backgroundColor: COLORS.primary,
    borderRadius:5,
  },
  inactiveButtonText: {
    color: COLORS.black,
  },
  activeButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  clientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  clientPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  clientText: {
    fontSize: 16,
    color: COLORS.black,
  },
  addClientButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxHeight: 150, // Limita a altura do dropdown
    marginTop: -25,
    elevation: 2,
    width: '100%', // Certifica-se que o dropdown tenha a largura completa
  },
  dropdownContainerPag: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxHeight: 150, // Limita a altura do dropdown
    elevation: 2,
    width: '100%', // Certifica-se que o dropdown tenha a largura completa
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  cartContainer: {
    marginBottom: 10,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight:'bold',
  },
  productAmount: {
    fontSize: 14,
    color: COLORS.green,
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  discountButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: COLORS.lightGray2,

  },
  activeDiscountButton: {
    backgroundColor: COLORS.primary,

  },
  inactiveDiscountButtonText: {
    color: COLORS.black,
    fontWeight:'bold',
  },
  activeDiscountButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  discountInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background,
  },
  paymentButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    flexDirection:'row',
    backgroundColor: '#efebc4',
  },
  selectedPaymentButton: {
    backgroundColor: COLORS.primary,
  },
  paymentButtonText: {
    color: COLORS.black,
    fontSize: 15,
    marginLeft: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    marginTop: 80,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 10,
    marginBottom: 20,
  },
  modalPrimaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  modalPrimaryButtonText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
  modalSecondaryButton: {
    borderColor: COLORS.black,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  modalSecondaryButtonText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  modalBackButtonText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
    // ...existing styles

    paymentSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 15,
    },
    paymentOptionButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#efebc4',
      marginRight: 5,
    },
    selectedPaymentOptionButton: {
      backgroundColor: COLORS.green,  // Cor verde para o botão selecionado
    },
    paymentOptionText: {
      fontSize: 16,
      color: COLORS.black,
    },
    selectedPaymentOptionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,  // Texto branco para o botão selecionado
    },
    paymentTypeContainer: {
      borderBottomWidth: 1,
      marginTop: -10,
    },
    picker: {
      height: 50,
      width: '100%',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
    },
    valueSummaryContainer: {
      marginVertical: 20,
    },
    valueItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    valueLabel: {
      fontSize: 16,
      color: '#000',
      fontWeight: 'bold',
    },
    
    valueAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green,
    },
    valueAmount2: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    valueAmountTaxa:{
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.red,
    },
});

export default styles;
