import type { Item } from '@/types/Items'
import type { Ref } from 'vue'

export type CartContext = {
    cartItems: Ref<Item[]>
    openDrawer: () => void
    closeDrawer: () => void
    addToCart: (item: Item) => void
    removeFromCart: (item: Item) => void
}
