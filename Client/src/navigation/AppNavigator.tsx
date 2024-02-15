import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Screens/LoginScreen';
import RegistrationScreen from '../components/Screens/RegistrationScreen';
import HomepageScreen from '../components/Screens/HomepageScreen';
import EnneagramQuiz from '../components/Screens/EnneagramQuizScreen';
import EnneagramResults from '../components/Screens/EnneagramResultsScreen';
import ChatScreen from '../components/Screens/ChatScreen'; //

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
