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
      receiptList: {
        flex: 1,
        width: '100%',
      },
      receiptCard: {
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 1,
      },
      receiptDate: {
        fontSize: 16,
        color: COLORS.black,
      },
      receiptProducts: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 2,
      },
      receiptTotal: {
        fontSize: 16,
        color: COLORS.black,
      },

  });

export default styles;
