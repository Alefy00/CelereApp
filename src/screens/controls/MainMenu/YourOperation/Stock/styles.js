/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  barTopContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  contentContainer: {
    marginTop: 39,
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '48%',
    padding: 15,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.black,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'normal',
    textAlign: 'center',
    color: COLORS.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingLeft: 10,
  },
  searchIcon: {
    padding: 10,
  },
  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 0, // Removendo qualquer padding extra para alinhar o carrossel
    alignItems: 'center', // Centraliza os itens verticalmente,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000', // Borda para os botões não ativos
    marginHorizontal: 5, // Margem entre os botões
    flexShrink: 1, // Permite que o botão se ajuste ao tamanho do texto
  },
  filterButtonActive: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    marginHorizontal: 5, // Margem entre os botões
    flexShrink: 1, // Permite que o botão se ajuste ao tamanho do texto
  },
  filterButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productList: {
    paddingHorizontal: 18,
    marginTop:10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  productAvailable: {
    color: COLORS.green,
    fontSize: 14,
  },
  productPrice: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  fixedButtonsContainer: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    alignItems: 'center',
  },
  fixedButton: {
    width: 45,
    height: 45,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginLeft:200
  },
  fixedButton2: {
    flexDirection: 'row',
    width: 180,
    height: 45,
    backgroundColor: '#FFD700',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginLeft:60,
  },
  textAdd:{
    color:COLORS.black,
    marginLeft:10,
    fontSize: 14,
  }
});

export default styles;
