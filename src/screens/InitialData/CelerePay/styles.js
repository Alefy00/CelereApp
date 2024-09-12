/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background, // Cor de fundo clara
  },
  containerBartop: {
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerIcon: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  taxInfo: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 20,
  },
  installmentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 90,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 10,
  },
  link: {
    fontSize: 12,
    color: COLORS.linkColor, // Define uma cor de link
    textDecorationLine: 'underline',
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  confirmButtonContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 22,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },

  /* ------------ Modal Styles ------------ */
  modalOverlay: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  close:{
    width: '100%',
    alignItems:'flex-end',
    marginTop: -40,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
    marginTop: 10,
    textAlign:'center',
    marginHorizontal: -10
  },
  modalTax: {
    fontSize: 14,
    color: COLORS.black,
    lineHeight: 22,
  },
});

export default styles;
