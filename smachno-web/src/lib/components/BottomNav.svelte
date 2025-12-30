<script>
    import { page } from '$app/stores';
    import { cart } from '../stores/cart';
    
    $: cartCount = $cart.reduce((acc, item) => acc + item.quantity, 0);
  </script>
  
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 max-w-md mx-auto">
    <div class="flex justify-around items-center h-16">
      <a href="/menu" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors {$page.url.pathname.startsWith('/menu') ? 'text-primary' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-xs mt-1 font-medium">Меню</span>
      </a>
      
      <a href="/cart" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors {$page.url.pathname === '/cart' ? 'text-primary' : ''} relative">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {#if cartCount > 0}
            <span class="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border-2 border-white">
              {cartCount}
            </span>
          {/if}
        </div>
        <span class="text-xs mt-1 font-medium">Корзина</span>
      </a>
      
      <a href="/contacts" class="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-primary transition-colors {$page.url.pathname === '/contacts' ? 'text-primary' : ''}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span class="text-xs mt-1 font-medium">Контакты</span>
      </a>
    </div>
  </nav>
