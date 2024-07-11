/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Apresentar uma seção com status em uma linha
# Create by.: 2024/05/27
# References: https://withfra.me/components/stats
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import '../../../../../../../translation';
import {COLORS, SIZES, FONTS} from '../../../../../../../constants';
const {width} = Dimensions.get('window');

export const Container = styled.View`
  padding: 8px 12px 12px;
`;
export const Title = styled.Text`
  font-weight: 500;
  margin-bottom: 4px;
  margin-left: 7px;
  color: ${COLORS.black};
  font-size: ${SIZES.s22}px;
  font-family: ${FONTS.fregular};
`;
export const SwiperActiveDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #000;
  border-radius: 5px;
  margin: 3px;
  display: none;
`;
export const SwiperDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 5px;
  margin: 3px;
  display: none;
`;
export const SwiperItem = styled.View`
  flex: 1;
  border-radius: 10px;
  border-color: ${COLORS.lightGray};
  border-width: 1px;
  background-color: ${COLORS.white};
  flex-direction: column;
  max-height: 88px;
  max-width: 100%;
  margin-left: 3px;
  margin-right: 3px;
`;
export const SwiperTitleText = styled.Text`
  color: ${COLORS.gray2};
  font-size: ${SIZES.s14}px;
  font-family: ${FONTS.fregular};
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 0px;
  text-align: center;
  width: 100%;
`;
export const SwiperValueText = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #000;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
`;
export const Page = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({items}) => {
  const {t} = useTranslation();

  const renderItem = ({item}) => (
    <SwiperItem>
      <SwiperTitleText>{item.text}</SwiperTitleText>
      <SwiperValueText>{item.value}</SwiperValueText>
    </SwiperItem>
  );

  const renderPage = data => (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );

  const groupedItems = [];
  for (let i = 0; i < items.length; i += 2) {
    groupedItems.push(items.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <Container>
        <Title>{t('situations')}</Title>
        <Swiper
          style={{height: 76}}
          dot={<SwiperDot />}
          activeDot={<SwiperActiveDot />}
          paginationStyle={{top: null, right: null, bottom: 5, left: null}}
          autoplay={true}
          autoplayTimeout={6} // Tempo em segundos entre cada deslize automático
        >
          {groupedItems.map((group, index) => (
            <View key={index}>{renderPage(group)}</View>
          ))}
        </Swiper>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 5,
    padding: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
