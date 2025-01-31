/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions, PixelRatio, Platform } from "react-native";
import { COLORS } from "../../../../constants";

const { width, height } = Dimensions.get('window');

// Função para calcular tamanho de fonte adaptável
const fontSize = size => PixelRatio.getFontScale() * size;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05, // Mantém espaçamento dinâmico
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: width * 0.03, // Ajustado para manter proporção
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    alignSelf: 'stretch', // Garante que o card ocupe a largura correta
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.001, // Evita valores negativos que podem causar cortes
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: width * 0.06, // Ajustado para melhor espaçamento
    flexDirection: 'row',
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: fontSize(13), // Ajuste dinâmico baseado no PixelRatio
    color: COLORS.black,
  },
  infoValue: {
    fontSize: fontSize(16), // Ajuste dinâmico baseado no PixelRatio
    fontWeight: '900',
    color: COLORS.black,
  },
  detailsContainer: {
    width: '100%', // Garante que ocupe todo o espaço disponível
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.002, // Pequeno ajuste para espaçamento dinâmico
  },
  colorIndicatorGreen: {
    width: width * 0.05,
    height: height * 0.015,
    backgroundColor: COLORS.green,
    marginRight: width * 0.02,
    borderRadius: 5,
  },
  colorIndicatorRed: {
    width: width * 0.05,
    height: height * 0.015,
    backgroundColor: COLORS.red,
    marginRight: width * 0.02,
    borderRadius: 5,
  },
  detailText: {
    fontSize: fontSize(14), // Adaptável ao tamanho de tela
    flex: 1,
    color: COLORS.black,
  },
  detailValueGreen: {
    fontSize: fontSize(12),
    color: COLORS.green,
  },
  detailValueRed: {
    fontSize: fontSize(12),
    color: COLORS.red,
  },
});

export default styles;
