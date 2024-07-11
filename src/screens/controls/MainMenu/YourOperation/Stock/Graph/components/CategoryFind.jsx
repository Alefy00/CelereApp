import React, {useState} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../../../constants';
import IconSearch from '../../../../../../../assets/images/svg/iconSearch.svg';
import {useTranslation} from 'react-i18next';
import '../../../../../../../translation';
import {Chip} from 'react-native-paper';

export const GlobalGroupInfo = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 60px;
  margin-left: 15px;
  margin-bottom: -10px;
`;
export const GroupInfo = styled.View`
  flex: 1;
  width: 100%;
  max-height: 35px;
  margin-top: -25px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const SubTitleInfo = styled.Text`
  color: ${COLORS.secondary};
  font-size: ${SIZES.s14}px;
  font-family: ${FONTS.fregular};
  margin-top: 5px;
`;
export const Btn = styled.TouchableOpacity`
  max-height: 25px;
  align-items: center;
  justify-content: space-between;
`;
export const ValueInfo = styled.Text`
  flex: 1;
  width: 100%;
  text-align: center;
  margin-top: -15px;
  align-items: center;
  font-size: ${SIZES.s18}px;
  font-family: ${FONTS.fsmbold};
  color: ${COLORS.secondary};
`;
export const ContainerResult = styled.View`
  flex: 1;
  align-items: flex-start;
  background-color: ${COLORS.white};
  margin: 10px 16px 10px;
  border-radius: 10px;
  padding-bottom: 7px;
  border-width: 1px;
  border-color: #cecfd1;
`;
export const GroupResult = styled.View`
  flex-direction: row;
  height: 40px;
  border-radius: 10px;
`;
export const Divider = styled.View`
  border-bottom-color: ${COLORS.lightGray4};
  border-bottom-width: 1px;
  width: 97%;
  margin-right: 15px;
`;

export const LocationArea = styled.View`
  max-height: 60px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 30px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  padding-bottom: 7px;
`;

export const FilterArea = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: -40px;
`;

//export default ({ valor_vendas, valor_despesas, saldo_dia, }) => {
const Stock = ({valor_vendas, valor_despesas, saldo_dia}) => {
  const {t} = useTranslation();
  const [locationText, setLocationText] = useState();

  const [visible, setVisible] = useState(true);
  const handleDismiss = () => {
    setVisible(false);
  };
  return (
    <ContainerResult>
      <LocationArea>
        <LocationInput
          placeholder={t('category_filter')}
          placeholderTextColor={COLORS.lightGray4}
          value={locationText}
          onChangeText={t => setLocationText(t)}
          onEndEditing={null}
        />
        <LocationFinder onPress={null}>
          <IconSearch width="24" height="24" fill="#FFFFFF" />
        </LocationFinder>
      </LocationArea>

      <Divider
        style={{
          marginTop: 5,
          marginBottom: 45,
          borderBottomWidth: 1,
          marginLeft: 15,
          borderBottomColor: '#212121',
          width: '94%',
        }}
      />

      <FilterArea>
        <Chip
          icon="camera"
          style={styles.chip}
          disabled
          onPress={() => console.log('camera')}>
          Bebida Não Alcoolica
        </Chip>
        <Chip
          icon="apple"
          style={styles.chip}
          mode="outlined"
          selectedColor="green"
          selected
          onClose={handleDismiss}
          onPress={() => console.log('apple')}>
          Lanche
        </Chip>

        {visible && (
          <Chip icon="information" onClose={handleDismiss}>
            Example Chip with Close Button
          </Chip>
        )}
      </FilterArea>
    </ContainerResult>
  );
};
export default Stock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    marginTop: 10,
  },
});
