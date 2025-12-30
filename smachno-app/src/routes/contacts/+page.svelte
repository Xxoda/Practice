<script>
  import { Phone, Clock, MapPin } from 'lucide-svelte';
</script>

<div class="px-4 pt-6 pb-24 min-h-screen bg-light">
  <h1 class="font-hand text-4xl text-dark mb-8">Контакты</h1>

  <!-- Info Card -->
  <div class="bg-white p-6 rounded-card border border-gray-100 shadow-sm mb-6 relative overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-10 -mt-10"></div>
    
    <div class="flex items-start gap-4 mb-6 relative z-10">
      <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Phone size={20} class="text-dark" />
      </div>
      <div>
        <h3 class="font-bold text-lg mb-1">+7 (999) 000-00-00</h3>
        <p class="text-xs text-gray-400">Служба доставки</p>
      </div>
    </div>

    <div class="flex items-start gap-4 mb-6 relative z-10">
      <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Clock size={20} class="text-dark" />
      </div>
      <div>
        <h3 class="font-bold text-lg mb-1">10:00 – 23:00</h3>
        <p class="text-xs text-gray-400">Ежедневно, без выходных</p>
      </div>
    </div>

    <div class="flex gap-3 mt-8 relative z-10">
      <a href="https://wa.me/79991234567" target="_blank" class="flex-1 py-2.5 bg-[#25D366] text-white rounded-lg font-bold text-center text-sm shadow-sm">WhatsApp</a>
      <a href="https://t.me/smachno" target="_blank" class="flex-1 py-2.5 bg-[#0088cc] text-white rounded-lg font-bold text-center text-sm shadow-sm">Telegram</a>
    </div>
  </div>

  <!-- About -->
  <div class="bg-white p-6 rounded-card border border-gray-100 shadow-sm mb-6">
    <h3 class="font-bold text-lg mb-3">О нас</h3>
    <p class="text-sm text-gray-500 leading-relaxed mb-4">
      «СМАЧНО» — это сервис доставки еды с душой. Мы готовим из свежих продуктов, замешиваем тесто для пиццы каждое утро и крутим роллы специально для вас.
    </p>
    <div class="h-40 bg-gray-100 rounded-xl overflow-hidden relative">
      <div class="absolute inset-0 flex items-center justify-center text-gray-400">
        <MapPin size={32} />
      </div>
      <!-- Placeholder for map or image -->
    </div>
  </div>

  <button class="w-full p-4 bg-gray-100 text-gray-400 rounded-xl font-bold flex flex-col items-center gap-1 cursor-not-allowed border border-gray-200 border-dashed">
     <span>Самовывоз</span>
     <span class="text-xs font-normal">Скоро появится</span>
  </button>
</div>