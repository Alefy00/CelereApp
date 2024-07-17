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
      option: {
        width: '100%',
        padding: 16,
        marginVertical: 8,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
      },
      selectedOption: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.green,
      },
      optionLabel: {
        fontSize: 16,
        color: COLORS.black,
      },
      selectedOptionLabel: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
      },
      button: {
        height: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        paddingHorizontal: 16,
        marginTop: 16,
      },
      buttonText: {
        fontSize: 16,
        color: COLORS.white,
      },
})