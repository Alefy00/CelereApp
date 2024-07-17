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
        marginBottom: 8,
      },
      inputContainer: {
        width: '100%',
        marginBottom: 16,
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