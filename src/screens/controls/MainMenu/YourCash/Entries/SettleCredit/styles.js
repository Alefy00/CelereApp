/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,

  },
  containerBartop:{
    marginBottom:30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 40,
    paddingHorizontal:15,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginVertical: 10,
    paddingHorizontal:15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal:15,
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal:15,
    height: 40,
    borderBottomWidth:1
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    marginLeft: 5,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal:15,
    borderRadius:5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
  },
  tabButtonText: {
    color: COLORS.black,
  },
  tabButtonTextActive: {
    color: 'black',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  contaItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 15,
  },
  contaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  
  },
  contaTextContainer: {
    marginLeft: 10,
  },
  contaNome: {
    fontSize: 16,
    color: 'black',
  },
  contaData: {
    fontSize: 14,
    color: COLORS.black,
  },
  contaProdutos: {
    fontSize: 12,
    color: COLORS.gray,
  },
  contaSituacao: (status) => ({
    fontSize: 14,
    color: status === 'Liquidada' ? COLORS.green : COLORS.red,
  }),
  contaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 50,
    marginTop: -70
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.bl,
    fontSize: 16,
  },

  //estilo molde contas a receber
  contaItem2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contaInfo2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contaTextContainer2: {
    marginLeft: 10,
  },
  contaNome2: {
    fontSize: 16,
    color: 'black',
  },
  contaData2: {
    fontSize: 14,
    color: COLORS.black,
  },
  contaVencimento: {
    fontSize: 14,
    color: COLORS.black,
  },
  contaProdutos2: {
    fontSize: 12,
    color: COLORS.gray,
  },
  contaSituacaoLiquidada2: {
    fontSize: 14,
    color: COLORS.green,
  },
  contaValor2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 50,
    marginTop: -60,
  },
});

export default styles;
