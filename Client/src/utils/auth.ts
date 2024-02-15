import api from './api';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isWeb = Platform.OS === 'web';


export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await api.post('/login', { email, password });

    if (response.status === 200 && response.data.token) {
      if (isWeb) {
        window.localStorage.setItem('jwtToken', response.data.token);
        window.localStorage.setItem('userId', response.data.userId)
      } else {
        await AsyncStorage.setItem('jwtToken', response.data.token);
        await AsyncStorage.setItem('userId', response.data.userId)
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const validateEmail = (email) => {
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return pattern.test(email);
};

export const validatePassword = (password) => {
  const minChar = 8;
  const hasNumber = /\d/;
  const hasUpper = /[A-Z]/;
  const hasLower = /[a-z]/;
  const hasSpecialChar = /[^A-Za-z0-9]/;
  return (
    password.length >= minChar &&
    hasNumber.test(password) &&
    hasUpper.test(password) &&
    hasLower.test(password) &&
    hasSpecialChar.test(password)
  );
};

export const register = async (email: string, password: string): Promise<boolean> => {
  // Validate email and password before attempting to register
  if (!validateEmail(email)) {
    console.error('Registration error: Invalid email format.');
    return false;
  }
  if (!validatePassword(password)) {
    console.error('Registration error: Password does not meet security requirements.');
    return false;
  }

  try {
    const response = await api.post('/register', { email, password });

    if (response.status === 201) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};


export const logout = async (): Promise<void> => {
  try {
    if (isWeb) {
      window.localStorage.removeItem('jwtToken');
    } else {
      await AsyncStorage.removeItem('jwtToken');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};
