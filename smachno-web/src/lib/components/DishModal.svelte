<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cart } from '../stores/cart';
  
    export let dish: any;
    const dispatch = createEventDispatcher();
  
    let quantity = 1;
    let selectedSize = 'S';
    let addCheese = false;
    let addSauce = false;
    let spicyLevel = 0;
  
    $: basePrice = dish.price;
    $: modifierPrice = (dish.modifiers?.size?.[selectedSize] || 0) + (addCheese ? (dish.modifiers?.add_cheese || 0) : 0) + (addSauce ? (dish.modifiers?.add_sauce || 0) : 0);
    $: totalPrice = (basePrice + modifierPrice) * quantity;
  
    function addToCart() {
      cart.addItem({
        id: dish.id,
        name: dish.name,
        price: basePrice + modifierPrice,
        quantity,
        modifiers: {
          size: dish.modifiers?.size ? selectedSize : undefined,
          add_cheese: addCheese,
          add_sauce: addSauce,
          spicy_level: dish.modifiers?.spicy_level ? spicyLevel : undefined
        },
        totalPrice
      });
      dispatch('close');
    }
  </script>
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
    <div class="absolute inset-0 bg-black/60 pointer-events-auto backdrop-blur-sm" transition:fade on:click={() => dispatch('close')}></div>
    
    <div class="bg-white w-full max-w-md h-[90vh] sm:h-auto sm:rounded-2xl rounded-t-2xl overflow-y-auto pointer-events-auto relative shadow-2xl flex flex-col" transition:fly={{ y: 100, duration: 300 }}>
      
      <!-- Close Button -->
      <button type="button" aria-label="Close" class="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full shadow-sm" on:click={() => dispatch('close')}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
  
      <div class="h-64 shrink-0 bg-gray-100">
        <img src={dish.image} alt={dish.name} class="w-full h-full object-cover" />
      </div>
  
      <div class="p-5 flex-1 flex flex-col">
        <h2 class="text-2xl font-bold mb-1">{dish.name}</h2>
        <p class="text-gray-500 text-sm mb-4">{dish.weight} • {dish.description}</p>
  
        {#if dish.modifiers}
          <div class="space-y-4 mb-6">
            {#if dish.modifiers.size}
              <div>
                <h4 class="font-bold mb-2 text-sm">Размер</h4>
                <div class="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  {#each Object.keys(dish.modifiers.size) as size}
                    <button 
                      class="flex-1 py-2 rounded-md text-sm font-medium transition-colors {selectedSize === size ? 'bg-white shadow-sm text-black' : 'text-gray-500'}"
                      on:click={() => selectedSize = size}
                    >
                      {size}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
  
            {#if dish.modifiers.add_cheese !== undefined || dish.modifiers.add_sauce !== undefined}
              <div>
                <h4 class="font-bold mb-2 text-sm">Добавки</h4>
                {#if dish.modifiers.add_cheese !== undefined}
                  <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg mb-2">
                    <input type="checkbox" bind:checked={addCheese} class="w-5 h-5 text-primary rounded focus:ring-primary" />
                    <span class="flex-1 text-sm">Сыр</span>
                    <span class="text-sm font-bold">+{dish.modifiers.add_cheese} ₽</span>
                  </label>
                {/if}
                {#if dish.modifiers.add_sauce !== undefined}
                  <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" bind:checked={addSauce} class="w-5 h-5 text-primary rounded focus:ring-primary" />
                    <span class="flex-1 text-sm">Соус</span>
                    <span class="text-sm font-bold">+{dish.modifiers.add_sauce} ₽</span>
                  </label>
                {/if}
              </div>
            {/if}
          </div>
        {/if}
  
        <div class="mt-auto pt-4 border-t border-gray-100">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <button class="text-xl font-bold px-2" on:click={() => quantity = Math.max(1, quantity - 1)}>−</button>
              <span class="text-lg font-bold min-w-[20px] text-center">{quantity}</span>
              <button class="text-xl font-bold px-2" on:click={() => quantity++}>+</button>
            </div>
            
            <button class="btn-primary flex-1 flex justify-between items-center" on:click={addToCart}>
              <span>Добавить</span>
              <span>{totalPrice} ₽</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
