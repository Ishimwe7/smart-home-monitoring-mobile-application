import { NavigationProp, ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  MainTabs: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Settings: undefined;
};

export type NavigationProps = NavigationProp<ParamListBase>;
