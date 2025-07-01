<script lang="ts" setup>
import { WordEntry } from '../lib/get-word-entries';
import { useTranslatorStore } from '@/store/translator';
import { storeToRefs } from 'pinia';

const {
  poem,
} = storeToRefs(useTranslatorStore());

const { entries } = defineProps({
  entries: Array<WordEntry>,
})
</script>

<template>
  <tbody>
    <tr v-for="entry in entries" :key="entry.word">
      <td class="py-2 w-1/2">
        {{ entry.word }}
      </td>
      <td class="py-2 w-1/2">
        <button
          v-for="emoji in entry.emojis"
          :key="emoji"
          class="mx-2 px-2 bg-[#3E3E3A] cursor-pointer"
          @click="poem += emoji"
        >
          {{ emoji }}
        </button>
      </td>
    </tr>
  </tbody>
</template>
