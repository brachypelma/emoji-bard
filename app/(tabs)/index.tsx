import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
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

export default function HomeScreen() {
  const [text, setText] = React.useState('')
  const [entries, setEntries] = React.useState<WordEntry[]>([])
  const [poem, setPoem] = React.useState<string>('')
  const [copiedText, setCopiedText] = React.useState('')

  React.useEffect(() => {
    setEntries(getWordEntries(text))
  }, [text])

  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        Emoji Bard
      </Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
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
        numberOfLines={4}
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

const styles = StyleSheet.create({
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
    width: '100%',
    height: 100,
  }
});
