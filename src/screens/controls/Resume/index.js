/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, ScrollView} from 'react-native';
import {COLORS} from '../../../constants';
import BarTop from '../../../components/BarTop';
import DateCarousel from './components/DateCarousel';
import {useTranslation} from 'react-i18next';
import '../../../translation';
import styles from './styles';
import CarouselBase from './components/Carousel/CarouselBase';
import SalesChartCard from './components/SalesChartCard';
import FilteredListCard from './components/FilteredListCard';
import ActionButtons from './components/ActionButtons';

const MainMenu = ({navigation}) => {
  const {t} = useTranslation();

    // Função para lidar com a seleção de data
    const handleDateSelected = (selectedDate) => {
      console.log('Data selecionada:', selectedDate);
      // Lógica adicional para lidar com a seleção de data
    };

  return (
        <KeyboardAvoidingView behavior="position" enabled>
          <ScrollView style={{backgroundColor: "#FDFCF0"}}>
            <BarTop
              uriAvatar={
                'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'
              }
              titulo={t('partner')}
              subtitulo={'Planeta '}
              backColor={COLORS.primary}
              foreColor={'#000000'}
              routeMailer={''}
              routeCalculator={''}
            />
          
            <View style={styles.container}>
              <DateCarousel onDateSelected={handleDateSelected} />
              <Text style={styles.label}>Resumo do dia</Text>
                <View style={styles.ContainerCarousel}>
                  <CarouselBase />
                </View>
                <View style={styles.ContainerCircle}>
                  <SalesChartCard/>
                </View>
                <Text style={styles.label2}>Transações do dia</Text>
                <View style={styles.ContainerFilter}>
                  <FilteredListCard/>
                </View>
                <View style={styles.containerBottons}>
                  <ActionButtons/>
                </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

  );
};

export default MainMenu;
