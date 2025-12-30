<script lang="ts">
    import { onMount } from 'svelte';
    import type { CartItem } from '$lib/stores/cart';

    interface OrderData {
        name: string;
        phone: string;
        address: string;
        zone: string;
        comment: string;
        total: number;
        cart: CartItem[];
    }
    
    let orderData: OrderData;
    let whatsappLink = '';
  
    onMount(() => {
      const stored = localStorage.getItem('last_order');
      if (stored) {
        orderData = JSON.parse(stored);
        generateWhatsAppLink();
      }
    });
  
    function generateWhatsAppLink() {
      if (!orderData) return;
  
      const itemsList = orderData.cart.map((i: any) => 
        `- ${i.name} (${i.quantity} шт.) ${i.totalPrice}₽`
      ).join('%0A');
  
      const text = `
  *Новый заказ!* 🍽️%0A
  👤 ${orderData.name}%0A
  📞 ${orderData.phone}%0A
  📍 ${orderData.address} (${orderData.zone})%0A
  💬 ${orderData.comment || 'Без комментария'}%0A
  %0A
  *Заказ:*%0A
  ${itemsList}%0A
  %0A
  💵 Итого: *${orderData.total} ₽*
      `.trim();
  
      whatsappLink = `https://wa.me/79990000000?text=${text}`;
      
      // Auto open
      setTimeout(() => {
         window.location.href = whatsappLink;
      }, 2000);
    }
  </script>
  
  <div class="h-screen flex flex-col items-center justify-center p-6 text-center">
    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    
    <h1 class="text-2xl font-bold mb-2">Заказ принят!</h1>
    <p class="text-gray-500 mb-8">Сейчас мы перенаправим вас в WhatsApp для подтверждения...</p>
    
    <a href={whatsappLink} class="bg-[#25D366] text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
      Открыть WhatsApp
    </a>
    
    <a href="/menu" class="text-gray-400 text-sm mt-8 underline">Вернуться в меню</a>
  </div>
