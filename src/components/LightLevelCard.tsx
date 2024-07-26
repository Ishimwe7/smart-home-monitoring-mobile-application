import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface LightLevelCardProps {
  lightLevel: number;
}

const LightLevelCard: React.FC<LightLevelCardProps> = ({ lightLevel }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Light Level</Title>
        <Paragraph>{lightLevel.toFixed(2)} lux</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});

export default LightLevelCard;