<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    const timer = setTimeout(() => {
      goto('/menu');
    }, 2000);
    return () => clearTimeout(timer);
  });
</script>

<div class="h-screen w-full flex flex-col items-center justify-center bg-white">
  <h1 class="font-hand text-6xl text-dark -rotate-6">СМАЧНО</h1>
  <p class="mt-6 text-gray-500 text-sm tracking-[0.2em] uppercase font-bold">Доставка со вкусом</p>
  
  <div class="mt-12">
     <div class="w-6 h-6 border-2 border-gray-200 border-t-accent rounded-full animate-spin"></div>
  </div>
</div>