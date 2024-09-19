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
  });

export default styles;
