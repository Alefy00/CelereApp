/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      content: {
        padding: 20,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        color:'#000'
      },
      dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
      },
      labelData: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      inputGroup: {
        marginVertical: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: 5,
        padding: 10,
      },
      quantityContainer: {
        marginVertical: 10,
      },
      quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      quantityButton: {
        padding: 8,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
      },
      quantityButtonText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent:'center'
      },
      quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
      },
      addButton: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
      },
      addButtonText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 'bold',
      },
      paymentButton: {
        padding: 10,
        backgroundColor: COLORS.lightGray2,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
      },
      selectedPaymentButton: {
        backgroundColor: COLORS.primary,
      },
      paymentButtonText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight:'bold',
      },
      discount: {
        borderColor: COLORS.grey,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        borderBottomWidth:1,
      },
      totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
      },
      totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.green,
      },
      confirmButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      confirmButtonText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
      },
})