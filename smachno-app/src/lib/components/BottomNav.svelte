<script lang="ts">
  import { page } from '$app/stores';
  import { UtensilsCrossed, ShoppingBasket, Phone } from 'lucide-svelte';
  import { cartCount } from '$lib/stores/cart';

  let count = $state(0);
  
  cartCount.subscribe(v => count = v); // Using store subscription or $store in template
</script>

<nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 flex justify-between items-center z-50 pb-safe">
  <a href="/menu" class="flex flex-col items-center gap-1 text-xs font-medium transition-colors"
     class:text-accent={$page.url.pathname.startsWith('/menu')}
     class:text-gray-400={!$page.url.pathname.startsWith('/menu')}>
    <UtensilsCrossed size={24} />
    <span>Меню</span>
  </a>

  <a href="/cart" class="relative flex flex-col items-center gap-1 text-xs font-medium transition-colors"
     class:text-accent={$page.url.pathname.startsWith('/cart')}
     class:text-gray-400={!$page.url.pathname.startsWith('/cart')}>
    <div class="relative">
      <ShoppingBasket size={24} />
      {#if $cartCount > 0}
        <span class="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
          {$cartCount}
        </span>
      {/if}
    </div>
    <span>Корзина</span>
  </a>

  <a href="/contacts" class="flex flex-col items-center gap-1 text-xs font-medium transition-colors"
     class:text-accent={$page.url.pathname.startsWith('/contacts')}
     class:text-gray-400={!$page.url.pathname.startsWith('/contacts')}>
    <Phone size={24} />
    <span>Контакты</span>
  </a>
</nav>

<style>
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom, 16px);
  }
</style>
