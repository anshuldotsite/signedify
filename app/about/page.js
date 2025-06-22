"use client";

import HeroStatsCard from "../home/heroCard/page";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col-reverse items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-20 bg-blue-500 py-8 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8 lg:py-24 lg:px-12 xl:px-16 md:flex-row"
    >
      {/* Text Content */}
      <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl space-y-4 sm:space-y-6 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
          Our Mission
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/95 max-w-none md:max-w-2xl">
          Signedify is dedicated to bridging the communication divide between individuals who rely on sign language and those who may find it challenging to understand. Our mission is to alleviate the struggles faced by those who are unable to express themselves, building a more inclusive environment where everyone can share their thoughts and emotions freely. With Signedify, we aim to foster connections that transcend any disabilities impeding their paths.
        </p>
      </div>

      {/* Stats Card */}
      <div className="w-full md:w-auto md:flex-shrink-0">
        <HeroStatsCard />
      </div>
    </section>
  );
}
