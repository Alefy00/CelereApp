/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Cor de fundo clara
  },
  Title:{
    fontSize: 22,
    color: COLORS.black,
    marginTop: 10,
    marginHorizontal: 20,
    fontWeight: '900'
  },
  subTitle: {
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerInput:{
    flexDirection:'row',
    width: '72%',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: COLORS.grey,
    paddingHorizontal: 8,
    marginLeft: 10,
    marginTop: -10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 15,
    marginTop: -10,
  },
  filterButtonText: {
    marginLeft: 8,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  vendaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  vendaData: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  vendaProdutos: {
    fontSize: 14,
    color: COLORS.grey,
  },
  vendaValor: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.black,
    marginBottom: 20
  },
    // Estilos do modal
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '90%',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    modalInputContainer: {
      marginBottom: 20,
    },
    modalInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.grey,
      marginBottom: 16,
    },
    modalInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 8,
    },
    modalFilterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: 12,
      borderRadius: 5,
    },
    modalFilterButtonText: {
      marginLeft: 8,
      color: COLORS.black,
      fontWeight: 'bold',
    },
});

export default styles;
