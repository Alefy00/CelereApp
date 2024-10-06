/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants';

const { width } = Dimensions.get('window');
const DAY_WIDTH = width / 6; // Largura de cada dia no carrossel
const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Garante que o filtro e as datas sejam organizados de forma equilibrada
    paddingHorizontal: 16,
    paddingVertical: 8, // Espaçamento vertical para garantir que não ocupe toda a tela
    backgroundColor: COLORS.background,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DAY_WIDTH, // Largura fixa para cada dia no carrossel
  },
  selectedDate: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 8,
  },
  todayDate: {

    borderRadius: 8,
    padding: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#A9A9A9',
  },
  selectedDateText: {
    color: '#000',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 12,
    color: '#A9A9A9',
  },
  selectedMonthText: {
    color: '#000',
  },
  filterButton: {
    padding: 8,
    marginLeft: 8, // Espaçamento para afastar o botão de filtro das datas
    backgroundColor: COLORS.primary,
    borderRadius:8,
  },
  contentContainer: {
    padding: 16,
    backgroundColor: COLORS.background,
  },
  contentText: {
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  monthOption: {
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '80%',
    alignItems: 'center',
  },

  // Estilos para o FinanceSummary
  financeSummaryContainer: {
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    padding: 16, // Espaçamento interno
    marginVertical: 16, // Espaçamento entre o DatePicker e o próximo conteúdo
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // Sombra no Android
    margin:15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#212121',
  },
  value: {
    fontSize: 20,
  },
  income: {
    color: COLORS.green, // Verde para entradas
    fontWeight: 'bold',
    fontSize: 20,
  },
  expense: {
    color: COLORS.red, // Vermelho para saídas
    fontWeight: 'bold',
  },
  result: {
    color: '#000000', // Preto para resultado
    fontWeight: 'bold',
    fontSize: 24, // Um pouco maior para destacar
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
    
  },
  balanceRecommended: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: "center",
    alignItems:'center',
    marginTop: 10,
    marginRight:5,
    backgroundColor:COLORS.background,
  },
  containerInfo:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    backgroundColor:COLORS.background,
    
  },
  balanceRecommendedValue: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "bold",
    textAlign:'center',
    marginTop:10,
    backgroundColor:COLORS.background,
  },
  containerBase:{
    backgroundColor:COLORS.background,
    flexDirection:"row",
    justifyContent:'space-between',
    marginHorizontal:15,
    marginTop: -10,
  },
  incomeHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16, // Espaçamento superior e inferior
    justifyContent:'center',
    backgroundColor:COLORS.background,
  },
  incomeHeaderText: {
    color: COLORS.green, // Cor verde para "Entradas"
    fontSize: 18, // Tamanho da fonte
    fontWeight: 'bold', // Texto em negrito
    marginLeft: 8, // Espaçamento entre o ícone e o texto
    backgroundColor:COLORS.background,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
    marginHorizontal:15,
  },
   // Estilos para TimePeriodFilter
   periodFilterContainer: {
    marginVertical: 5,
    paddingHorizontal: 16,
  },
  periodLabel: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
  },
  periodButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: COLORS.background, // Cor padrão para botões
  },
  selectedPeriodButton: {
    backgroundColor: COLORS.primary, // Amarelo destacado para botão selecionado
  },
  periodButtonText: {
    fontSize: 16,
    color: COLORS.black,
  },
  selectedPeriodButtonText: {
    fontWeight: '800',
    color: COLORS.black, // Mantendo a cor preta para texto selecionado
  },

  // Estilos para ViewSwitcher
  viewSwitcherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 5,
    borderColor: COLORS.black,
    borderWidth: 1,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, // Fundo padrão para os botões
  },
  selectedViewButton: {
    backgroundColor: COLORS.primary, // Amarelo para o botão selecionado
  },
  viewButtonText: {
    fontSize: 14,
    color: COLORS.black, // Texto preto nos botões
  },
  selectedViewButtonText: {
    fontWeight: 'bold',
    color: COLORS.black, // Texto preto e em negrito para o selecionado
  },
  // Estilo para limitar a altura do DailyTable
  containerDaily: {


  },
});
