/* eslint-disable prettier/prettier */
import React from 'react';
import { BarChart as BarChartSvg } from 'react-native-svg-charts';
import * as scale from 'd3-scale';
import { G, Rect, Text as SvgText } from 'react-native-svg';

const radius = 10;

const Labels = ({ x, y, bandwidth, data }) => (
  <G>
    {data.map((value, index) => (
      <G key={`label-group-${index}`}>
        <SvgText
          key={`value-${index}`}
          x={x(index) + bandwidth / 2}
          y={y(value.value) - 15}
          fontSize={14}
          fill={value.svg.fill}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {`R$ ${new Intl.NumberFormat('pt-BR', {
            maximumFractionDigits: 2,
          }).format(value.value)}`}
        </SvgText>
        <SvgText
          key={`label-${index}`}
          x={x(index) + bandwidth / 2}
          y={y(0) + 20}
          fontSize={14}
          fill={value.svg.fill}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {value.label}
        </SvgText>
      </G>
    ))}
  </G>
);

const RoundedBars = ({ x, y, bandwidth, data }) => (
  <G>
    {data.map((value, index) => {
      const barHeight = y(0) - y(value.value);
      const borderRadius = barHeight > radius * 2 ? radius : barHeight / 2;

      return (
        <G key={`bar-group-${index}`}>
          <Rect
            x={x(index) + bandwidth * 0.1}
            y={y(value.value)}
            width={bandwidth * 0.8}
            height={barHeight}
            fill={value.svg.fill}
            rx={borderRadius}
            ry={borderRadius}
          />
        </G>
      );
    })}
  </G>
);

const RoundedBarsChart = ({ data }) => (
  <BarChartSvg
    style={{ height: 200 }}
    data={data}
    yAccessor={({ item }) => item.value}
    xAccessor={({ item }) => item.label}
    gridMin={0}
    contentInset={{ top: 30, bottom: 30 }}
    spacingInner={0.1}
    yScale={scale.scaleLinear}
    xScale={scale.scaleBand}
  >
    <RoundedBars />
    <Labels xAccessor={({ item }) => item.label} />
  </BarChartSvg>
);

export default RoundedBarsChart;
