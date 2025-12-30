<script lang="ts">
  import menu from '$lib/data/menu.json';
  import CategoryCard from '$lib/components/CategoryCard.svelte';
  import { Clock, MapPin } from 'lucide-svelte';

  const { categories } = menu;
</script>

<div class="px-4 pt-6 pb-24">
  <!-- Header -->
  <div class="mb-8 relative">
    <div class="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-full blur-xl -z-10"></div>
    <h1 class="font-hand text-5xl text-dark mb-3 -rotate-2 origin-left inline-block">СМАЧНО</h1>
    <div class="flex flex-col gap-1.5 text-sm text-gray-600 pl-1">
      <div class="flex items-center gap-2">
         <MapPin size={16} class="text-accent" />
         <span class="font-medium">Доставка по городу</span>
      </div>
      <div class="flex items-center gap-2">
         <Clock size={16} class="text-accent" />
         <span class="font-medium">Сегодня работаем: 10:00–23:00</span>
      </div>
    </div>
  </div>

  <!-- Promos -->
  <div class="mb-10">
    <h2 class="text-lg font-bold mb-4 flex items-center gap-2">
      Акции дня 
      <span class="font-hand text-accent text-2xl rotate-12 relative -top-1">Wow!</span>
    </h2>
    <div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
      <!-- Promo 1 -->
      <div class="snap-center flex-shrink-0 w-72 h-40 bg-[#1A1A1A] rounded-card relative overflow-hidden text-white p-5 flex flex-col justify-center shadow-md">
        <span class="text-accent font-bold text-xs uppercase tracking-wider mb-2">Скидка 20%</span>
        <h3 class="font-bold text-xl leading-tight w-2/3">На первый заказ через приложение</h3>
        <div class="absolute -right-8 -bottom-8 w-40 h-40 border-[20px] border-white/5 rounded-full"></div>
      </div>
      <!-- Promo 2 -->
      <div class="snap-center flex-shrink-0 w-72 h-40 bg-white border border-black rounded-card relative overflow-hidden text-dark p-5 flex flex-col justify-center shadow-md">
        <span class="text-gray-500 font-bold text-xs uppercase tracking-wider mb-2">Подарок</span>
        <h3 class="font-bold text-xl leading-tight w-2/3">Напиток к любой большой пицце</h3>
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-accent/10 rounded-full"></div>
      </div>
    </div>
  </div>

  <!-- Categories -->
  <div class="flex items-end justify-between mb-4">
    <h2 class="text-xl font-bold">Меню</h2>
    <span class="text-xs text-gray-400 mb-1">{categories.length} категорий</span>
  </div>
  
  <div class="grid grid-cols-2 gap-4">
    {#each categories as category}
      <CategoryCard {category} />
    {/each}
  </div>
</div>
