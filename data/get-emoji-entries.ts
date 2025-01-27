import { dictionary } from './dictionary'

function getSubstrings(singleEmojis: string[], start = 0, emojis: string[] = []) {
  if (start === singleEmojis.length) return emojis

  for (let i = singleEmojis.length; i > start; i--) {
    emojis.push(singleEmojis.slice(start, i).join(''))
  }

  return getSubstrings(singleEmojis, ++start, emojis)
}

export function getWordsFromEmojis(search: string) {
  return getSubstrings(Array.from(search))
    .map(substr => dictionary.find(({ emoji }) => emoji === substr))
    .filter(Boolean)
}
