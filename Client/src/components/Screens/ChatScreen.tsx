import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Animated } from 'react-native';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const animation = new Animated.Value(0);

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
    <View style={styles.container}>
      <Card>
        <Card.Title title="Buhdi" subtitle="Always here for you." left={props => <Avatar.Icon {...props} icon="robot" />} />
      </Card>
      <FlatList
        data={messages}
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
         
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          onSubmitEditing={handleSendMessage} // Add this line
          returnKeyType="send" // Optional: changes the return key to say "Send"
        />
        <Button mode="contained" onPress={handleSendMessage}>Send</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  typingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 2,
  },
  card: {
    margin: 10
    },
  placeholderCard: {
    margin: 10
    },
});
