/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      width: '100%',
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -10,
    },
    infoContainer: {
      flex: 1,
      justifyContent:  'space-between',
      marginLeft: 10,
      flexDirection: 'row',
    },
    infoBlock: {
      alignItems: 'center',
    },
    infoTitle: {
      fontSize: 14,
      color: COLORS.black,
    },
    infoValue: {
      fontSize: 18,
      fontWeight: '900',
      color: COLORS.black,
    },
    detailsContainer: {
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 2,
    },
    colorIndicatorGreen: {
      width: 15,
      height: 10,
      backgroundColor: COLORS.green,
      marginRight: 5,
      borderRadius: 5,
    },
    colorIndicatorRed: {
      width: 15,
      height: 10,
      backgroundColor: COLORS.red,
      marginRight: 5,
      borderRadius: 5,
    },
    detailText: {
      fontSize: 14,
      flex: 1,
      color: COLORS.black,
    },
    detailValueGreen: {
      fontSize: 14,
      color: COLORS.green,
    },
    detailValueRed: {
      fontSize: 14,
      color: COLORS.red,
    },
  });

  export default styles;