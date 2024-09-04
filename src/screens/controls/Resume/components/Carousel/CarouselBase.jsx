/* eslint-disable prettier/prettier */
// CarouselBase.js
import React, { useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../../constants';
import CarouselPage1 from './CarouselPage1';
import CarouselPage2 from './CarouselPage2';
import CarouselPage3 from './CarouselPage3';
import CarouselPage4 from './CarouselPage4';
import CarouselPage5 from './CarouselPage5';
import CarouselPage6 from './CarouselPage6';
import CarouselPage7 from './CarouselPage7';

const { width } = Dimensions.get('window');

const CarouselBase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // Dados das páginas do carrossel
  const pages = [
    { key: '1', content: <CarouselPage1 onNext={() => goToNextPage()} /> },
    { key: '2', content: <CarouselPage2 onNext={() => goToNextPage()} onPrevious={() => goToPreviousPage()} /> },
    { key: '3', content: <CarouselPage3 onNext={() => goToNextPage()} onPrevious={() => goToPreviousPage()} /> },
    { key: '4', content: <CarouselPage4 onNext={() => goToNextPage()} onPrevious={() => goToPreviousPage()} /> },
    { key: '5', content: <CarouselPage5 onNext={() => goToNextPage()} onPrevious={() => goToPreviousPage()} /> },
    { key: '6', content: <CarouselPage6 onNext={() => goToNextPage()} onPrevious={() => goToPreviousPage()} /> },
    { key: '7', content: <CarouselPage7 onPrevious={() => goToPreviousPage()} /> },
    // Adicione aqui outras páginas conforme necessário
  ];

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goToNextPage = () => {
    if (currentIndex < pages.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const renderPage = ({ item }) => {
    return (
      <View style={styles.pageWrapper}>
        <View style={styles.pageContainer}>{item.content}</View>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={renderPage}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.indicatorContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicator : {},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    alignItems: 'center',
  },
  pageWrapper: {
    width,
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.gray,
  },
});

export default CarouselBase;
