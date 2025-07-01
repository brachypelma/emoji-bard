<script lang="ts" setup>
import { DictionaryEntry } from '../lib/dictionary';
import { useTranslatorStore } from '@/store/translator';
import { storeToRefs } from 'pinia';

const {
  poem,
} = storeToRefs(useTranslatorStore());

const { entries } = defineProps({
  entries: Array<DictionaryEntry>,
})
</script>

<template>
  <tbody>
    <tr v-for="entry in entries" :key="entry.emoji">
      <td class="py-2 w-1/2">
        {{ entry.emoji }}
      </td>
      <td class="py-2 w-1/2">
        <button
          v-for="word in entry.words"
          :key="word"
          class="mx-2 px-2 bg-[#3E3E3A] cursor-pointer"
          @click="poem += ` ${word}`"
        >
          {{ word }}
        </button>
      </td>
    </tr>
  </tbody>
</template>
