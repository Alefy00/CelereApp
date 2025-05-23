/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../../constants";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  floatingContainer: {
    position: 'absolute',
    right: width * 0.05,
    bottom: height * 0.04,
    zIndex: 10,
  },
  button: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: height * 0.04,
  },
  modalButton2: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: height * 0.04,
    borderWidth: 1,
  },
  modalText: {
    fontSize: width * 0.045,
    marginLeft: width * 0.012,
  },
  yellowButton: {
    backgroundColor: COLORS.primary,
  },
  blackText: {
    color: COLORS.black,
  },
  secondModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondModalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  secondModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  secondModalTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.black,
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  secondModalButton: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginBottom: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: height * 0.04,
  },
  secondModalText: {
    fontSize: width * 0.04,
    color: COLORS.black,
    marginLeft: width * 0.012,
  },
  thirdModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdModalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  thirdModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  thirdModalTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  thirdModalSubtitle: {
    fontSize: width * 0.032,
    marginLeft: width * 0.025,
  },
  thirdModalSubtitle2: {
    fontSize: width * 0.04,
    marginBottom: height * 0.012,
    marginLeft: width * 0.025,
    color: COLORS.black,
  },
  thirdModalButton: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: 'center',
    paddingVertical: height * 0.035,
  },
  thirdModalButton2: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: height * 0.035,
  },
  containerAvulsa: {
    flexDirection: 'row',
  },
  thirdModalText: {
    fontSize: width * 0.04,
    marginLeft: width * 0.012,
    color: COLORS.black,
  },
  fourthModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fourthModalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: width * 0.05,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fourthModalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  fourthModalTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    marginLeft: width * 0.18,
    color: COLORS.black,
  },
  fourthModalButton: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: height * 0.045,
  },
  fourthModalButtonDisable: {
    width: '100%',
    padding: width * 0.04,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray2,
    alignItems: 'center',
    marginBottom: height * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: 'center',
    paddingVertical: height * 0.045,
  },
  fourthModalText: {
    fontSize: width * 0.04,
    color: COLORS.black,
  },
});

export default styles;
