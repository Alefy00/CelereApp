/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../../../constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    pdf: {
        flex: 1, // O WebView agora vai ocupar todo o espaço disponível
        width: '100%', // Certifique-se de que o PDF ocupa toda a largura da tela
        height: height * 0.9, // PDF ocupa uma grande parte da altura da tela
        backgroundColor: COLORS.white, // Certifique-se de que o fundo seja branco
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: COLORS.background,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    closeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
    },
    buttonText: {
        marginLeft: 8,
        color: COLORS.black,
        fontSize: 16,
    },
});

export default styles;
