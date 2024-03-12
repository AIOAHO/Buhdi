import React from 'react';
import { Dimensions, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  useFonts,
  BigShouldersStencilDisplay_400Regular,
} from '@expo-google-fonts/big-shoulders-stencil-display';
import { Inter_400Regular } from '@expo-google-fonts/inter';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function OnboardingScreen({ navigation }) {
  let [expoFonts] : [boolean, Error | null] = useFonts({
    BigShouldersStencilDisplay_400Regular,
    Inter_400Regular,
  });


  const handleHomeButtonPress = () : void => {
    // Navigate to the Quiz screen when the Quiz button is pressed
    navigation.navigate('Home');
  };

  const handleAssistantButtonPress = () : void => {
   // Navigate to the Assistant screen when the Assistant button is pressed
   navigation.navigate('Chat');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey there!</Text>
      <View style={styles.linearTop}/>
      <View style={styles.circleRight1}/>
      <View style={styles.circleRight2}/>
      <View style={styles.circleLeft}/>
      <View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ minWidth: 120, maxWidth: 250 }}>
          <Text style={styles.text}>Buhdi helps you when you feel stuck, confused or anxious.</Text>
          <Text style={styles.text}>Talk to Buhdi or take the Quiz to learn more about yourself! </Text>
        </View>

        <View style={{ minWidth: 120, maxWidth: 250}}>
          <Text style={styles.text}>More features coming!</Text>
        </View>
      
        <TouchableOpacity
          onPress={handleHomeButtonPress}
          style={styles.buttonOutlined}
        >
          Check it out!
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={handleAssistantButtonPress}
        style={styles.buttonSolid}
      >
        Talk to Budhi now
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F1C1BF',
    overflow: 'hidden',
  },
  title: {
    marginTop: 24,
    fontSize: 90,
    marginLeft: 16,
    fontFamily: 'BigShouldersStencilDisplay_400Regular',
    color: '#2E536F',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#2E536F',
    textAlign: 'center',
    margin: 20,
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
  },
  formContainer: {
    width: width * 0.8, // Ensure buttons take the 80% width of the container
    maxWidth: 350, // Limit the maximum width of buttons
  },
});