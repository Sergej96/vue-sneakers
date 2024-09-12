<script setup lang="ts">
import { inject } from 'vue';
import CartItem from './CartItem.vue';
import type { CartContext } from '@/types/Cart';

const cart: CartContext | undefined = inject('cart');

</script>
<template>
    <div v-auto-animate class="flex flex-col gap-4">
        <CartItem v-for="item in cart?.cartItems.value" :key="item.id" :="item"
            @on-click-remove="() => cart?.removeFromCart(item)" />
    </div>
</template>