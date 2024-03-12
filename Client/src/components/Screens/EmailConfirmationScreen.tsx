import React from 'react';
import { Dimensions, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Text, } from 'react-native-paper';
import babyOctopusImage from '../../../assets/Baby-octopus.png';
import {
  useFonts,
  BigShouldersStencilDisplay_400Regular,
} from '@expo-google-fonts/big-shoulders-stencil-display';
import { Inter_400Regular } from '@expo-google-fonts/inter';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function EmailConfirmationScreen({ navigation }) {
  let [expoFonts] : [boolean, Error | null] = useFonts({
    BigShouldersStencilDisplay_400Regular,
    Inter_400Regular,
  });
  
  return (
    <View style={styles.container}>
        <View style={styles.linearTop} />
        <View style={styles.circleRight1} />
        <View style={styles.circleRight2} />
        <View style={styles.circleLeft} />
        <Text style={styles.title}>Hey there!</Text>
        <ScrollView style={styles.scrollview}>
            <View style={styles.contentcontainer}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.text}>Thanks for signing up to our waitinglist!</Text>
                    <Text style={styles.text}>Buhdi is slowly being born.</Text>
                </View>
                <View style={{ }}>
                    <Text style={styles.text}>Keep an eye on your email to know when Buhdi is ready to talk.</Text>
                    <Image source={babyOctopusImage} style={styles.babyOctopusStyle} />
                    <Text style={styles.text}>This baby octopus will keep you company until then!</Text>
                </View>
            </View>
        </ScrollView>
    </View>    
        
  );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F1C1BF',
        flex: 1,
        flexWrap: 'wrap',
        overflow: 'hidden',
// Add padding at the bottom for scrolling   
    },
    scrollview: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    contentcontainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  
        paddingBottom: 30, 
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
    button: {
        marginTop: 10,
        width: width * 0.8, // Ensure buttons take the 80% width of the container
        maxWidth: 350, // Limit the maximum width of buttons
        backgroundColor: '#2E536F',
        color: '#59656F',
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
    babyOctopusStyle: {
        width: 250, // Set the width of the image
        height: 250, // Set the height of the image
        alignSelf: 'center',
        resizeMode: 'contain', // This ensures the image scales nicely
    },
});