// styles.ts
import { StyleSheet } from 'react-native';

export const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  itemText: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#007BFF', // Standardized color for buttons or links
  },
});

export const colors = {
  text: '#000000',
  background: '#FFFFFF',
  button: '#007BFF',
  grayText: 'gray',
};
