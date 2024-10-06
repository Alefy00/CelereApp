/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.primary, // Cor de fundo clara
  },
  containerBartop: {
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerIcon: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 25,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  taxInfo: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 20,
  },
  installmentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 90,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.black,
    marginBottom: 10,
  },
  link: {
    fontSize: 12,
    color: COLORS.linkColor, // Define uma cor de link
    textDecorationLine: 'underline',
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  confirmButtonContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    paddingVertical: 22,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 10,
  },

});

export default styles;
