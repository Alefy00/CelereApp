/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS} from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBase:{
    marginBottom:120,
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight:'600',
    marginBottom: 12,
    color:COLORS.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.black,

  },
  labelSmall: {
    fontSize: 12,
    color: '#212121',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black
  },
  valuePositive: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  valueNegative: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.red,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 8,
  },
  forecastContainer: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.black,
  },
  forecastValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.green,
  },
});

export default styles;
