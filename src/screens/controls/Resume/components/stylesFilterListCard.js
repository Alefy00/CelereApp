/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
    scrollContainer: {
      backgroundColor: COLORS.background,
      paddingBottom:140,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      marginVertical: 10,
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    containerfilter: {
    },
    containerArrow: {
      flexDirection: 'row',
    },
    toggleButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 5,
    },
    activeButton: {
      backgroundColor: COLORS.lightGray2,
    },
    toggleText: {
      fontSize: 14,
      color: COLORS.black,
      fontWeight: '900',
    },
    toggleValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.red,
    },
    activeText: {
      color: COLORS.red,
      fontWeight: '900',
    },
    activeText3: {
      color: COLORS.black,
      fontWeight: '900',
    },
    activeText2: {
      color: COLORS.green,
    },
    toggleValue2: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.green,
    },
    balanceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    balanceText: {
      fontSize: 14,
      color: COLORS.black,
    },
    balanceSubText: {
      fontSize: 12,
      color: COLORS.black,
    },
    balanceValue: {
      fontSize: 22,
      fontWeight: '900',
      color: COLORS.green,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.black,
      paddingBottom: 5,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      marginTop: -5,
      marginBottom: -10,
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    pixIcon: {
      marginRight: 0,
    },
    itemInfo: {
      flex: 1,
      marginLeft:10,
    },
    itemDescription: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: COLORS.black,
    },
    itemDetails: {
      fontSize: 12,
      color: '#666666',
      marginTop: -5,
    },
    itemAmount: {
      fontSize: 15,
      fontWeight: 'bold',
      color: COLORS.green,
    },
    separator: {
      height: 1,
      backgroundColor: '#DDD',
    },
  });

  export default styles;
  