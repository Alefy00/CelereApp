/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  barTopContainer: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: '100%',
  },
  option: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionDisabled: {
    backgroundColor: '#f0f0f0',
    opacity: 0.6,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  optionSubText: {
    fontSize: 14,
    color: '#666',
  },
  activityIndicator: {
    marginTop: 20,
  },
});
