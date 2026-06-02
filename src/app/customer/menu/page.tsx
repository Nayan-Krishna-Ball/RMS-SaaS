"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiBellBold,
  PiBellRingingBold,
  PiCaretRightBold,
  PiCheckBold,
  PiPlusBold,
  PiXBold,
} from "react-icons/pi";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  categories,
  conciergeLogo,
  menuItems,
  recommendations,
  spiceLevels,
} from "@/app/data";

export default function CustomerMenuPage() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(spiceLevels[0]);

  const filteredMenuItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  const selectedSpiceIndex = spiceLevels.indexOf(selectedSpiceLevel);

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen((current) => !current);
  };

  return (
    <div className="min-h-[max(884px,100dvh)] text-on-surface font-body-md selection:bg-primary/30">
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-margin-mobile py-4"
        initial={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-full bg-primary-container/20 flex items-center justify-center overflow-hidden">
            <Image
              alt="Concierge"
              className="h-full w-full object-cover"
              fill
              sizes="40px"
              src={conciergeLogo}
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-[16px] leading-tight font-medium text-primary">
              Table 12
            </span>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-green" />
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                Live Session
              </span>
            </div>
          </div>
        </div>
        <button
          className="h-10 w-10 flex items-center justify-center text-primary active:scale-95 transition-transform duration-200"
          type="button"
        >
          <PiBellRingingBold aria-hidden className="h-6 w-6" />
        </button>
      </motion.header>

      <main className="pt-24 pb-32">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="px-margin-mobile mb-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Chef&apos;s Recommendations
            </h2>
          </div>
          <Swiper
            className="px-margin-mobile!"
            slidesPerView="auto"
            spaceBetween={16}
          >
            {recommendations.map((item) => (
              <SwiperSlide className="w-72!" key={item.title}>
                <div className="rounded-xl overflow-hidden glass-card border border-outline-variant/20 group relative">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      fill
                      sizes="288px"
                      src={item.image}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`${item.badgeClass} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-end">
                    <div>
                      <h3 className="font-headline-sm text-lg text-primary">
                        {item.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm mt-1">
                        {item.price}
                      </p>
                    </div>
                    <button
                      className="bg-primary text-on-primary h-10 w-10 rounded-lg flex items-center justify-center active:scale-90 transition-transform"
                      onClick={toggleBottomSheet}
                      type="button"
                    >
                      <PiPlusBold aria-hidden className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.section>

        <motion.nav
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[72px] z-40 bg-transparent py-3 border-b border-outline-variant/10 px-margin-mobile"
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
        >
          <Swiper
            className="hide-scrollbar"
            freeMode
            grabCursor
            modules={[FreeMode]}
            spaceBetween={24}
            slidesPerView="auto"
          >
            {categories.map((category) => (
              <SwiperSlide className="w-auto!" key={category}>
                <button
                  className={`whitespace-nowrap border-b-2 pb-1 inline-flex transition-all duration-300 active:scale-95 ${
                    selectedCategory === category
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-on-surface-variant"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.nav>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="px-margin-mobile mt-6 space-y-4"
          initial={{ opacity: 0, y: 14 }}
          key={selectedCategory}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {filteredMenuItems.map((item) => (
              <div
                className="glass-card border border-outline-variant/20 rounded-xl p-4 flex gap-4 transition-all duration-300 active:scale-[0.99] hover:border-primary/30 hover:bg-surface-container/80"
                key={`${item.category}-${item.title}`}
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <Image
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    fill
                    sizes="96px"
                    src={item.image}
                    unoptimized
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-headline-sm text-[18px] text-on-surface leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-on-surface-variant text-xs line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-primary">
                      {item.price}
                    </span>
                    <button
                      className="text-primary border border-primary/30 px-3 py-1 rounded-lg text-xs font-bold active:scale-95 transition-transform flex items-center gap-1.5"
                      onClick={toggleBottomSheet}
                      type="button"
                    >
                      <PiPlusBold aria-hidden className="h-3.5 w-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredMenuItems.length === 0 ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="glass-card border border-outline-variant/20 rounded-xl p-4 text-center text-sm text-on-surface-variant"
                initial={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                No items available in {selectedCategory} yet.
              </motion.div>
            ) : null}
        </motion.section>
      </main>

      <AnimatePresence>
        {isBottomSheetOpen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={toggleBottomSheet}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>
      <motion.div
        animate={{ y: isBottomSheetOpen ? 0 : "100%" }}
        className="fixed bottom-0 left-0 w-full z-70"
        initial={false}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-surface-container-high rounded-t-3xl border-t border-outline-variant/30 p-margin-mobile pb-10 shadow-2xl">
          <div className="w-12 h-1.5 bg-outline-variant/40 rounded-full mx-auto mb-6" />
          <header className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-headline-sm text-2xl text-on-surface">
                Customize Your Order
              </h2>
              <p className="text-on-surface-variant text-sm">
                Truffle Risotto &bull; $32.00
              </p>
            </div>
            <button
              className="text-on-surface-variant"
              onClick={toggleBottomSheet}
              type="button"
            >
              <PiXBold aria-hidden className="h-6 w-6" />
            </button>
          </header>

          <div className="space-y-8 overflow-y-auto max-h-[530px] hide-scrollbar">
            <motion.section
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, delay: 0.08, ease: "easeOut" }}
            >
              <h3 className="text-label-md uppercase tracking-widest text-primary mb-4">
                Extra Add-ons
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 glass-card">
                  <span className="text-on-surface">Extra Cheese</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-on-surface-variant">
                      +$3.00
                    </span>
                    <input className="peer sr-only" type="checkbox" />
                    <span className="h-5 w-5 rounded border border-outline-variant bg-surface-container flex items-center justify-center text-on-primary transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50">
                      <PiCheckBold
                        aria-hidden
                        className="h-3.5 w-3.5 scale-50 opacity-0 transition-all duration-300"
                      />
                    </span>
                  </div>
                </label>
                <label className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 glass-card">
                  <span className="text-on-surface">Truffle Oil</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-on-surface-variant">
                      +$5.00
                    </span>
                    <input className="peer sr-only" type="checkbox" />
                    <span className="h-5 w-5 rounded border border-outline-variant bg-surface-container flex items-center justify-center text-on-primary transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50">
                      <PiCheckBold
                        aria-hidden
                        className="h-3.5 w-3.5 scale-50 opacity-0 transition-all duration-300"
                      />
                    </span>
                  </div>
                </label>
              </div>
            </motion.section>

            <motion.section
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, delay: 0.12, ease: "easeOut" }}
            >
              <h3 className="text-label-md uppercase tracking-widest text-primary mb-4">
                Spice Level
              </h3>
              <div className="relative flex p-1 bg-surface-container-highest rounded-xl overflow-hidden">
                <span
                  className="absolute inset-y-1 left-1 rounded-lg bg-primary transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(${selectedSpiceIndex * 100}%)`,
                    width: "calc((100% - 8px) / 3)",
                  }}
                />
                {spiceLevels.map((level) => (
                  <button
                    className={`relative z-10 flex-1 py-3 text-sm font-bold rounded-lg transition-colors duration-300 ${
                      selectedSpiceLevel === level
                        ? "text-on-primary"
                        : "text-on-surface-variant"
                    }`}
                    key={level}
                    onClick={() => setSelectedSpiceLevel(level)}
                    type="button"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </motion.section>

            <motion.section
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, delay: 0.16, ease: "easeOut" }}
            >
              <h3 className="text-label-md uppercase tracking-widest text-primary mb-4">
                Special Kitchen Instructions
              </h3>
              <textarea
                className="w-full m-1 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-primary focus:border-primary"
                placeholder="e.g. No salt, allergies, etc..."
                rows={3}
              />
            </motion.section>

            <button
              className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-95 transition-transform mt-4"
              type="button"
            >
              Add to Cart &bull; $32.00
            </button>
          </div>
        </div>
      </motion.div>

      <motion.footer
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-xl px-4 pb-8 pt-4 flex gap-3 shadow-2xl"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
      >
        <button
          className="flex flex-col items-center justify-center bg-surface-container-high text-on-surface px-6 py-2 rounded-xl active:scale-90 transition-transform duration-150"
          type="button"
        >
          <PiBellBold aria-hidden className="text-primary mb-0.5 h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Call Waiter
          </span>
        </button>
        <button
          className="flex-1 bg-primary text-on-primary flex items-center justify-between px-6 py-4 rounded-xl active:scale-95 transition-transform duration-150 shadow-lg shadow-primary/10"
          type="button"
        >
          <div className="flex flex-col items-start">
            <span className="text-[10px] uppercase font-bold opacity-80">
              3 Items Added
            </span>
            <span className="font-bold text-lg leading-tight">View Cart</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">$114.00</span>
            <PiCaretRightBold aria-hidden className="h-5 w-5" />
          </div>
        </button>
      </motion.footer>
    </div>
  );
}
