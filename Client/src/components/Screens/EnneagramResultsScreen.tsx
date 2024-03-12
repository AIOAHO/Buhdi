import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { enneagramTypeMapping } from '../Quiz/EnneagramQuestions';
import api from '../../utils/api';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface EnneagramResult {
  name: string;
  description: string;
  strengths: string;
  challenges: string;
  goalsForDevelopment: string;
 }

const EnneagramResults = ({ route, navigation }) => {

 
  



 const mockResult = {
  name: "The Reformer",
  description: "Perfectionists who love order and have a strong sense of right and wrong.",
  strengths: "Highly principled, responsible, and improvement-focused.",
  challenges: "Can be critical of themselves and others, struggling with frustration when things aren't perfect.",
  goalsForDevelopment: "Type 1s should strive to accept imperfections in themselves and the world, learning that making mistakes is a part of being human. They can benefit from embracing flexibility and patience, finding peace in the process rather than just the outcome."
};

// Initial state setup with mock data
const [result, setResult] = useState(mockResult);
const [loading, setLoading] = useState(false);
const highestScoreType='1'
/*  
  const { highestScoreType, typeScores } = route.params;
  const [result, setResult] = useState<EnneagramResult | null>(null);
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
  }, [highestScoreType]); */

  const handleAssistantButtonPress = () => {
    navigation.navigate('Chat');
  }; 

console.log(result)

return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Title title={`Your Enneagram Type: ${enneagramTypeMapping[highestScoreType]}`} />
          <Card.Content>
            {loading ? (
              <ActivityIndicator animating={true} size="large" />
            ) : (
              <>
                {result && (
                  <>
                    <Text style={styles.title}>{result.name}</Text>
                    <Text style={styles.subtitle}>Description</Text>
                    <Text style={styles.text}>{result.description}</Text>
                    <Text style={styles.subtitle}>Strengths</Text>
                    <Text style={styles.text}>{result.strengths}</Text>
                    <Text style={styles.subtitle}>Challenges</Text>
                    <Text style={styles.text}>{result.challenges}</Text>
                    <Text style={styles.subtitle}>Goals for Development</Text>
                    <Text style={styles.text}>{result.goalsForDevelopment}</Text>
                  </>
                )}
              </>
            )}
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={handleAssistantButtonPress}
          style={styles.button}
          disabled={loading}
          textColor='#F7E8D8'
        >
          Chat with your Assistant
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 20,

  },
  scrollContainer: {
    height: height * .8,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#F7E8D8',
    borderRadius: 8,
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#2E536F',
  },
});

export default EnneagramResults;