/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 10,
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    color: "#000",
    fontWeight: 'bold',
  },
  pickerContainer: {
    padding: 10,
    borderBottomWidth: 1,
    width: "90%",
    justifyContent: 'center',
  },
  pickeralign: {
    alignItems: 'center'
  },
  picker: {
    height: 50,
    width: '100%',
  },
  balanceContainer: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  balanceBox: {
    justifyContent: 'space-around',
  },
  balanceBox2: {
    justifyContent: 'center',
    textAlign: 'justify',
    alignItems: 'flex-start',
    width: '50%'
  },
  balanceBox3: {
    justifyContent: 'center',
    textAlign: 'justify',
    alignItems: 'flex-end',
    width: '50%'
  },
  balanceRow2: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 15,
    color: "#000",
    fontWeight: 'bold',
  },
  balancenumber: {
    color: COLORS.green,

  },
  balenceValue: {
    color: COLORS.green,
  },
  amountgreen: {
    color: COLORS.green,
  },
  amountred: {
    color: COLORS.red,
  },
  balancenumber2: {
    color: COLORS.red,
  },
  balenceValue2: {
    color: COLORS.red,
  },
  arrow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: "bold",
   
  },
  balanceBarContainer: {
    flexDirection: "row",
    height: 10,
    marginBottom: 10,
  },
  balanceBarGreen: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  balanceBarRed: {
    flex: 1,
    backgroundColor: COLORS.red,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  balanceInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  balanceRecommended: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: "center",
    marginTop: 10,
  },
  balanceRecommendedValue: {
    fontSize: 22,
    color: COLORS.green,
    fontWeight: "bold",
    textAlign: "center",
  },
  chartContainer: {
    paddingHorizontal:30
  },
  chartTitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  capitalContainer: {
    padding: 10,
    alignItems: "center",
  },
  capitalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  capitalValue: {
    fontSize: 18,
    color: COLORS.primary,
    marginBottom: 10,
  },
  textEspaco: {
    color: "#000",
    margin: 10,
    fontSize: 14,
    marginLeft: 15
  },
  informationContainer: {
    paddingVertical:20,
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  informationText: {
    fontSize: 16,
    fontWeight: "bold",
    color:'#000',
    marginBottom: 5,
  },
  informationValue: {
    fontSize: 16,
    color: COLORS.green,
    marginBottom: 5,
    fontWeight:'bold',
    justifyContent:'space-around',
  },
  containerTextInfo:{
    textAlign:'left',
    justifyContent:'space-around',
  },
  containerTextValue:{
    textAlign:'right',
    alignItems:'flex-end',
    
  }
});

export default styles;
