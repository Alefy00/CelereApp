import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions, TouchableHighlight, View} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
import IcoMenuUp from '../assets/images/svg/iconMenuUp.svg';

// import Calendar from '../assets/images/svg/calendar.svg';

const MonthScroll = styled.ScrollView`
  margin-top: 0px;
  margin-bottom: 0px;
  max-height: 80px;
  margin-left: 10px;
  width: 82%;
`;
const MonthButton = styled.TouchableHighlight`
  width: ${props => `${props.width}`}px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const MonthItem = styled.View`
  width: 55px;
  height: 55px;
  background-color: #fffef1;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const MonthText = styled.Text`
  align-items: center;
  color: #908f89;
  font-family: Rubik-Regular;
  font-size: 12px;
`;
const DayText = styled.Text`
  align-items: center;
  color: #908f89;
  font-family: Rubik-Regular;
  font-size: 18px;
`;

let monthsArray = [
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
let daysArray = [];

const screenWidth = Math.round(Dimensions.get('window').width);
// console.log("screenWidth", screenWidth);
let thirdW = screenWidth / 5;
thirdW -= 15;
// console.log("thirdW", thirdW);

export default props => {
  const DayRef = useRef();
  const [selectedDay, setSelectedDay] = useState(props.selectedDay);

  const [day, setDay] = useState(0);

  function getMonthName(monthNumber) {
    const months = [
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
    return months[monthNumber];
  }

  function getDaysOfMonth(year, month) {
    // Use o último dia do mês anterior para garantir que não ultrapasse
    const lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate();

    const daysOfPreviousMonth = [];
    const daysOfCurrentMonth = [];
    const daysOfNextMonth = [];

    for (let i = 1; i <= lastDayOfPreviousMonth; i++) {
      daysOfPreviousMonth.push(i);
    }

    // Adicione os dias do mês atual
    for (let i = 1; i <= lastDayOfMonth; i++) {
      daysOfCurrentMonth.push(i);
    }

    // Adicione os dias do próximo mês
    for (let i = 1; i <= lastDayOfNextMonth; i++) {
      daysOfNextMonth.push(i);
    }
    return {
      previousMonth: {
        days: daysOfPreviousMonth,
        month: getMonthName(month - 1),
        year: year,
      },
      currentMonth: {
        days: daysOfCurrentMonth,
        month: getMonthName(month),
        year: year,
      },
      nextMonth: {
        days: daysOfNextMonth,
        month: getMonthName(month + 1),
        year: year,
      },
    };
  }

  const handleScrollEnd = e => {
    let posx = e.nativeEvent.contentOffset.x;
    let targetDay = Math.round(posx / thirdW);
    setSelectedDay(targetDay);
  };

  // console.log("thirdW", thirdW);

  useEffect(() => {
    props.setSelectedDay(selectedDay);
  }, [selectedDay]);

  const scrollToMonth = m => {
    let posX = m * thirdW;
    DayRef.current.scrollTo({x: posX, y: 0, animated: true});
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToMonth(selectedDay);
    }, 10);
  }, [props.selectedMonth]);

  return (
    <View style={styles.picker}>
      <MonthScroll
        ref={MonthRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={thirdW}
        contentContainerStyle={{paddingLeft: thirdW, paddingRight: thirdW}}
        onMomentumScrollEnd={handleScrollEnd}>
        {months.map((m, k) => (
          <MonthButton
            key={k}
            width={thirdW}
            onPress={() => setSelectedMonth(k)}
            underlayColor="transparent">
            <MonthItem
              style={
                k == selectedDay
                  ? {
                      backgroundColor: '#FADC00',
                      width: 55,
                      height: 60,
                    }
                  : {}
              }>
              <DayText
                style={
                  k == selectedDay
                    ? {
                        color: '#000000',
                        fontFamily: 'Rubik-SemiBold',
                      }
                    : {}
                }>
                {selectedDay}
              </DayText>
              <MonthText
                style={
                  k == selectedDay
                    ? {
                        color: '#000000',
                        fontFamily: 'Rubik-SemiBold',
                      }
                    : {}
                }>
                {m}
              </MonthText>
            </MonthItem>
          </MonthButton>
        ))}
      </MonthScroll>
      <TouchableHighlight style={[styles.optionButton]}>
        <IcoMenuUp height="32" width="32" fill="#212121" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  picker: {
    maxHeight: 100,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
