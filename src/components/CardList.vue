<script setup lang="ts">
import type { Item } from '@/types/Items';
import Card from './Card.vue';

interface Props {
    items: Item[]
    isFavorites?: boolean
}

withDefaults(defineProps<Props>(), {
    isFavorites: false
})

const emit = defineEmits(['addToFavorites', 'addToCart']);

</script>
<template>
    <div v-auto-animate class="grid md:grid-cols-4 grid-cols-2 gap-4">
        <Card v-for="item in items" :key="item.id" :="item" :is-favorite="item.isFavorite || isFavorites"
            :onClickFavorite="!isFavorites ? () => emit('addToFavorites', item) : undefined"
            :onClickAdd="!isFavorites ? () => emit('addToCart', item) : undefined" />
    </div>
</template>