<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let dish: any;
  
    const dispatch = createEventDispatcher();
  </script>
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="card flex gap-4 p-3 active:scale-[0.98] transition-transform cursor-pointer" on:click>
    <div class="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
      <img src={dish.image} alt={dish.name} class="w-full h-full object-cover" loading="lazy" />
    </div>
    <div class="flex-1 flex flex-col justify-between py-1">
      <div>
        <h3 class="font-bold text-md leading-tight">{dish.name}</h3>
        <p class="text-xs text-gray-500 mt-1 line-clamp-2">{dish.description}</p>
      </div>
      <div class="flex justify-between items-end mt-2">
        <span class="font-bold text-lg">{dish.price} ₽</span>
        <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-primary font-bold hover:bg-primary hover:text-white transition-colors">
          +
        </button>
      </div>
    </div>
  </div>
