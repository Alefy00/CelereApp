/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    containerBase: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    containerBartop: {
      height: 55,
      width: '100%',
      backgroundColor: COLORS.primary,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: COLORS.background,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 10,
      textAlign: 'left',
      marginTop:10,
    },
    subtitle: {
      fontSize: 14,
      color: COLORS.black,
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.background,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.black,
      paddingHorizontal:10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: COLORS.black,
    },
    clientListContainer: {
      flex: 1, // Garantir que a lista ocupe o espaço disponível
      marginBottom: 20,
    },
    clientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      elevation: 1,
    },
    clientInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginRight: 10,
    },
    clientName: {
      fontSize: 16,
      color: COLORS.black,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 5,
      justifyContent: 'center',
      marginBottom: 10,
    },
    addButtonText: {
      fontSize: 16,
      color: COLORS.black,
      marginLeft: 10,
    },
  });
  
  export default styles;
