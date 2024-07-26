import React from 'react';
import { Card, Title } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface MotionCardProps {
  motionData: { x: number; y: number; z: number }[];
}

const MotionCard: React.FC<MotionCardProps> = ({ motionData }) => {
  const chartData = {
    labels: ['X', 'Y', 'Z'],
    datasets: [
      {
        data: [
          motionData[motionData.length - 1]?.x || 0,
          motionData[motionData.length - 1]?.y || 0,
          motionData[motionData.length - 1]?.z || 0,
        ],
      },
    ],
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Motion</Title>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 64}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});

export default MotionCard;