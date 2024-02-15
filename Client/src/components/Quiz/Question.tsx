import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, Card } from 'react-native-paper';

const Question = ({ question, onAnswer, selectedScore }) => {
  const labels = ["1", "2", "3", "4", "5"]; // Labels for your radio buttons

  return (
      <View style={styles.container}>
        <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Text style={styles.questionText}>{question.text}</Text>
            </Card.Content>
        </Card>



        <RadioButton.Group onValueChange={newValue => onAnswer(Number(newValue))} value={String(selectedScore)}>
            <View style={styles.optionsContainer}>
              {labels.map((label, index) => (
                <View key={label} style={styles.option}>
                  <RadioButton.Android
                    value={label}
                    color={'#6200ee'} // Purple color for radio button
                    uncheckedColor={'#6210ee'} 
                  />
                </View>
              ))}
            </View>
        </RadioButton.Group>

        <View style={styles.labelsContainer}>
            <Text style={styles.labelText}>Inaccurate</Text>
            <Text style={styles.labelText}>Neutral</Text>
            <Text style={styles.labelText}>Accurate</Text>
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardContent: {
    alignItems: 'center', // Centering text in the card
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center', // Center align the question text
  },
  option: {
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute radio buttons evenly
    marginBottom: 10,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the labels
    marginBottom: 10, // Adjust the spacing as needed
  },
  labelText: {
    fontSize: 14, // Adjust the font size as needed
    marginRight: 15, // Add space to the right of each label
  },
});

export default Question;
