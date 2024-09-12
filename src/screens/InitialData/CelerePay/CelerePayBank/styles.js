/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBartop: {
    height: 50,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  subTitle: {
    fontSize: 19,
    color: COLORS.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
  },
  checkboxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    color: COLORS.black,
    marginRight: 20,
  },
  input: {
    height: 40,
    borderColor: COLORS.grey,
    borderBottomWidth: 1,
    marginBottom: 5,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  inputHalf: {
    width: '48%',
  },
  confirmButtonContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 18,
    color: COLORS.black,
    marginLeft: 10,
  },
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent2: {
    width: 350,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems:'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalTitle2: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalDataContainer: {
    marginBottom: 20,
  },
  modalDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalDataItem: {
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  modalText2: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 25,
    textAlign:'center',

  },
  modalValue: {
    fontSize: 14,
    color: COLORS.black,
  },
  modalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 5,
  },
  modalButton2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 5,
    width:'100%'
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
});

export default styles;
