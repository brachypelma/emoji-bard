import {
  StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
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
  fullWidth: {
    width: '100%',
  },
  main: {
    backgroundColor: '#000',
    color: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    width: '100%',
    maxWidth: 600,
    margin: 'auto',
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
