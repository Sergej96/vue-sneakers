<script setup lang="ts">
import { formatPrice } from '@/libs/formatPrice';
import type { Item } from '@/types/Items';


interface Props extends Item {
}

defineProps<Props>();
const emit = defineEmits(['onClickRemove']);
</script>
<template>
    <div class="flex border border-slate-200 p-4 rounded-xl gap-4">
        <img class="size-16" :src="imageUrl" :alt="title" />
        <div class="flex flex-col grow">
            <p>{{ title }}</p>
            <div class="flex justify-between mt-2">
                <b>{{ formatPrice(price) }}</b>
                <img @click="emit('onClickRemove')" class="opacity-60 hover:opacity-100 cursor-pointer transition"
                    src="/close.svg" alt="close" />
            </div>
        </div>
    </div>
</template>