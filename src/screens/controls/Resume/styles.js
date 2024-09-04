/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  ContainerCarousel:{
    marginBottom:10
  },
  ContainerCircle:{
    marginHorizontal: 20,
  },
  label:{
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
    marginLeft:20
  },
  label2:{
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
    marginLeft:20,
    marginTop:10,
  },
  ContainerFilter:{
    marginHorizontal: 20,
  },
  containerBottons:{
    marginTop:'40%',
  }
});

export default styles;