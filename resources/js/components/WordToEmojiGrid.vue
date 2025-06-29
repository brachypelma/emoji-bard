<script lang="ts" setup>
import { WordEntry } from '../lib/get-word-entries';

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
        {{ entry.emojis.join(' ') }}
      </td>
    </tr>
  </tbody>
</template>
