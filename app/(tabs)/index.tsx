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
import { styles } from '@/styles';

export default function HomeScreen() {
  const [text, setText] = React.useState('')
  const [entries, setEntries] = React.useState<WordEntry[]>([])
  const [poem, setPoem] = React.useState<string>('')

  React.useEffect(() => {
    setEntries(getWordEntries(text))
  }, [text])

  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        English to Emoji Translator
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
        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={{...styles.text, ...styles.heading}}>
              Word
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={{...styles.text, ...styles.heading}}>
              Emojis
            </Text>
          </View>
        </View>
        <FlatList
          data={entries}
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
  );
}
