<script lang="ts" setup>
import { DictionaryEntry } from '../lib/dictionary';

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
        {{ entry.words.join(', ') }}
      </td>
    </tr>
  </tbody>
</template>
