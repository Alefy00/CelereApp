/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, G, Rect, Text as SvgText, TSpan } from 'react-native-svg';

// Componente para criar um gráfico de barras arredondadas na parte inferior
const BottomRoundedBarsChart = ({ data, barColor = "#8A2BE2", labelStyle = {}, valueStyle = {} }) => {
  // Largura e altura das barras, e o raio para os cantos arredondados
  const barWidth = 130;
  const barHeight = 150;
  const radius = 10;

  return (
    <View style={styles.container}>
      {/* Componente SVG para desenhar as barras */}
      <Svg width={data.length * (barWidth + 10)} height={barHeight + 100}>
        {data.map((item, index) => {
          // Quebra o rótulo em duas linhas para exibição
          const labelParts = item.label.split(' ');
          const firstLine = labelParts.slice(0, Math.ceil(labelParts.length / 2)).join(' ');
          const secondLine = labelParts.slice(Math.ceil(labelParts.length / 2)).join(' ');

          return (
            <G key={`group-${index}`} transform={`translate(${index * (barWidth + 10)}, 0)`}>
              {/* Texto exibindo o valor da barra */}
              <SvgText
                key={`value-${index}`}
                x={barWidth / 2}
                y={barHeight - item.value - 20}
                fill={valueStyle.color || "#000"}
                fontSize={valueStyle.fontSize || "14"}
                textAnchor="middle"
              >
                {`R$${item.amount.toLocaleString('pt-BR')}`}
              </SvgText>
              <Rect
                key={`bar-${index}`}
                x={0}
                y={barHeight - item.value}
                width={barWidth}
                height={item.value}
                fill={barColor}
                rx={radius}
                ry={radius}
              />
              {/* Rótulo da barra exibido abaixo */}
              <SvgText
                key={`label-${index}`}
                x={barWidth / 2}
                y={barHeight + 20}
                fill={labelStyle.color || "#000"}
                fontSize={labelStyle.fontSize || "14"}
                fontWeight={valueStyle.fontWeight || "bold"}
                textAnchor="middle"
                width={barWidth}
              >
                <TSpan key={`firstLine-${index}`} x={barWidth / 2} dy={0}>{firstLine}</TSpan>
                <TSpan key={`secondLine-${index}`} x={barWidth / 2} dy={15}>{secondLine}</TSpan>
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  },
});

export default BottomRoundedBarsChart;
