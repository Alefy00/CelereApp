/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  barTop: {
    width: '100%',
    height: 50, // Altura do BarTop conforme o design
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 20,
  },
  loanItem: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 16,
    flexDirection: 'column',
  },
  loanValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.black,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addButtonText: {
    color: COLORS.black,

    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalClose: {
    fontSize: 20,
    color: COLORS.black,
  },
  input: {
    height: 50,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    right: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row', // Para alinhar o ícone com o texto
    paddingVertical:25
  },
  iconButton: {
    marginRight: 8,
  },
  saveButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
