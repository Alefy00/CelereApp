/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants";

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',  // Fundo padrão branco para a tela inteira
    },
    barTopContainer: {
      width: '100%',
      position: 'absolute',
      top: 0,
    },
    contentContainer: {
      marginTop: 39,  // Espaço reservado para o BarTop2
      padding: 20,
      backgroundColor: COLORS.primary,  // Cor de fundo amarela apenas para o design específico
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
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
      width: '48%',  // Para ajustar o espaçamento e evitar quebra
      padding: 15,
      marginBottom: 10,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 5,
        
      },
      filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth:1
      },
      filterButtonActive: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#FFD700',
        borderRadius: 5,
      },
      filterButtonText: {
        color: '#000',
        fontSize: 16,
      },
      filterButtonTextActive: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      productList: {
        paddingHorizontal: 18,
      },
      productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
      },
      productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
      },
      productInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
      },
      productAvailable: {
        color: COLORS.green,
        fontSize: 16,
      },
      productPrice: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      productTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
      },
      fixedButtonsContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        alignItems: 'center',

      },
      fixedButton: {
        width: 45,
        height: 45,
        backgroundColor: '#FFD700',  // Cor amarela para os botões
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
      },
  });

export default styles;