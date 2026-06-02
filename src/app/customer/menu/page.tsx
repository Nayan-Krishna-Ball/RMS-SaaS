"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";

// Inline structure mapping to match design and support details
interface FoodItem {
  id: string;
  title: string;
  miniTitle: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  ingredients: string[];
  price: number;
  category: "Appetizers" | "Mains" | "Platters" | "Mocktails";
  badge?: string;
  isRecommended?: boolean;
}

// Full menu combining design showcase items and data.ts items adjusted for consistency
const MENU_ITEMS: FoodItem[] = [
  // Chef's Recommendations (Featured)
  {
    id: "rec-1",
    title: "Truffle Risotto",
    miniTitle: "Creamy rice with black truffle shavings",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBMUXKp1XT2vEePRCK-L9SejRIjpKZer_gL3E_PHRymMR72sh5L-80_XQE0P51d79BCvcMV2xy2rnAAuyzowC8gu9vvGAd4cT9alHqFnpXhgYChQOtuUFYpcpOAvJRhUS0G-o6whNzsaFaR6pIHsqO8LV0Wx91GgUnf_mdJZaq-nmMcI6-CXbr5vXzBeygz7xZp2jTimJ-eWsuhc4evztu4qZ85M8QoR7Gk1dK8FqblwWYpe2MIZCcenewiDL3_30PC48lPPCbwQMB",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-putting-grated-cheese-on-a-pasta-plate-40294-large.mp4",
    description:
      "A close-up, high-angle shot of a creamy truffle risotto served in a dark ceramic bowl. The dish is garnished with thin shavings of black truffle, extra virgin olive oil, and a sprinkle of fresh herbs. Soft, moody candlelight illuminates the textures of the rice, emphasizing its rich, velvety consistency.",
    ingredients: [
      "Arborio Rice",
      "Black Truffle Shavings",
      "Wild Mushrooms",
      "Parmigiano-Reggiano",
      "White Wine",
      "Truffle Butter",
    ],
    price: 32.0,
    category: "Mains",
    badge: "Recommended",
    isRecommended: true,
  },
  {
    id: "rec-2",
    title: "Wagyu Ribeye",
    miniTitle: "Perfectly seared marble Wagyu",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDp2i3ObyFOPEPVMbh4TN5l8QbteaH5oxGl-6tINd5n6dxUfZfJDvAVDNQaF6Xl-NFYyE3BGMGEY7djOnd25w7vPxGIsHrB_qomwYVVXWKiauVtvghybFOGvtqX8BwFR_1CkRIbQnDuVhwZmKKNitwfBDhm6c5Mymeg-ZqGbGHxsQPH9eWRpeVanXYMOL-GNtiUNvTTVb61k3sF8rOxvNX38ncG_bUET0ja2QE9c-6ChYWTQoYLJ6UbJaKTMrrTyArzt5O3BayisGiy",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-seasoning-a-salmon-fillet-before-cooking-41584-large.mp4",
    description:
      "A perfectly seared Wagyu ribeye steak, sliced to reveal a tender pink center. The steak is presented on a minimalist dark plate, accompanied by a small sprig of rosemary, roasted asparagus, and a dollop of garlic compound butter. The lighting is low-key, highlighting the glistening marbling of the meat.",
    ingredients: [
      "A5 Japanese Wagyu Ribeye",
      "Garlic Butter",
      "Fresh Rosemary",
      "Sea Salt & Black Pepper",
      "Asparagus",
    ],
    price: 85.0,
    category: "Platters",
    badge: "Most Ordered",
    isRecommended: true,
  },
  // Appetizers
  {
    id: "app-1",
    title: "Heirloom Burrata",
    miniTitle: "Creamy burrata with sweet heirloom tomatoes",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBySuGtqjuCBkBV1uN9-OJrI4K3LpuQ9ZjvSGbav-1GQj3cRZ_9Jz84S1H_3mj8V8XDQHSktaaDkzD6VNQayfbMtwO879nCFUU0Fzpp7lWycWTGB-Krlt0BDC0M9D6fgOWNEGYkTn3tvNqu4JfcJmdlovNVz7C6BHIrbmKCEXyHB1YrTF5awBCZ1Z15lIlpMHrsJGkOX8cxNJbMUEnuoGsL6oK6COx7Z6uynxhAc6L0i2LDBLsp6RBFRsZCJWjTXed0zYj9RCihCCyg",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-freshly-made-caesar-salad-41617-large.mp4",
    description:
      "A vibrant, fresh burrata salad with heirloom tomatoes of various colors, drizzled with aged balsamic glaze and extra virgin olive oil. The creamy white center of the cheese is gently broken open, ready to enjoy. Set against a dark, textured slate surface.",
    ingredients: [
      "Fresh Burrata Cheese",
      "Heirloom Tomatoes",
      "Aged Balsamic Glaze",
      "Extra Virgin Olive Oil",
      "Pine Nut Crumble",
      "Basil Oil",
    ],
    price: 21.0,
    category: "Appetizers",
  },
  {
    id: "app-2",
    title: "Yellowfin Tartare",
    miniTitle: "Delicate layered tuna tartare",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAm2_p3bq_3xfLEUiZ_CZxfLRklw8Jv5B575POKqlIrqRWCe6ED_oYFpFem2mLBThxha1RF1BDNaWlIXhWn3nzQoMzb9BSUjJCnFT7ethczbBRsPvmwp_lawbaJazEMoKYiY4clR3KV1jgZEsrFvLuxZtmq0sBKJhoKRvGjLIPJUzkRJkFEMuetymegBcXqnEVNeRKvIAdBFZdUBxaD8X-EqIQI7YGwSE-CQ0ZGtRLJ7KrRO7zTCsXdqKhrco-IabB041m8kwoC-p0l",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-seasoning-a-salmon-fillet-before-cooking-41584-large.mp4",
    description:
      "A delicate tuna tartare stack layered with avocado mousse and sweet mango coulis. The dish is presented on a minimalist black ceramic plate, garnished with microgreens and a dash of black sesame seeds. The lighting is soft and directional.",
    ingredients: [
      "Yellowfin Tuna",
      "Avocado Mousse",
      "Citrus Soy Dressing",
      "Crispy Lotus Root",
      "Mango Coulis",
      "Microgreens",
    ],
    price: 24.0,
    category: "Appetizers",
  },
  {
    id: "app-3",
    title: "Caesar Salad",
    miniTitle: "Crispy romaine and croutons",
    thumbnail:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&auto=format&fit=crop&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-freshly-made-caesar-salad-41617-large.mp4",
    description:
      "Crispy romaine lettuce tossed with our house-made creamy Caesar dressing, toasted garlic croutons, and freshly grated premium parmesan cheese flakes.",
    ingredients: [
      "Romaine Lettuce",
      "House Caesar Dressing",
      "Garlic Croutons",
      "Parmesan Flakes",
      "Black Pepper",
    ],
    price: 12.0,
    category: "Appetizers",
  },
  {
    id: "app-4",
    title: "Chocolate Lava Cake",
    miniTitle: "Warm chocolate with molten core",
    thumbnail:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-slicing-a-delicious-chocolate-cake-on-a-plate-40032-large.mp4",
    description:
      "Indulgent warm chocolate cake with a rich molten Belgian chocolate center, served with a side scoop of premium Tahitian vanilla bean ice cream.",
    ingredients: [
      "Belgian Dark Chocolate",
      "Fresh Eggs",
      "Creamy Butter",
      "Tahitian Vanilla Bean Ice Cream",
    ],
    price: 10.0,
    category: "Appetizers",
  },
  // Mains
  {
    id: "main-1",
    title: "Hand-Crafted Ragu",
    miniTitle: "Slow-cooked beef ragu with fresh pasta",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMySj8xiPK04zDCJQg6Qmr4tjrQm1zoRn6wY1AjX-tw3hCTqXV6BcupJmaLybxOr2ydRWctR9taRGtCOje2Eht5923xzk3Ke8CxC-WYnHHDIFh3ywy0mF-iXP4CDjGGz6Z6O6zvDXIcEFzImkF7AiU_aqj88m7YoB1jVhcBCkbs-hUOIK-oLtoF5CbBt0ko_4rHPYS5N0cf9eT0TZMCLNRM2xexAq_NGDtbjAJXTnMR_mD5hYeZ2FLYFt2QiJ6rgiQ042_ziBCEhwW",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-putting-grated-cheese-on-a-pasta-plate-40294-large.mp4",
    description:
      "Hand-crafted fettuccine pasta swirled elegantly on a plate, smothered in a rich, dark slow-cooked beef ragu. Tiny flakes of parmesan cheese and fresh basil leaves provide contrast against the deep sauce.",
    ingredients: [
      "Hand-Crafted Fettuccine",
      "12-Hour Slow-Cooked Beef Ragu",
      "Parmesan Shavings",
      "Basil Oil",
      "Fresh Herbs",
    ],
    price: 26.0,
    category: "Mains",
  },
  {
    id: "main-2",
    title: "Beef Burger Deluxe",
    miniTitle: "Gourmet double-cheese burger",
    thumbnail:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-gourmet-hamburger-40019-large.mp4",
    description:
      "Juicy prime beef burger with double cheddar cheese, fresh crisp lettuce, vine tomatoes, red onions, and our special house sauce served in a toasted buttery brioche bun.",
    ingredients: [
      "100% Prime Beef Patty",
      "Double Cheddar Cheese",
      "Brioche Bun",
      "House Special Sauce",
      "Lettuce & Tomato",
    ],
    price: 18.0,
    category: "Mains",
  },
  {
    id: "main-3",
    title: "Chicken Pasta Alfredo",
    miniTitle: "Creamy white sauce penne pasta",
    thumbnail:
      "https://images.unsplash.com/photo-1621996346565-e3bb64e0be5e?w=600&auto=format&fit=crop&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-putting-grated-cheese-on-a-pasta-plate-40294-large.mp4",
    description:
      "Creamy white sauce pasta loaded with seasoned grilled chicken strips, sliced mushrooms, shaved parmesan cheese, and garlic herbs.",
    ingredients: [
      "Penne Pasta",
      "Grilled Chicken Breast",
      "Rich Alfredo Sauce",
      "Mushrooms",
      "Parmesan Cheese",
    ],
    price: 16.0,
    category: "Mains",
  },
  {
    id: "main-4",
    title: "Grilled Lemon Salmon",
    miniTitle: "Pan-seared salmon with veggies",
    thumbnail:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-seasoning-a-salmon-fillet-before-cooking-41584-large.mp4",
    description:
      "Freshly caught Atlantic salmon fillet pan-seared to perfection, drizzled with a rich lemon butter garlic sauce, served with roasted asparagus and cherry tomatoes.",
    ingredients: [
      "Atlantic Salmon Fillet",
      "Lemon Butter Glaze",
      "Asparagus",
      "Roasted Cherry Tomatoes",
      "Garlic Herbs",
    ],
    price: 28.0,
    category: "Mains",
  },
  // Mocktails
  {
    id: "mock-1",
    title: "Fresh Mint Lemonade",
    miniTitle: "Citrus and fresh mint splash",
    thumbnail:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-lemon-slices-falling-into-a-glass-of-lemonade-42207-large.mp4",
    description:
      "Cold, refreshing lemonade freshly squeezed with real organic lemons, a touch of muddled mint, and served over crushed ice.",
    ingredients: [
      "Organic Squeezed Lemons",
      "Fresh Mint Leaves",
      "Sugar Cane Syrup",
      "Purified Water",
      "Crushed Ice",
    ],
    price: 7.0,
    category: "Mocktails",
  },
];

interface CartItem {
  cartId: string;
  item: FoodItem;
  quantity: number;
  addons: string[];
  spiceLevel: "Mild" | "Medium" | "Hot";
  instructions: string;
  totalPrice: number;
}

export default function CustomerMenu() {
  const [selectedCategory, setSelectedCategory] = useState<
    "Appetizers" | "Mains" | "Platters" | "Mocktails"
  >("Appetizers");
  const [cart, setCart] = useState<CartItem[]>([]);

  // Customization drawer states
  const [customizingItem, setCustomizingItem] = useState<FoodItem | null>(null);
  const [addonCheese, setAddonCheese] = useState(false);
  const [addonTruffle, setAddonTruffle] = useState(false);
  const [spiceLevel, setSpiceLevel] = useState<"Mild" | "Medium" | "Hot">(
    "Mild",
  );
  const [instructions, setInstructions] = useState("");

  // Details Modal states (Plays video)
  const [detailsItem, setDetailsItem] = useState<FoodItem | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cart Preview Drawer state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Waiter Call State
  const [waiterStatus, setWaiterStatus] = useState<
    "none" | "calling" | "called"
  >("none");
  const [waiterCountdown, setWaiterCountdown] = useState(45);

  // Auto-play / pause video in details modal when it is opened
  useEffect(() => {
    if (detailsItem && videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Video auto-play failed: ", err));
    }
  }, [detailsItem]);

  // Waiter arrival countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (waiterStatus === "called" && waiterCountdown > 0) {
      timer = setInterval(() => {
        setWaiterCountdown((prev) => {
          if (prev <= 1) {
            setWaiterStatus("none");
            return 45;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [waiterStatus, waiterCountdown]);

  // Filtered menu items
  const filteredItems = MENU_ITEMS.filter(
    (item) => item.category === selectedCategory,
  );

  // Recommendations list
  const recommendedItems = MENU_ITEMS.filter((item) => item.isRecommended);

  // Open Customization bottom sheet
  const handleOpenCustomize = (item: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening detailed dialog
    setCustomizingItem(item);
    setAddonCheese(false);
    setAddonTruffle(false);
    setSpiceLevel("Mild");
    setInstructions("");
  };

  // Close Customization bottom sheet
  const handleCloseCustomize = () => {
    setCustomizingItem(null);
  };

  // Add customized item to cart
  const handleAddToCart = () => {
    if (!customizingItem) return;

    let finalPrice = customizingItem.price;
    const selectedAddons: string[] = [];

    if (addonCheese) {
      finalPrice += 3.0;
      selectedAddons.push("Extra Cheese (+$3.00)");
    }
    if (addonTruffle) {
      finalPrice += 5.0;
      selectedAddons.push("Truffle Oil (+$5.00)");
    }

    const newCartItem: CartItem = {
      cartId: `${customizingItem.id}-${Date.now()}`,
      item: customizingItem,
      quantity: 1,
      addons: selectedAddons,
      spiceLevel,
      instructions,
      totalPrice: finalPrice,
    };

    setCart((prev) => [...prev, newCartItem]);
    handleCloseCustomize();
  };

  // Calculate cart stats
  const cartTotalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cart.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0,
  );

  // Update item quantity in cart
  const updateCartQty = (cartId: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.cartId === cartId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  // Trigger call waiter notification
  const handleCallWaiter = () => {
    if (waiterStatus === "none") {
      setWaiterStatus("calling");
      setTimeout(() => {
        setWaiterStatus("called");
        setWaiterCountdown(45);
      }, 1500);
    }
  };

  // Confirm and submit order
  const handleCheckoutOrder = () => {
    alert(
      "✨ Order Placed Successfully! Your dishes are being freshly prepared in the kitchen. Table 12 will be served shortly.",
    );
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="flex flex-col items-center bg-background text-on-surface min-h-screen font-body-md w-full relative">
      {/* Shell Container for perfect mobile-centric layouts on desktop, centering the look */}
      <div className="w-full max-w-lg min-h-screen bg-surface flex flex-col relative border-x border-outline-variant/10 shadow-2xl pb-32">
        {/* Sticky Header */}
        <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-margin-mobile py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-container/20 flex items-center justify-center overflow-hidden border border-primary/20">
              <img
                alt="Concierge Logo"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaj_Xg3vel6TRuVqP3zw33S5l_FkQdohkYEjdhAuASXEcsrSnP9dMyO_pmoIKcDT5M_TI1VhVUim7cyDEcltw3dVYi27uQy_54Cka-zA1ZUrQWjT2Ymy_EBT2sKk6l_gEqgYo4IFHXjLZHwa3_xK_PKKuzGM5A7Ltjwi76xkZitz0HxIR3JGYGoVVnBT3t9IMxPvFfcY63amOlXow4OxfzWSYlK3aSu5y7RBdG9BByPiDs26l6bpiPoZEnEoJR0AboRzzSIykZa4QA"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] leading-tight font-medium text-primary">
                Table 12
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-green"></span>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                  Live Session
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCallWaiter}
            className={`h-10 w-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
              waiterStatus !== "none"
                ? "bg-primary text-on-primary scale-95"
                : "text-primary bg-primary-container/10 active:scale-95 border border-primary/20"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {waiterStatus !== "none" ? (
                "notifications_active"
              ) : (
                <MdOutlineNotificationsActive />
              )}
            </span>
          </button>
        </header>

        {/* Live Waiter Status Banner */}
        {waiterStatus !== "none" && (
          <div className="mx-margin-mobile mt-4 p-4 rounded-xl glass-card border border-primary/30 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary animate-bounce">
                restaurant_menu
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {waiterStatus === "calling"
                    ? "Summoning Waiter..."
                    : "Waiter Summoned"}
                </span>
                <span className="text-xs text-on-surface-variant">
                  {waiterStatus === "calling"
                    ? "Requesting assistance..."
                    : `Arriving at Table 12 in ${waiterCountdown}s`}
                </span>
              </div>
            </div>
            <button
              onClick={() => setWaiterStatus("none")}
              className="text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        )}

        {/* Hero Section: Chef's Recommendations */}
        <section className="mt-6 mb-8">
          <div className="px-margin-mobile mb-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Chef's Recommendations
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-4 px-margin-mobile hide-scrollbar snap-x scroll-smooth">
            {recommendedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setDetailsItem(item)}
                className="snap-center flex-shrink-0 w-72 rounded-xl overflow-hidden glass-card border border-outline-variant/20 group relative cursor-pointer hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={item.thumbnail}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  {item.badge && (
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white ${
                          item.badge === "Recommended"
                            ? "bg-amber-600"
                            : "bg-cyan-600"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  )}
                  {/* Premium overlay indicators */}
                  <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-symbols-outlined text-xs text-white">
                      play_circle
                    </span>
                  </div>
                </div>

                <div className="p-4 flex justify-between items-end">
                  <div>
                    <h3 className="font-headline-sm text-lg text-primary leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleOpenCustomize(item, e)}
                    className="bg-primary text-on-primary h-10 w-10 rounded-lg flex items-center justify-center active:scale-90 hover:bg-primary-fixed-dim transition-all border border-primary/20 shadow-md shadow-primary/10"
                  >
                    <span className="material-symbols-outlined"> + </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Navigation (Sticky) */}
        <nav className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md py-3.5 border-b border-outline-variant/10 px-margin-mobile flex gap-6 overflow-x-auto hide-scrollbar">
          {(["Appetizers", "Mains", "Platters", "Mocktails"] as const).map(
            (category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-bold whitespace-nowrap pb-1.5 transition-all duration-200 relative text-sm tracking-wider uppercase ${
                  selectedCategory === category
                    ? "text-primary"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-primary rounded-full animate-fade-in"></span>
                )}
              </button>
            ),
          )}
        </nav>

        {/* Menu Grid */}
        <section className="px-margin-mobile mt-6 space-y-4 flex-1">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setDetailsItem(item)}
              className="glass-card border border-outline-variant/20 rounded-xl p-4 flex gap-4 cursor-pointer hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative bg-surface-container">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.thumbnail}
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-black/20 transition-colors"></div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-headline-sm text-[18px] text-on-surface leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-on-surface-variant text-xs line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-primary text-sm">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => handleOpenCustomize(item, e)}
                    className="text-primary border border-primary/30 px-3.5 py-1.5 rounded-lg text-xs font-bold active:scale-95 hover:bg-primary/5 transition-all"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-16 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl opacity-40">
                restaurant
              </span>
              <p className="mt-2 text-sm">
                No items available in this category yet.
              </p>
            </div>
          )}
        </section>
      </div>{" "}
      {/* End of Shell Container */}
      {/* Sticky Bottom Actions Bar (Floating) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/20 px-4 pb-8 pt-4 flex gap-3 shadow-2xl w-full max-w-lg mx-auto">
        <button
          onClick={handleCallWaiter}
          className={`flex flex-col items-center justify-center px-5 py-2.5 rounded-xl transition-all duration-150 relative ${
            waiterStatus !== "none"
              ? "bg-primary text-on-primary"
              : "bg-surface-container-high text-on-surface hover:bg-surface-bright"
          }`}
        >
          <span
            className={`material-symbols-outlined mb-0.5 ${waiterStatus !== "none" ? "text-on-primary animate-pulse" : "text-primary"}`}
          >
            {waiterStatus !== "none" ? "notifications_active" : "notifications"}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {waiterStatus !== "none" ? "Arriving" : "Call Waiter"}
          </span>
        </button>

        <button
          onClick={() => {
            if (cart.length > 0) setIsCartOpen(true);
          }}
          disabled={cart.length === 0}
          className={`flex-1 flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-150 shadow-lg ${
            cart.length > 0
              ? "bg-primary text-on-primary active:scale-[0.98] shadow-primary/10 cursor-pointer"
              : "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed opacity-80"
          }`}
        >
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">
              {cartTotalQty} {cartTotalQty === 1 ? "Item" : "Items"} Added
            </span>
            <span className="font-bold text-base leading-tight">
              {cart.length > 0 ? "View Cart" : "Cart is Empty"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base">
              ${cartTotalPrice.toFixed(2)}
            </span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward_ios
            </span>
          </div>
        </button>
      </footer>
      {/* Backdrop Overlay for drawers/modals */}
      {(customizingItem || isCartOpen || detailsItem) && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          onClick={() => {
            handleCloseCustomize();
            setIsCartOpen(false);
            setDetailsItem(null);
          }}
        />
      )}
      {/* Customization Drawer (Bottom Sheet) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[70] w-full max-w-lg mx-auto transition-transform duration-500 ease-out transform ${
          customizingItem ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-surface-container-high rounded-t-3xl border-t border-outline-variant/30 p-margin-mobile pb-10 shadow-2xl">
          {/* Drag / Pull Handle */}
          <div className="w-12 h-1.5 bg-outline-variant/40 rounded-full mx-auto mb-6"></div>

          <header className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-headline-sm text-2xl text-on-surface">
                Customize Your Order
              </h2>
              <p className="text-on-surface-variant text-sm mt-1">
                {customizingItem?.title} • ${customizingItem?.price.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleCloseCustomize}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          <div className="space-y-8 overflow-y-auto max-h-[60dvh] pr-1 hide-scrollbar">
            {/* Extra Add-ons */}
            <section>
              <h3 className="text-label-md uppercase tracking-widest text-primary mb-4">
                Extra Add-ons
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 glass-card cursor-pointer hover:border-primary/20 transition-all select-none">
                  <span className="text-on-surface font-medium">
                    Extra Cheese
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-on-surface-variant">
                      +$3.00
                    </span>
                    <input
                      type="checkbox"
                      checked={addonCheese}
                      onChange={(e) => setAddonCheese(e.target.checked)}
                      className="rounded border-outline-variant bg-surface-container text-primary focus:ring-primary focus:ring-offset-0 h-5 w-5 accent-primary"
                    />
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 glass-card cursor-pointer hover:border-primary/20 transition-all select-none">
                  <span className="text-on-surface font-medium">
                    Truffle Oil
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-on-surface-variant">
                      +$5.00
                    </span>
                    <input
                      type="checkbox"
                      checked={addonTruffle}
                      onChange={(e) => setAddonTruffle(e.target.checked)}
                      className="rounded border-outline-variant bg-surface-container text-primary focus:ring-primary focus:ring-offset-0 h-5 w-5 accent-primary"
                    />
                  </div>
                </label>
              </div>
            </section>

            {/* Spice Level */}
            <section>
              <h3 className="text-label-md uppercase tracking-widest text-primary mb-4">
                Spice Level
              </h3>
              <div className="flex p-1 bg-surface-container-highest rounded-xl">
                {(["Mild", "Medium", "Hot"] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSpiceLevel(level)}
                    className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                      spiceLevel === level
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </section>

            {/* Special Instructions */}
            <section>
              <h3 className="text-label-md uppercase tracking-widest text-primary mb-4">
                Special Kitchen Instructions
              </h3>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none text-sm"
                placeholder="e.g. No salt, food allergies, sauce on the side..."
                rows={3}
              />
            </section>

            {/* Submit Customize Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-[0.98] transition-transform shadow-lg shadow-primary/10 hover:bg-primary-fixed-dim mt-4"
            >
              Add to Cart • $
              {(
                (customizingItem?.price || 0) +
                (addonCheese ? 3.0 : 0) +
                (addonTruffle ? 5.0 : 0)
              ).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
      {/* Cart Summary Drawer (Slides up) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[70] w-full max-w-lg mx-auto transition-transform duration-500 ease-out transform ${
          isCartOpen && cart.length > 0 ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-surface-container-high rounded-t-3xl border-t border-outline-variant/30 p-margin-mobile pb-10 shadow-2xl max-h-[85dvh] flex flex-col">
          <div className="w-12 h-1.5 bg-outline-variant/40 rounded-full mx-auto mb-6 flex-shrink-0"></div>

          <header className="flex justify-between items-center mb-6 flex-shrink-0">
            <div>
              <h2 className="font-headline-sm text-2xl text-on-surface">
                Your Selection
              </h2>
              <p className="text-on-surface-variant text-sm">
                Table 12 • Active Order
              </p>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 hide-scrollbar">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="glass-card border border-outline-variant/20 rounded-xl p-4 flex gap-4"
              >
                <img
                  alt={item.item.title}
                  className="w-16 h-16 rounded-lg object-cover bg-surface-container flex-shrink-0"
                  src={item.item.thumbnail}
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline-sm text-base text-on-surface leading-tight">
                        {item.item.title}
                      </h4>
                      <span className="font-bold text-primary text-sm">
                        ${(item.totalPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    {/* Selected Customizations Details */}
                    {(item.addons.length > 0 ||
                      item.spiceLevel !== "Mild" ||
                      item.instructions) && (
                      <div className="text-[11px] text-on-surface-variant/80 mt-1 space-y-0.5">
                        {item.addons.length > 0 && (
                          <div>Addons: {item.addons.join(", ")}</div>
                        )}
                        {item.spiceLevel !== "Mild" && (
                          <div>Spice: {item.spiceLevel}</div>
                        )}
                        {item.instructions && (
                          <div className="italic">"{item.instructions}"</div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[11px] text-on-surface-variant">
                      Unit Price: ${item.totalPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center bg-surface-container-highest rounded-lg border border-outline-variant/10 overflow-hidden">
                      <button
                        onClick={() => updateCartQty(item.cartId, -1)}
                        className="px-2.5 py-1 hover:bg-surface-bright text-on-surface transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          remove
                        </span>
                      </button>
                      <span className="px-3 text-xs font-bold text-on-surface">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(item.cartId, 1)}
                        className="px-2.5 py-1 hover:bg-surface-bright text-on-surface transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          add
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="border-t border-outline-variant/20 pt-4 mt-6 space-y-2 flex-shrink-0">
            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>Subtotal</span>
              <span>${cartTotalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>Service Charge (10%)</span>
              <span>${(cartTotalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-on-surface pt-2 border-t border-outline-variant/10">
              <span>Estimated Total</span>
              <span className="text-primary">
                ${(cartTotalPrice * 1.1).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckoutOrder}
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-[0.98] transition-transform shadow-lg shadow-primary/10 hover:bg-primary-fixed-dim mt-4 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                restaurant_menu
              </span>
              Place Order to Kitchen
            </button>
          </div>
        </div>
      </div>
      {/* Detailed Dish Details Modal (With looping cooking videos) */}
      {detailsItem && (
        <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[70] w-full max-w-md mx-auto p-4 animate-slide-up">
          <div className="bg-surface-container-high rounded-2xl border border-outline-variant/30 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            {/* Header image/video container */}
            <div className="h-56 relative bg-black/90 flex-shrink-0">
              {detailsItem.videoUrl ? (
                <video
                  ref={videoRef}
                  src={detailsItem.videoUrl}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  autoPlay
                />
              ) : (
                <img
                  alt={detailsItem.title}
                  className="w-full h-full object-cover"
                  src={detailsItem.thumbnail}
                />
              )}
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

              <button
                onClick={() => setDetailsItem(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white h-8 w-8 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <div className="absolute bottom-4 left-4">
                <span className="text-xs uppercase font-bold text-primary tracking-widest bg-primary-container/20 px-2.5 py-1 rounded-md border border-primary/20 backdrop-blur-sm">
                  {detailsItem.category}
                </span>
                <h3 className="font-headline-sm text-2xl text-on-surface mt-2 drop-shadow-md">
                  {detailsItem.title}
                </h3>
              </div>
            </div>

            {/* Scrollable details */}
            <div className="p-6 overflow-y-auto space-y-5 hide-scrollbar">
              <div>
                <h4 className="text-[11px] uppercase tracking-widest text-primary font-bold mb-2">
                  Description
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {detailsItem.description}
                </p>
              </div>

              {detailsItem.ingredients &&
                detailsItem.ingredients.length > 0 && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-primary font-bold mb-2">
                      Ingredients
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {detailsItem.ingredients.map((ing) => (
                        <div
                          key={ing}
                          className="flex items-center gap-2 text-xs text-on-surface"
                        >
                          <span className="material-symbols-outlined text-primary text-[14px]">
                            check
                          </span>
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            {/* Footer with action button */}
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container flex items-center justify-between gap-4 flex-shrink-0">
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider block">
                  Price
                </span>
                <span className="text-xl font-bold text-primary font-headline-sm">
                  ${detailsItem.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={(e) => {
                  setDetailsItem(null);
                  handleOpenCustomize(detailsItem, e);
                }}
                className="bg-primary text-on-primary font-bold px-6 py-3 rounded-xl active:scale-[0.98] hover:bg-primary-fixed-dim transition-all flex items-center gap-2 shadow-md shadow-primary/10"
              >
                <span className="material-symbols-outlined text-base">
                  Add to Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
