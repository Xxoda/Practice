<script lang="ts">
  import { page } from '$app/stores';
  import menu from '$lib/data/menu.json';
  import DishCard from '$lib/components/DishCard.svelte';
  import DishModal from '$lib/components/DishModal.svelte';
  import { ArrowLeft, Search } from 'lucide-svelte';
  import type { Dish } from '$lib/types';

  let categoryId = $derived($page.params.category);
  let category = $derived(menu.categories.find(c => c.id === categoryId));
  let allDishes = $derived(menu.dishes.filter(d => d.categoryId === categoryId));

  let activeFilters = $state<string[]>([]);
  
  const filters = ['Хит', 'Острое', 'Веган', 'До 500 ₽', 'Сыр'];

  function toggleFilter(f: string) {
    if (activeFilters.includes(f)) {
      activeFilters = activeFilters.filter(i => i !== f);
    } else {
      activeFilters = [...activeFilters, f];
    }
  }

  let filteredDishes = $derived(allDishes.filter(d => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every(f => {
      if (f === 'До 500 ₽') return d.price < 500;
      if (f === 'Сыр') return d.modifiers?.cheese !== undefined || d.description.toLowerCase().includes('сыр') || d.name.toLowerCase().includes('сыр');
      return d.tags.includes(f);
    });
  }));

  let selectedDish = $state<Dish | null>(null);
  let isModalOpen = $state(false);

  function openDish(d: Dish) {
    selectedDish = d;
    isModalOpen = true;
  }
</script>

{#if category}
  <div class="pb-24 bg-light min-h-screen">
    <!-- Top Bar -->
    <div class="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
      <div class="flex items-center justify-between px-2 py-2">
        <a href="/menu" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={22} />
        </a>
        <h1 class="font-bold text-lg font-hand text-2xl tracking-wide">{category.name}</h1>
        <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors opacity-50 cursor-not-allowed">
          <Search size={22} />
        </button>
      </div>
      
      <!-- Filters -->
      <div class="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
        {#each filters as filter}
          <button 
            class="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold border transition-all {activeFilters.includes(filter) ? 'bg-dark text-white border-dark shadow-md transform scale-105' : 'bg-white text-dark border-gray-200'}"
            onclick={() => toggleFilter(filter)}>
            {filter}
          </button>
        {/each}
      </div>
    </div>

    <!-- List -->
    <div class="p-4 flex flex-col gap-3">
      {#each filteredDishes as dish}
        <DishCard {dish} onAdd={openDish} />
      {/each}
      
      {#if filteredDishes.length === 0}
         <div class="py-10 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
           <span>😔</span>
           <span>Ничего не найдено</span>
         </div>
      {/if}
    </div>
  </div>
  
  <DishModal 
    dish={selectedDish} 
    isOpen={isModalOpen} 
    onClose={() => isModalOpen = false} 
  />
{:else}
  <div class="h-screen flex items-center justify-center text-gray-400">
    Категория не найдена
  </div>
{/if}
