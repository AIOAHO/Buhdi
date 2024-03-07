import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { TextInput, Button, Text, Headline, HelperText } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { login } from '../../utils/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../utils/api';
import googleLogo from '../../../assets/googleLogo.png'; // Adjust the path as needed
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const redirectUri = process.env.EXPO_PUBLIC_GAUTH_REDIRECT_URI;
  let [expoFonts] : [boolean, Error | null] = useFonts({
    Inter_400Regular,
  });
  // Start of google auth viaw
  WebBrowser.maybeCompleteAuthSession();

  // Configuration for Google sign-in through Expo AuthSession
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
  // Your Google Client ID from Google Develper Console
  const clientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  const [state, setState] = useState(Math.random().toString(36).substring(2));

  // Configuration for Expo AuthSession request
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId,
      redirectUri: redirectUri,
      useProxy: false,
      scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      responseType: 'id_token',
      usePKCE: false,
      state, // Add the state parameter to the request
    },
    discovery
  );

  console.log(`Redirect URI: ${request?.redirectUri}`);
  console.log ('token');

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, state: responseState } = response.params;
      if (state !== responseState) {
        console.error('State mismatch');
        return;
      }
      // Log the full response from Google
    

      // call your backend to verify the token and log the user in
      handleLoginWithGoogleToken(id_token);
    }
  }, [response]);

  const handleLoginWithGoogleToken = async (token) => {
    try {
      // Send the token to your backend for verification
      const response = await api.post('/googlelogin', { token });
      
  
      if (response.status === 200 && response.data.jwtToken) {
        // Check if the app is running in a web environment
        
        if (Platform.OS === 'web') {
          
          // Store the JWT token received from the backend in localStorage for web
          localStorage.setItem('jwtToken', response.data.jwtToken);
        } else {
          // Use AsyncStorage for React Native environments
          await AsyncStorage.setItem('jwtToken', response.data.jwtToken);
        }
        
        // Navigate to the Homepage screen
        navigation.navigate('Home');
      } else {
        // Handle unsuccessful login
        setError('Failed to log in with Google. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const success = await login(email, password); // Assuming this function returns a boolean
      if (success) {
        navigation.navigate('Home');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

    // Google Sign In Button Component
    const GoogleSignInButton = ({ onPress, disabled }) => {
      return (
        <Button
          icon={() => <Image source={googleLogo} style={styles.logo} />}
          mode="outlined"
          onPress={onPress}
          disabled={disabled}
          style={styles.googleButton}
          labelStyle={styles.googleText}
        >
          Continue With Google
        </Button>
      );
    };

  return (
    <View style={styles.container}>
      <View style={styles.linearTop}/>
      <View style={styles.circleRight1}/>
      <View style={styles.circleRight2}/>
      <View style={styles.circleLeft}/>
      <View style={styles.formContainer}>
        <Headline style={styles.headline}>Log into Budhi</Headline>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{ colors: { onSurfaceVariant: '#2E536F'} }} // This targets the placeholder text color
          textColor='#2E536F' // Targets text
          selectionColor='#2E536F' // Targets text when selected
          outlineColor='rgba(46, 83, 111, 0.7)' // Targets outline unselected
          activeOutlineColor='#2E536F' // Targets outline when selected
          outlineStyle={{ backgroundColor: 'rgba(191, 191, 191, 0.25)', borderRadius: 6 }} // Background color
          style={styles.input}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          theme={{ colors: { onSurfaceVariant: '#2E536F'} }} // This targets the placeholder text color
          textColor='#2E536F' // Targets text
          selectionColor='#2E536F' // Targets text when selected
          outlineColor='rgba(46, 83, 111, 0.7)' // Targets outline unselected
          activeOutlineColor='#2E536F' // Targets outline when selected
          outlineStyle={{ backgroundColor: 'rgba(191, 191, 191, 0.25)', borderRadius: 6 }} // Background color
          style={styles.input}
        />
        <HelperText style={{ color: '#E85F5C', height: 25}}type="error">{error}</HelperText>
        
        <Button onPress={handleLogin} style={styles.button}>
          Login
        </Button>

        <GoogleSignInButton onPress={() => promptAsync()} disabled={!request} />


        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink} onPress={() => navigation.navigate('Registration')}>
            Register here
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
  },
  formContainer: {
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
  },
  headline: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter_400Regular',
    color: '#2E536F',
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
    backgroundColor: '#2E536F',
    color: '#59656F',
  },
  googleButton: {
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
    marginTop: 10,
  },
  googleButtonContent: {
    //placeholder
  },
  logo: {
    width: 24,
    height: 24,
  },
  googleText: {
    color: '#2E536F',
    //placeholder
  },
  registerText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#2E536F',
    },
  registerLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#2E536F',
    fontWeight: 'bold',
  },
});
