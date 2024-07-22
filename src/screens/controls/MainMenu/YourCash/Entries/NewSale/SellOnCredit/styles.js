/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color:'#000',
  },
  dateContainer: {
    marginBottom: 1,
  },
  labelData: {
    fontSize: 16,

  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: COLORS.grey,
    borderRadius: 5,
    borderBottomWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderWidth:1,
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  buttonSell: {
    padding: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
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
    padding: 20,
    marginVertical: 10,
  },
  productDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productText: {
    fontSize: 16,
    color:'#000',
    fontWeight: 'bold'
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
    color: COLORS.green,
  },
  discount: {
    borderColor: COLORS.grey,
    padding: 10,
    marginVertical: 10,
    borderBottomWidth:1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems:'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
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
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  modalButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.success,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalBackButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalBackButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
})