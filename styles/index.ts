import {
  StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 8,
    color: '#fff',
    cursor: 'pointer',
    padding: 16,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 16,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  heading: {
    fontWeight: 'bold',
  },
  item: {
    width: '48%',
    height: 100,
  },
  flexShrink: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  fullFlex: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
  },
  fullWidth: {
    width: '100%',
  },
  main: {
    backgroundColor: '#000',
    color: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    padding: 16,
    width: '100%',
    maxWidth: 600,
    margin: 'auto',
    minHeight: '100%',
  },
  maxWidth: {
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    width: '100%',
  },
  text: {
    color: '#fff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    color: '#fff',
    padding: 8,
    flex: 1,
    minHeight: 75,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
