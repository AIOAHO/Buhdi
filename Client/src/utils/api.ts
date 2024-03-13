import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnneagramResultPayload } from '../types'; // Define this type according to your payload structure



// Check if running in a web environment
const isWeb = Platform.OS === 'web';

// Define the base URL for your backend API
const baseURL = process.env.EXPO_PUBLIC_API_BASE_URL; 


// Create an Axios instance with the base URL
const api = axios.create({
  baseURL,
  timeout: 50000,
});

api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
     let token: string | null = '';
 
     if (isWeb) {
       token = window.localStorage.getItem('jwtToken');
     } else {
       token = await AsyncStorage.getItem('jwtToken');
     }
 
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
       
     }
 
     return config;
  },
  (error: AxiosError) => Promise.reject(error)
 );

// Interceptors for logging
api.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, async (error: AxiosError) => {
  if (error.response?.status === 401) { // Unauthorized
    if (isWeb) {
      // Redirect to login page in web environments
      window.location.href = '/login';
    } else {
      navigation.navigate('Login');
      console.log('Unauthorized access, navigate to Login screen');
    }
  }
  return Promise.reject(error);
});

api.interceptors.response.use((response: AxiosResponse) => {
  
  return response;
}, (error: AxiosError) => {
  console.error('Response Error:', error);
  return Promise.reject(error);
});

export const postEnneagramResult = async (data: EnneagramResultPayload) => {
  try {
    const response = await api.post('/enneagram-result', data);
    return response.data;
  } catch (error) {
    console.error('Error sending Enneagram result:', error);
    throw error;
  }
};

export default api;
