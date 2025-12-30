# Smachno App

Mobile-first responsive web app for food delivery service «СМАЧНО».

## Tech Stack
- **Framework:** SvelteKit (Svelte 5 + Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide Svelte
- **State Management:** Svelte Stores + LocalStorage
- **Font:** Inter (UI), Patrick Hand (Handwritten accents)

## Features
- **Splash Screen:** Animated intro.
- **Menu:** Category grid, Dish filtering (Hit, Spicy, Vegan, etc.), Search.
- **Product Details:** Modal with modifiers (Size, Add-ons), Quantity stepper.
- **Cart:** Persisted in LocalStorage, dynamic delivery cost calculation.
- **Checkout:**
  - Contact Info
  - Address with Zone selection (Center/North/South) and min-order validation.
  - Delivery Time (ASAP vs Time Slots).
  - WhatsApp Order Generation.
- **Visuals:** Minimalist B&W design with one accent color (#FF4D2D).

## Project Structure
- `src/lib/data/menu.json`: Static menu data.
- `src/lib/stores/cart.ts`: Cart logic.
- `src/lib/components/`: Atomic UI components.
- `src/routes/`: App pages.

## Development
- `npm run dev`: Start dev server.
- `npm run build`: Build for production.
