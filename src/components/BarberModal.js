import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import ExpandIcon from '../assets/images/svg/expand.svg';
import NavPrevIcon from '../assets/images/svg/nav_prev.svg';
import NavNextIcon from '../assets/images/svg/nav_next.svg';
import Api from '../services/Api';
import moment from 'moment';

const Modal = styled.Modal``;
const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;
const ModalBody = styled.View`
  background-color: #A9C4E1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  /*CIMA - DIREITA - BAIXO - ESQUERDA*/
  padding: 10px 20px 40px 20px;
`;
const GroupTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;
const ModalTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #000;
  width:90%;
  text-align: left;
  padding-left: 20px;
`;
const ModalItem = styled.View`
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;
const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 20px;
  margin-right: 15px;
`;
const UserGroup = styled.View` 
  flex-direction: col;
  align-items: left;
`;
const UserName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #000;
`;
const ProfName = styled.Text`
  font-size: 15px;
  color: #000;
`;
const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ServiceName = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;
const ServicePrice = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
  background-color: #547DA9;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const FinishButtonText = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #fff;
`;

const DateInfo = styled.View`
  flex-direction: row;
`;
const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;
const DateTitleArea = styled.View`
  width: 140px;
  justify-content: center;
  align-items: center;
`;
const DateTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #000;
`;
const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;
const DateList = styled.ScrollView``;
const DataItem = styled.TouchableOpacity`
  width: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;
const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;
const TimeList = styled.ScrollView``;
const TimeItem = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
const TimeItemText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #000;
`;

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];
const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export default ({show, setShow, user, service}) => {
  const navigation = useNavigation();

  // console.log("=========>>>> service -> ", service)

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  const handleCloseButton = () => { 
    setShow(false);
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDay());
  };
  const handleFinishClick = async () => {
    if (
      user.id &&
      service != null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour != null
    ) {
      let res = await Api.setAppointment(
        user.id,
        service,
        selectedYear,
        selectedMonth,
        selectedDay,
        selectedHour,
      );
      if (res.error === '') {
        setShow(false);
        navigation.navigate('Appointments');
      } else {
        alert('Erro: ' + res.error);
      }
    } else {
      alert('Preencha todos os dados');
    }
  };
  const handleLeftDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };
  const handleRightDateClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };
  useEffect(() => {
    if (user.available) {
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);
        // console.log(">>> d =>>> ", d);

        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        // console.log(">>> month =>>> ", month);
        
        let day = d.getDay();  // 2024-03-01T03:00:00.000Z -> moment(data).format('DD/MM/YYYY')
        // let day = (moment(d).format('DD/MM/YYYY')).getDay(); //
        // let day = moment(d).add(1, 'days').toDate();
        // console.log(">>> day =>>> ", day);

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        // console.log(">>> day =>>> ", day);
        // let selDate = `${year}-${month}-${day}`;
        let selDate = (moment(d).format('YYYY-MM-DD')); //
        // console.log(">>> selDate =>>> ", selDate);

        // console.log(">>> user.available => ", user.available)
        let availability = user.available.filter(e => e.date === selDate);

        newListDays.push({
          status: availability.length > 0,
          weekday: days[d.getDay()],
          number: i,
        });
      }
      console.log(newListDays);
      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedHour(null);
    }
  }, [selectedMonth, selectedYear, user]);
  useEffect(() => {
    if (user.available && selectedDay > 0) {
      let d = new Date(selectedYear, selectedMonth, selectedDay);
      let year = d.getFullYear();
      let month = d.getMonth() + 1;
      let day = d.getDay();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      // let selDate = `${year}-${month}-${day}`;
      let selDate = (moment(d).format('YYYY-MM-DD'));

      let availability = user.available.filter(e => e.date === selDate);

      if (availability.length > 0) {
        setListHours(availability[0].hours);
      }
    }
    setSelectedHour(null);
  }, [selectedDay, user]);
  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDay());
  }, []);
  // Função capitalize
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <GroupTitle>
            <CloseButton onPress={handleCloseButton}>
              <ExpandIcon width="40" height="40" fill="#000" />
            </CloseButton>
            <ModalTitle>Agendar</ModalTitle>
          </GroupTitle>
          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserGroup>
                <UserName>{user.name}</UserName>
                <ProfName>{capitalize(user.profissao)}</ProfName>
              </UserGroup>              
            </UserInfo>
          </ModalItem>
          {service ? (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{user.services[service].name}</ServiceName>
                <ServicePrice>
                  R$ {user.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          ) : null}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateClick}>
                <NavPrevIcon height="35" fill="#000" width="35" />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleRightDateClick}>
                <NavNextIcon height="35" fill="#000" width="35" />
              </DateNextArea>
            </DateInfo>
            <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
              {listDays.map((item, key) => (
                <DataItem
                  key={key}
                  onPress={() =>
                    item.status ? setSelectedDay(item.number) : null
                  }
                  style={{
                    opacity: item.status ? 1 : 0.5,
                    backgroundColor:
                      item.number === selectedDay ? '#4eadbe' : '#fff',
                  }}>
                  <DateItemWeekDay
                    style={{
                      color: item.number === selectedDay ? '#fff' : '#000',
                    }}>
                    {item.weekday}
                  </DateItemWeekDay>
                  <DateItemNumber
                    style={{
                      color: item.number === selectedDay ? '#fff' : '#000',
                    }}>
                    {item.number}
                  </DateItemNumber>
                </DataItem>
              ))}
            </DateList>
          </ModalItem>
          {selectedDay > 0 && listHours.length > 0 ? (
            <ModalItem>
              <TimeList
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {listHours.map((item, key) => (
                  <TimeItem
                    key={key}
                    onPress={() => setSelectedHour(item)}
                    style={{
                      backgroundColor:
                        item === selectedHour ? '#4eadbe' : '#fff',
                    }}>
                    <TimeItemText
                      style={{color: item === selectedHour ? '#fff' : '#000'}}>
                      {item}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          ) : null}

          <FinishButton onPress={handleFinishClick}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};
