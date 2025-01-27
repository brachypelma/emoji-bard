import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import { styles } from '@/styles';
import { FlatList } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
  const [text, setText] = React.useState('')
  
  
  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Emoji Poem to Enlgish Translator
      </Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={3}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={''}
      />
      <ScrollView style={styles.fullWidth}>

      </ScrollView>
    </View>
  );
}
