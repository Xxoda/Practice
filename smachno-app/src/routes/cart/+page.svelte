<script lang="ts">
  import { cart, cartTotal, removeFromCart, updateQuantity } from '$lib/stores/cart';
  import { Trash2, Minus, Plus } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let deliveryCost = $derived($cartTotal >= 1500 ? 0 : 149);
  let totalToPay = $derived($cartTotal + deliveryCost);

  function formatModifiers(mods: any) {
    const list = [];
    if (mods.size) list.push(mods.size);
    if (mods.cheese) list.push('Сыр');
    if (mods.sauce) list.push('Соус');
    return list.join(', ');
  }
</script>

<div class="px-4 pt-6 pb-24 min-h-screen bg-light">
  <div class="flex items-end justify-between mb-6">
     <h1 class="font-hand text-4xl text-dark">Корзина</h1>
     {#if $cart.length > 0}
       <span class="text-xs text-gray-400 mb-1">{$cart.length} товаров</span>
     {/if}
  </div>

  {#if $cart.length === 0}
    <div class="flex flex-col items-center justify-center py-20 text-gray-400 h-[60vh]">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <span class="text-4xl relative -left-0.5">🛒</span>
      </div>
      <p class="font-medium text-lg text-dark">Корзина пуста</p>
      <p class="text-sm text-gray-400 mt-1 max-w-[200px] text-center">Добавьте что-нибудь вкусное из меню</p>
      <a href="/menu" class="mt-8 px-8 py-3 bg-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-dark/20 hover:scale-105 transition-transform">Перейти в меню</a>
    </div>
  {:else}
    <div class="flex flex-col gap-4 mb-8">
      {#each $cart as item (item.uniqueId)}
        <div class="bg-white p-3 rounded-card border border-gray-100 shadow-sm flex gap-3 relative overflow-hidden transition-all hover:shadow-md">
          <div class="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
             <img src={item.dish.image} alt={item.dish.name} class="w-full h-full object-cover" />
          </div>
          
          <div class="flex-1 flex flex-col justify-between py-0.5">
            <div class="pr-6">
               <h3 class="font-bold text-sm leading-tight">{item.dish.name}</h3>
               <p class="text-xs text-gray-400 mt-1">{formatModifiers(item.selectedModifiers)}</p>
            </div>
            
            <div class="flex items-end justify-between">
              <span class="font-bold text-base">{item.finalPrice * item.quantity} ₽</span>
              
              <div class="flex items-center bg-gray-100 rounded-lg px-1 h-7">
                 <button class="w-8 h-full flex items-center justify-center text-gray-600 active:scale-90 transition-transform" onclick={() => updateQuantity(item.uniqueId, -1)}>
                   <Minus size={14} />
                 </button>
                 <span class="w-5 text-center text-xs font-bold">{item.quantity}</span>
                 <button class="w-8 h-full flex items-center justify-center text-gray-600 active:scale-90 transition-transform" onclick={() => updateQuantity(item.uniqueId, 1)}>
                   <Plus size={14} />
                 </button>
              </div>
            </div>
          </div>

          <button class="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors p-1" onclick={() => removeFromCart(item.uniqueId)}>
             <Trash2 size={16} />
          </button>
        </div>
      {/each}
    </div>

    <!-- Summary -->
    <div class="bg-white p-5 rounded-card border border-gray-100 shadow-sm mb-6">
      <div class="flex justify-between py-2 text-sm text-gray-600">
        <span>Сумма</span>
        <span>{$cartTotal} ₽</span>
      </div>
      <div class="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100">
        <span>Доставка</span>
        {#if deliveryCost === 0}
          <span class="text-accent font-bold">Бесплатно</span>
        {:else}
          <span>{deliveryCost} ₽</span>
        {/if}
      </div>
      {#if deliveryCost > 0}
         <div class="py-2 text-xs text-gray-400 text-right">
           До бесплатной доставки: {1500 - $cartTotal} ₽
         </div>
      {/if}
      <div class="flex justify-between pt-4 text-xl font-bold">
        <span>Итого</span>
        <span>{totalToPay} ₽</span>
      </div>
    </div>

    <button class="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent/30 active:scale-[0.98] transition-all hover:brightness-110" onclick={() => goto('/checkout')}>
      Оформить заказ
    </button>
  {/if}
</div>
