/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBartop: {
    height: 55,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  //card produto e serviço:
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle3: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    marginTop: 10,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight:'bold',
  },
  productAmount: {
    fontSize: 14,
    color: COLORS.green,
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginRight: 50
  },
  sectionTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 20,
  },

  dateText: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    fontWeight: 'bold',
  },
  // ... Estilos anteriores
  clientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  clientPicker: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientText: {
    fontSize: 16,
    color: COLORS.black,
  },
  addClientButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    borderRadius: 5,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    paddingHorizontal: 18,
  },
  cartContainer: {
    paddingVertical: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imagePlaceholderText: {
    color: COLORS.white,
    fontSize: 10,
  },
  productDetails: {
    flex: 1,
  },
  cartQuantity: {
    fontSize: 14,
    color: COLORS.green,
    marginTop: 5,
  },
  cartPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 5,
  },
  discountContainer: {

  },
  discountButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  discountButton: {
    backgroundColor: COLORS.lightGray2,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 20
  },
  discountButtonActive: {
    backgroundColor: COLORS.primary,
  },
  discountButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  discountButtonTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  discountInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 10,
  },
  additionalInfoContainer: {
    marginTop: 10,
  },
  additionalInfoInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 10,
  },
  totalContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight:'bold',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingVertical: 25,
    borderRadius: 5,
  },
  generateButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: COLORS.black,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  shareButtonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  viewButton: {
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  viewButtonText: {
    color: COLORS.black,
    fontSize: 16,
  },// card produto e orçemento
  cartSection: {
    marginTop: 10,
    marginLeft: -20,
  },
  Carrinho:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:5,
  },
  containerServiço:{
    justifyContent:'space-between',
  },
  productImage: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginRight: 10,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    width: '100%',
  },
  cartItemSubtitle: {
    fontSize: 14,
    color: COLORS.black,
  },
  cartItemSubtitleMedida: {
    fontSize: 14,
    color: COLORS.green,
  },
  cartItemPrice:{
    color: COLORS.black,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
    marginRight: 80,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cartItemTotal:{
    marginLeft: 70,
    color: COLORS.black,
    fontWeight:'bold',
  },
  cartItemTotalProduct:{
    marginLeft: 60,
    color: COLORS.black,
    fontWeight:'bold',
  },
});

export default styles;
