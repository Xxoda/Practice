export interface ModifiersConfig {
  size?: Record<string, number>;
  cheese?: boolean;
  sauce?: boolean;
}

export interface Dish {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  tags: string[];
  available: boolean;
  modifiers?: ModifiersConfig;
  spiciness?: number;
}

export interface SelectedModifiers {
  size?: 'S' | 'M' | 'L';
  cheese?: boolean;
  sauce?: boolean;
}

export interface CartItem {
  uniqueId: string;
  dish: Dish;
  quantity: number;
  selectedModifiers: SelectedModifiers;
  finalPrice: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subtitle: string;
}
