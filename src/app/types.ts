export interface FoodItem {
  id: string;
  title: string;
  miniTitle: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  ingredients: string[];
  price: number;
  discountPrice?: number;
  quantity: number; // default stock or initial purchase quantity
  category: string;
}

export interface Category {
  id: string;
  name: string;
}
