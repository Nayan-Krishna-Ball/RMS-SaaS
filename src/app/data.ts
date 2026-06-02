import { FoodItem, Category } from "./types";

export const CATEGORIES: Category[] = [
  { id: "all", name: "All" },
  { id: "popular", name: "Popular" },
  { id: "main-course", name: "Main-Course" },
  { id: "appetizer", name: "Appetizer" },
  { id: "beverage", name: "Beverages" }
];

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: "1",
    title: "Beef Burger",
    miniTitle: "Juicy beef burger with cheese",
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-gourmet-hamburger-40019-large.mp4",
    description: "Juicy beef burger with double cheese, fresh lettuce, tomato, onions, and our special house sauce served in a toasted brioche bun.",
    ingredients: ["100% Beef Patty", "Cheddar Cheese", "Lettuce & Tomato", "Brioche Bun", "House Special Sauce"],
    price: 450,
    discountPrice: 400,
    quantity: 1,
    category: "popular"
  },
  {
    id: "2",
    title: "Chicken Pasta",
    miniTitle: "Creamy white sauce pasta",
    thumbnail: "https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-putting-grated-cheese-on-a-pasta-plate-40294-large.mp4",
    description: "Creamy white sauce pasta loaded with seasoned grilled chicken strips, mushrooms, parmesan cheese, and garlic herbs.",
    ingredients: ["Penne Pasta", "Grilled Chicken Breast", "Alfredo Sauce", "Mushrooms", "Parmesan Cheese"],
    price: 380,
    discountPrice: 340,
    quantity: 1,
    category: "main-course"
  },
  {
    id: "3",
    title: "Grilled Salmon",
    miniTitle: "Salmon with lemon butter",
    thumbnail: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-seasoning-a-salmon-fillet-before-cooking-41584-large.mp4",
    description: "Freshly caught Atlantic salmon fillet pan-seared to perfection, drizzled with a rich lemon butter garlic sauce, served with roasted veggies.",
    ingredients: ["Atlantic Salmon Fillet", "Lemon Butter Sauce", "Garlic & Herbs", "Asparagus", "Cherry Tomatoes"],
    price: 650,
    discountPrice: 590,
    quantity: 1,
    category: "popular"
  },
  {
    id: "4",
    title: "Fresh Lemonade",
    miniTitle: "Refreshing citrus beverage",
    thumbnail: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-lemon-slices-falling-into-a-glass-of-lemonade-42207-large.mp4",
    description: "Cold, refreshing lemonade freshly squeezed with real lemons, a touch of mint, and served over crushed ice.",
    ingredients: ["Freshly Squeezed Lemons", "Mint Leaves", "Sugar Syrup", "Purified Water", "Ice Cubes"],
    price: 120,
    quantity: 1,
    category: "beverage"
  },
  {
    id: "5",
    title: "Chocolate Lava Cake",
    miniTitle: "Warm chocolate delight",
    thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-slicing-a-delicious-chocolate-cake-on-a-plate-40032-large.mp4",
    description: "Indulgent warm chocolate cake with a rich molten lava chocolate center, served with a scoop of premium vanilla ice cream.",
    ingredients: ["Dark Belgian Chocolate", "Cocoa Powder", "Fresh Eggs", "Butter", "Vanilla Ice Cream"],
    price: 220,
    discountPrice: 190,
    quantity: 1,
    category: "appetizer"
  },
  {
    id: "6",
    title: "Caesar Salad",
    miniTitle: "Crispy greens and dressing",
    thumbnail: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&auto=format&fit=crop&q=80",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-freshly-made-caesar-salad-41617-large.mp4",
    description: "Crispy romaine lettuce tossed with creamy Caesar dressing, garlic croutons, and freshly grated parmesan cheese flakes.",
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Garlic Croutons", "Parmesan Flakes", "Black Pepper"],
    price: 280,
    quantity: 1,
    category: "appetizer"
  }
];
