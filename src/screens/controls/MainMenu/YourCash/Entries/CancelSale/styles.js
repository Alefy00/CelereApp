/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
  },
  searchButtonText: {
    color: 'black',
  },
  listTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  vendaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
  },
  cancelButtonText: {
    color: 'white',
  },
  textCancel:{
    fontSize:22,
    color: '#000',
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 25,
  }
})

export default styles;