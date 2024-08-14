/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#FFEB3B',
    
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
    alignItems: 'center',
  },
  modalOptionSelected: {
    backgroundColor: '#FFEB3B',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#CCC',
    marginHorizontal: 5,
  },
  modalSaveButton: {
    backgroundColor: '#FFEB3B',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default styles;
