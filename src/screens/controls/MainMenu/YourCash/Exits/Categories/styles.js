/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants'; // Certifique-se de ajustar o caminho corretamente

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBE6',
        paddingTop: 16,
      },
      containerBartop2:{
        marginTop: -18,
        marginBottom: 10,
      },
      contentContainer: {
        flex: 1,
        marginTop: 10, // Garantir que a lista não fique sobre o BarTop2
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom:100,
        
      },
      title: {
        fontSize: 22,
        fontWeight: '900',
        color: '#000',
        marginTop:50,
        marginLeft: 20,
      },
      subtitle: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 20,
        marginVertical: 10,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        borderBottomWidth:1,
        borderColor: COLORS.black,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
      },
      searchButton: {
        marginLeft: 10,
      },
      categoryList: {
        flexGrow: 1,

      },
      categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical:5,
        paddingHorizontal: 16,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      categoryName: {
        fontSize: 16,
        marginLeft: 10,
        color: '#000',
      },
      deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
      },
      deleteButtonText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#000',
      },
      addButtonContainer: {
        padding: 16,
        backgroundColor: '#FFFBE6',
      },
      addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 5,
      },
      addButtonText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#000',
      },
});

export default styles;
