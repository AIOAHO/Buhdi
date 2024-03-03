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
      <Text style={styles.title}>We're glad you're here</Text>
      <View style={styles.linearTop}/>
      <View style={styles.circleRight1}/>
      <View style={styles.circleRight2}/>
      <View style={styles.circleLeft}/>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ minWidth: 120, maxWidth: 250 }}>
          <Text style={styles.text}>Train your Budhi by taking the Enneagram Quiz!</Text>
          <Text style={styles.text}>You can take the quiz now or do it anytime</Text>
        </View>

        <View style={{ minWidth: 120, maxWidth: 250, marginHorizontal: width * 0.1}}>
          <Text style={styles.text}>Your Budhi is your personal assistant, ask anything that comes to mind.</Text>
        </View>

        <View style={{ minWidth: 120, maxWidth: 250}}>
          <Text style={styles.text}>Plenty more features coming!</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleHomeButtonPress}
        style={styles.buttonOutlined}
      >
        Check it out!
      </TouchableOpacity>

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
    marginBottom: 48,
  },
  title: {
    marginTop: 24,
    fontSize: 90,
    marginLeft: 16,
    fontFamily: 'BigShouldersStencilDisplay_400Regular',
    color: '#E4FDE1',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#E4FDE1',
    textAlign: 'center',
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
    borderColor: '#E4FDE1',
    fontFamily: 'Inter_400Regular',
    color: '#E4FDE1',
  },
  circleRight1: {
    width: width * 0.45,
    height: height * 0.4,
    maxWidth: 500,
    maxHeight: 500,
    borderWidth: 7,
    borderRadius: 50,
    borderColor: '#E4FDE1',
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
    borderColor: '#E85F5C',
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
    borderColor: '#7EBDC2',
    position: 'absolute',
    left: -50,
    bottom: -90,
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