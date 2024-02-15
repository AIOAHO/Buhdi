import React from 'react';
import { PieChart } from 'react-native-svg-chart-kit';
import { Text } from 'react-native-svg';

function CircularBarChart({ data }) {
  const colors = ['#600080', '#9900cc', '#c61aff', '#d966ff', '#ecb3ff', '#a64dff', '#bf80ff', '#cc99ff', '#e6ccff']; // Add more colors if needed

  const pieData = data.map((item, index) => ({
    value: item.score,
    svg: {
      fill: colors[index % colors.length],
      onPress: () => console.log('press', index),
    },
    key: `pie-${index}`,
  }));

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.value}
        </Text>
      );
    });
  };

  return (
    <PieChart style={{ height:  200 }} data={pieData} innerRadius={'25%'} outerRadius={'95%'}>
      <Labels/>
    </PieChart>
  );
}

export default CircularBarChart;