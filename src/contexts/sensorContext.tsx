// import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// import * as Location from 'expo-location';
// import { startLightSensor, stopLightSensor, LightMeasurement } from '../services/LightSensorService';
// import { startAccelerometer, stopAccelerometer, AccelerometerMeasurement } from '../services/AccelerometerService';
// import { startLocationTracking, stopLocationTracking } from '../services/LocationService';
// import { adjustSmartLights, notifyLightChange } from '../utils/LightAutomation';
// import { sendPushNotification } from '../services/NotificationService';
// import { isWithinGeofence, handleGeofenceTransition, Geofence } from '../utils/geofencing';
// import { motionDetected } from '../utils/motionDetection';
// import { Subscription } from 'expo-notifications';

// interface SensorContextType {
//   lightLevel: number;
//   motionData: AccelerometerMeasurement[];
//   location: Location.LocationObject | null;
// }

// const SensorContext = createContext<SensorContextType>({
//   lightLevel: 0,
//   motionData: [],
//   location: null,
// });

// interface SensorProviderProps {
//   children: ReactNode;
// }

// export const SensorProvider: React.FC<SensorProviderProps> = ({ children }) => {
//   const [lightLevel, setLightLevel] = useState<number>(0);
//   const [motionData, setMotionData] = useState<AccelerometerMeasurement[]>([]);
//   const [location, setLocation] = useState<Location.LocationObject | null>(null);

//   useEffect(() => {
//     let lightSubscription: Subscription | undefined;
//     let accelerometerSubscription: Subscription | undefined;
//     let locationSubscription: Location.LocationSubscription | null = null;

//     const setupSensors = async () => {
//       try {
//         lightSubscription = await startLightSensor((data: LightMeasurement) => {
//           setLightLevel(data.illuminance);
//           adjustSmartLights(data.illuminance);
//           notifyLightChange(data.illuminance);
//         });

//         accelerometerSubscription = await startAccelerometer((data: AccelerometerMeasurement) => {
//           setMotionData((prev) => [...prev.slice(-50), data]);
//           if (motionDetected(data)) {
//             sendPushNotification('Motion Detected', 'Unusual motion detected in your home.');
//           }
//         });

//         locationSubscription = await startLocationTracking((newLocation: Location.LocationObject) => {
//           setLocation(newLocation);
//           handleGeofenceTransition(newLocation, predefinedGeofences);
//         });
//       } catch (error) {
//         console.error('Error setting up sensors:', error);
//       }
//     };

//     setupSensors();

//     return () => {
//       if (lightSubscription) stopLightSensor(lightSubscription);
//       if (accelerometerSubscription) stopAccelerometer(accelerometerSubscription);
//       if (locationSubscription) stopLocationTracking(locationSubscription);
//     };
//   }, []);

//   return (
//     <SensorContext.Provider value={{ lightLevel, motionData, location }}>
//       {children}
//     </SensorContext.Provider>
//   );
// };

// export const useSensorContext = () => {
//   const context = useContext(SensorContext);
//   if (context === undefined) {
//     throw new Error('useSensorContext must be used within a SensorProvider');
//   }
//   return context;
// };

// // This should be defined elsewhere in your app, imported here
// const predefinedGeofences: Geofence[] = [
//   // Define your geofences here
//   // Example: { id: 'home', latitude: 40.7128, longitude: -74.0060, radius: 100 }
// ];

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as Location from 'expo-location';
import { startLightSensor, stopLightSensor, LightMeasurement } from '../services/LightSensorService';
import { startAccelerometer, stopAccelerometer, AccelerometerMeasurement } from '../services/AccelerometerService';
import { startLocationTracking, stopLocationTracking } from '../services/LocationService';
import { adjustSmartLights, notifyLightChange } from '../utils/LightAutomation';
import { sendPushNotification } from '../services/NotificationService';
import { isWithinGeofence, handleGeofenceTransition, Geofence } from '../utils/geofencing';
import { motionDetected } from '../utils/motionDetection';
import { Subscription } from 'expo-notifications';

interface SensorContextType {
  lightLevel: number;
  motionData: AccelerometerMeasurement[];
  location: Location.LocationObject | null;
}

const SensorContext = createContext<SensorContextType>({
  lightLevel: 0,
  motionData: [],
  location: null,
});

interface SensorProviderProps {
  children: ReactNode;
}

export const SensorProvider: React.FC<SensorProviderProps> = ({ children }) => {
  const [lightLevel, setLightLevel] = useState<number>(0);
  const [motionData, setMotionData] = useState<AccelerometerMeasurement[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    let lightSubscription: Subscription | undefined;
    let accelerometerSubscription: Subscription | undefined;
    let locationSubscription: Location.LocationSubscription | null = null;

    const setupSensors = async () => {
      try {
        lightSubscription = await startLightSensor((data: LightMeasurement) => {
          setLightLevel(data.illuminance);
          adjustSmartLights(data.illuminance);
          notifyLightChange(data.illuminance);
        });

        accelerometerSubscription = await startAccelerometer((data: AccelerometerMeasurement) => {
          setMotionData((prev) => [...prev.slice(-50), data]);
          if (motionDetected(data)) {
            sendPushNotification('Motion Detected', 'Unusual motion detected in your home.');
          }
        });

        locationSubscription = await startLocationTracking((newLocation: Location.LocationObject) => {
          setLocation(newLocation);
          const { entered, exited } = handleGeofenceTransition(newLocation, predefinedGeofences);
          
          // Handle entered geofences
          entered.forEach(geofence => {
            console.log(`Entered geofence: ${geofence.id}`);
            // Add any specific logic for entering a geofence
          });

          // Handle exited geofences
          exited.forEach(geofence => {
            console.log(`Exited geofence: ${geofence.id}`);
            // Add any specific logic for exiting a geofence
          });
        });
      } catch (error) {
        console.error('Error setting up sensors:', error);
      }
    };

    setupSensors();

    return () => {
      if (lightSubscription) stopLightSensor(lightSubscription);
      if (accelerometerSubscription) stopAccelerometer(accelerometerSubscription);
      if (locationSubscription) stopLocationTracking(locationSubscription);
    };
  }, []);

  return (
    <SensorContext.Provider value={{ lightLevel, motionData, location }}>
      {children}
    </SensorContext.Provider>
  );
};

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensorContext must be used within a SensorProvider');
  }
  return context;
};

// This should be defined elsewhere in your app, imported here
const predefinedGeofences: Geofence[] = [
  // Define your geofences here
  // Example: { id: 'home', center: { latitude: 40.7128, longitude: -74.0060 }, radius: 100 }
];