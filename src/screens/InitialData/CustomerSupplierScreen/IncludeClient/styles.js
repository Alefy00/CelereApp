/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Garantir a cor de fundo no SafeArea
  },
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background, // Garantir a cor de fundo para o contêiner base
    justifyContent: 'space-between', // Garantir que o botão de confirmar fique no final
  },
  containerBartop: {
    height: 50,
    backgroundColor: COLORS.background, // Cor de fundo para o BarTop3
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.background, // Cor de fundo garantida no ScrollView
    justifyContent:'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonText:{
    color:COLORS.black,
    marginLeft:10,
    fontWeight:'500'
  },
  addFromContactsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    fontSize: 16,
    color: COLORS.black,
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: COLORS.background, // Garante que o contêiner do botão tenha a cor de fundo
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 25,
    borderRadius: 5,
    justifyContent: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginVertical: 5,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    paddingVertical:20,
    elevation:1
  },
  modalButtonSecondary: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:20,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    elevation:1,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  contactItemNome:{
    color: COLORS.black,
    fontSize: 16,
  },
  contactItem:{
    marginTop: 20,
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
  },
});

export default styles;
