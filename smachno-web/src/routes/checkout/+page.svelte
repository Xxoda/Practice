<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { goto } from '$app/navigation';
    
    let formData = {
      name: '',
      phone: '',
      address: '',
      zone: 'center',
      comment: '',
      time: 'asap',
      payment: 'cash'
    };
  
    const zones: Record<string, { name: string, min: number, price: number }> = {
      center: { name: 'Центр', min: 0, price: 149 },
      north: { name: 'Север', min: 1000, price: 249 },
      south: { name: 'Юг', min: 1000, price: 249 }
    };
  
    $: cartItems = $cart;
    $: subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    $: zoneInfo = zones[formData.zone];
    $: deliveryPrice = subtotal >= 1500 ? 0 : zoneInfo.price;
    $: total = subtotal + deliveryPrice;
    $: canOrder = subtotal >= zoneInfo.min;
  
    function submitOrder() {
      if (!formData.name || !formData.phone || !formData.address) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
      }
      
      const orderData = {
        ...formData,
        cart: cartItems,
        total,
        deliveryPrice
      };
      
      localStorage.setItem('last_order', JSON.stringify(orderData));
      cart.clear();
      goto('/order-sent');
    }
  </script>
  
  <div class="pb-20 pt-4 px-4">
    <div class="flex items-center gap-4 mb-6">
      <a href="/cart" class="p-2 -ml-2 rounded-full hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </a>
      <h1 class="text-xl font-bold">Оформление</h1>
    </div>
  
    <form class="space-y-6" on:submit|preventDefault={submitOrder}>
      <!-- Contact Info -->
      <section class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 class="font-bold mb-4 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
          Контакты
        </h2>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Имя</label>
            <input type="text" bind:value={formData.name} required class="w-full p-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-colors" placeholder="Иван" />
          </div>
          <div>
            <label class="block text-xs text-gray-500 mb-1">Телефон</label>
            <input type="tel" bind:value={formData.phone} required class="w-full p-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-colors" placeholder="+7 (999) 000-00-00" />
          </div>
        </div>
      </section>
  
      <!-- Delivery Info -->
      <section class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 class="font-bold mb-4 flex items-center gap-2">
          <span class="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
          Доставка
        </h2>
        <div class="space-y-3">
          <div>
            <label class="block text-xs text-gray-500 mb-1">Зона доставки</label>
            <div class="flex gap-2 p-1 bg-gray-100 rounded-lg">
              {#each Object.entries(zones) as [key, zone]}
                <button type="button" class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all {formData.zone === key ? 'bg-white shadow text-black' : 'text-gray-500'}" on:click={() => formData.zone = key}>
                  {zone.name}
                </button>
              {/each}
            </div>
          </div>
  
          <div>
            <label class="block text-xs text-gray-500 mb-1">Адрес</label>
            <input type="text" bind:value={formData.address} required class="w-full p-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-colors" placeholder="Улица, дом, квартира" />
          </div>
  
          <div>
            <label class="block text-xs text-gray-500 mb-1">Комментарий (код домофона и т.д.)</label>
            <textarea bind:value={formData.comment} class="w-full p-2 bg-gray-50 rounded-lg border border-transparent focus:bg-white focus:border-primary focus:outline-none transition-colors h-20 resize-none" placeholder="Оставьте у двери..."></textarea>
          </div>
          
          {#if !canOrder}
            <div class="p-3 bg-red-50 text-red-600 text-xs rounded-lg">
              Минимальная сумма для зоны "{zoneInfo.name}" — {zoneInfo.min} ₽. Добавьте товаров на {zoneInfo.min - subtotal} ₽.
            </div>
          {/if}
        </div>
      </section>
  
      <!-- Summary -->
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-500">К оплате</span>
          <span class="text-2xl font-bold">{total} ₽</span>
        </div>
        <button type="submit" disabled={!canOrder} class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/30">
          Подтвердить заказ
        </button>
      </div>
    </form>
  </div>
