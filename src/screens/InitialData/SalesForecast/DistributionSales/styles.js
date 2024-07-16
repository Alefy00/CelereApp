/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      label: {
        fontSize: 18,
        color: COLORS.black,
        marginBottom: 16,
      },
      inputContainer: {
        width: '100%',
        marginBottom: 16,
      },
      weekLabel: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 4,
      },
      input: {
        height: 40,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        fontSize: 16,
        backgroundColor: COLORS.lightGrey,
      },
      totalContainer: {
        width: '100%',
        marginTop: 16,
      },
      totalLabel: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 4,
        textAlign: 'center',
      },
      totalRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      totalValue: {
        fontSize: 16,
        color: COLORS.black,
      },
      editIcon: {
        fontSize: 20,
        color: COLORS.primary,
        marginLeft: 8,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 16,
      },
      button: {
        height: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingHorizontal: 16,
      },
      buttonText: {
        fontSize: 16,
        color: COLORS.white,
      },
})