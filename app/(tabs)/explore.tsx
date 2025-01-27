import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { styles } from '@/styles';
import { FlatList } from 'react-native-gesture-handler';
import { getEntriesFromEmojis } from '@/data/get-emoji-entries';
import { DictionaryEntry } from '@/data/dictionary';

export default function TabTwoScreen() {
  const [text, setText] = React.useState('')
  const [entries, setEntries] = React.useState<DictionaryEntry[]>([])

  React.useEffect(() => {
    setEntries(getEntriesFromEmojis(text))
  }, [text])
  
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
