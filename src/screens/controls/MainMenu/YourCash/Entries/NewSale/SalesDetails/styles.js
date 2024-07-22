/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000'
  },
  labelData:{
    color: '#000',
    fontWeight: 'bold',
  },
  dateContainer: {
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderWidth: 1,
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  buttonSell: {
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  buttonText:{
    fontWeight: 'bold',
    color: '#000'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: COLORS.grey,
    padding: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
  productContainer: {
    padding: 10,
    marginVertical: 10,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  productAmount: {
    fontSize: 14,
    color: COLORS.green,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  paymentButton: {
    padding: 10,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  selectedPaymentButton: {
    backgroundColor: COLORS.primary,
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight:'bold',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  confirmButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  discount:{
    borderBottomWidth:1,
    borderColor: COLORS.gray
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#000',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width:'100%',
    justifyContent:'center',
  },
  modalButtonText: {
   
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  modalBackButton: {
    flexDirection:'row',
    marginTop: 20,
   
  },
  modalBackButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft:10,
  },
  });
  
  export default styles;