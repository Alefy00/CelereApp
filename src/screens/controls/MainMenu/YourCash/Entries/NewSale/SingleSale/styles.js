/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

const styles = StyleSheet.create({
    // Estilos anteriores
    containerBase: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    containerBartop: {
      height: 50,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    saleTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 10,
    },
    saleDate: {
      fontSize: 14,
      color: COLORS.black,
      marginBottom: 10,
    },
    saleDateValue: {
        color: COLORS.black,
        fontWeight: 'bold',
      },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
      borderWidth: 1,
      borderRadius: 5,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: COLORS.grayLight,
    },
    activeToggleButton: {
      backgroundColor: COLORS.primary,
    },
    toggleButtonText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    cartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 10,
      },
    //card
    cartItem: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1,
        position: 'relative', // Para posicionar o botão de excluir
      },
      removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
        zIndex: 1, // Garantir que o botão fique acima de tudo
      },
      itemLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 10,
      },
      input: {
        height: 40,
        borderColor: COLORS.gray,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: COLORS.black,
        borderBottomWidth: 1,
      },
      quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      quantityLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
      },
      quantityButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
      },
      quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
      },
      addButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '18%',
      },
      // desconto
      DescontoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 10,
        marginTop: 10,
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
       //dropdown pacelamento
  parcelamentoSection: {
    marginTop: 5,
    marginBottom: 10,
  },
  parcelamentoContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  parcelamentoButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  activeParcelamentoButton: {
    backgroundColor: COLORS.primary,

  },
  parcelamentoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  activeParcelamentoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  parcelamentoValue: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 10,
  },
          // Estilos gerais do botão desabilitado
    paymentOptionButtonDisabled: {
      backgroundColor: COLORS.lightGray, // Cor de fundo cinza para indicar desabilitado
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Texto do botão desabilitado
    paymentOptionTextDisabled: {
      color: COLORS.darkGray, // Cor do texto para indicar desabilitado
      fontSize: 14,
    },
      //pagamento metodo
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
      //totais
      totalSection: {
        marginTop: 20,
        padding: 10,
        backgroundColor: COLORS.background,
        borderRadius: 8,
      },
      totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginVertical: 10,
      },
      totalLabel: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: '600',
      },
      totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.green,
      },
    finishButton: {
      backgroundColor: COLORS.primary,
      padding: 25,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    finishButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
      marginLeft: 10,
    },
    //add cliente
    clientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      clientPicker: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.black,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

      },
      clientText: {
        color: COLORS.black,
      },
      //data
      dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
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
        fontSize: 15,
        color: COLORS.black,
      },
      dropdownContainerPag: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 5,

      },
      dropdownItem: {
        padding: 10,
        marginHorizontal:10,
      },
      dropdownItemText: {
        color: COLORS.black,
        fontSize: 16,
      },
      addClientButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
      },
      //modal
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
      modalPrimaryButton2: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.black,
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
      // involce modal
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
        padding: 20,
        alignItems: 'center',
    },
    invoiceModalTitle: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    invoiceOptionButtonRecibo: {
        width: '100%',
        backgroundColor: COLORS.primary,
        padding: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    invoiceOptionTextRecibo: {
        fontSize: 16,
        color: COLORS.black,
    },
    invoiceOptionButtonNotaFiscal: {
        width: '100%',
        padding: 25,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray2,
  
    },
    invoiceOptionTextNotaFiscal: {
        fontSize: 16,
        color: COLORS.black,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    // fiado e boleto
    paymentTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.black,
      marginTop: 20,
      marginBottom: 10,
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
      paddingVertical: 10,
    },
    inactiveToggleButton: {
      backgroundColor: COLORS.white,
    },
    activeToggleText: {
      color: COLORS.black,
      fontSize: 16,
      fontWeight: '600',
    },
    inactiveToggleText: {
      fontWeight: '600',
      color: COLORS.black,
      fontSize: 16,
    },
  });
  
  export default styles;
  