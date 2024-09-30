/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: 50,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,

  },
  containerColor:{
    backgroundColor: COLORS.primary,
    width:'100%',
    flexDirection: 'row',
    alignItems: "center",
    paddingBottom: 10
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
    
  },
  barcodeInput: {
    height: 40,
    borderColor: COLORS.black,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    flex: 1,
    marginLeft: 15,
    borderBottomWidth: 1,
  },
  imageLabelTitle: {
    color: COLORS.black,
    fontSize: 20,
    width:'100%',
    backgroundColor: COLORS.primary,
    paddingLeft: 20,
    paddingBottom: 20,
    fontWeight: '900',
    
  },
  imageLabel:{
    color: COLORS.black,
    fontSize: 14,
    width:'100%',
    backgroundColor: COLORS.primary,
    paddingLeft: 35,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  checkboxContainer:{
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkboxLabel:{
    marginLeft: 10,
  },
  input: {
    height: 50,
    borderColor: COLORS.black,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  textArea: {
    height: 100,
    borderColor: COLORS.black,
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.black,
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  dropdownText: {
    flex: 1,
    textAlign: 'left',
  },
  button: {
    height: 85,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    flexDirection: 'row',

  },
  buttonText: {
    fontSize: 18,
    color: COLORS.black,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.black,
    backgroundColor:COLORS.primary,
    padding:10,
    borderRadius:8,
    paddingHorizontal:20,
  },

  clientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  clientPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  clientText: {
    fontSize: 16,
    color: COLORS.lightGray,
  },
  addClientButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxHeight: 150, // Limita a altura do dropdown
    marginTop: -25,
    elevation: 2,
    width: '100%', // Certifica-se que o dropdown tenha a largura completa
  },
  dropdownContainerPag: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    maxHeight: 150, // Limita a altura do dropdown
    elevation: 2,
    width: '100%', // Certifica-se que o dropdown tenha a largura completa
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#FFD700', // Amarelo do botão
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 120,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Texto preto
  },
});

export default styles;