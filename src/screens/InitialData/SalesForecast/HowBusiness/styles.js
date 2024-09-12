/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Fundo amarelo claro
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        textAlign:'left',
        marginBottom:110
        
    },
    label: {
        fontSize: 22,
        color: COLORS.black,
        marginBottom: 20,
        textAlign: 'left',
        fontWeight:'900',
        width:'80%',
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    dayButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        minWidth: '20%',
        alignItems: 'center',
    },
    selectedDayButton: {
        backgroundColor: COLORS.primary,
        
    },
    dayButtonText: {
        fontSize: 16,
        color: '#939393',
        fontWeight:'600'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkboxLabel: {
        fontSize: 16,
        color: COLORS.black,
    },
    button: {
      height: 80,
      backgroundColor: COLORS.primary, // Cor amarela do botão
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      position: 'absolute',
      bottom:0,
      left: 0,
      right: 0,
      marginBottom:20,
      flexDirection:'row',
      marginHorizontal:20
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.black, // Texto preto
        fontWeight: '500',
        marginLeft:10,
    },
});

export default styles;
