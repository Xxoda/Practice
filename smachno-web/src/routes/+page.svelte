<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  
    onMount(() => {
      setTimeout(() => {
        goto('/menu');
      }, 3000);
    });
  </script>
  
  <div class="h-screen w-full flex flex-col items-center justify-center bg-white p-6 relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-10 left-10 w-12 h-12 border-2 border-black rounded-full opacity-20"></div>
    <div class="absolute bottom-20 right-10 w-8 h-8 bg-primary rounded-full opacity-20"></div>
    <div class="absolute top-1/2 right-[-20px] w-20 h-20 border-black border-dashed border-2 rounded-full opacity-10"></div>
  
    <div class="z-10 flex flex-col items-center animate-pulse">
        <h1 class="text-5xl font-hand font-bold mb-2">СМАЧНО</h1>
        <p class="text-gray-500 font-hand text-xl">Доставка еды</p>
    </div>
  
    <div class="absolute bottom-10">
        <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>