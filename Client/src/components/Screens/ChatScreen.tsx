import React, { useState, useRef, useEffect } from 'react';
import { KeyboardAvoidingView, Dimensions, View, TextInput, FlatList, StyleSheet, Animated } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);


  interface Message {
    sender: string;
    content: any;
  }

  const handleSendMessage = async () => {
   if (input.trim() === '') return; // Prevent sending empty messages

   // Add user's message to messages array
   setMessages((prevMessages) => [...prevMessages, { sender: 'User', content: input }]);

   // short timeout before placeholder shows
   setTimeout(() => {
    // Add placeholder message to messages array
    setMessages((prevMessages) => [...prevMessages, { sender: 'Placeholder', content: '...' }]);
    }, 1000);



    
      // Code to send the message to the server and handle response remains unchanged
    try {
      // Get the userId and jwtToken from AsyncStorage
      let userId;
      let jwtToken;
      if (Platform.OS === 'web') {

        userId = window.localStorage.getItem('userId');
        jwtToken = window.localStorage.getItem('jwtToken');
      } else {
        userId = await AsyncStorage.getItem('userId');
        jwtToken = await AsyncStorage.getItem('jwtToken');
      }

          // Send the message to the server
          const response = await api.post('/chat', {userId: userId, message: input });
          
          // Add the assistant's response to the messages array
          setMessages((prevMessages) => prevMessages.map((message, index) => {
            if (message.sender === 'Placeholder') {
              return { ...message, sender: 'Buhdi', content: response.data.response };
            }
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 500);
            return message;
            }));
        } catch (error) {
        
          console.error('Error sending message to back:', error);
    } finally {
          // Set pendingResponse to false to hide the placeholder card

      setInput(''); // Clear input field
    }
  };

  return (
    <KeyboardAvoidingView 
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 50}
    >
      <SafeAreaView style={styles.container}>
        <Card>
          <Card.Title title="Buhdi" subtitle="Always here for you." left={props => <Avatar.Icon {...props} icon="robot" />} />
        </Card>
        <FlatList
          data={messages}
          contentContainerStyle={{ paddingBottom: 20}}
          keyExtractor={(item, index) => index.toString()}
          ref={flatListRef}
          style={{height: height * 0.75 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item }) => {
            if (item.sender === 'Placeholder') {
              return (
                <Card style={styles.placeholderCard}>
                  <Card.Title title="Buhdi" />
                  <Card.Content>
                    <Paragraph>...</Paragraph>
                  </Card.Content>
                </Card>
              );
            }
            return (
              <Card style={styles.card}>
                <Card.Title title={item.sender} />
                <Card.Content>
                  <Paragraph>{item.content}</Paragraph>
                </Card.Content>
              </Card>
            );
          }}

        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
          />
          <Button style={{ backgroundColor: '#2E536F'}} textColor='#F7E8D8' mode="contained" onPress={handleSendMessage}>Send</Button>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: width,
    height: height,
    paddingBottom: 10,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#F1C1BF', // Same as main background colour
    // Ensure there's enough space for the text input and button
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#F1C1BF',
    color: '#2E536F',
    borderColor: 'rgba(46, 83, 111, 0.7)',
  },
  card: {
    margin: 10,
    padding: 10,
    // backgroundColor: '#F7E8D8', // USER message background
  },
  placeholderCard: {
    margin: 10,
    padding: 10,
    // backgroundColor: '#2E536F', // BUDHI message background
  },
});
