/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../../../../../../constants";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: width * 0.04, // Ajuste proporcional
  },
  saleDetailsContainer: {
    marginBottom: height * 0.02, // Ajuste proporcional
  },
  saleDetailsTitle: {
    fontSize: width * 0.05, // Ajuste para tamanhos variados de tela
    fontWeight: 'bold',
    color: COLORS.black,
  },
  saleDate: {
    fontSize: width * 0.04,
    color: COLORS.black,
    marginTop: height * 0.01,
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
    marginBottom: height * 0.02,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.012, // Ajuste proporcional
  },
  activeButton:{
    backgroundColor: COLORS.primary,
  },
  activeButtonText:{
    color: COLORS.black,
    fontWeight:'bold',
  },
  inactiveButtonText:{
    color: COLORS.black,
    fontWeight: 'bold',
  },
  clientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.005,
    paddingBottom: height * 0.01,
  },
  clientPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.03,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  clientText: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  addClientButton: {
    backgroundColor: COLORS.primary,
    padding: height * 0.012,
    borderRadius: 5,
    marginLeft: width * 0.02,
  },
  dropdownContainer: {
    maxHeight: height * 0.2, // Limita a altura do dropdown
    marginTop: -height * 0.03,
    width: '100%', 
  },
  dropdownItem: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.03,
  },
  dropdownItemText: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.012,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    paddingBottom: height * 0.01,
    flex: 1,
  },
  dateText: {
    flex: 1,
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  cartContainer: {
    marginBottom: height * 0.012,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: height * 0.012,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.012,
    padding: width * 0.03,
    borderRadius: 5,
  },
  productImage: {
    width: width * 0.12,
    height: width * 0.12,
    marginRight: width * 0.03,
  },
  productInfo: {
    flex: 1,
  },
  productText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  productPrice: {
    color: COLORS.black,
  },
  productAmount: {
    fontSize: width * 0.035,
    color: COLORS.green,
    marginTop: height * 0.005,
  },
  productTotal: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  discountButton: {
    padding: width * 0.03,
    borderRadius: 5,
    marginRight: width * 0.02,
    paddingHorizontal: width * 0.05,
    backgroundColor: COLORS.lightGray2,
  },
  activeDiscountButton: {
    backgroundColor: COLORS.primary,
  },
  addMoreButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.018,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 5,
  },
  addMoreButtonText: {
    marginLeft: width * 0.03,
    color: COLORS.black,
    fontSize: width * 0.04,
  },
  discountInput: {
    flex: 1,
    fontSize: width * 0.04,
    padding: width * 0.03,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  paymentToggleContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
  },
  paymentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.012,
  },
  selectedPaymentButton: {
    backgroundColor: COLORS.primary,
  },
  paymentButtonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: width * 0.02,
  },
  totalContainer: {
    marginBottom: height * 0.02,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.08,
  },
  totalLabel: {
    fontSize: width * 0.04,
    color: COLORS.black,
    marginBottom: height * 0.005,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.018,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  confirmButtonText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: width * 0.02,
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
    padding: width * 0.05,
    alignItems: 'center',
  },
  modalText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  modalPrimaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    width: '100%',
  },
  modalPrimaryButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
  },
  modalSecondaryButton: {
    borderColor: COLORS.black,
    borderWidth: 1,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    width: '100%',
  },
  modalPrimaryButton2: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  modalSecondaryButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.015,
  },
  modalBackButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.02,
  },
  invoiceModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  invoiceModalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: 'center',
  },
  invoiceModalTitle: {
    fontSize: width * 0.045,
    marginBottom: height * 0.02,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  invoiceOptionButtonRecibo: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: height * 0.015,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  invoiceOptionTextRecibo: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  invoiceOptionButtonNotaFiscal: {
    width: '100%',
    padding: height * 0.015,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: COLORS.lightGray2,
  },
  invoiceOptionTextNotaFiscal: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.02,
  },  
});

export default styles;
