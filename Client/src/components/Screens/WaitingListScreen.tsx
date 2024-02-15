import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Title, useTheme } from 'react-native-paper';

const WaitingListScreen = () => {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');

  const handleEmailChange = (email) => setEmail(email);

  const handleJoinWaitingList = () => {
    // TODO: Implement what happens after the user submits the email
    console.log('Email submitted:', email);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Join Our Waiting List</Title>
      <Text style={styles.subtitle}>
        Get early access and exclusive updates by signing up!
      </Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        theme={{ colors: { primary: colors.primary } }}
      />
      <Button
        mode="contained"
        onPress={handleJoinWaitingList}
        style={styles.button}
      >
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  button: {
    padding: 6,
  },
});

export default WaitingListScreen;
