export default function getSubstrings(
  singleChs: string[],
  joiner = '',
  start = 0,
  substrings: string[] = [],
) {
  if (start === singleChs.length) return substrings

  for (let i = singleChs.length; i > start; i--) {
    substrings.push(singleChs.slice(start, i).join(joiner))
  }

  return getSubstrings(singleChs, joiner, ++start, substrings)
}
