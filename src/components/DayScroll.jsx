import React, {useState, useEffect, useRef} from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../constants';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import '../translation';

const DayScroll = styled.ScrollView`
  margin-top: 10px;
  margin-bottom: 5px;
  min-height: 60px;
  width: 85%;
`;
const DayButton = styled.TouchableHighlight`
  width: ${props => `${props.width}`}px;
  min-height: 55px;
  justify-content: center;
  align-items: center;
`;
const DayItem = styled.View`
  margin-top: -13px;
  width: 55px;
  height: 55px;
  background-color: ${COLORS.background};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 1px;
  border-color: #000000;
`;
const DayText = styled.Text`
  align-items: center;
  color: #afb6bb;
`;

let months = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
];
const screenWidth = Math.round(Dimensions.get('window').width - 65);
let thirdW = screenWidth / 5;

export default props => {
  const {t} = useTranslation();

  const DayRef = useRef();
  let today = new Date();
  const [selectedDay, setSelectedDay] = useState(today);

  const handleScrollEnd = e => {
    let posx = e.nativeEvent.contentOffset.x;
    let targetDay = Math.round(posx / thirdW);
    // console.log(">>> thirdW:", thirdW);
    // console.log(">>> targetDay: ", targetDay);
    // console.log(">>> day:", days[targetDay]);
    setSelectedDay(days[targetDay].date);
  };

  /*
        useEffect(()=>{
            props.setSelectedDay(selectedDay);
         }, [selectedDay]);

        const scrollToDay = (m) => {
            let posX = m * thirdW;
            DayRef.current.scrollTo({x:posX, y:0, animated:true});
        }

        useEffect(()=>{
            setTimeout(()=>{
                scrollToDay(selectedDay);
            }, 10);
        }, [props.selectedDay]);
    */

  // Função para obter o nome do mês por número
  function getMonthName(monthNumber) {
    const months = [
      t('jan'),
      t('feb'),
      t('mar'),
      t('apr'),
      t('mai'),
      t('jun'),
      t('jul'),
      t('aug'),
      t('sep'),
      t('oct'),
      t('nov'),
      t('dec'),
    ];
    return months[monthNumber];
  }

  function getWeekDayName(dayNumber) {
    const weekday = [
      t('sun'),
      t('mon'),
      t('tue'),
      t('wed'),
      t('thu'),
      t('fri'),
      t('sat'),
    ];
    return weekday[dayNumber];
  }

  // Função para obter os dias de um mês específico
  function getDaysOfMonth(year, month) {
    // Use o último dia do mês anterior para garantir que não ultrapasse
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate();

    const days = [];
    var data = new Date();
    let id = 0;

    for (let i = 1; i <= lastDayOfPreviousMonth; i++) {
      id += 1;
      let day_ = new Date(year, month - 1, i);
      let weekYear = Math.ceil((day_.getDate() - day_.getDay()) / 7) + 1;
      days.push({
        id: id,
        date: day_,
        datestr: day_.toLocaleDateString(),
        day: i,
        month: month - 1,
        monthname: getMonthName(month - 1),
        year: year,
        weekday: getWeekDayName(day_.getDay()),
        weekYear: weekYear,
      });
    }

    // Adicione os dias do mês atual
    for (let i = 1; i <= lastDayOfMonth; i++) {
      id += 1;
      let day_ = new Date(year, month, i);
      let weekYear = Math.ceil((day_.getDate() - day_.getDay()) / 7) + 1;
      days.push({
        id: id,
        date: day_,
        datestr: day_.toLocaleDateString(),
        day: i,
        month: month,
        monthname: getMonthName(month),
        year: year,
        weekday: getWeekDayName(day_.getDay()),
        weekYear: weekYear,
      });
    }

    // Adicione os dias do próximo mês
    for (let i = 1; i <= lastDayOfNextMonth; i++) {
      id += 1;
      let day_ = new Date(year, month + 1, i);
      let weekYear = Math.ceil((day_.getDate() - day_.getDay()) / 7) + 1;
      days.push({
        id: id,
        date: day_,
        datestr: day_.toLocaleDateString(),
        day: i,
        month: month + 1,
        monthname: getMonthName(month + 1),
        year: year,
        weekday: getWeekDayName(day_.getDay()),
        weekYear: weekYear,
      });
    }
    return days;
  }

  // Obter o ano e o mês atuais
  // Obter o ano e o mês atuais
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Os meses são indexados a partir de 0

  // Obter os dias dos meses
  const days = getDaysOfMonth(currentYear, currentMonth);

  return (
    <DayScroll
      ref={DayRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={thirdW}
      contentContainerStyle={{paddingLeft: thirdW, paddingRight: thirdW}}
      // onMomentumScrollEnd={handleScrollEnd}
    >
      {days.map(items => (
        <DayButton
          key={items.id}
          width={thirdW}
          onPress={() => setSelectedDay(items.date)}
          underlayColor="transparent">
          <View
            style={[
              styles.DayItem,
              items.datestr === selectedDay.toLocaleDateString() && {
                backgroundColor: `${COLORS.primary}`,
                borderColor: '#FADC00',
                paddingBottom: 5,
                border: 1,
                borderRadius: 10,
                elevation: 5,
              },
            ]}>
            <Text
              style={[
                styles.itemDate1,
                items.datestr === selectedDay.toLocaleDateString() && {
                  color: '#212121',
                  fontWeight: '700',
                },
                items.datestr !== selectedDay.toLocaleDateString() &&
                  items.date > selectedDay && {color: '#212121'},
                items.datestr !== selectedDay.toLocaleDateString() &&
                  items.date < selectedDay && {color: '#C0C0C0'},
              ]}>
              {items.day}
            </Text>
            <Text
              style={[
                styles.itemDate2,
                items.datestr === selectedDay.toLocaleDateString() && {
                  color: '#212121',
                  fontWeight: '500',
                },
                items.datestr !== selectedDay.toLocaleDateString() &&
                  items.date > selectedDay && {color: '#212121'},
                items.datestr !== selectedDay.toLocaleDateString() &&
                  items.date < selectedDay && {color: '#C0C0C0'},
              ]}>
              {items.monthname}
            </Text>
          </View>
        </DayButton>
      ))}
    </DayScroll>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 55,
    marginHorizontal: 4,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000000',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 5,
    border: 1,
  },
  itemDate1: {
    width: 55,
    fontSize: 18,
    color: '#908F89',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  itemDate2: {
    fontSize: 12,
    color: '#908F89',
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
