import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Screens/LoginScreen';
import RegistrationScreen from '../components/Screens/RegistrationScreen';
import HomepageScreen from '../components/Screens/HomepageScreen';
import EnneagramQuiz from '../components/Screens/EnneagramQuizScreen';
import EnneagramResults from '../components/Screens/EnneagramResultsScreen';
import ChatScreen from '../components/Screens/ChatScreen'; //
import { View } from 'react-native';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const screenOptions: any = {
    headerShown: true,
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTintColor: '#E4FDE1',
    headerBackground: () => <View style={{flex: 1, backgroundColor: '#59656F'}}/>,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      color: '#E4FDE1',
    },
    cardStyle: {
      backgroundColor: '#59656F'
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={screenOptions}/>
        <Stack.Screen name="Registration" component={RegistrationScreen} options={screenOptions}/>
        <Stack.Screen name="Home" component={HomepageScreen} options={screenOptions}/>
        <Stack.Screen name="EnneagramQuiz" component={EnneagramQuiz} options={screenOptions}/>
        <Stack.Screen name="EnneagramResults" component={EnneagramResults} options={screenOptions}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={screenOptions}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
