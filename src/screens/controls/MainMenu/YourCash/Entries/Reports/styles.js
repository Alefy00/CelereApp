/* eslint-disable prettier/prettier */
import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCF5",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedFilterButton: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    color: "#000",
    fontWeight: 'bold',
  },
  pickeralign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth:1,
  },
  pickerText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  pickerIcon: {
    marginLeft: 10,
    color: COLORS.gray,
  },
  dropdown: {
    backgroundColor: '#FFF',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  balanceContainer: {
    padding: 20,
    borderRadius: 20,
    margin: 10,
    backgroundColor:'#fff',
    elevation: 1,  // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,

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
    color: COLORS.orange,
  },
  balenceValue2: {
    color: COLORS.orange,
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
  balanceBarOrange: {
    flex: 1,
    backgroundColor: COLORS.orange,
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
    alignItems:'center',
    marginTop: 10,
    marginRight:5
  },
  containerInfo:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
  balanceRecommendedValue: {
    fontSize: 22,
    color: COLORS.green,
    fontWeight: "bold",
    textAlign: "center",
  },
  chartContainer: {
    paddingHorizontal:30,
    marginHorizontal:10,
    backgroundColor:'#fff',
    elevation: 1,  // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
  },
  chartContainer3: {
    paddingHorizontal:30,
    marginHorizontal:10,
    backgroundColor:'#fff',
    elevation: 1,  // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chartContainer2: {
    paddingHorizontal:30,
    marginHorizontal:10,
    marginBottom:15,
    backgroundColor:'#fff',
    elevation: 1,  // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderBottomEndRadius:20,
    borderBottomLeftRadius:20,
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
    marginHorizontal:10,
    flexDirection: 'row',
    justifyContent:'space-around',
    backgroundColor:'#fff',
    elevation: 1,  // Sombra para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  informationText: {
    fontSize: 16,
    fontWeight: "bold",
    color:'#000',
    marginBottom: 5,
    marginRight:5,
  },
  informationValue: {
    fontSize: 16,
    color: COLORS.green,
    marginBottom: 10,
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
    
  },
  containerInfoIcon:{
    flexDirection:'row',
    alignItems:'center',
    textAlign:'center',
    marginBottom:5,
  }
});

export default styles;
