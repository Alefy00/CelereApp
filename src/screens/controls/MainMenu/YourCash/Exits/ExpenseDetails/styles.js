/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    barTopContainer: {
        height: 50,
    },
    contentContainer: {
        padding: 20,
        flex: 1,
    },
    title:{
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.black,
        marginVertical: 10,
    },
    detailsCard: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
    },
    detailsInfo: {
        flex: 1,
    },
    expenseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 5,
    },
    expenseCategory: {
        fontSize: 14,
        color: COLORS.gray,
        marginBottom: 8,
    },
    expenseSubtitle: {
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 4,
    },
    expenseSubtitleBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.black,
        marginTop: 8,
    },
    expenseValue: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.black,
        marginBottom:150,
    },
    expenseReference:{
        color: COLORS.black,
    },
    expenseCreatedDate:{
        color: COLORS.black,
    },
    expenseDueDate:{
        color: COLORS.black,
        fontSize: 16,
        fontWeight: '500',
    },
    expenseStatusTitle:{
        color: COLORS.black,
    },
    expenseStatus:{
        color: COLORS.red,
    },
    actionButtonFull: {
        backgroundColor: COLORS.primary,
        padding: 25,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 1,
    },
    actionButtonTextFull: {
        color: COLORS.black,
        marginLeft: 10,
        fontSize: 16,
    },
    actionButton: {
        backgroundColor: COLORS.white,
        padding: 25,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.black,
        elevation: 1,
    },
    actionButton2: {
        backgroundColor: COLORS.white,
        padding: 25,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 1,
    },
    actionButtonText: {
        color: COLORS.black,
        marginLeft: 10,
        fontSize: 16,
    },
    actionButtonDelete: {
        backgroundColor: COLORS.white,
        padding: 25,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
    },
    actionButtonTextDelete: {
        color: COLORS.black,
        marginLeft: 10,
        fontSize: 16,
    },
})
export default styles;
