<script>
    import menu from '$lib/data/menu.json';
    import CategoryCard from '$lib/components/CategoryCard.svelte';
  </script>
  
  <div class="pb-4">
    <!-- Header -->
    <header class="p-5 bg-white shadow-sm rounded-b-2xl mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-3xl font-hand font-bold text-black">СМАЧНО</h1>
        <div class="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">
          10:00 - 23:00
        </div>
      </div>
      <p class="text-sm text-gray-500">Доставка по городу</p>
      
      <!-- Promo Block -->
      <div class="mt-6 overflow-x-auto flex gap-4 pb-2 scrollbar-hide">
        <div class="min-w-[240px] h-32 bg-gradient-to-r from-primary to-orange-400 rounded-xl p-4 text-white flex flex-col justify-center shadow-lg transform rotate-1">
          <h3 class="font-hand text-2xl font-bold">Скидка 20%</h3>
          <p class="text-sm opacity-90">На первый заказ</p>
          <button class="mt-2 bg-white text-primary text-xs font-bold py-1 px-3 rounded-full self-start">Хочу!</button>
        </div>
        <div class="min-w-[240px] h-32 bg-gray-800 rounded-xl p-4 text-white flex flex-col justify-center shadow-lg transform -rotate-1">
          <h3 class="font-hand text-2xl font-bold">Бесплатная</h3>
          <p class="text-sm opacity-90">Доставка от 1500 ₽</p>
        </div>
      </div>
    </header>
  
    <!-- Categories Grid -->
    <div class="px-4">
      <h2 class="text-xl font-bold mb-4">Меню</h2>
      <div class="grid grid-cols-2 gap-4">
        {#each menu as category}
          <CategoryCard {category} />
        {/each}
      </div>
    </div>
  </div>
