/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../../../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.025,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: height * 0.01,
    marginHorizontal: width * 0.05,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: height * 0.025,
  },
  saleDetailsContainer: {
    marginVertical: height * 0.012,
  },
  saleDetailsTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  saleDate: {
    fontSize: width * 0.035,
    color: COLORS.black,
    marginTop: height * 0.012,
  },
  saleDateValue: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    borderColor: COLORS.black,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
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
    marginBottom: height * 0.025,
    paddingBottom: height * 0.012,
  },
  clientPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: height * 0.015,
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
    padding: width * 0.025,
    borderRadius: 5,
    marginLeft: width * 0.025,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxHeight: height * 0.2,
    marginTop: -height * 0.03,
    elevation: 2,
    width: '100%',
  },
  dropdownContainerPag: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxHeight: height * 0.2,
    elevation: 2,
    width: '100%',
  },
  dropdownItem: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.025,
  },
  dropdownItemText: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  cartContainer: {
    marginBottom: height * 0.01,
  },
  sectionTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: height * 0.015,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: width * 0.025,
    borderRadius: 5,
    marginBottom: height * 0.015,
  },
  productImage: {
    width: width * 0.13,
    height: width * 0.13,
    marginRight: width * 0.025,
  },
  productInfo: {
    flex: 1,
  },
  productText: {
    fontSize: width * 0.04,
    color: COLORS.black,
    marginBottom: height * 0.01,
    fontWeight: 'bold',
  },
  productPrice: {
    color: COLORS.black,
  },
  productAmount: {
    fontSize: width * 0.035,
    color: COLORS.green,
  },
  containerRemove:{
    paddingHorizontal: width * 0.001,
  },
  removerIcon:{
    marginLeft: width * 0.15,
  },
  productTotal: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  addMoreButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.02,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 5,
  },
  addMoreButtonText: {
    marginLeft: width * 0.025,
    color: COLORS.black,
    fontSize: width * 0.04,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  discountButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.075,
    borderRadius: 5,
    marginRight: width * 0.025,
    backgroundColor: COLORS.lightGray2,
  },
  activeDiscountButton: {
    backgroundColor: COLORS.primary,
  },
  inactiveDiscountButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  activeDiscountButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  discountInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.025,
    backgroundColor: COLORS.background,
  },
  paymentButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.025,
    borderRadius: 5,
    marginRight: width * 0.025,
    flexDirection: 'row',
    backgroundColor: '#efebc4',
  },
  selectedPaymentButton: {
    backgroundColor: COLORS.primary,
  },
  paymentButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.012,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.015,
    paddingVertical: height * 0.015,
    marginTop: height * 0.1,
  },
  totalLabel: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  totalValue: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.025,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.01,
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.025,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: width * 0.05,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: height * 0.015,
    marginBottom: height * 0.025,
  },
  modalPrimaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015,
    width: '100%',
  },
  modalPrimaryButton2: {
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015,
    width: '100%',
    borderWidth:1,
  },
  modalPrimaryButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.025,
  },

  modalSecondaryButton: {
    borderColor: COLORS.black,
    borderWidth: 1,
    paddingVertical: height * 0.04,
    paddingHorizontal: width * 0.05,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.015,
    width: '100%',
  },
  modalSecondaryButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.025,
  },
  modalBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.04,
  },
  modalBackButtonText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    marginLeft: width * 0.025,
  },
  paymentSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.02,
  },
  paymentOptionButton: {
    flex: 1,
    paddingVertical: height * 0.015,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#efebc4',
    marginRight: width * 0.012,
  },
  selectedPaymentOptionButton: {
    backgroundColor: COLORS.green,
  },
  paymentOptionText: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
  selectedPaymentOptionText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  paymentTypeContainer: {
    borderBottomWidth: 1,
    marginTop: -height * 0.015,
  },
  picker: {
    height: height * 0.06,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
  },
  valueSummaryContainer: {
    marginVertical: height * 0.025,
  },
  valueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.012,
  },
  valueLabel: {
    fontSize: width * 0.04,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  valueAmount: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  valueAmount2: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  valueAmountTaxa: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: COLORS.red,
  },
  invoiceModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  invoiceModalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: 'center',
},
invoiceModalTitle: {
    fontSize: width * 0.045,
    marginBottom: height * 0.025,
    fontWeight: 'bold',
    color: COLORS.black,
},
invoiceOptionButtonRecibo: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: height * 0.03,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: height * 0.015,
},
invoiceOptionTextRecibo: {
    fontSize: width * 0.04,
    color: COLORS.black,
},
invoiceOptionButtonNotaFiscal: {
    width: '100%',
    padding: height * 0.03,
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
    top: height * 0.012,
    right: width * 0.025,
},
parcelamentoSection: {
  marginTop: height * 0.012,
  marginBottom: height * 0.015,
},
parcelamentoContainer: {
  flexDirection: 'row',
  marginTop: height * 0.012,
},
parcelamentoButton: {
  paddingVertical: height * 0.015,
  paddingHorizontal: width * 0.05,
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: width * 0.025,
},
activeParcelamentoButton: {
  backgroundColor: COLORS.primary,
},
parcelamentoText: {
  fontSize: width * 0.04,
  fontWeight: 'bold',
  color: COLORS.gray,
},
activeParcelamentoText: {
  fontSize: width * 0.04,
  fontWeight: 'bold',
  color: COLORS.black,
},
parcelamentoValue: {
  marginTop: height * 0.015,
  fontSize: width * 0.04,
  fontWeight: 'bold',
  color: COLORS.black,
  marginLeft: width * 0.025,
},
paymentOptionButtonDisabled: {
  backgroundColor: COLORS.lightGray,
  paddingVertical: height * 0.015,
  paddingHorizontal: width * 0.03,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},
paymentOptionTextDisabled: {
  color: COLORS.darkGray,
  fontSize: width * 0.035,
},
});

export default styles;
