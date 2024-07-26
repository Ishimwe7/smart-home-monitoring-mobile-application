import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useSensorContext } from '../contexts/sensorContext';
import LightLevelCard from '../components/LightLevelCard';
import MotionCard from '../components/MotionCard';
import LocationCard from '../components/LocationCard';

const Dashboard: React.FC = () => {
  const { lightLevel, motionData, location } = useSensorContext();

  return (
    <ScrollView style={styles.container}>
      <LightLevelCard lightLevel={lightLevel} />
      <MotionCard motionData={motionData} />
      <LocationCard location={location} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Dashboard;