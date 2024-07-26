import { Subscription } from "expo-notifications";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";

export { AccelerometerMeasurement };

export const startAccelerometer = (
  callback: (data: AccelerometerMeasurement) => void
): Subscription => {
  Accelerometer.setUpdateInterval(100);
  return Accelerometer.addListener(callback);
};

export const stopAccelerometer = (subscription: Subscription) => {
  subscription.remove();
};
