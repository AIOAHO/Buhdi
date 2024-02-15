import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { logout } from '../../utils/auth'; // Import your logout logic

export default function HomepageScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      // Call your logout function from auth.ts
      await logout();
      // Navigate to the login screen after logout
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleQuizButtonPress = () => {
    // Navigate to the Quiz screen when the Quiz button is pressed
    navigation.navigate('EnneagramQuiz');
  };

  const handleAssistantButtonPress = () => {
   // Navigate to the Assistant screen when the Assistant button is pressed
   navigation.navigate('Chat');
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Homepage</Text>

      <Button
        mode="contained"
        onPress={handleQuizButtonPress}
        style={{ margin: 10 }}
      >
        EnneagramQuiz
      </Button>

      <Button
        mode="contained"
        onPress={handleAssistantButtonPress}
        style={{ margin: 10 }}
      >
        Assistant
      </Button>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={{ margin: 10 }}
      >
        Logout
      </Button>
    </View>
  );
}
