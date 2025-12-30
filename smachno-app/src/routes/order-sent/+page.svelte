<script>
  import { CheckCircle, ArrowRight } from 'lucide-svelte';
</script>

<div class="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
  <div class="relative mb-8">
     <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center relative z-10">
       <CheckCircle size={48} />
     </div>
     <div class="absolute inset-0 bg-green-50 rounded-full animate-ping opacity-75"></div>
  </div>
  
  <h1 class="font-hand text-4xl mb-4">Заказ принят!</h1>
  <p class="text-gray-500 mb-10 max-w-xs leading-relaxed">
    Ваш заказ сформирован. Если окно WhatsApp не открылось автоматически, нажмите кнопку ниже для отправки деталей оператору.
  </p>

  <div class="flex flex-col gap-3 w-full max-w-sm">
    <a href="https://wa.me/79991234567" target="_blank" class="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg shadow-green-500/20 hover:brightness-105 transition-all flex items-center justify-center gap-2">
      <span>Отправить в WhatsApp</span>
      <ArrowRight size={20} />
    </a>
    
    <div class="flex gap-3">
       <a href="https://vk.com" target="_blank" class="flex-1 py-3 bg-[#0077FF] text-white rounded-xl font-bold flex justify-center shadow-md">VK</a>
       <a href="https://t.me" target="_blank" class="flex-1 py-3 bg-[#0088cc] text-white rounded-xl font-bold flex justify-center shadow-md">Telegram</a>
    </div>

    <a href="/menu" class="w-full py-4 mt-4 bg-gray-100 text-dark rounded-xl font-bold hover:bg-gray-200 transition-colors">
      Вернуться в меню
    </a>
  </div>
</div>
