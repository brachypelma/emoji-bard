import React from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  ScrollView,
  Pressable,
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.main}>
          <View style={{ ...styles.grid, ...styles.buttonContainer }}>
            <Pressable
              onPress={() => toggleMode(true)}
              style={{ ...styles.button, backgroundColor: isWord ? '#408' : '#555' }}
            >
              <Text style={{ ...styles.text, ...styles.buttonText }}>
                English to Emojis
              </Text>
            </Pressable>
            <Pressable
              onPress={() => toggleMode(false)}
              style={{ ...styles.button, backgroundColor: isWord ? '#555' : '#408' }}
            >
              <Text style={{ ...styles.text, ...styles.buttonText }}>
                Emojis to English
              </Text>
            </Pressable>
          </View>
          <TextInput
            style={{...styles.fullWidth, ...styles.textInput}}
            multiline
            numberOfLines={3}
            placeholder={`${isWord ? 'Text' : 'Emojis'} to translate to ${isWord ? 'Emojis' : 'Text'}`}
            onChangeText={newText => setText(newText)}
            value={text}
          />
          <View style={{ ...styles.fullWidth, ...styles.fullFlex }}>
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
                    <View style={{ ...styles.item, ...styles.buttons }}>
                      {item.emojis.map(emoji => (
                        <Pressable
                          key={emoji}
                          style={{ ...styles.centered, ...styles.resultButton }}
                          onPress={() => {
                            setPoem((poem) => poem + emoji)
                          }}>
                         {emoji}
                        </Pressable>
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
                    <View style={{ ...styles.item, ...styles.buttons }}>
                      {item.words.map(word => (
                        <Pressable
                          key={word}
                          style={{ ...styles.centered, ...styles.resultButton }}
                          onPress={() => {
                            setPoem((poem) => `${poem} ${word}`)
                          }}>
                          {word}
                        </Pressable>
                      ))}
                    </View>
                  </View>
                )}
              />)}
          </View>
          <View style={{ ...styles.grid, ...styles.buttonContainer }}>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={3}
              placeholder="Your poem will appear here"
              onChangeText={newText => setPoem(newText)}
              value={poem}
            />
            <Pressable
              style={{ ...styles.button, ...styles.flexShrink, backgroundColor: '#408' }}
              onPress={async () => await Clipboard.setStringAsync(poem)}
            >
              <Text style={styles.buttonText}>
                Copy
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
