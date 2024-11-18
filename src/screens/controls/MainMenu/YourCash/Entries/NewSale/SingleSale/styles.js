/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions  } from "react-native";
import { COLORS } from "../../../../../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    containerBase: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    containerBartop: {
      height: height * 0.07, // altura responsiva
    },
    container: {
      flex: 1,
      paddingHorizontal: width * 0.05,
      paddingVertical: height * 0.02,
    },
    saleTitle: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: height * 0.012,
    },
    saleDate: {
      fontSize: width * 0.035,
      color: COLORS.black,
      marginBottom: height * 0.012,
    },
    saleDateValue: {
      color: COLORS.black,
      fontWeight: 'bold',
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.01,
      borderWidth: 1,
      borderRadius: 5,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: height * 0.015,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: COLORS.grayLight,
    },
    activeToggleButton: {
      backgroundColor: COLORS.primary,
    },
    toggleButtonText: {
      fontSize: width * 0.035,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    cartTitle: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: height * 0.015,
    },
    // card
    cartItem: {
      backgroundColor: COLORS.white,
      padding: width * 0.04,
      borderRadius: 10,
      marginBottom: height * 0.02,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 1,
      position: 'relative',
    },
    removeButton: {
      position: 'absolute',
      top: height * 0.015,
      right: width * 0.05,
      backgroundColor: 'transparent',
      zIndex: 1,
    },
    itemLabel: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: height * 0.015,
    },
    input: {
      height: height * 0.05,
      borderColor: COLORS.gray,
      borderRadius: 5,
      paddingHorizontal: width * 0.025,
      marginBottom: height * 0.012,
      color: COLORS.black,
      borderBottomWidth: 1,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    quantityLabel: {
      fontSize: width * 0.035,
      fontWeight: 'bold',
      marginRight: width * 0.025,
    },
    quantityButton: {
      backgroundColor: COLORS.primary,
      padding: width * 0.03,
      borderRadius: 5,
    },
    quantityText: {
      fontSize: width * 0.04,
      marginHorizontal: width * 0.03,
    },
    addButton: {
      backgroundColor: COLORS.primary,
      padding: width * 0.03,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: width * 0.18,
    },
    // desconto
    DescontoTitle: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: height * 0.015,
      marginTop: height * 0.015,
    },
    discountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: height * 0.025,
    },
    discountButton: {
      paddingVertical: height * 0.025,
      paddingHorizontal: width * 0.08,
      borderRadius: 5,
      marginRight: width * 0.025,
      backgroundColor: COLORS.lightGray2,
    },
    activeDiscountButton: {
      backgroundColor: COLORS.primary,
    },
    activeDiscountButtonText: {
      color: COLORS.black,
      fontWeight: 'bold',
    },
    discountInput: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: COLORS.black,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.03,
      backgroundColor: COLORS.background,
    },
    // dropdown parcelamento
    parcelamentoSection: {
      marginTop: height * 0.012,
      marginBottom: height * 0.02,
    },
    parcelamentoContainer: {
      flexDirection: 'row',
      marginTop: height * 0.02,
    },
    parcelamentoButton: {
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.05,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: width * 0.03,
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
    // Estilos gerais do botão desabilitado
    paymentOptionButtonDisabled: {
      backgroundColor: COLORS.lightGray,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.03,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  paymentOptionTextDisabled: {
      color: COLORS.darkGray,
      fontSize: width * 0.035,
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
      marginTop: -height * 0.012,
  },
  picker: {
      height: height * 0.06,
      width: '100%',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
  },
  valueSummaryContainer: {
      marginVertical: height * 0.03,
  },
  valueItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: height * 0.01,
  },
  valueLabel: {
      fontSize: width * 0.04,
      color: '#000',
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
      fontSize: width * 0.038,
      marginLeft: width * 0.012,
  },
  totalSection: {
      marginTop: height * 0.015,
      padding: width * 0.025,
      backgroundColor: COLORS.background,
      borderRadius: 8,
  },
  totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: height * 0.01,
  },
  totalLabel: {
      fontSize: width * 0.04,
      color: COLORS.black,
      fontWeight: '600',
  },
  totalValue: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      color: COLORS.green,
  },
  finishButton: {
      backgroundColor: COLORS.primary,
      padding: height * 0.035,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },
  finishButtonText: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: COLORS.black,
      marginLeft: width * 0.025,
  },
  clientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: height * 0.012,
  },
  clientPicker: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: COLORS.black,
      paddingVertical: height * 0.015,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  clientText: {
      color: COLORS.black,
  },
  dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: height * 0.012,
      marginTop: height * 0.012,
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
  dropdownContainerPag: {
      borderWidth: 1,
      borderColor: COLORS.lightGray,
      borderRadius: 5,
  },
  dropdownItem: {
      padding: width * 0.025,
      marginHorizontal: width * 0.025,
  },
  dropdownItemText: {
      color: COLORS.black,
      fontSize: width * 0.04,
  },
  addClientButton: {
      backgroundColor: COLORS.primary,
      padding: width * 0.025,
      borderRadius: 5,
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
    top: width * 0.025,
    right: width * 0.025,
},
paymentTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: height * 0.025,
    marginBottom: height * 0.015,
},
paymentToggleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    overflow: 'hidden',
},
toggleButtonfiado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.015,
},
inactiveToggleButton: {
    backgroundColor: COLORS.white,
},
activeToggleText: {
    color: COLORS.black,
    fontSize: width * 0.04,
    fontWeight: '600',
},
inactiveToggleText: {
    fontWeight: '600',
    color: COLORS.black,
    fontSize: width * 0.04,
},
  });
  
  export default styles;
  