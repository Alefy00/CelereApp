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
    flexDirection: 'row',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    elevation:1,
    marginHorizontal: 15,
  },
  contaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contaTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  contaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  contaProdutos: {
    fontSize: 14,
    color: COLORS.grey,
  },
  contaValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop:-22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.grey,
    fontSize: 16,
  },
});

export default styles;
