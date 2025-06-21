"use client";

import { useState } from "react";
import Image from "next/image";
import HeroImg from "@/assets/heroImg.png";

export default function About() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = e;
    const { left, top, width, height } = rect;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const rotateX = ((clientY - centerY) / (height / 2)) * -15;
    const rotateY = ((clientX - centerX) / (width / 2)) * 15;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section
      id="about"
      className="flex flex-col-reverse items-center justify-center gap-10 bg-blue-500 px-6 py-12 md:flex-row md:gap-20 md:px-12"
    >
      {/* Text Content */}
      <div className="max-w-2xl space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          About Signedify
        </h1>
        <p className="text-base leading-relaxed text-white md:text-lg">
          Signedify seeks to bridge the gap between those who can only
          communicate through sign language and others who may struggle to
          understand it. Featuring real-time translation from video to any
          desired language, powered using AI and ML technology.
        </p>
      </div>

      {/* Image with 3D Hover Effect */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={HeroImg}
          alt="Hero Image"
          width={280}
          height={280}
          className="mx-auto"
          style={{
            filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
          }}
        />
      </div>
    </section>
  );
}
