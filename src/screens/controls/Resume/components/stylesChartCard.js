/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../../constants";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: width * 0.025,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * -0.01,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: width * 0.025,
    flexDirection: 'row',
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: width * 0.035,
    color: COLORS.black,
  },
  infoValue: {
    fontSize: width * 0.045,
    fontWeight: '900',
    color: COLORS.black,
  },
  detailsContainer: {},
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.005,
  },
  colorIndicatorGreen: {
    width: width * 0.04,
    height: height * 0.012,
    backgroundColor: COLORS.green,
    marginRight: width * 0.015,
    borderRadius: 5,
  },
  colorIndicatorRed: {
    width: width * 0.04,
    height: height * 0.012,
    backgroundColor: COLORS.red,
    marginRight: width * 0.015,
    borderRadius: 5,
  },
  detailText: {
    fontSize: width * 0.035,
    flex: 1,
    color: COLORS.black,
  },
  detailValueGreen: {
    fontSize: width * 0.035,
    color: COLORS.green,
  },
  detailValueRed: {
    fontSize: width * 0.035,
    color: COLORS.red,
  },
});

export default styles;
