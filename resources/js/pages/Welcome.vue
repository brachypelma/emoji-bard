<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { getWordEntries } from '../lib/get-word-entries';
import { getEntriesFromEmojis } from '../lib/get-emoji-entries';
import WordToEmojiGrid from '@/components/WordToEmojiGrid.vue';
import EmojisToWordsGrid from '@/components/EmojisToWordsGrid.vue';
import { useTranslatorStore } from '@/store/translator';
import { storeToRefs } from 'pinia';

const {
  isWord,
  text,
  wordEntries,
  emojiEntries,
  poem,
} = storeToRefs(useTranslatorStore());

const toggleWord = (isWordVal: boolean) => {
  isWord.value = isWordVal
  text.value = ''
  wordEntries.value = []
  emojiEntries.value = []
  poem.value = ''
}

const setEntries = () => {
  if (!text.value) {
    wordEntries.value = []
    emojiEntries.value = []
    return
  }

  if (isWord.value) {
    wordEntries.value = getWordEntries(text.value)
    emojiEntries.value = []
  } else {
    emojiEntries.value = getEntriesFromEmojis(text.value)
    wordEntries.value = []
  }
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <Head title="Welcome">
    <link rel="preconnect" href="https://rsms.me/" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
  </Head>
  <div class="text-whited bg-[#0a0a0a] mx-auto my-[1rem] max-w-[60rem]">
    <header class="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
      <nav class="flex items-center justify-end gap-4">
        <Link
          v-if="$page.props.auth.user"
          :href="route('dashboard')"
          class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
        >
          Dashboard
        </Link>
        <template v-else>
          <Link
            :href="route('login')"
            class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
          >
            Log in
          </Link>
          <Link
            :href="route('register')"
            class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
          >
            Register
          </Link>
        </template>
      </nav>
    </header>
    <main class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <button
          @click="toggleWord(true)"
          :class="[
            isWord ? 'bg-[#5d5d5d]' : 'bg-[#3E3E3A]',
            'color-[#EDEDEC] border-[#EDEDEC] p-2 cursor-pointer',
          ]"
        >
          Enlgish to Emojis
        </button>
        <button
          @click="toggleWord(false)"
          :class="[
            isWord ? 'bg-[#3E3E3A]' : 'bg-[#5d5d5d]',
            'color-[#EDEDEC] border-[#EDEDEC] p-2 cursor-pointer',
          ]"
        >
          Emojis to English
        </button>
      </div>
      <div>
        <textarea
          class="w-full bg-[#3E3E3A] text-white p-2"
          v-model="text"
          :placeholder="`${isWord ? 'Text' : 'Emojis'} to translate to ${isWord ? 'Emojis' : 'Text'}`"
          @blur="setEntries"
        ></textarea>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              {{ isWord ? 'Words' : 'Emojis' }}
            </th>
            <th>
              {{ isWord ? 'Emojis' : 'Words' }}
            </th>
          </tr>
        </thead>
        <WordToEmojiGrid v-if="isWord" :entries="wordEntries" />
        <EmojisToWordsGrid v-else :entries="emojiEntries" />
      </table>
      <div>
        <textarea
          class="w-full bg-[#3E3E3A] text-white p-2"
          v-model="poem"
          placeholder="Poem"></textarea>
        <button
          :class="'w-full bg-[#3E3E3A] color-[#EDEDEC] border-[#EDEDEC] p-2 cursor-pointer'"
          @click="copyToClipboard(poem)">
          Copy
        </button>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>
