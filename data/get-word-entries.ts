import { dictionary } from './dictionary'

export type WordEntry = {
  word: string
  emojis: string[]
}

function getEmojis(word: string) {
  const matches = dictionary.filter(({ words }) => words.includes(word))

  return matches.length === 0
    ? ['No matching entries']
    : matches.map(({ emoji }) => emoji)
}

export function getWordEntries(search: string): WordEntry[] {
  return search
    .split(/\.|[—…,;?!\s]+/)
    .filter(Boolean)
    .map(word => word.toLowerCase())
    .map(word => ({ word, emojis: getEmojis(word) }))
}
