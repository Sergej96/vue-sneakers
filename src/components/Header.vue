<script setup lang="ts">
import { formatPrice } from '@/libs/formatPrice';

interface Props {
    totalPrice: number;
}

defineProps<Props>();
const emits = defineEmits(['openDrawer']);
</script>
<template>
    <header class="flex items-center justify-between border-b border-slate-200 px-10 py-8">
        <RouterLink to="/" class="flex items-center gap-4">
            <img class="w-10 shrink-0" src="/logo.png" alt="Logo" />
            <div>
                <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                <p class="text-slate-500">Магазин лучших крассовок</p>
            </div>
        </RouterLink>
        <ul class="flex items-center gap-10">
            <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors"
                @click="emits('openDrawer')">
                <img src="/cart.svg" alt="Корзина" />
                <b>{{ formatPrice(totalPrice) }}</b>
            </li>
            <li>
                <router-link to="/favorites"
                    class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors">
                    <img src="/heart.svg" alt="Закладки" />
                    <span>Закладки</span>
                </router-link>
            </li>
            <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer transition-colors">
                <img src="/profile.svg" alt="Профиль" />
                <span>Профиль</span>
            </li>
        </ul>
    </header>
</template>