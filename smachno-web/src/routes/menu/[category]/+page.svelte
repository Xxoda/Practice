<script lang="ts">
    import { page } from '$app/stores';
    import menu from '$lib/data/menu.json';
    import DishCard from '$lib/components/DishCard.svelte';
    import DishModal from '$lib/components/DishModal.svelte';
    import { onMount } from 'svelte';
  
    const categoryId = $page.params.category;
    const category = menu.find(c => c.id === categoryId);
  
    let selectedDish: any = null;
    let filter = 'all';
  
    const filters = [
      { id: 'all', label: 'Все' },
      { id: 'Хит', label: 'Хит' },
      { id: 'Острое', label: 'Острое' },
      { id: 'Веган', label: 'Веган' },
    ];
  
    $: dishes = category?.dishes.filter((d: any) => {
      if (filter === 'all') return true;
      return d.tags.includes(filter);
    }) || [];
  
    function openDish(dish: any) {
      selectedDish = dish;
    }
  </script>
  
  <div class="pb-20">
    <div class="sticky top-0 bg-white z-40 shadow-sm">
      <div class="p-4 flex items-center gap-4">
        <a href="/menu" aria-label="Back to menu" class="p-2 -ml-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <h1 class="text-xl font-bold">{category?.name}</h1>
      </div>
  
      <!-- Filters -->
      <div class="px-4 pb-3 overflow-x-auto flex gap-2 scrollbar-hide">
        {#each filters as f}
          <button 
            class="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors {filter === f.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}"
            on:click={() => filter = f.id}
          >
            {f.label}
          </button>
        {/each}
      </div>
    </div>
  
    <div class="p-4 flex flex-col gap-4">
      {#each dishes as dish}
        <DishCard {dish} on:click={() => openDish(dish)} />
      {/each}
    </div>
  </div>
  
  {#if selectedDish}
    <DishModal dish={selectedDish} on:close={() => selectedDish = null} />
  {/if}
