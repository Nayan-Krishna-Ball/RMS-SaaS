
"use client";

import { conciergeLogo } from "@/app/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaCheckCircle, FaRegStar, FaStar } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import {
  MdEventSeat,
  MdExplore,
  MdOutlineWorkspacePremium,
  MdPictureAsPdf,
} from "react-icons/md";
import { PiArrowLeftBold, PiBellRingingBold } from "react-icons/pi";
import Confetti from "./_components/Confetti";

export default function OrderConfirm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <>
      <Confetti />
      {/* Header */}

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
      <main className="pt-32 pb-section-gap px-margin-mobile max-w-2xl mx-auto">
        {/* <!-- Success Hero --> */}

        <section className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-container/10 border border-primary-container/20 mb-6 relative">
            <span
              className="material-symbols-outlined text-primary-container text-6xl"
              //   style='font-variation-settings: "FILL" 1'
            >
              <FaCheckCircle />
            </span>
            <div className="absolute inset-0 animate-ping rounded-full bg-primary-container/5 scale-150 duration-1000"></div>
          </div>
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-2">
            Order Confirmed!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Your culinary journey at Table 12 begins shortly.
          </p>
        </section>
        {/* <!-- Section 1: Order Summary & Receipt --> */}
        <section className="glass-card rounded-xl p-8 mb-gutter shadow-2xl">
          <div className="flex justify-between items-start mb-6 border-b border-outline-variant pb-6">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface mb-1">
                Order #T12-8829
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Oct 24, 2023 • 7:45 PM
              </p>
            </div>
            <a
              className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined text-xl">
                <MdPictureAsPdf />
              </span>
              <span className="font-label-md text-label-md underline underline-offset-4 decoration-primary/30 group-hover:decoration-primary">
                Download PDF Receipt
              </span>
            </a>
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">
                2x Wagyu Tartare
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                $56.00
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">
                1x Truffle Risotto
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                $42.00
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-body-md text-body-md text-on-surface-variant">
                1x Château Margaux '15
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                $210.00
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Total
            </span>
            <span className="font-headline-sm text-headline-sm text-primary-container">
              $308.00
            </span>
          </div>
        </section>
        {/* <!-- Section 2: Rate Experience --> */}

        <section className="glass-card rounded-xl p-8 mb-gutter">
          <h3 className="font-headline-sm text-headline-sm text-on-surface text-center mb-6">
            Rate Your Experience
          </h3>

          <div className="flex justify-center gap-3">
            {stars.map((star) => {
              const isFilled = hover ? star <= hover : star <= rating;

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="p-1 transition-transform hover:scale-125"
                >
                  {isFilled ? (
                    <FaStar className="text-4xl text-primary" />
                  ) : (
                    <FaRegStar className="text-4xl text-on-surface-variant" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback message */}
          {rating > 0 && (
            <p className="text-center font-label-sm text-primary mt-4 animate-fade-in">
              Thank you for your feedback!
            </p>
          )}
        </section>

        {/* <!-- Section 3: Earned Rewards --> */}
        <section className="glass-card rounded-xl p-8 mb-section-gap overflow-hidden relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/20 p-3 rounded-lg border border-primary/30">
              <span
                className="material-symbols-outlined text-primary"
                // style='font-variation-settings: "FILL" 1'
              >
                <MdOutlineWorkspacePremium />
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Earned Rewards
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                You've earned 308 points from this visit!
              </p>
            </div>
          </div>
          <div className="relative pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="font-label-md text-label-md text-on-surface">
                Next Reward:
                <span className="text-primary">Free Appetizer</span>
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant">
                120 / 500
              </span>
            </div>
            <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden border border-outline-variant">
              <div className="h-full bg-primary-container rounded-full w-[24%] shadow-[0_0_12px_rgba(245,158,11,0.5)]"></div>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-4 text-center italic">
              "Only 380 points away from a complimentary signature dish."
            </p>
          </div>
          {/* <!-- Background Texture --> */}
          <div className="absolute -right-8 -bottom-8 opacity-5">
            <span className="material-symbols-outlined text-9xl">
              <IoMdRestaurant />
            </span>
          </div>
        </section>

        {/* <!-- Section 4: Actions --> */}
        <section className="flex flex-col gap-4">
          <Link
            href="/customer/menu"
            className="w-full bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md py-5 rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">
              <MdEventSeat />
            </span>
            BOOK NEXT VISIT
          </Link>
          <a
            className="w-full glass-card hover:bg-surface-container-high text-on-surface font-label-md text-label-md py-5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 border border-outline-variant"
            href="#"
          >
            <span className="material-symbols-outlined">
              <MdExplore />
            </span>
            BACK TO DISCOVERY
          </a>
        </section>
      </main>
    </>
  );
}
