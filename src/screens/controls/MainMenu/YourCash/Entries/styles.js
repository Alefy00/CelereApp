/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      content: {
        flex: 1,
        padding: 16,
        backgroundColor: COLORS.lightGrey,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.gray,
        justifyContent: 'space-between', // Adiciona espaço entre o texto e a seta
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      },
      optionLabel: {
        fontSize: 16,
        color: COLORS.black,
      },
      arrow: {
        fontSize: 18,
        fontWeight:'bold',
        color: COLORS.grey,
      },
      modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
      },
      modalHeader: {
        width: '100%',
        alignItems: 'flex-end',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.green,
      },
      modalSubtitle: {
        fontSize: 16,
        marginBottom: 20,
      },
      modalOption: {
        width: '100%',
        padding: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
      },
      modalOption2: {
        width: '100%',
        padding: 15,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        marginVertical: 5,
        alignItems: 'center',
      },
      modalOptionText: {
        fontSize: 16,
        fontWeight:'bold'
      },
})