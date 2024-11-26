/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../../../../constants";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBartop: {
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: height * 0.05,
    paddingHorizontal: width * 0.04,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: COLORS.black,
    marginVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
    paddingHorizontal: width * 0.04,
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    height: height * 0.05,
    borderBottomWidth: 1,
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    marginLeft: width * 0.02,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    marginLeft: width * 0.02,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: width * 0.04,
    borderRadius: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: height * 0.012,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
  },
  tabButtonText: {
    color: COLORS.black,
  },
  tabButtonTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: height * 0.02,
  },
  contaItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: width * 0.04,
    marginVertical: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: width * 0.04,
  },
  contaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contaTextContainer: {
    marginLeft: width * 0.025,
  },
  contaNome: {
    fontSize: width * 0.04,
    color: 'black',
  },
  contaData: {
    fontSize: width * 0.035,
    color: COLORS.black,
  },
  contaProdutos: {
    fontSize: width * 0.03,
    color: COLORS.gray,
  },
  contaSituacao: (status) => ({
    fontSize: width * 0.035,
    color: status === 'Liquidada' ? COLORS.green : COLORS.red,
  }),
  contaValor: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: "15%",
    marginTop: "-20%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.bl,
    fontSize: width * 0.04,
  },
  contaItem2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width * 0.04,
    marginVertical: height * 0.015,
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
    marginLeft: width * 0.025,
  },
  contaNome2: {
    fontSize: width * 0.04,
    color: 'black',
    marginRight: "10%",
  },
  contaData2: {
    fontSize: width * 0.035,
    color: COLORS.black,
  },
  contaVencimento: {
    fontSize: width * 0.035,
    color: COLORS.black,
  },
  contaProdutos2: {
    fontSize: width * 0.03,
    color: COLORS.gray,
  },
  contaSituacaoLiquidada2: {
    fontSize: width * 0.035,
    color: COLORS.green,
  },
  contaValor2: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: "20%",
    marginTop: "-20%",
  },
});

export default styles;
