/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 20,
      },
      barTopContainer: {
        height: 50,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      },
      barTop: {
        width: '100%',
        height: 50,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 70, // Ajustando para compensar a posição do BarTop3
        marginBottom: 20,
        color: COLORS.black,
      },
      gridContainer: {
        justifyContent: 'center',
      },
      option: {
        flex: 1,
        margin: 10,
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:1,
      },
      optionText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        color: COLORS.black,
        fontWeight: '700',
      },
});

export default styles;
