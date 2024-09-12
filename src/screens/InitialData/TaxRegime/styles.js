/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
    /* ------------ Global Base Styles ------------ */
    // Container da tela principal, com flex para empurrar o botão de confirmar para o final
    screenContainer: {
        flex: 1,

        backgroundColor: COLORS.background,
    },

    // Container da Barra de Navegação Superior (BarTop)
    containerBartop: {
        height: 50,
        width: '100%'
    },

    // Container de Título e Subtítulo da Tela
    title: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.black,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    subtitleSimpesNacional: {
        fontSize: 16,
        color: COLORS.black,
        paddingHorizontal: 20,
        marginBottom: 2,
        fontWeight: '800',
    },
    subtitleSimpesNacionalInfo: {
        fontSize: 15,
        color: COLORS.black,
        marginBottom: 10,
        paddingHorizontal: 20,
    },



    /* ------------ Button Styles (Usado em Todos os Componentes) ------------ */
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 20,
        marginLeft: -5,
        
        
    },
    button: {
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 18,
        justifyContent: 'center',
        alignItems: 'center',
        width: '33%',
        marginRight: 5,
    },
    selectedButton: {
        backgroundColor: COLORS.primary,
        borderWidth: 0,
    },
    buttonText: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: 'bold',
    },

    /* ------------ Option Button Styles (Usado em Simples Nacional e Lucro Presumido) ------------ */
    optionButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efebc4',
    },
    buttonText2: {
        fontSize: 14,
        color: COLORS.black,
        textAlign: 'center',
    },
    selectedOptionButton: {
        backgroundColor: COLORS.primary,
    },
    selectedbuttonText: {
        fontSize: 14,
        color: COLORS.black,
        paddingHorizontal: 5,
        textAlign: 'center',
    },


    /* ------------ Input Styles (Usado em MEI, Simples Nacional e Lucro Presumido) ------------ */
    inputContainer: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,
        marginHorizontal: 20,
        marginTop: -10,
    },
    input: {
        fontSize: 16,
        padding: 10,
        color: COLORS.black,
    },

    /* ------------ Confirm Button Styles (Fixado no Final da Tela) ------------ */
    confirmButtonContainer: {
        justifyContent: 'flex-end',  // Empurra o botão para o final da tela
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,  // Margem inferior para não colar no final da 
        position: 'absolute',
        bottom: 0,
    },
    confirmButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 25,
        borderRadius: 5,
    },
    confirmButtonText: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    /* ------------ Modal Styles (Usado nos Modais de Confirmação) ------------ */
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 350,
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    modalText: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '800',
    },
    modalValue: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 50,
    },
    modalButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 25,
        borderRadius: 5,
    },
    modalButtonText: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 10,
    },
    /* ------------ Modal Styles (SimpleNational Confirmação) ------------ */
    SimpleNationalmodalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    SimpleNationalmodalContent: {
        width: 350,
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    SimpleNationalmodalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    SimpleNationalmodalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    SimpleNationalmodalText: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '800',

    },
    SimpleNationalmodalValue: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 10,
    },
    SimpleNationalmodalValue2: {
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 50,
        backgroundColor: COLORS.primary,
        padding:5,
        width: '90%',
        borderRadius: 5,
        fontWeight: '600',

    },
    SimpleNationalmodalButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 25,
        borderRadius: 5,
        
    },
    SimpleNationalmodalButtonText: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 10,
    },
    /* ------------ Modal Styles (SimpleNational Confirmação) ------------ */
    LucroPresumidomodalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    LucroPresumidomodalContent: {
        width: 350,
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    LucroPresumidomodalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    LucroPresumidomodalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    LucroPresumidomodalText: {
        fontSize: 14,
        color: COLORS.black,
        fontWeight: '800',

    },
    LucroPresumidomodalValue: {
        fontSize: 16,
        color: COLORS.black,
        marginBottom: 10,
    },
    LucroPresumidomodalValue2: {
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 50,
        backgroundColor: COLORS.primary,
        padding:5,
        width: '90%',
        borderRadius: 5,
        fontWeight: '600',

    },
    LucroPresumidomodalButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 25,
        borderRadius: 5,
        
    },
    LucroPresumidomodalButtonText: {
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 10,
    },
    
});

export default styles;
