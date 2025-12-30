<script>
  import "../app.css";
  import BottomNav from "$lib/components/BottomNav.svelte";
  import { page } from '$app/stores';

  let showNav = true;
  $: showNav = $page.url.pathname !== '/' && $page.url.pathname !== '/order-sent';
</script>

<div class="min-h-screen pb-20 max-w-md mx-auto bg-light relative shadow-2xl overflow-hidden">
  <slot />
  
  {#if showNav}
    <BottomNav />
  {/if}
</div>

<style>
  /* Mobile-first container centering for desktop view */
  :global(body) {
    background-color: #f0f0f0;
  }
</style>