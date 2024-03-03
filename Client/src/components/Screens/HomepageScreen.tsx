import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  useFonts,
  BigShouldersStencilDisplay_400Regular,
} from '@expo-google-fonts/big-shoulders-stencil-display';
import { Inter_400Regular } from '@expo-google-fonts/inter';

import { logout } from '../../utils/auth'; // Import your logout logic


export default function HomepageScreen({ navigation }) {
  let [expoFonts] : [boolean, Error | null] = useFonts({
    BigShouldersStencilDisplay_400Regular,
    Inter_400Regular,
  });

  const handleLogout = async () : Promise<void> => {
    try {
      // Call your logout function from auth.ts
      await logout();
      // Navigate to the login screen after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleQuizButtonPress = () : void => {
    // Navigate to the Quiz screen when the Quiz button is pressed
    navigation.navigate('EnneagramQuiz');
  };

  const handleAssistantButtonPress = () : void => {
   // Navigate to the Assistant screen when the Assistant button is pressed
   navigation.navigate('Chat');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.title}>Budhi</Text>
      <View style={styles.linearTop}/>
      <View style={styles.circleRight1}/>
      <View style={styles.circleRight2}/>
      <View style={styles.circleLeft}/>
      <TouchableOpacity
        onPress={handleQuizButtonPress}
        style={styles.buttonSolid}
      >
        Enneagram Quiz
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleAssistantButtonPress}
        style={styles.buttonSolid}
      >
        Assistant
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={styles.buttonOutlined}
      >
        Logout
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Inter_400Regular',
    color: '#E4FDE1',
  },
  title: {
    fontSize: 130,
    fontFamily: 'BigShouldersStencilDisplay_400Regular',
    color: '#E4FDE1',
  },
  buttonSolid: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '20%',
    borderWidth: 0.5,
    borderRadius: 16,
    borderColor: '#E4FDE1',
    color: '#59656F',
    backgroundColor: '#E4FDE1',
    fontFamily: 'Inter_400Regular',
  },
  buttonOutlined: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '20%',
    borderWidth: 0.5,
    borderRadius: 16,
    borderColor: '#E4FDE1',
    fontFamily: 'Inter_400Regular',
    color: '#E4FDE1',
  },
  circleRight1: {
    width: 400,
    height: 400,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#E4FDE1',
    position: 'absolute',
    right: -100,
    top: -100,
  },
  circleRight2: {
    width: 300,
    height: 600,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#E85F5C',
    position: 'absolute',
    right: -100,
    top: -100,
  },
  circleLeft: {
    width: 400,
    height: 400,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#7EBDC2',
    position: 'absolute',
    left: -100,
    bottom: -100,
  },
  linearTop: {
    width: '120%',
    borderTopWidth: 7,
    borderRadius: 50,
    borderColor: '#DBCBD8',
    position: 'absolute',
    top: 0,
  }
});