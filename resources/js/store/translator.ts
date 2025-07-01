import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DictionaryEntry } from '@/lib/dictionary'
import { WordEntry } from '@/lib/get-word-entries'

export const useTranslatorStore = defineStore('translator', () => {
  const isWord = ref(true)
  const text = ref('')
  const wordEntries = ref<WordEntry[]>([])
  const emojiEntries = ref<DictionaryEntry[]>([])
  const poem = ref('')

  return {
    isWord,
    text,
    wordEntries,
    emojiEntries,
    poem,
  }
})
