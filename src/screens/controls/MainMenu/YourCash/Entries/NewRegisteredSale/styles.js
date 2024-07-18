/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
      header: {
        padding: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
      },
      registerButton: {
        backgroundColor: COLORS.yellow,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
      },
      registerButtonText: {
        color: COLORS.black,
        fontSize: 16,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 10,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '100%',
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
      },
      productsList: {
        padding: 16,
      },
      productCard: {
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 5,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
      },
      productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      inStock: {
        color: 'green',
      },
      outOfStock: {
        color: 'red',
      },
      productActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
      },
      productActionButton: {
        backgroundColor: COLORS.lightGrey,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      },
      productActionButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      productQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      barcodeButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
})