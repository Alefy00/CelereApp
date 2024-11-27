/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../../../../../constants";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Cor de fundo clara
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        justifyContent: "center",
      },
      containerBartop:{
        height: height * 0.07,
      },
      containerBase: {
        flex: 1,
        backgroundColor: COLORS.background,
      },
      Container: {
        flexDirection: 'row',
        width: width * 0.15,
        justifyContent: 'space-between',
      },
      title: {
        fontSize: width * 0.055,
        fontWeight: 'bold',
        marginHorizontal: width * 0.05,
        color: COLORS.black,
        marginVertical: width * 0.025,
      },
      dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
      },
      datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,
        paddingBottom: width * 0.02,
        flex: 1,
      },
      dateText: {
        flex: 1,
        fontSize: width * 0.04,
        color: COLORS.black,
      },
      dateText2: {
        flex: 1,
        fontSize: width * 0.037,
        color: COLORS.black,
        marginHorizontal: width * 0.05,
      },
      boldText: {
        fontWeight: 'bold',
      },
      toggleContainer: {
        flexDirection: 'row',
        marginHorizontal: width * 0.05,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: width * 0.025,
      },
      toggleButton: {
        flex: 1,
        paddingVertical: width * 0.025,
        justifyContent: 'center',
        alignItems: 'center',
      },
      activeTab: {
        backgroundColor: COLORS.primary,
      },
      toggleText: {
        color: COLORS.black,
        fontWeight: 'bold',
      },
      clientSection: {
        flexDirection: 'row',
        paddingHorizontal: width * 0.05,
        alignItems: 'center',
        marginVertical: width * 0.025,
      },
      clientInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.black,
        paddingVertical: width * 0.012,
      },
      addClientButton: {
        backgroundColor: COLORS.primary,
        padding: width * 0.025,
        borderRadius: 5,
        marginRight: width * 0.05,
      },
      cartSection: {
        marginTop: width * 0.025,
      },
      Carrinho: {
        marginHorizontal: width * 0.05,
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: COLORS.black,
    },
      cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      containerServiço:{
        justifyContent:'space-between',
      },
      productImage: {
        width: width * 0.13,
        height: width * 0.13,
        marginLeft: width * 0.05,
        marginRight: width * 0.025,
    },
      cartItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        width: '75%',
      },
      cartItemSubtitle: {
        fontSize: width * 0.035,
        color: COLORS.black,
      },
      cartItemSubtitleMedida: {
        fontSize: width * 0.04,
        color: COLORS.green,
      },
      cartItemPrice:{
        color: COLORS.black,
        marginRight: width * 0.002,
      },
      quantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        marginVertical: width * 0.05,
      },
      quantityLabel: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: COLORS.black,
      },
      quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      quantBottom:{
        padding: width * 0.01,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
      },
      quantityText: {
        marginHorizontal: width * 0.025,
        fontSize: width * 0.04,
        color: COLORS.black,
      },
      priceInput: {
        borderBottomWidth: 1,
        textAlign: 'right',
        width: width * 0.23,
        marginLeft: width * 0.05,
      },
      containerRemove:{
        marginLeft: width * 0.002,
      },
      removeButton:{
        marginHorizontal: width * 0.30,
      },
      cartItemTotal:{
        marginHorizontal: width * 0.22,
        color: COLORS.black,
        fontWeight:'bold',
      },
      cartItemTotalProduct:{
        marginLeft: width * 0.1,
        color: COLORS.black,
        fontWeight:'bold',
      },
      cartItemTotalProduto:{
        marginLeft: width * 0.15,
        color: COLORS.black,
        fontWeight:'bold',
      },
      cartItemTotalProdutoValor:{
        marginHorizontal: width * 0.18,
        color: COLORS.black,
        fontWeight:'bold',
      },
      additionalCostsInput: {
        marginHorizontal: width * 0.05,
        borderBottomWidth: 1,
        marginBottom: width * 0.037,
    },
    Desconto: {
      fontSize: width * 0.045,
      fontWeight: 'bold',
      marginBottom: width * 0.025,
      marginHorizontal: width * 0.05,
      color: COLORS.black,
      marginTop: width * 0.025,
    },
      discountSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: width * 0.05,
        marginHorizontal: width * 0.05,
      },
      discountButton: {
        padding: width * 0.025,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        marginRight: width * 0.025,
        paddingHorizontal: width * 0.05,
      },
      activeDiscountButton: {
        backgroundColor: COLORS.primary,
      },
      discountButtonText: {
        fontWeight: '900',
      },
      discountInput: {
        flex: 1,
        borderBottomWidth: 1,
        padding: width * 0.012,
      },
      addProductButton: {
        flexDirection: 'row',
        padding: width * 0.04,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignSelf:'center',
        paddingHorizontal: width * 0.15,
        marginVertical: width * 0.05,
      },
      addProductButtonText: {
        color: COLORS.black,
        alignSelf:'center',
        marginLeft: width * 0.025,
        fontSize: width * 0.037,
      },
      paymentTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginBottom: width * 0.025,
        marginHorizontal: width * 0.05,
        color: COLORS.black,
      },
      paymentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: width * 0.05,
      },
      //fiado
      paymentToggleContainer: {
        flexDirection: 'row',
        marginBottom: width * 0.025,
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 5,
      },
      ContainerFormaPagamento:{
        marginHorizontal: width * 0.04,
      },
      paymentButtonforma:{
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.01,
        borderRadius: 5,
        flexDirection:'row',
        backgroundColor: '#efebc4',
        marginHorizontal: width * 0.01,
      },
      selectedPaymentButton: {
        backgroundColor: COLORS.primary,
      },
      paymentButtonText: {
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: COLORS.black,
        marginLeft: width * 0.015,
      },
      paymentSection2: {
        flexDirection: 'row',
        marginHorizontal:  width * 0.04,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: height * 0.01,
      },
      paymentButton2:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: height * 0.015,
      },
      paymentButtonSelected:{
        backgroundColor: COLORS.primary,
      },
      paymentButtonText2: {
        color: COLORS.black,
        fontWeight: 'bold',
      },
      //pagamento stylo total
      totalContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: height * 0.085,
        marginHorizontal: width * 0.04,
      },
      totalContainer2: {
        marginBottom: height * 0.015,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal: width * 0.04,
      },
      totalLabel: {
        fontSize: width * 0.04,
        color: COLORS.black,
        marginBottom: height * 0.01,
        fontWeight:'bold',
        marginTop: width * 0.02,
      },
      totalValue: {
        fontSize: width * 0.055,
        fontWeight: 'bold',
        color: COLORS.green,
      },
      footer: {
        marginTop: width * 0.055,
      },
      concludeButton: {
        padding: width * 0.055,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginHorizontal: width * 0.04,
        marginBottom: height * 0.015,
        flexDirection:'row',
        justifyContent:'center',
      },
      concludeButtonText: {
        color: COLORS.black,
        textAlign: 'center',
        marginLeft: width * 0.02,
        fontSize:width * 0.04,
      },
      clientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      clientPicker: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.black,
        paddingVertical: height * 0.015,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: width * 0.04,
      },
      clientText: {
        color: COLORS.black,
      },
      dropdownContainerPag: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 5,
        marginHorizontal: width * 0.04,
      },
      dropdownItem: {
        padding: width * 0.02,
        marginHorizontal:width * 0.04,
      },
      dropdownItemText: {
        color: COLORS.black,
        fontSize: width * 0.04,
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
      modalPrimaryButtonText: {
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
      // Estilos gerais do botão desabilitado
    paymentOptionButtonDisabled: {
      backgroundColor: COLORS.lightGray, // Cor de fundo cinza para indicar desabilitado
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.035,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Texto do botão desabilitado
    paymentOptionTextDisabled: {
      color: COLORS.darkGray, // Cor do texto para indicar desabilitado
      fontSize:  width * 0.035,
    },
    paymentSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: height * 0.015,
      marginHorizontal: width * 0.04,
    },
    valueSummaryContainer: {
      marginVertical: height * 0.025,
      marginHorizontal: width * 0.04,
    },
    valueItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical:  height * 0.01,
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
    valueAmountTaxa:{
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: COLORS.red,
    },
    sectionTitle: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: height * 0.01,
      marginHorizontal: width * 0.04,
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
      backgroundColor: COLORS.lightGray3
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
  //dropdown pacelamento
  parcelamentoSection: {
    marginTop: 5,
    marginBottom: height * 0.01,
  },
  parcelamentoContainer: {
    flexDirection: 'row',
    marginTop: height * 0.01,
  },
  parcelamentoButton: {
    paddingVertical: height * 0.01,
    paddingHorizontal:  width * 0.04,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight:  width * 0.02,
  },
  activeParcelamentoButton: {
    backgroundColor: COLORS.primary,
  },
  parcelamentoText: {
    fontSize:  width * 0.04,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
  activeParcelamentoText: {
    fontSize:  width * 0.04,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  parcelamentoValue: {
    marginTop: height * 0.01,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft:  width * 0.01,
  },

  });

export default styles;
