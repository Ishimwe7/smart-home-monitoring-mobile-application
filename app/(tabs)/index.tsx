// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { Provider as PaperProvider } from 'react-native-paper';
// // import { Ionicons } from '@expo/vector-icons';

// // import Dashboard from '../../src/screens/Dashboard';
// // import Settings from '../../src/screens/Settings';
// // import { SensorProvider } from '../../src/contexts/sensorContext';

// // const Tab = createBottomTabNavigator();

// // export default function App() {
// //   return (
// //     <PaperProvider>
// //       <SensorProvider>
// //         <NavigationContainer>
// //           <Tab.Navigator
// //             screenOptions={({ route }) => ({
// //               tabBarIcon: ({ focused, color, size }) => {
// //                 let iconName;
// //                 if (route.name === 'Dashboard') {
// //                   iconName = focused ? 'home' : 'home-outline';
// //                 } else if (route.name === 'Settings') {
// //                   iconName = focused ? 'settings' : 'settings-outline';
// //                 }
// //                 return <Ionicons name={iconName} size={size} color={color} />;
// //               },
// //             })}
// //           >
// //             <Tab.Screen name="Dashboard" component={Dashboard} />
// //             <Tab.Screen name="Settings" component={Settings} />
// //           </Tab.Navigator>
// //         </NavigationContainer>
// //       </SensorProvider>
// //     </PaperProvider>
// //   );
// // }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Provider as PaperProvider } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';

// import Dashboard from '../../src/screens/Dashboard';
// import Settings from '../../src/screens/Settings';
// import { SensorProvider } from '../../src/contexts/sensorContext';

// const Tab = createBottomTabNavigator();

// type IconName = React.ComponentProps<typeof Ionicons>['name'];

// export default function App() {
//   return (
//     <PaperProvider>
//       <SensorProvider>
//         <NavigationContainer>
//           <Tab.Navigator
//             screenOptions={({ route }) => ({
//               tabBarIcon: ({ focused, color, size }) => {
//                 let iconName: IconName;
//                 if (route.name === 'Dashboard') {
//                   iconName = focused ? 'home' : 'home-outline';
//                 } else if (route.name === 'Settings') {
//                   iconName = focused ? 'settings' : 'settings-outline';
//                 } else {
//                   iconName = 'help-outline'; // Default icon
//                 }
//                 return <Ionicons name={iconName} size={size} color={color} />;
//               },
//             })}
//           >
//             <Tab.Screen name="Dashboard" component={Dashboard} />
//             <Tab.Screen name="Settings" component={Settings} />
//           </Tab.Navigator>
//         </NavigationContainer>
//       </SensorProvider>
//     </PaperProvider>
//   );
// }

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SensorProvider } from '../../src/contexts/sensorContext';
import { TabParamList } from '@/components/types';
import Dashboard from '@/src/screens/Dashboard';
import Settings from '@/src/screens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];
const Tab = createBottomTabNavigator<TabParamList>();
export default function AppLayout() {
  return (
    <PaperProvider>
      <SensorProvider>
        <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          }else if (route.name === 'Settings') {
            iconName = focused ? 'settings-outline' : 'settings-outline';
          }
          else {
            iconName = 'alert';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerTitle:'',
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ tabBarLabel: 'Dashboard' }}
      >
      </Tab.Screen>
       <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: 'Settings' }}
      >
      </Tab.Screen>
    </Tab.Navigator>
      </SensorProvider>
    </PaperProvider>
  );
}