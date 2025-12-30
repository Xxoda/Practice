<script lang="ts">
    export let category: any;
  </script>
  
  <a href="/menu/{category.id}" class="card group active:scale-95 transition-all duration-200">
    <div class="h-32 overflow-hidden bg-gray-100 relative">
      <img src={category.image} alt={category.name} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
      <div class="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
    </div>
    <div class="p-3">
      <h3 class="font-bold text-lg leading-none">{category.name}</h3>
      <p class="text-xs text-gray-400 mt-1">от {Math.min(...category.dishes.map((d: any) => d.price))} ₽</p>
    </div>
  </a>
