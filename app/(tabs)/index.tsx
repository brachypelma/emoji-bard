import React from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import {
  getWordEntries,
  WordEntry,
} from '@/data/get-word-entries';
import * as Clipboard from 'expo-clipboard';
import { getEntriesFromEmojis } from '@/data/get-emoji-entries';
import { DictionaryEntry } from '@/data/dictionary';
import { styles } from '@/styles';

export default function HomeScreen() {
  const [isWord, setIsWord] = React.useState(true)
  const [text, setText] = React.useState('')
  const [wordEntries, setWordEntries] = React.useState<WordEntry[]>([])
  const [poem, setPoem] = React.useState<string>('')

  React.useEffect(() => {
    setWordEntries(getWordEntries(text))
  }, [text])

  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        {isWord ? 'Word' : 'Emoji'} Poem to {isWord ? 'English' : 'Word'} Translator
      </Text>
      <TextInput
        style={{...styles.fullWidth, ...styles.textInput}}
        multiline
        numberOfLines={3}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={''}
      />
      <ScrollView style={styles.fullWidth}>
        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={{...styles.text, ...styles.heading}}>
              {isWord ? 'Words' : 'Emojis'}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{...styles.text, ...styles.heading}}>
              {isWord ? 'Emojis' : 'Words'}
            </Text>
          </View>
        </View>
        <FlatList
          data={wordEntries}
          style={styles.stepContainer}
          renderItem={({ item }) => (
            <View style={styles.grid}>
              <View style={styles.item}>
                <Text style={styles.text}>
                  {item.word}
                </Text>
              </View>
              <View style={{ ...styles.item, display: 'flex', flexDirection: 'row' }}>
                {item.emojis.map(emoji => (
                  <Button
                    key={emoji}
                    title={emoji}
                    onPress={() => {
                      setPoem((poem) => poem + emoji)
                    }}
                  />
                ))}
              </View>
            </View>
          )}
        />
      </ScrollView>
      <Text style={{ ...styles.text, ...styles.heading }}>
        Poem
      </Text>
      <View style={styles.grid}>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={3}
          placeholder="Your poem will appear here"
          onChangeText={newText => setPoem(newText)}
          value={poem}
        />
        <Button
          title="Copy"
          onPress={async () => await Clipboard.setStringAsync(poem)}
        />
      </View>
    </View>
  );
}
