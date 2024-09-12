<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { RouterView } from 'vue-router'
import type { Item } from './types/Items';
import type { CartContext } from './types/Cart';
import Header from './components/Header.vue';
import Drawer from './components/Drawer.vue';

/* START Cart */
const cartItems = ref<Item[]>([]);
const drawerOpen = ref(false);

const totalPrice = computed(() => cartItems.value.reduce((total, item) => total + item.price, 0));

function addToCart(item: Item) {
  cartItems.value.push(item);
  item.isAdded = true;
}

function removeFromCart(item: Item) {

  cartItems.value.splice(cartItems.value.indexOf(item), 1);
  item.isAdded = false;
}

function openDrawer() {
  drawerOpen.value = true;
}

function closeDrawer() {
  drawerOpen.value = false;
}

watch(cartItems, () => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
}, { deep: true })

provide<CartContext>('cart', {
  cartItems,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart
})
/* END Cart */
</script>

<template>
  <main class="w-4/5 mx-auto bg-white rounded-xl shadow-xl mt-10">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <RouterView />
    </div>
  </main>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" />

</template>

<style scoped></style>
