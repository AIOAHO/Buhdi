import { StyleSheet } from 'react-native';

const EnneagramQuizStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  linearTop: {
    width: '120%',
    borderTopWidth: 7,
    borderRadius: 50,
    borderColor: '#2E536F',
    position: 'absolute',
    top: 0,
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
  },
  questionIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: '#2E536F',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },
  motivationalText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
    color: '#2E536F',
  },
  motivationalTextPlaceholder: {
    height: 40,
    marginBottom: 40,
    marginTop: 20,
  },
});

export default EnneagramQuizStyle;