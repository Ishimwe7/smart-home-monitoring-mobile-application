import { AccelerometerMeasurement } from "expo-sensors";

export const motionDetected = (data: AccelerometerMeasurement): boolean => {
  // Implement your motion detection logic here
  // This is a simple example; you might want to use a more sophisticated algorithm
  const threshold = 1.5;
  return (
    Math.abs(data.x) > threshold ||
    Math.abs(data.y) > threshold ||
    Math.abs(data.z) > threshold
  );
};
