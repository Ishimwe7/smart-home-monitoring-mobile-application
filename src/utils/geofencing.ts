// export type Geofence = {
//   id: string;
//   center: {
//     latitude: number;
//     longitude: number;
//   };
//   radius: number; // in meters
// };

// // Define the Location type
// export type Location = {
//   latitude: number;
//   longitude: number;
// };

// // Function to calculate distance between two points using the Haversine formula
// const calculateDistance = (point1: Location, point2: Location): number => {
//   const R = 6371e3; // Earth's radius in meters
//   const φ1 = (point1.latitude * Math.PI) / 180;
//   const φ2 = (point2.latitude * Math.PI) / 180;
//   const Δφ = ((point2.latitude - point1.latitude) * Math.PI) / 180;
//   const Δλ = ((point2.longitude - point1.longitude) * Math.PI) / 180;

//   const a =
//     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// };

// export const isWithinGeofence = (
//   currentLocation: Location,
//   geofence: Geofence
// ): boolean => {
//   const distance = calculateDistance(currentLocation, geofence.center);
//   return distance <= geofence.radius;
// };

// export const handleGeofenceTransition = (
//   currentLocation: Location,
//   geofences: Geofence[]
// ): { entered: Geofence[]; exited: Geofence[] } => {
//   const entered: Geofence[] = [];
//   const exited: Geofence[] = [];

//   geofences.forEach((geofence) => {
//     const isInside = isWithinGeofence(currentLocation, geofence);
//     // Here you would typically check against a previous state to determine if the user has entered or exited
//     // For simplicity, we'll assume entering if inside, and exiting if outside
//     if (isInside) {
//       entered.push(geofence);
//     } else {
//       exited.push(geofence);
//     }
//   });

//   return { entered, exited };
// };
import * as Location from "expo-location";

// Define the Geofence type
export interface Geofence {
  id: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in meters
}

// Function to calculate distance between two points using the Haversine formula
const calculateDistance = (
  point1: Location.LocationObject,
  point2: { latitude: number; longitude: number }
): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (point1.coords.latitude * Math.PI) / 180;
  const φ2 = (point2.latitude * Math.PI) / 180;
  const Δφ = ((point2.latitude - point1.coords.latitude) * Math.PI) / 180;
  const Δλ = ((point2.longitude - point1.coords.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const isWithinGeofence = (
  currentLocation: Location.LocationObject,
  geofence: Geofence
): boolean => {
  const distance = calculateDistance(currentLocation, geofence.center);
  return distance <= geofence.radius;
};

export const handleGeofenceTransition = (
  currentLocation: Location.LocationObject,
  geofences: Geofence[]
): { entered: Geofence[]; exited: Geofence[] } => {
  const entered: Geofence[] = [];
  const exited: Geofence[] = [];

  geofences.forEach((geofence) => {
    const isInside = isWithinGeofence(currentLocation, geofence);
    // Here you would typically check against a previous state to determine if the user has entered or exited
    // For simplicity, we'll assume entering if inside, and exiting if outside
    if (isInside) {
      entered.push(geofence);
    } else {
      exited.push(geofence);
    }
  });

  return { entered, exited };
};
