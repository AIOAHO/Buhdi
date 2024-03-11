import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

const theme = {

  colors: {
     primary: '#2E536F', // Blue color for primary elements
     accent: '#F1C1BF', // Pink color for accents
     background: '#F7E8D8', // Cream color for backgrounds (like text input)
     text: '#2E536F', // Blue color for text
     onSurfaceVariant: '#2E536F', // text in fields cream
     secondaryContainer: '#2E536F', // chips
     disabled: '#2E536F', // blue color
     backdrop: '#F7E8D8', // blue color
     // Add other color specifications if needed
    },

};


export default function App() {
  console.log(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID)
  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <AppNavigator />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


