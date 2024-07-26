import * as Location from "expo-location";

export const startLocationTracking = async (
  callback: (location: Location.LocationObject) => void
) => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.error("Permission to access location was denied");
    return null;
  }

  return await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 10,
    },
    callback
  );
};

export const stopLocationTracking = (
  subscription: Location.LocationSubscription | null
) => {
  if (subscription) {
    subscription.remove();
  }
};
