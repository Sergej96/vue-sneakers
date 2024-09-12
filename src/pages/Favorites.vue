<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'
import { URL_API } from '@/consts';
import type { Item } from '@/types/Items';

const favorites = ref<Item[]>([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      URL_API + 'favorites?_relations=items'
    )

    favorites.value = data.map((obj: { item: Item }) => ({ ...obj.item, isAdded: false }))
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>

  <CardList :items="favorites" is-favorites />
</template>