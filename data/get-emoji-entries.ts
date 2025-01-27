import { dictionary } from './dictionary'

function getWords(search: string) {
  return dictionary
    .filter(({ emoji }) => emoji === search)
    .map(({ words }) => words)
}
