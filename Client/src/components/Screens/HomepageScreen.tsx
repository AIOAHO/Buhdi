import React from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  useFonts,
  BigShouldersStencilDisplay_400Regular,
} from '@expo-google-fonts/big-shoulders-stencil-display';
import { Inter_400Regular } from '@expo-google-fonts/inter';

import { logout } from '../../utils/auth'; // Import your logout logic

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
  
  const handleFeedbackButtonPress = () : void => {
    // Navigate to the Assistant screen when the Assistant button is pressed
    navigation.navigate('Feedback');
   };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to</Text>
      <Text style={styles.titlelogo}>Budhi</Text>
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
        onPress={handleFeedbackButtonPress}
        style={styles.buttonSolid}
      >
        Feedback
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
    color: '#2E536F',
  },
  titlelogo: {
    fontSize: 130,
    fontFamily: 'BigShouldersStencilDisplay_400Regular',
    color: '#2E536F',
  },
  buttonSolid: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: width * 0.8,
    maxWidth: 350,
    borderWidth: 0.5,
    borderRadius: 16,
    color: '#F7E8D8',
    borderColor: '#2E536F',
    backgroundColor: '#2E536F',
    fontFamily: 'Inter_400Regular',
  },
  buttonOutlined: {
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: width * 0.8,
    maxWidth: 350,
    borderWidth: 0.5,
    borderRadius: 16,
    borderColor: '#2E536F',
    fontFamily: 'Inter_400Regular',
    color: '#2E536F',
  },
  circleRight1: {
    width: width * 0.45,
    height: height * 0.4,
    maxWidth: 500,
    maxHeight: 500,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#fff0db',
    position: 'absolute',
    right: -100,
    top: -100,
  },
  circleRight2: {
    width: width * 0.32,
    height: height * 0.7,
    maxWidth: 400,
    maxHeight: 800,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#2E536F',
    position: 'absolute',
    right: -100,
    top: -100,
  },
  circleLeft: {
    width: width * 0.9,
    height: height * 0.3,
    maxWidth: 500,
    maxHeight: 500,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#fff0db',
    position: 'absolute',
    left: -50,
    bottom: -50,
  },
  linearTop: {
    width: '120%',
    borderTopWidth: 7,
    borderRadius: 50,
    borderColor: '#2E536F',
    position: 'absolute',
    top: 0,
  }
});