const dictionary = [
  {
    emoji: '👋',
    words: ['hello', 'wave', 'hand', 'goodbye', 'greet', 'greeting'],
  },
  {
    emoji: '👍',
    words: ['yes', 'agree', 'like', 'good', 'cool', 'great'],
  },
  {
    emoji: '👎',
    words: ['no', 'disagree', 'dislike', 'bad', 'ugly', 'bad'],
  },
  {
    emoji: '👌',
    words: ['ok', 'okay', 'fine', 'good', 'fine'],
  },
]

function getEmojis(word: string) {
  return dictionary
    .filter(({ words }) => words.includes(word))
    .map(({ emoji }) => emoji)
}

function getWords(search: string) {
  return dictionary
    .filter(({ emoji }) => emoji === search)
    .map(({ words }) => words)
}

export function getEmojiOptions(search: string) {
  return search
    .split(/\.|[—…,;?!\s]+/)
    .filter(Boolean)
    .map(word => word.toLowerCase())
    .map(word => ({ word, emojis: getEmojis(word) }))
}
