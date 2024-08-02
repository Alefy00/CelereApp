/* eslint-disable prettier/prettier */
// BottomRoundedBarsChart.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, G, Rect, Text as SvgText, TSpan } from 'react-native-svg';

const BottomRoundedBarsChart = ({ data, barColor = "#8A2BE2", labelStyle = {}, valueStyle = {} }) => {
  const barWidth = 150;
  const barHeight = 150;
  const radius = 10;

  return (
    <View style={styles.container}>
      <Svg width={data.length * (barWidth + 5)} height={barHeight + 100}>
        {data.map((item, index) => {
          const labelParts = item.label.split(' ');
          const firstLine = labelParts.slice(0, Math.ceil(labelParts.length / 2)).join(' ');
          const secondLine = labelParts.slice(Math.ceil(labelParts.length / 2)).join(' ');

          return (
            <G key={index} transform={`translate(${index * (barWidth + 10)}, 0)`}>
              <SvgText
                x={barWidth / 2}
                y={barHeight - item.value - 20}
                fill={valueStyle.color || "#000"}
                fontSize={valueStyle.fontSize || "14"}
                textAnchor="middle"
              >
                {`R$${item.amount.toLocaleString('pt-BR')}`}
              </SvgText>
              <Rect
                x={0}
                y={barHeight - item.value}
                width={barWidth}
                height={item.value}
                fill={barColor}
                rx={radius}
                ry={radius}
              />
              <SvgText
                x={barWidth / 2}
                y={barHeight + 20}
                fill={labelStyle.color || "#000"}
                fontSize={labelStyle.fontSize || "14"}
                fontWeight={valueStyle.fontWeight || "bold"}
                textAnchor="middle"
                width={barWidth}
              >
                <TSpan x={barWidth / 2} dy={0}>{firstLine}</TSpan>
                <TSpan x={barWidth / 2} dy={15}>{secondLine}</TSpan>
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
    width:'100%',
    textAlign:'center',
  },
});

export default BottomRoundedBarsChart;






