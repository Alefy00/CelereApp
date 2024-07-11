import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
} from '../../../../../../../constants';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import '../../../../../../../translation';

const {width, height} = Dimensions.get('window');

const FloatingButton = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  // Initialize animated value using useRef
  const animation = useRef(new Animated.Value(0)).current;
  const [open, setOpen] = useState(false);

  // Rotation animation for the main button
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  // Get animated style for the secondary button based on TranlateY
  const getAnimatedStyle = translateY => ({
    transform: [
      {scale: animation},
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, translateY],
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => goTo('Product')}>
          <Animated.View
            style={[styles.button, styles.secondary, getAnimatedStyle(-60)]}>
            <Feather name="archive" size={24} color={COLORS.secondary} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Animated.View
            style={[styles.button, styles.secondary, getAnimatedStyle(-120)]}>
            <AntDesign name="barcode" size={24} color={COLORS.secondary} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Animated.View style={[styles.button, styles.menu]}>
            <AntDesign name={open ? 'minus' : 'plus'} size={24} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    right: 55,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'column',
  },
  button: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FEF445',
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    height: 48,
    width: 48,
    borderRadius: 999,
    border: 1,
    borderWidth: 1,
    borderColor: '#FADC00',
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF445',
  },
});

export default FloatingButton;
