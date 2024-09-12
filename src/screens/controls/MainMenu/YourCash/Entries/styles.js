/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginTop: -30,
    marginBottom: 30
  },
  option: {
    width: '48%', // Tamanho de cada item para caber em duas colunas
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  optionIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  optionTextContainer: {
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    width: '100%',
    alignItems: 'flex-end',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.green,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalOption: {
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalOption2: {
    width: '100%',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
