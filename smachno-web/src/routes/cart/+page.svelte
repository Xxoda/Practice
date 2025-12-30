<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { goto } from '$app/navigation';
    
    $: cartItems = $cart;
    $: subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    $: deliveryPrice = subtotal >= 1500 ? 0 : 149;
    $: total = subtotal + deliveryPrice;
  
    function removeItem(index: number) {
      cart.removeItem(index);
    }
  </script>
  
  <div class="pb-24 pt-4 px-4 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Корзина</h1>
  
    {#if cartItems.length === 0}
      <div class="flex flex-col items-center justify-center h-[50vh] text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p class="text-gray-500 mb-6">В корзине пусто</p>
        <a href="/menu" class="btn-primary">Перейти в меню</a>
      </div>
    {:else}
      <div class="space-y-4 mb-8">
        {#each cartItems as item, i}
          <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3">
             <div class="flex-1">
               <h3 class="font-bold">{item.name}</h3>
               <p class="text-xs text-gray-500">
                 {item.modifiers.size ? `${item.modifiers.size} ` : ''}
                 {item.modifiers.add_cheese ? '+Сыр ' : ''}
                 {item.modifiers.add_sauce ? '+Соус' : ''}
               </p>
               <div class="text-primary font-bold mt-1">{item.price} ₽ x {item.quantity}</div>
             </div>
             <div class="flex flex-col justify-between items-end">
               <button type="button" aria-label="Remove item" class="text-gray-400 hover:text-red-500" on:click={() => removeItem(i)}>
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                 </svg>
               </button>
               <div class="font-bold text-lg">{item.totalPrice} ₽</div>
             </div>
          </div>
        {/each}
      </div>
  
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-3 mb-6">
        <div class="flex justify-between">
          <span class="text-gray-500">Сумма заказа</span>
          <span class="font-medium">{subtotal} ₽</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Доставка</span>
          <span class="font-medium">{deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}</span>
        </div>
        <div class="border-t border-gray-100 pt-3 flex justify-between items-center">
          <span class="font-bold text-lg">Итого</span>
          <span class="font-bold text-2xl text-primary">{total} ₽</span>
        </div>
      </div>
  
      <button class="btn-primary w-full shadow-xl shadow-primary/30" on:click={() => goto('/checkout')}>
        Оформить заказ
      </button>
    {/if}
  </div>
