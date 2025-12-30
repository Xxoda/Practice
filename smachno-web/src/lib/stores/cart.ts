import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Type definitions
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  modifiers: {
    size?: string;
    add_cheese?: boolean;
    add_sauce?: boolean;
    spicy_level?: number;
  };
  totalPrice: number;
}

const initialCart: CartItem[] = [];

// Create store
const createCartStore = () => {
  const { subscribe, set, update } = writable<CartItem[]>(initialCart);

  return {
    subscribe,
    addItem: (item: CartItem) => update(items => {
      const existing = items.find(i => i.id === item.id && JSON.stringify(i.modifiers) === JSON.stringify(item.modifiers));
      if (existing) {
        existing.quantity += item.quantity;
        existing.totalPrice += item.totalPrice;
        return [...items];
      }
      return [...items, item];
    }),
    removeItem: (index: number) => update(items => {
      items.splice(index, 1);
      return [...items];
    }),
    updateQuantity: (index: number, delta: number) => update(items => {
      const item = items[index];
      if (item) {
        item.quantity += delta;
        item.totalPrice = (item.totalPrice / (item.quantity - delta)) * item.quantity; // Recalculate based on unit price
        if (item.quantity <= 0) {
          items.splice(index, 1);
        }
      }
      return [...items];
    }),
    clear: () => set([]),
    set: (items: CartItem[]) => set(items)
  };
};

export const cart = createCartStore();

// LocalStorage persistence
if (browser) {
  const storedCart = localStorage.getItem('smachno_cart');
  if (storedCart) {
    cart.set(JSON.parse(storedCart));
  }
  
  cart.subscribe(value => {
    localStorage.setItem('smachno_cart', JSON.stringify(value));
  });
}
