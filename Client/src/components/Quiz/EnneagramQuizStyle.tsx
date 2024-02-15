import { StyleSheet } from 'react-native';

const EnneagramQuizStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400, // Set a maximum width for the container
        alignSelf: 'center',
        },
    question: {
        marginBottom: 20, // Add a bottom margin to the Question component
    },

    cardContainer: {
        marginVertical: 10,
        padding: 16,
        backgroundColor: 'white', // Card background color
        borderRadius: 8, // Rounded corners for the card
        elevation: 4, // Shadow for card (Android)
        shadowOpacity: 0.2, // Shadow for card (iOS)
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    questionIndicator: {
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginVertical: 10,
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Aligns children to the edges of the container
        marginTop: 30,
        marginBottom: 20,
        width: '100%', // Make sure it spans the full width
    },
    // Add more styles as needed
});

export default EnneagramQuizStyle;
