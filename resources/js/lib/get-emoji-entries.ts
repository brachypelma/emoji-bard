import { dictionary, DictionaryEntry } from './dictionary'
import getSubstrings from './get-substrings'

export function getEntriesFromEmojis(search: string) {
  return getSubstrings(Array.from(search))
    .map(substr => dictionary.find(({ emoji }) => emoji === substr))
    .filter((entry): entry is DictionaryEntry => !!entry)
}
