<script setup lang="ts">
import ArrowNext from '@/assets/icons/arrow-next.svg?component';
import type { CartContext } from '@/types/Cart';
import { inject } from 'vue';

const cart: CartContext | undefined = inject('cart')
</script>
<template>
    <div class="flex items-center gap-4 mb-5">
        <ArrowNext @click="cart?.closeDrawer"
            class="size-5 text-black rotate-180 opacity-60 hover:opacity-100 cursor-pointer transition hover:-translate-x-1" />
        <h2 class="text-2xl font-bold">Корзина</h2>
    </div>
</template>