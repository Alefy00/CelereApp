/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    width: "100%",
    justifyContent: "center",
  },
  registerButtonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    width:'100%',
    marginLeft:28,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    borderBottomWidth:1,
    marginTop: -10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  productsList: {
    padding: 16,
    paddingBottom:140
  },
  productCard: {
    backgroundColor: COLORS.white,
    padding: 6,
    borderRadius: 5,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    flex: 1,
  },
  containerProduct:{
    
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
    color: 'black',
    alignItems: 'flex-start',
  },
  productPrice:{
    color: COLORS.black,
    fontWeight: '600',
  },
  inStock: {
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  productActionButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginHorizontal: 25,
    padding: 5,
  
  },
  productActionButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationCard: {
    position: 'absolute', // Mantém fixo na tela
    bottom: 10, // Levemente acima do final
    left: 120, // Margem lateral
    right: 10, // Margem lateral
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra no Android
    zIndex: 100, // Garantir prioridade
    width: '65%',
    textAlign:'right'
  },
  
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  textAlign:'right'
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",

  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 15,
    paddingLeft:10,
  },
  barcodeButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width:'17%',
    marginLeft:310,
    marginTop: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth:1,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },
  categoryText: {
    color: COLORS.black,
    fontSize: 14,
  },
  categoryTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
      // Estilos do Quarto Modal - Cadastrar Produtos ou Serviços
      fourthModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fourthModalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      },
      fourthModalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      fourthModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 75,
        color: COLORS.black,
      },
      fourthModalButton: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30,
      },
      fourthModalButton2: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 30,
      },
      fourthModalText: {
        fontSize: 16,
        color: COLORS.black,
      },
      yellowButton: {
        backgroundColor: COLORS.primary,
      },


});

export default styles;
