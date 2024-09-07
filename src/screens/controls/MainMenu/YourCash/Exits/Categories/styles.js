/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants'; // Certifique-se de ajustar o caminho corretamente

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBE6',
        paddingTop: 16,
      },
      contentContainer: {
        flex: 1,
        marginTop: 60, // Garantir que a lista não fique sobre o BarTop2
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        color: '#6C6C6C',
        marginBottom: 16,
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
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
        marginBottom: 16,
      },
      categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
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
        padding: 16,
        borderRadius: 10,
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
        borderTopWidth: 1,
        borderColor: '#E6E6E6',
      },
      addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC700',
        padding: 16,
        borderRadius: 10,
      },
      addButtonText: {
        fontSize: 16,
        marginLeft: 8,
        color: '#000',
      },
});

export default styles;
