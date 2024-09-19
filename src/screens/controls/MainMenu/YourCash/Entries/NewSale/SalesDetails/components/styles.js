/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  saleDetailsContainer: {
    marginBottom: 20,
  },
  saleDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  saleDate: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 8,
  },
  saleDateValue: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeButton: {
    backgroundColor: COLORS.primary,
  },
  inactiveButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  clientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
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
    elevation: 3,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    paddingBottom: 8,
    flex: 1,
  },
  dateText: {
    flex: 1,
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
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
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
    fontWeight: 'bold',
    color: COLORS.black,
  },
  productAmount: {
    fontSize: 14,
    color: COLORS.green,
    marginTop: 5,
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
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGray2,
  },
  activeDiscountButton: {
    backgroundColor: COLORS.primary,
  },
  activeDiscountButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  inactiveDiscountButtonText: {
    color: COLORS.black,
  },
  discountInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  paymentToggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
  },
  paymentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    
  },
  selectedPaymentButton: {
    backgroundColor: COLORS.primary,
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 10,
  },
  totalContainer: {
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 80,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight:'bold',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 20,
  },
  modalPrimaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  modalPrimaryButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  modalSecondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  modalSecondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 10,
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 15,
  },
  modalBackButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },

  
});

export default styles;
