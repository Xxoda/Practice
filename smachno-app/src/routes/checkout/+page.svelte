<script lang="ts">
  import { cart, cartTotal, clearCart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';
  import { ArrowLeft, Clock, CreditCard, Banknote, MapPin } from 'lucide-svelte';
  import { onMount } from 'svelte';

  // Zone Logic
  const zones = [
    { id: 'center', name: 'Центр', minOrder: 500, delivery: 149, freeFrom: 1500 },
    { id: 'north', name: 'Север', minOrder: 1000, delivery: 199, freeFrom: 2000 },
    { id: 'south', name: 'Юг', minOrder: 1500, delivery: 249, freeFrom: 2500 },
  ];

  let name = $state('');
  let phone = $state('');
  let address = $state('');
  let flat = $state('');
  let comment = $state('');
  let selectedZone = $state(zones[0]);
  let deliveryType = $state<'fast' | 'time'>('fast');
  let selectedTime = $state('');
  let paymentMethod = $state<'cash' | 'card'>('cash');
  let agreed = $state(false);

  // Load saved data
  onMount(() => {
    const saved = localStorage.getItem('smachno_user');
    if (saved) {
      const data = JSON.parse(saved);
      name = data.name || '';
      phone = data.phone || '';
    }
  });

  let deliveryCost = $derived($cartTotal >= selectedZone.freeFrom ? 0 : selectedZone.delivery);
  let total = $derived($cartTotal + deliveryCost);
  let minOrderError = $derived($cartTotal < selectedZone.minOrder);
  let canSubmit = $derived(name && phone && address && agreed && !minOrderError);

  function getSlots() {
    const slots = [];
    const now = new Date();
    // Start 1.5 hours from now
    let start = new Date(now.getTime() + 90 * 60000); 
    // Round to next 30 min
    start.setMinutes(start.getMinutes() > 30 ? 60 : 30);
    start.setSeconds(0);

    for (let i = 0; i < 10; i++) {
      const time = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push(time);
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  }
  
  const slots = getSlots();
  selectedTime = slots[0];

  function submitOrder() {
     if (!canSubmit) return;

     // Save user data
     localStorage.setItem('smachno_user', JSON.stringify({ name, phone }));

     // Format items
     const itemsList = $cart.map(i => {
       let mods = '';
       if (i.selectedModifiers.size) mods += ` ${i.selectedModifiers.size}`;
       if (i.selectedModifiers.cheese) mods += ` +сыр`;
       if (i.selectedModifiers.sauce) mods += ` +соус`;
       return `- ${i.dish.name}${mods} x${i.quantity} (${i.finalPrice * i.quantity}₽)`;
     }).join('\n');

     // Generate text
     const text = `
*НОВЫЙ ЗАКАЗ С САЙТА*
------------------
👤 *${name}*
📞 ${phone}
📍 *Адрес:* ${selectedZone.name}, ${address}, кв. ${flat}
------------------
🛒 *Состав заказа:*
${itemsList}

💰 Сумма заказа: ${$cartTotal}₽
🚚 Доставка: ${deliveryCost}₽
🏁 *ИТОГО: ${total}₽*
------------------
🕒 Время: ${deliveryType === 'fast' ? 'Как можно быстрее' : selectedTime}
💳 Оплата: ${paymentMethod === 'cash' ? 'Наличными' : 'Картой курьеру'}
${comment ? `💬 Комментарий: ${comment}` : ''}
     `.trim();

     const WA_PHONE = '79991234567'; // Replace with real one if provided, using dummy
     const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
     
     // In a real app we might verify delivery via API, but here we just open WA
     window.open(url, '_blank');
     
     clearCart();
     goto('/order-sent');
  }
</script>

<div class="px-4 pt-6 pb-24 min-h-screen bg-light">
  <div class="flex items-center gap-4 mb-6">
    <a href="/cart" class="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-50">
      <ArrowLeft size={20} />
    </a>
    <h1 class="font-hand text-3xl text-dark">Оформление</h1>
  </div>

  <div class="space-y-6">
    <!-- Contact -->
    <section class="bg-white p-5 rounded-card border border-gray-100 shadow-sm">
      <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-dark text-white text-xs flex items-center justify-center">1</span>
        Контакты
      </h2>
      <div class="space-y-3">
        <div>
          <label for="name" class="text-xs font-bold text-gray-500 uppercase mb-1 block">Имя *</label>
          <input id="name" type="text" bind:value={name} placeholder="Иван" class="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-dark focus:ring-0 outline-none" />
        </div>
        <div>
          <label for="phone" class="text-xs font-bold text-gray-500 uppercase mb-1 block">Телефон *</label>
          <input id="phone" type="tel" bind:value={phone} placeholder="+7 (___) ___-__-__" class="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-dark focus:ring-0 outline-none" />
        </div>
      </div>
    </section>

    <!-- Address -->
    <section class="bg-white p-5 rounded-card border border-gray-100 shadow-sm">
      <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-dark text-white text-xs flex items-center justify-center">2</span>
        Адрес доставки
      </h2>
      
      <!-- Zones -->
      <div class="flex bg-gray-100 p-1 rounded-xl mb-4">
        {#each zones as zone}
          <button 
            class="flex-1 py-2 text-xs font-bold rounded-lg transition-all {selectedZone.id === zone.id ? 'bg-white shadow-sm text-dark' : 'text-gray-400'}"
            onclick={() => selectedZone = zone}>
            {zone.name}
          </button>
        {/each}
      </div>

      {#if minOrderError}
        <div class="bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-4 flex items-start gap-2">
          <span>⚠️</span>
          Минимальный заказ для зоны "{selectedZone.name}" — {selectedZone.minOrder}₽. Добавьте еще на {selectedZone.minOrder - $cartTotal}₽.
        </div>
      {/if}

      <div class="space-y-3">
        <div>
          <label for="address" class="text-xs font-bold text-gray-500 uppercase mb-1 block">Улица, дом *</label>
          <input id="address" type="text" bind:value={address} placeholder="ул. Ленина, д. 1" class="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-dark focus:ring-0 outline-none" />
        </div>
        <div>
          <label for="flat" class="text-xs font-bold text-gray-500 uppercase mb-1 block">Квартира / Офис</label>
          <input id="flat" type="text" bind:value={flat} placeholder="кв. 15" class="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-dark focus:ring-0 outline-none" />
        </div>
        <div>
          <label for="comment" class="text-xs font-bold text-gray-500 uppercase mb-1 block">Комментарий</label>
          <textarea id="comment" bind:value={comment} placeholder="Код домофона, этаж..." class="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-dark focus:ring-0 outline-none h-20 resize-none"></textarea>
        </div>
      </div>
    </section>

    <!-- Time -->
    <section class="bg-white p-5 rounded-card border border-gray-100 shadow-sm">
      <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-dark text-white text-xs flex items-center justify-center">3</span>
        Время доставки
      </h2>
      <div class="flex gap-4 mb-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="time" value="fast" bind:group={deliveryType} class="text-accent focus:ring-accent" />
          <span class="text-sm font-medium">Как можно быстрее</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="time" value="time" bind:group={deliveryType} class="text-accent focus:ring-accent" />
          <span class="text-sm font-medium">Ко времени</span>
        </label>
      </div>

      {#if deliveryType === 'time'}
        <label class="block">
          <span class="sr-only">Выберите время</span>
          <select bind:value={selectedTime} class="w-full p-3 bg-gray-50 rounded-xl border-transparent outline-none text-sm">
            {#each slots as slot}
              <option value={slot}>{slot}</option>
            {/each}
          </select>
        </label>
        <p class="text-xs text-gray-400 mt-2">Время указано ориентировочно</p>
      {/if}
    </section>

    <!-- Payment -->
    <section class="bg-white p-5 rounded-card border border-gray-100 shadow-sm">
      <h2 class="font-bold text-lg mb-4 flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-dark text-white text-xs flex items-center justify-center">4</span>
        Оплата
      </h2>
      <div class="grid grid-cols-2 gap-3">
         <button 
           class="p-4 rounded-xl border flex flex-col items-center gap-2 transition-all {paymentMethod === 'cash' ? 'border-accent bg-accent/5 text-accent' : 'border-gray-200 text-gray-500'}"
           onclick={() => paymentMethod = 'cash'}>
           <Banknote size={24} />
           <span class="text-xs font-bold">Наличными</span>
         </button>
         <button 
           class="p-4 rounded-xl border flex flex-col items-center gap-2 transition-all {paymentMethod === 'card' ? 'border-accent bg-accent/5 text-accent' : 'border-gray-200 text-gray-500'}"
           onclick={() => paymentMethod = 'card'}>
           <CreditCard size={24} />
           <span class="text-xs font-bold">Картой</span>
         </button>
      </div>
      <button class="w-full mt-3 p-4 rounded-xl border border-gray-200 text-gray-300 flex flex-col items-center gap-1 cursor-not-allowed">
         <span class="text-xs font-bold">Онлайн (Скоро)</span>
      </button>
    </section>

    <!-- Confirmation -->
    <div class="bg-white p-5 rounded-card border border-gray-100 shadow-sm">
      <div class="flex justify-between py-2 text-sm text-gray-600">
        <span>Товары</span>
        <span>{$cartTotal} ₽</span>
      </div>
      <div class="flex justify-between py-2 text-sm text-gray-600 border-b border-gray-100 mb-2">
        <span>Доставка ({selectedZone.name})</span>
        <span>{deliveryCost} ₽</span>
      </div>
      <div class="flex justify-between mb-4 text-xl font-bold">
        <span>Итого</span>
        <span>{total} ₽</span>
      </div>

      <label class="flex items-start gap-3 mb-6 cursor-pointer">
        <input type="checkbox" bind:checked={agreed} class="mt-1 text-accent rounded focus:ring-accent" />
        <span class="text-xs text-gray-500 leading-relaxed">
          Нажимая кнопку, я даю согласие на обработку персональных данных и соглашаюсь с условиями публичной оферты.
        </span>
      </label>

      <button 
        class="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!canSubmit}
        onclick={submitOrder}>
        {minOrderError ? `Мин. заказ ${selectedZone.minOrder}₽` : 'Отправить заказ'}
      </button>
    </div>
  </div>
</div>