<script lang="ts">
  import type { Category } from '$lib/types';
  
  // Svelte 5 props
  let { category } = $props<{ category: Category }>();
</script>

<a href="/menu/{category.id}" class="group relative flex flex-col p-4 bg-white border border-gray-200 rounded-card shadow-sm active:scale-[0.98] transition-all hover:shadow-md">
  <div class="aspect-square w-full mb-3 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center relative">
      <img src={category.image} alt={category.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <!-- Sticker decoration -->
      <div class="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </div>
  
  <div class="flex flex-col items-start">
    <h3 class="font-bold text-lg leading-tight">{category.name}</h3>
    <span class="text-xs text-gray-500 mt-1">{category.subtitle}</span>
  </div>
  
  <!-- Arrow decoration -->
  <div class="absolute bottom-4 right-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  </div>
</a>
