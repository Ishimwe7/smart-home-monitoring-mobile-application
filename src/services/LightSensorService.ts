import { Subscription } from "expo-notifications";
import { LightSensor } from "expo-sensors";

export interface LightMeasurement {
  illuminance: number;
}

export const startLightSensor = (
  callback: (data: LightMeasurement) => void
): Subscription => {
  LightSensor.setUpdateInterval(1000);
  return LightSensor.addListener(callback);
};

export const stopLightSensor = (subscription: Subscription) => {
  subscription.remove();
};
