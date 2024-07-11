/* eslint-disable no-dupe-keys */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconSeta from '../../../../assets/images/svg/iconArrowRight.svg';
import {useNavigation} from '@react-navigation/native';

const Card = ({number, title, buttontitle, pageScreen}) => {
  const navigation = useNavigation();
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };
  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateToScreen(pageScreen)}>
          <IconSeta style={styles.arrowImg} />
          <Text style={styles.buttonText}>{buttontitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    padding: 16,
    margin: 10,
  },
  leftColumn: {
    backgroundColor: '#F4F2D9',
    width: 70,
    height: 105,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 16,
  },
  numberText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#212121',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#212121',
    width: '100%',
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    backgroundColor: '#212121',
    borderRadius: 4,
    width: 115,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
  },
  buttonText: {
    fontSize: 16,
    marginRight: 10,
    color: '#FFFFFF',
  },
  arrowImg: {
    marginRight: 10,
  },
});

export default Card;
