import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnneagramResultPayload } from '../types'; // Define this type according to your payload structure


// Check if running in a web environment
const isWeb = Platform.OS === 'web';

// Define the base URL for your backend API
const baseURL = 'http://localhost:3000/api';

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
 
     console.log('Retrieved token:', token);
 
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
       console.log('Set Authorization header:', config.headers.Authorization);
     }
 
     return config;
  },
  (error: AxiosError) => Promise.reject(error)
 );

// Interceptors for logging
api.interceptors.request.use((request: AxiosRequestConfig) => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
}, (error: AxiosError) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use((response: AxiosResponse) => {
  console.log('Response:', JSON.stringify(response, null, 2));
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
