/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import BarTop2 from '../../../../../components/BarTop2';
import styles from './styles'
import { COLORS } from '../../../../../constants';

const ServicesMenu = ({ navigation }) => {
  const menuItems = [
    { title: 'Cadastrar Serviço', screen: 'AddService' },
    { title: 'Orçamento', screen: 'Budget' },
    { title: 'Agendar Serviço', screen: 'ScheduleService' },
    { title: 'PMOC', screen: 'PMOC' },
    { title: 'Ordem de Serviço', screen: 'WorkOrder' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Serviços'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>
          
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                ]}
                onPress={() => navigation.navigate(item.screen)}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ServicesMenu;
