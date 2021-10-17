import React, { useContext } from 'react';

import { Ionicons } from '@expo/vector-icons';

import { useFonts as useOswald,Oswald_400Regular} from '@expo-google-fonts/oswald';
import { useFonts as useLato,Lato_400Regular} from '@expo-google-fonts/lato';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantsNavigator } from './restaurants.navigator';
import { MapScreen } from '../../features/map/screens/map.screen';

import { SettingsScreen } from '../../features/settings/screens/settings.screen';
import { SettingsNavigator } from './settings.navigator';



export const AppNavigator = () => {

  const Tab = createBottomTabNavigator();

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if(!oswaldLoaded || !latoLoaded){
    return null;
  }


 

    return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Restaurants') {
                    iconName = "md-restaurant" ;
                    } else if (route.name === 'Settings') {
                    iconName = "md-settings";
                    }else if (route.name === 'Maps') {
                    iconName = "md-map";
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
                <Tab.Screen name="Maps" component={MapScreen} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
    )
};