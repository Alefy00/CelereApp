/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

const styles = StyleSheet.create({
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
      },
      dateContainer: {
        marginBottom: 20,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
      },
      button: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
      },
      productContainer: {
        padding: 20,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        marginVertical: 10,
      },
      productDetail: {
        marginBottom: 10,
      },
      productText: {
        fontSize: 16,
        marginBottom: 5,
      },
      paymentButton: {
        padding: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      selectedPaymentButton: {
        backgroundColor: COLORS.primary,
      },
      paymentButtonText: {
        fontSize: 16,
      },
      totalContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
      totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.success,
      },
      confirmButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: COLORS.success,
        borderRadius: 5,
        alignItems: 'center',
      },
      confirmButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
      },
  });
  
  export default styles;