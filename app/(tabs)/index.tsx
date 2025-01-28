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
  const [emojiEntries, setEmojiEntries] = React.useState<DictionaryEntry[]>([])
  const [poem, setPoem] = React.useState<string>('')

  React.useEffect(() => {
    if (isWord) setWordEntries(getWordEntries(text))
    else setEmojiEntries(getEntriesFromEmojis(text))
  }, [text])

  const toggleMode = (isWord: boolean) => {
    setIsWord(isWord)
    setText('')
    setPoem('')
    setWordEntries([])
    setEmojiEntries([])
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>
        Emoji Bard
      </Text>
      <View style={styles.grid}>
        <Button
          title="English to Emojis"
          onPress={() => toggleMode(true)}
          color={isWord ? '#007AFF' : '#555'}
        />
        <Button
          title="Emojis to English"
          onPress={() => toggleMode(false)}
          color={isWord ? '#555' : '#007AFF'}
        />
      </View>
      <Text style={styles.text}>
        {isWord ? 'Word' : 'Emoji'} Poem to {isWord ? 'English' : 'Word'} Translator
      </Text>
      <TextInput
        style={{...styles.fullWidth, ...styles.textInput}}
        multiline
        numberOfLines={3}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        value={text}
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
        {isWord
          ? (
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
          )
          : (
            <FlatList
            data={emojiEntries}
            style={styles.stepContainer}
            renderItem={({ item }) => (
              <View style={styles.grid}>
                <View style={styles.item}>
                  <Text style={styles.text}>
                    {item.emoji}
                  </Text>
                </View>
                <View style={{ ...styles.item, display: 'flex', flexDirection: 'row' }}>
                  {item.words.map(word => (
                    <Button
                      key={word}
                      title={word}
                      onPress={() => {
                        setPoem((poem) => `${poem} ${word}`)
                      }}
                    />
                  ))}
                </View>
              </View>
            )}
          />)}
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
