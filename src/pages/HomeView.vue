<script setup lang="ts">
import CardList from '@/components/CardList.vue';
import { URL_API } from '@/consts';
import { fetchData } from '@/libs/fetchData';
import { type CartContext } from '@/types/Cart';
import type { Item } from '@/types/Items';
import axios from 'axios';
import { inject, onMounted, reactive, ref, watch } from 'vue';

const cart = inject<CartContext>('cart');

const items = ref<Item[]>([]);
const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
})

function onChangeSortBy(event: Event) {
    const target = event.target as HTMLSelectElement;
    filters.sortBy = target.value;
}

function onChangeSearchQuery(event: Event) {
    const target = event.target as HTMLInputElement;
    filters.searchQuery = target.value;
}

function onClickAddPlus(item: Item) {
    if (!item.isAdded) {
        cart?.addToCart(item);
    } else {
        cart?.removeFromCart(item);
    }
}

const addToFavorites = async (item: Item) => {
    try {
        item.isFavorite = !item.isFavorite;

        if (item.isFavorite) {
            const { data } = await axios.post(URL_API + 'favorites', {
                item_id: item.id
            });
            item.favoriteId = data.id;
        } else {
            await axios.delete(`${URL_API}favorites/${item.favoriteId}`);
            item.favoriteId = undefined;
        }
    } catch (error) {
        item.isFavorite = !item.isFavorite;
        console.log(error);
    }
}

async function fetchFavorites() {
    const favorites = await fetchData(URL_API + 'favorites');

    items.value = items.value.map((item) => {
        const favorite = favorites.find((favorite: any) => favorite.item_id === item.id);

        return { ...item, isFavorite: !!favorite, favoriteId: favorite?.id };
    });
}

async function fetchItems() {
    const params: {
        sortBy: string,
        title?: string,
    } = {
        sortBy: filters.sortBy
    };

    if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
    }
    const data = await fetchData(URL_API + 'items', {
        params
    });

    items.value = data.map((item: any) => ({
        ...item,
        isFavorite: false,
        isAdded: false
    }));
}

onMounted(async () => {
    await fetchItems();
    await fetchFavorites();

    if (cart?.cartItems) {
        cart.cartItems.value = JSON.parse(localStorage.getItem('cartItems') || '[]')
    }
    items.value = items.value.map((item) => ({ ...item, isAdded: !!cart?.cartItems.value.some((cart) => cart.id === item.id) }))
});

watch(filters, fetchItems);

if (cart) {
    watch(cart.cartItems, () => {
        if (cart?.cartItems.value.length === 0) {
            items.value = items.value.map((item) => ({ ...item, isAdded: false }))
        }
    })
}

</script>

<template>
    <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Все кросовки</h2>

        <div class="flex gap-x-4">
            <select @change="onChangeSortBy" class="py-2 px-3 border rounded-md outline-none focus:border-gray-400">
                <option value="name">По названию</option>
                <option value="price">По цене(дешевые)</option>
                <option value="-price">По цене(дорогие)</option>
            </select>
            <div class="relative">
                <img src="/search.svg" alt="search" class="absolute top-3.5 left-4" />
                <input @input="onChangeSearchQuery" placeholder="Поиск..."
                    class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400" />
            </div>
        </div>
    </div>
    <div class="mt-10">
        <CardList :items="items" @add-to-favorites="addToFavorites" @add-to-cart="onClickAddPlus" />
    </div>
</template>