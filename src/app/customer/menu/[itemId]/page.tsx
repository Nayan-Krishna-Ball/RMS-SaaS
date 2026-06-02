"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  PiArrowRightBold,
  PiArrowLeftBold,
  PiBellRingingBold,
  PiHeartBold,
  PiMinusBold,
  PiPlusBold,
  PiShoppingBagBold,
  PiStarFourFill,
  PiTrendUpBold,
} from "react-icons/pi";
import { conciergeLogo, menuItemDetails } from "@/app/data";

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

export default function MenuItemDetailsPage() {
  const params = useParams<{ itemId: string }>();
  const menuItemDetail = menuItemDetails.find(
    (item) => item.slug === params.itemId
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (change: number) => {
    setQuantity((current) => Math.max(1, current + change));
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = videoContainerRef.current;

    if (!video || !container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!menuItemDetail) {
    return (
      <div className="min-h-[max(884px,100dvh)] px-margin-mobile py-24 text-on-surface font-body-md">
        <div className="glass-panel rounded-2xl border border-white/5 p-6 text-center">
          <h1 className="font-headline-sm text-headline-sm text-primary">
            Item not found
          </h1>
          <Link
            className="mt-4 inline-flex text-sm font-bold text-on-surface-variant"
            href="/customer/menu"
          >
            Back to menu
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = menuItemDetail.price * quantity;

  return (
    <div className="min-h-[max(884px,100dvh)] text-on-surface font-body-md selection:bg-primary/30">
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm flex justify-between items-center px-margin-mobile py-4"
        initial={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3">
          <Link
            className="h-10 w-10 flex items-center justify-center text-primary active:scale-95 transition-transform duration-200"
            href="/customer/menu"
          >
            <span className="sr-only">Back to menu</span>
            <PiArrowLeftBold aria-hidden className="h-5 w-5" />
          </Link>
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
      <main className="pb-32 pt-[73px]">
        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-[60vh] overflow-hidden"
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Image
            alt={menuItemDetail.heroAlt}
            className="w-full h-full object-cover"
            fill
            priority
            sizes="100vw"
            src={menuItemDetail.heroImage}
            unoptimized
          />
          <div className="absolute inset-0 hero-gradient" />

          <div className="absolute top-5 left-margin-mobile flex flex-col gap-3">
            <span className="bg-primary-container px-3 py-1 rounded-full text-on-primary-container font-label-md text-label-md flex items-center gap-1 w-fit shadow-lg">
              <PiStarFourFill aria-hidden className="h-4 w-4" />
              {menuItemDetail.badge}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-44 bg-linear-to-t from-background via-background/85 to-transparent" />
          <div className="absolute bottom-10 left-margin-mobile right-margin-mobile flex justify-between items-end">
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-white leading-tight md:font-display-lg md:text-display-lg">
                {menuItemDetail.title}
              </h2>
              <p className="font-label-md text-label-md text-primary mt-2 uppercase tracking-[0.2em]">
                {menuItemDetail.subtitle}
              </p>
            </div>
            <div className="glass-panel border border-white/10 rounded-xl px-4 py-2 text-right">
              <span className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider">
                Starting at
              </span>
              <span className="font-headline-sm text-headline-sm text-primary text-glow">
                {formatPrice(menuItemDetail.price)}
              </span>
            </div>
          </div>
        </motion.section>

        <div className="max-w-container-max mx-auto px-margin-mobile mt-8 space-y-section-gap">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            initial={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          >
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-4">
                <h3 className="font-headline-sm text-headline-sm text-on-surface border-l-4 border-primary pl-4">
                  The Experience
                </h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  {menuItemDetail.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {menuItemDetail.tastingNotes.map((note) => (
                  <div
                    className="bg-surface-container-high border border-outline-variant/30 px-4 py-2 rounded-lg flex flex-col"
                    key={note.label}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {note.label}
                    </span>
                    <span className="font-label-md text-label-md text-primary">
                      {note.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <PiHeartBold aria-hidden className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-white">
                    {menuItemDetail.stats[0].value}
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {menuItemDetail.stats[0].label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <PiTrendUpBold aria-hidden className="h-8 w-8" />
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-white">
                    {menuItemDetail.stats[1].value}
                  </p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {menuItemDetail.stats[1].label}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35, delay: 0.12, ease: "easeOut" }}
          >
            <div className="flex justify-between items-end">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                {menuItemDetail.video.sectionTitle}
              </h3>
              <Link
                className="text-primary font-label-md text-label-md flex items-center gap-1 hover:gap-2 transition-all"
                href="/customer/menu"
              >
                View Menu <PiArrowRightBold aria-hidden className="h-4 w-4" />
              </Link>
            </div>

            <div
              className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl bg-surface-container-lowest"
              ref={videoContainerRef}
            >
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                src={menuItemDetail.video.src}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.section>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="bg-surface-container/90 backdrop-blur-xl border-t border-outline-variant/20 p-4 pb-8 flex items-center gap-3 max-w-container-max mx-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="flex shrink-0 items-center bg-surface-container-highest rounded-full px-3 py-2 border border-outline-variant/30">
            <button
              className="text-on-surface hover:text-primary transition-colors p-1"
              onClick={() => updateQuantity(-1)}
              type="button"
            >
              <PiMinusBold aria-hidden className="h-4 w-4" />
            </button>
            <span className="mx-3 font-label-md text-label-md min-w-[2ch] text-center">
              {quantity}
            </span>
            <button
              className="text-on-surface hover:text-primary transition-colors p-1"
              onClick={() => updateQuantity(1)}
              type="button"
            >
              <PiPlusBold aria-hidden className="h-4 w-4" />
            </button>
          </div>

          <button
            className="min-w-0 flex-1 bg-primary text-on-primary h-14 rounded-full font-label-md text-[11px] min-[380px]:text-label-md uppercase tracking-[0.12em] min-[380px]:tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-transform hover:brightness-110 flex items-center justify-center gap-1.5 px-4"
            type="button"
          >
            <span className="min-w-0 truncate text-[10px]">Add to Order</span>
            <span aria-hidden className="shrink-0">
              —
            </span>
            <span className="shrink-0">{formatPrice(totalPrice)}</span>
            <PiShoppingBagBold aria-hidden className="h-[18px] w-[18px] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
}
