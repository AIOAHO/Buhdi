import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../components/Screens/LoginScreen';
import RegistrationScreen from '../components/Screens/RegistrationScreen';
import HomepageScreen from '../components/Screens/HomepageScreen';
import EnneagramQuiz from '../components/Screens/EnneagramQuizScreen';
import EnneagramResults from '../components/Screens/EnneagramResultsScreen';
import ChatScreen from '../components/Screens/ChatScreen';
import WaitingListScreen from '../components/Screens/WaitingListScreen';
import OnboardingScreen from '../components/Screens/OnboardingScreen';

const Stack = createStackNavigator();
const linking = {
 prefixes: [window.location.origin],
 config: {
    initialRouteName: 'WaitingList' as 'WaitingList' | 'Login',
    screens: {
      WaitingList: '/',
      Login: 'login',
      // Add other routes here as needed
    },
 },
};

export default function AppNavigator() {

  const screenOptions: any = {
    headerShown: true,
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTintColor: '#2E536F',
    headerBackground: () => <View style={{flex: 1, backgroundColor: '#F1C1BF'}}/>,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      color: '#2E536F',
    },
    cardStyle: {
      backgroundColor: '#F1C1BF'
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="WaitingList" component={WaitingListScreen} options={screenOptions}/>
        <Stack.Screen name="Login" component={LoginScreen} options={screenOptions}/>
        <Stack.Screen name="Registration" component={RegistrationScreen} options={screenOptions}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={screenOptions}/>
        <Stack.Screen name="Home" component={HomepageScreen} options={screenOptions}/>
        <Stack.Screen name="EnneagramQuiz" component={EnneagramQuiz} options={screenOptions}/>
        <Stack.Screen name="EnneagramResults" component={EnneagramResults} options={screenOptions}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={screenOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
