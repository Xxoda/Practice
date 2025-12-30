import { writable, derived } from 'svelte/store';
import type { CartItem, Dish, SelectedModifiers } from '$lib/types';
import { browser } from '$app/environment';

const initialCart: CartItem[] = browser && localStorage.getItem('smachno_cart')
  ? JSON.parse(localStorage.getItem('smachno_cart') || '[]')
  : [];

export const cart = writable<CartItem[]>(initialCart);

cart.subscribe((value) => {
  if (browser) {
    localStorage.setItem('smachno_cart', JSON.stringify(value));
  }
});

export const addToCart = (dish: Dish, quantity: number, modifiers: SelectedModifiers) => {
  cart.update((items) => {
    // Calculate price with modifiers
    let price = dish.price;
    if (modifiers.size && dish.modifiers?.size) {
      price += dish.modifiers.size[modifiers.size] || 0;
    }
    // Assuming cheese/sauce add fixed cost, e.g., 50 RUB if checked. 
    // The prompt says "checkbox", but didn't specify price logic detailedly, 
    // but in "Dish Modal" it says "calculated price".
    // I will assume a fixed price for addons for now, e.g., 50.
    if (modifiers.cheese) price += 50;
    if (modifiers.sauce) price += 30;

    const uniqueId = crypto.randomUUID();
    return [...items, { uniqueId, dish, quantity, selectedModifiers: modifiers, finalPrice: price }];
  });
};

export const removeFromCart = (uniqueId: string) => {
  cart.update((items) => items.filter((i) => i.uniqueId !== uniqueId));
};

export const updateQuantity = (uniqueId: string, delta: number) => {
  cart.update((items) => {
    return items.map((item) => {
      if (item.uniqueId === uniqueId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    });
  });
};

export const clearCart = () => {
  cart.set([]);
};

export const cartTotal = derived(cart, ($cart) => {
  return $cart.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
});

export const cartCount = derived(cart, ($cart) => {
  return $cart.reduce((count, item) => count + item.quantity, 0);
});
