/* eslint-disable prettier/prettier */
/* styles.js */
import { StyleSheet } from 'react-native';
import { COLORS } from "../../../../../../../constants"; 

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContainer: {
    width: 360,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.black,
  },
  datePickerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: COLORS.black,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  dateLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  input: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.black,
    borderBottomWidth: 1,
    marginVertical: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  confirmButton: {
    backgroundColor: COLORS.primary, 
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
});

export default styles;
