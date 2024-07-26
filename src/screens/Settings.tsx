import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';

const Settings: React.FC = () => {
  const [lightNotifications, setLightNotifications] = React.useState(false);
  const [motionNotifications, setMotionNotifications] = React.useState(false);
  const [locationTracking, setLocationTracking] = React.useState(false);

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Light Level Notifications"
          right={() => (
            <Switch
              value={lightNotifications}
              onValueChange={setLightNotifications}
            />
          )}
        />
        <List.Item
          title="Motion Notifications"
          right={() => (
            <Switch
              value={motionNotifications}
              onValueChange={setMotionNotifications}
            />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Location</List.Subheader>
        <List.Item
          title="Enable Location Tracking"
          right={() => (
            <Switch
              value={locationTracking}
              onValueChange={setLocationTracking}
            />
          )}
        />
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Settings;