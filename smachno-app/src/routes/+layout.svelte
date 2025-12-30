<script>
  import '../app.css';
  import { page } from '$app/stores';
  import BottomNav from '$lib/components/BottomNav.svelte';

  let { children } = $props();
  
  // Show nav on these base routes
  const showNav = $derived(['/menu', '/cart', '/contacts'].some(path => $page.url.pathname.startsWith(path)));
</script>

<div class="min-h-screen bg-light text-dark font-sans antialiased pb-20">
  {@render children()}
  
  {#if showNav}
    <BottomNav />
  {/if}
</div>
