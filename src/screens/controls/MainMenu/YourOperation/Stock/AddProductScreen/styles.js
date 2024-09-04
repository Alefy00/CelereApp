/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  barTopContainer: {
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.black,
    marginTop: 35,
    paddingLeft: 20,
    backgroundColor: COLORS.primary,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: COLORS.primary,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -80
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: -80,
    paddingLeft: 20
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLabel: {
    marginTop: 10,
    color: COLORS.black,
    fontWeight: '500',
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    color: COLORS.black,
    marginBottom: -10,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    marginBottom: 5,
    borderRadius: 10,
  },
  controlLabel: {},
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlValue: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  productDetailsContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
  },
  productNameInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    marginBottom: 20,
    paddingVertical: 5,
    color: COLORS.black,
  },
  serviceDescriptionInput: {
    height: 80,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
    color: COLORS.black,
  },
  categoryContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    flex: 1,
    marginRight: 10,
  },
  categoryPlaceholder: {
    color: '#A9A9A9',
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
