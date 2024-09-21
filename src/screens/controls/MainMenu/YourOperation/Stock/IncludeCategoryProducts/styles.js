/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  inputLabel: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
    fontWeight:'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    paddingVertical: 10,
    fontSize: 16,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
  },
  confirmButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width:'90%'
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default styles;
