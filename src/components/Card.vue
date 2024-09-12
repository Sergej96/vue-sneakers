<script setup lang="ts">
import { formatPrice } from '@/libs/formatPrice';
import type { Item } from '@/types/Items';


interface Props extends Item {
  onClickAdd?: (event: Event) => void;
  onClickFavorite?: (event: Event) => void;
}
const props = defineProps<Props>();

console.log(props);

</script>

<template>
  <div
    class="relative flex flex-col w-full border border-slate-100 rounded-xl p-8 transition hover:shadow-xl hover:transform hover:-translate-y-2">
    <button v-if="onClickAdd" @click="onClickFavorite" class="absolute top-8 left-8 cursor-pointer">
      <img :src="isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
    </button>
    <img :src="imageUrl" class="w-full" alt="Sneaker" />
    <p class="grow">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-400">Цена:</span>
        <span class="font-bold">{{ formatPrice(price) }}</span>
      </div>
      <img v-if="onClickAdd" class="cursor-pointer" @click="onClickAdd" :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus" />
    </div>
  </div>
</template>
