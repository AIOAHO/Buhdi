// src/components/Quiz/EnneagramQuiz.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Question from '../Quiz/Question';
import { quizQuestions, enneagramTypeMapping } from '../Quiz/EnneagramQuestions';
import { useNavigation } from '@react-navigation/native';
import styles from '../Quiz/EnneagramQuizStyle';


export default function EnneagramQuiz() {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const motivationalText1 = "Buhdi is listening! You're doing great.";
  const motivationalText2 = "Almost there!";

  useEffect(() => {
    // Updated: Selects 3 random questions for each Enneagram type
    const selectedQuestions = selectRandomQuestionsPerType(quizQuestions);
    setShuffledQuestions(selectedQuestions);
    setAnswers(Array(selectedQuestions.length).fill(0));
  }, []);

  // New function: Selects 3 random questions per Enneagram type
  const selectRandomQuestionsPerType = (questions) => {
    let selected = [];
    Object.keys(enneagramTypeMapping).forEach(typeKey => {
      const filteredQuestions = questions.filter(q => q.type.toString() === typeKey);
      const shuffledQuestions = shuffleArray(filteredQuestions);
      selected.push(...shuffledQuestions.slice(0, 4));
    });
    return shuffleArray(selected); // Shuffle the selected questions again to mix the types
  };

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Check against shuffledQuestions.length
  const handleAnswer = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = score;
    setAnswers(newAnswers);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Adjusted: To check against shuffledQuestions.length
  const goToNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Unchanged: Navigation to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Adjusted: Calculation based on shuffledQuestions
  const handleSubmit = () => {
    const typeScores = shuffledQuestions.reduce((acc, question, index) => {
      const typeKey = question.type.toString();
      acc[typeKey] = (acc[typeKey] || 0) + answers[index];
      return acc;
    }, {});

    // Adjusted: Scoring scale based on 3 questions per type, each possibly scoring up to 5 points
    for (const type in typeScores) {
      typeScores[type] = Math.round((typeScores[type] / (4 * 5)) * 100);
    }

    let highestScoreType = null;
    let highestScore = 0;
    for (const type in typeScores) {
      if (typeScores[type] > highestScore) {
        highestScore = typeScores[type];
        highestScoreType = type;
      }
    }

    //chaning types for mongo db (data is send to mongo in results)
    const formattedTypeScores = Object.entries(typeScores).map(([type, score]) => ({
      type,
      score
    }));
  
    navigation.navigate('EnneagramResults', { highestScoreType, typeScores: formattedTypeScores });
  };

  return (
    <View style={styles.container}>
      <View style={styles.linearTop}/>

      <View style={styles.formContainer}>
        {shuffledQuestions.length > 0 && (
          <>

          {/* Placeholder View for Motivational Text */}
          <View style={styles.motivationalTextPlaceholder}>
            {currentQuestionIndex === Math.floor(shuffledQuestions.length / 3) && (
              <Text style={styles.motivationalText}>{motivationalText1}</Text>
            )}
            {currentQuestionIndex === Math.floor(2 * shuffledQuestions.length / 3) && (
              <Text style={styles.motivationalText}>{motivationalText2}</Text>
            )}
          </View>

            <Question
              question={shuffledQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              selectedScore={answers[currentQuestionIndex]}
            />
            <Text style={styles.questionIndicator}>
              {currentQuestionIndex + 1}/{shuffledQuestions.length}
            </Text>
            <View style={styles.navigationContainer}>
              {/* Wrap the Previous button in a View for left alignment */}
              <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 40, }}>
                {currentQuestionIndex > 0 && (
                  <Button style={{ backgroundColor: '#2E536F'}} textColor='#F7E8D8' mode="contained" onPress={goToPreviousQuestion}>Previous</Button>
                )}
              </View>
              
              {/* Wrap the Next and Submit buttons in a View for right alignment */}
              <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', marginRight: 40, }}>
                {currentQuestionIndex < shuffledQuestions.length - 1 && (
                  <Button style={{ backgroundColor: '#2E536F'}} textColor='#F7E8D8' mode="contained" onPress={goToNextQuestion}>Next</Button>
                )}
                {currentQuestionIndex === shuffledQuestions.length - 1 && (
                  <Button style={{ backgroundColor: '#2E536F'}} textColor='#F7E8D8' mode="contained" onPress={handleSubmit}>Submit</Button>
                )}
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};


