/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Cor de fundo clara
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: "center",
      },
      containerBartop:{
        height:50,
      },
      containerBase: {
        flex: 1,
        backgroundColor: COLORS.background,
      },
Container: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginHorizontal: 20,
        color: COLORS.black,
        marginVertical: 10,
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
        paddingBottom: 8,
        flex: 1,
      },
      dateText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.black,
      },
      dateText2: {
        flex: 1,
        fontSize: 16,
        color: COLORS.black,
        marginHorizontal:20
      },
      boldText: {
        fontWeight: 'bold',
      },
      toggleContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
      },
      toggleButton: {
        flex: 1,
        paddingVertical: 10,
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
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 10,
      },
      clientInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.black,
        paddingVertical: 5,
      },
      addClientButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginRight: 20,
      },
      cartSection: {
        marginTop: 10,
      },
      Carrinho:{
        marginHorizontal: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
      },
      cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      containerServiço:{
        flexDirection: 'row',
        justifyContent:'space-between',
      },
      productImage: {
        width: 50,
        height: 50,

      },
      cartItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        width: '30%',
      },
      cartItemSubtitle: {
        fontSize: 14,
        color: COLORS.black,
        marginLeft: 100,
        fontWeight: '700',
      },
      quantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 20,
        marginRight: 80,
      },
      quantityLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
      },
      quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      quantBottom:{
        padding: 3,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
      },
      quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: COLORS.black,
      },
      priceInput: {
        borderBottomWidth: 1,
        textAlign: 'right',
        width: 120,
      },
      additionalCostsInput: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        marginTop: 20,
      },
      Desconto: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20,
        color: COLORS.black,
        marginTop: 10,
      },
      discountSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
      },
      discountButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
        paddingHorizontal: 25,
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
        padding: 5,
      },
      addProductButton: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignSelf:'center',
        paddingHorizontal: 65,
        marginVertical: 20,

      },
      addProductButtonText: {
        color: COLORS.black,
        alignSelf:'center',
        marginLeft: 10,
        fontSize: 15
      },
      paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20,
        color: COLORS.black,
      },
      paymentSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,

      },
      paymentSection2: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 10,
      },
      paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#efebc4',
        borderRadius: 5,
        marginRight: 10,
      },
      paymentButton2: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      paymentButtonSelected: {
        backgroundColor: COLORS.primary,
      },
      paymentButtonText: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: COLORS.black,
      },
      paymentButtonText2: {
        color: COLORS.black,
        fontWeight: 'bold',
      },
      footer: {
        marginTop: 10,
      },
      concludeButton: {
        padding: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 15,
        flexDirection:'row',
        justifyContent:'center',
      },
      concludeButtonText: {
        color: COLORS.black,
        textAlign: 'center',
        marginLeft: 10,
        fontSize:16,
      },
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
        marginHorizontal: 20,
      },
      clientText: {
        color: COLORS.black,
      },
      dropdownContainerPag: {
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 5,
        marginHorizontal: 20,
      },
      dropdownItem: {
        padding: 10,
        marginHorizontal:10,
      },
      dropdownItemText: {
        color: COLORS.black,
        fontSize: 16,
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
      
    paymentSelectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 15,
      marginHorizontal: 20,
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
      marginHorizontal: 20,
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
