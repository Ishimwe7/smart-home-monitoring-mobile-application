import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface LocationCardProps {
  location: { latitude: number; longitude: number } | null;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Location</Title>
        {location ? (
          <>
            <Paragraph>Latitude: {location.latitude.toFixed(6)}</Paragraph>
            <Paragraph>Longitude: {location.longitude.toFixed(6)}</Paragraph>
          </>
        ) : (
          <Paragraph>Location unavailable</Paragraph>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});

export default LocationCard;