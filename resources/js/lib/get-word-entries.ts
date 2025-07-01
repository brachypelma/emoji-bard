import { dictionary } from './dictionary'
import getSubstrings from './get-substrings'

export type WordEntry = {
  word: string
  emojis: string[]
}

function getEmojis(word: string) {
  return dictionary
    .filter(({ words }) => words.includes(word))
    .map(({ emoji }) => emoji)
}

export function getWordEntries(search: string): WordEntry[] {
  return getSubstrings(search.toLowerCase().split(/\.|[—…,;?!\s]+/), ' ')
    .filter(Boolean)
    .map(word => ({ word, emojis: getEmojis(word) }))
    .filter(({ word, emojis }) =>
      emojis.length || word.split(/\.|[—…,;?!\s]+/).length === 1)
}
