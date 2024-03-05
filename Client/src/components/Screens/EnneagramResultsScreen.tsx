import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { enneagramTypeMapping } from '../Quiz/EnneagramQuestions';
import api from '../../utils/api';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EnneagramResults = ({ route, navigation }) => {
  const { highestScoreType, typeScores } = route.params;
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      if (Platform.OS === 'web') {
        return window.localStorage.getItem('userId');
      } else {
        return await AsyncStorage.getItem('userId');
      }
    };

    const saveResultsAndGetAnalysis = async () => {
      try {
        setLoading(true);
        const userId = await fetchUserId();
        
        if (!userId) {
          throw new Error('User ID not found');
        }

        const fullTypeName = enneagramTypeMapping[highestScoreType];
        // Step 1: Save the quiz results
        await api.post('/save-enneagram-results', { enneagramType: fullTypeName, userId, typeScores });
        

        // Step 2: Fetch the enneagram analysis
        const analysisResponse = await api.post('/get-enneagram-analysis', { enneagramType: fullTypeName });
        setResult(analysisResponse.data.analysis);
      } catch (error) {
        console.error('Error processing results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (highestScoreType) {
      saveResultsAndGetAnalysis();
    } else {
      setLoading(false);
    }
  }, [highestScoreType]);

  const handleAssistantButtonPress = () => {
    navigation.navigate('Chat');
  };



  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={`Your Enneagram Type: ${enneagramTypeMapping[highestScoreType]}`} />
        <Card.Content>
          {loading ? (
            <ActivityIndicator animating={true} size="large" />
          ) : (
            <>
              <Text style={styles.resultText}>{result}</Text>
            </>
          )}
        </Card.Content>
      </Card>
      <Button
        mode="contained"
        onPress={handleAssistantButtonPress}
        style={styles.button}
        disabled={loading}
      >
        Chat with your Assistant
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Set a maximum width for the container
    alignSelf: 'center',
  },
  card: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  resultText: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    margin: 10,
    maxWidth: 400,
  },
});

export default EnneagramResults;
