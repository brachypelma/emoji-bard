import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.main}>
      <Text>
        Emoji Bard
      </Text>
      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    color: '#000',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
