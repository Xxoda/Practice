<script lang="ts">
  import type { Dish } from '$lib/types';
  import { Plus } from 'lucide-svelte';
  
  let { dish, onAdd } = $props<{ dish: Dish, onAdd: (dish: Dish) => void }>();
</script>

<button class="w-full bg-white p-3 rounded-card border border-gray-100 shadow-sm flex gap-3 text-left hover:shadow-md transition-all active:scale-[0.99] relative overflow-hidden group" onclick={() => onAdd(dish)}>
  <div class="w-28 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden relative">
    <img src={dish.image} alt={dish.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
    {#if dish.tags.length > 0}
      <div class="absolute top-1.5 left-1.5 flex flex-col gap-1">
        {#each dish.tags as tag}
           <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-dark shadow-sm border border-black/5">{tag}</span>
        {/each}
      </div>
    {/if}
  </div>
  
  <div class="flex-1 flex flex-col justify-between py-0.5">
    <div>
      <h3 class="font-bold text-base leading-tight mb-1 group-hover:text-accent transition-colors">{dish.name}</h3>
      <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">{dish.description}</p>
      <span class="text-[10px] text-gray-400 mt-1 block">{dish.weight}</span>
    </div>
    
    <div class="flex justify-between items-end mt-2">
      <span class="font-bold text-lg">{dish.price} ₽</span>
      <div class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-sm group-hover:bg-accent transition-colors">
        <Plus size={18} />
      </div>
    </div>
  </div>
</button>
