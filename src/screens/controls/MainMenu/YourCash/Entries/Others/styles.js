/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  barTopContainer: {
    width: '100%', // Ocupar a largura total da tela
    height: 50, // Altura de 50 para o BarTop2
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    marginTop: 5,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  entryItem: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryData: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  entryJustificativa: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 4,
    width: '60%'
  },
  entryValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 35,
    marginLeft: -140,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: 'row',
  },
  addButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 5,
  },


});

export default styles;
