<script setup lang="ts">
import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue';
import { inject, ref } from 'vue';
import { formatPrice } from '@/libs/formatPrice';
import InfoBlock from './InfoBlock.vue';
import type { CartContext } from '@/types/Cart';
import axios from 'axios';
import { URL_API } from '@/consts';

interface Props {
    totalPrice: number,
}

const { totalPrice } = defineProps<Props>()

const cart = inject<CartContext>('cart')

const isCreating = ref(false);
const orderId = ref<number | null>(null);


async function createOrder() {
    try {
        isCreating.value = true;
        const { data } = await axios.post(URL_API + 'orders', {
            items: cart?.cartItems.value,
            totalPrice,
        });

        if (cart?.cartItems) {
            cart.cartItems.value = [];
        }

        orderId.value = data.id;
    } catch (error) {
        console.log(error);
    } finally {
        isCreating.value = false;
    }
}
</script>
<template>
    <div @click="cart?.closeDrawer" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70">
    </div>
    <div class="bg-white h-full w-96 top-0 right-0 fixed z-20 p-8 flex flex-col">
        <DrawerHead />

        <CartItemList />
        <InfoBlock v-if="orderId" title="Заказ оформлен!"
            :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
            image="/order-success-icon.png" />
        <InfoBlock v-else-if="!totalPrice && !orderId" title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ." image="/package-icon.png" />

        <div v-else class="flex flex-col gap-4 my-6 grow justify-end">
            <div class="flex gap-2 items-center">
                <span>Итого:</span>
                <hr class="flex-1 border-b border-dashed" />
                <b>{{ formatPrice(totalPrice) }}</b>
            </div>
            <div class="flex gap-2 items-center">
                <span>Налог 5%:</span>
                <hr class="flex-1 border-b border-dashed" />
                <b>{{ formatPrice(Math.round(totalPrice * .05)) }}</b>
            </div>

            <button :disabled="!totalPrice || isCreating"
                class="bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer"
                @click="createOrder">
                Оформить заказ
            </button>
        </div>


    </div>
</template>