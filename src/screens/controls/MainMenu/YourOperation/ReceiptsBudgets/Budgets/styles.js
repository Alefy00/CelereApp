/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

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
      containerBase:{
        flex: 1,
      },
      Title:{
        fontSize: 22,
        color: COLORS.black,
        fontWeight: '900',
        justifyContent:'flex-start',
        width: '100%',
        marginTop: 10,
      },
      searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
      },
      searchInput: {
        flex: 1,
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
      },
      filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 8,
        marginLeft: 10,
      },
      filterText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.black,
      },
      budgetList: {
        flex: 1,
      },
      budgetCard: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 1,
      },
      budgetName: {
        fontSize: 16,
        color: COLORS.black,
      },
      budgetDate: {
        fontSize: 12,
        color: COLORS.black,
        marginTop: 2,
      },
      budgetProducts: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 2,
      },
      budgetTotal: {
        fontSize: 16,
        color: COLORS.black,
      },
      addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: COLORS.primary,
        paddingVertical: 22,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      addButtonText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.black,
      },
      //modal excluir
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semitransparente
      },
      modalcontainerSegund:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLORS.black,
      },
      modalText: {
        fontSize: 16,
        marginBottom: 10,
        color: COLORS.black,
        
      },
      deleteButton: {
        width: '100%',
        backgroundColor: COLORS.primary, // Amarelo para o botão de excluir
        paddingVertical: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      deleteButtonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
      },
      cancelButton: {
        width: '100%',
        paddingVertical: 25,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      cancelButtonText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
      },
  });

export default styles;
