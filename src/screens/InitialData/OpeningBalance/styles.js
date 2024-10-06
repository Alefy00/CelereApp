/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export default StyleSheet.create({
  containerMain:{
    justifyContent:'center',
    padding:20,
    marginTop:60,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 1,  // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 5,
  },
  totalBalanceContainer: {
    justifyContent: 'center',
    marginVertical: 15,
    alignItems:'flex-end',
  },
  totalBalanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  totalBalanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.green,  // Verde para o valor total
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: COLORS.primary,  // Amarelo do botão
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 75,
    flexDirection:'row',
    justifyContent:'center'
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.black,
    paddingLeft:10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
  },
  modalContent2: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    color: '#000',
  },
  secondModalText:{
    fontSize: 22,
    color:COLORS.black,
    marginBottom:10,
    fontWeight: 'bold',
  },
  modalBalance: {
    fontSize: 24,
    color: COLORS.green, // Verde para o valor
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.primary, // Amarelo para o botão
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 80,
  },
  confirmButton2: {
    backgroundColor: COLORS.primary, // Amarelo para o botão
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal:120,
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,

  },
});
