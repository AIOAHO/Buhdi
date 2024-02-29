import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Screens/LoginScreen';
import RegistrationScreen from '../components/Screens/RegistrationScreen';
import HomepageScreen from '../components/Screens/HomepageScreen';
import EnneagramQuiz from '../components/Screens/EnneagramQuizScreen';
import EnneagramResults from '../components/Screens/EnneagramResultsScreen';
import ChatScreen from '../components/Screens/ChatScreen';
import WaitingListScreen from '../components/Screens/WaitingListScreen';

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

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="WaitingList" component={WaitingListScreen}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Homepage" component={HomepageScreen} />
        <Stack.Screen name="EnneagramQuiz" component={EnneagramQuiz} />
        <Stack.Screen name="EnneagramResults" component={EnneagramResults} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
