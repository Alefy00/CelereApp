/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBartop: {
    height: 50,
  },
  categoryContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    height: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'left',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    marginBottom: 20,
    width: '100%',
    
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryList: {
    width: '100%',
    marginBottom: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: COLORS.black,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    width: '90%',
    position: 'absolute',
    bottom: 20,
    borderRadius: 5,
    marginHorizontal:20,

  },
  addButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
});

export default styles;
