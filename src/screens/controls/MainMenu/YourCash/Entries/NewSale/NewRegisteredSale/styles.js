/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";


export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 100,
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
    color: COLORS.black,
    marginBottom: 10,
    width:'100%',
    marginLeft:28
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    borderBottomWidth:1,
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
    padding: 6,
    borderRadius: 5,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: 'black',
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
    marginTop: 5,
  },
  productActionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginHorizontal: 25,
  },
  productActionButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationCard: {
    backgroundColor: COLORS.white,
    padding: 16,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: 10,
    marginLeft:110,
    marginBottom: 15, // Espaço para o botão de leitura de código de barras
    width: '70%',
    alignSelf: 'center', // Deixando o card menor e centralizado
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 16,
    paddingLeft:10,
  },
  barcodeButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width:'17%',
    marginLeft:310,
    marginTop: 10,
  },

})