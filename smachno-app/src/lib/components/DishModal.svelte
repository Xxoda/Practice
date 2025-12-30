<script lang="ts">
  import type { Dish, SelectedModifiers } from '$lib/types';
  import { addToCart } from '$lib/stores/cart';
  import { X, Minus, Plus } from 'lucide-svelte';
  
  let { dish, isOpen, onClose } = $props<{ dish: Dish | null, isOpen: boolean, onClose: () => void }>();

  let quantity = $state(1);
  let modifiers = $state<SelectedModifiers>({});

  // Reset state when dish changes
  $effect(() => {
    if (dish) {
      quantity = 1;
      modifiers = {
        size: dish.modifiers?.size ? 'M' : undefined,
        cheese: false,
        sauce: false
      };
      // If S/M/L exists, default to M if available, else first key
      if (dish.modifiers?.size && !dish.modifiers.size.M) {
         const keys = Object.keys(dish.modifiers.size);
         if (keys.length > 0) modifiers.size = keys[0] as any;
      }
    }
  });

  let currentPrice = $derived.by(() => {
    if (!dish) return 0;
    let p = dish.price;
    if (modifiers.size && dish.modifiers?.size) {
      p += dish.modifiers.size[modifiers.size] || 0;
    }
    if (modifiers.cheese) p += 50;
    if (modifiers.sauce) p += 30;
    return p * quantity;
  });

  function handleAdd() {
    if (dish) {
      addToCart(dish, quantity, modifiers);
      onClose();
    }
  }
</script>

{#if isOpen && dish}
  <div class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
    <!-- Backdrop -->
    <button class="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" onclick={onClose} aria-label="Close modal"></button>
    
    <!-- Modal Content -->
    <div class="bg-white w-full max-w-md sm:rounded-2xl rounded-t-2xl pointer-events-auto relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl animate-in slide-in-from-bottom duration-300">
      
      <!-- Close Button -->
      <button class="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-dark shadow-sm" onclick={onClose}>
        <X size={20} />
      </button>

      <!-- Image -->
      <div class="h-64 w-full bg-gray-100 flex-shrink-0">
        <img src={dish.image} alt={dish.name} class="w-full h-full object-cover" />
      </div>

      <!-- Scrollable Content -->
      <div class="p-5 overflow-y-auto">
        <div class="flex justify-between items-start mb-2">
          <h2 class="text-2xl font-bold font-hand">{dish.name}</h2>
        </div>
        <p class="text-sm text-gray-500 mb-4 leading-relaxed">{dish.description}</p>
        
        <div class="text-xs text-gray-400 mb-6 bg-gray-50 inline-block px-2 py-1 rounded">
          {dish.weight} • {dish.spiciness ? '🌶️'.repeat(dish.spiciness) : 'Не острое'}
        </div>

        <!-- Modifiers -->
        {#if dish.modifiers}
          <div class="space-y-4 mb-6">
            <!-- Size -->
            {#if dish.modifiers.size}
              <div>
                <span class="text-sm font-bold mb-2 block">Размер</span>
                <div class="flex bg-gray-100 p-1 rounded-xl">
                  {#each Object.keys(dish.modifiers.size) as size}
                     <button 
                       class="flex-1 py-2 text-sm font-medium rounded-lg transition-all {modifiers.size === size ? 'bg-white shadow-sm text-dark' : 'text-gray-400'}"
                       onclick={() => modifiers.size = size as any}>
                       {size}
                     </button>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Addons -->
            {#if dish.modifiers.cheese !== undefined || dish.modifiers.sauce !== undefined}
               <div>
                 <span class="text-sm font-bold mb-2 block">Добавить</span>
                 <div class="flex flex-wrap gap-2">
                   {#if dish.modifiers.cheese !== undefined}
                     <button 
                       class="px-3 py-2 border rounded-xl text-sm transition-colors flex items-center gap-2 {modifiers.cheese ? 'border-accent bg-accent/5 text-accent font-medium' : 'border-gray-200 text-gray-600'}"
                       onclick={() => modifiers.cheese = !modifiers.cheese}>
                       🧀 Сыр (+50₽)
                     </button>
                   {/if}
                   {#if dish.modifiers.sauce !== undefined}
                     <button 
                       class="px-3 py-2 border rounded-xl text-sm transition-colors flex items-center gap-2 {modifiers.sauce ? 'border-accent bg-accent/5 text-accent font-medium' : 'border-gray-200 text-gray-600'}"
                       onclick={() => modifiers.sauce = !modifiers.sauce}>
                       🍅 Соус (+30₽)
                     </button>
                   {/if}
                 </div>
               </div>
            {/if}
          </div>
        {/if}

        <!-- Footer Actions -->
        <div class="flex items-center gap-4 pt-4 border-t border-gray-100 mt-2">
           <!-- Stepper -->
           <div class="flex items-center bg-gray-100 rounded-xl px-1">
             <button class="w-10 h-10 flex items-center justify-center text-gray-600 active:scale-90 transition-transform" onclick={() => quantity = Math.max(1, quantity - 1)}>
               <Minus size={18} />
             </button>
             <span class="w-6 text-center font-bold">{quantity}</span>
             <button class="w-10 h-10 flex items-center justify-center text-gray-600 active:scale-90 transition-transform" onclick={() => quantity++}>
               <Plus size={18} />
             </button>
           </div>

           <!-- Add Button -->
           <button class="flex-1 bg-accent text-white py-3.5 rounded-xl font-bold shadow-lg shadow-accent/30 active:scale-[0.98] transition-all flex justify-between px-6" onclick={handleAdd}>
             <span>Добавить</span>
             <span>{currentPrice} ₽</span>
           </button>
        </div>
      </div>
    </div>
  </div>
{/if}
