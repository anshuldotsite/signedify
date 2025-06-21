"use client";

import { useState } from "react";
import Image from "next/image";
import HeroImg from "@/assets/heroImg.png";

export default function Hero() {
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
            id="home"
            className="flex flex-col items-center justify-center gap-10 bg-white px-6 py-12 md:flex-row md:justify-evenly md:px-12"
        >
            <div className="max-w-lg text-center md:text-left">
                <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                    AI-Powered Translation
                </span>
                <h1 className="text-5xl font-bold leading-tight text-black">
                    Breaking Down Communication{' '}
                    <span className="text-blue-500">Barriers</span>
                </h1>
                <p className="mb-6 mt-6 text-xl leading-relaxed text-gray-600">
                    Signedify uses AI to translate American Sign Language into real-time text, making conversations more accessible and inclusive for everyone.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                    <button className="rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-500">
                        Learn More
                    </button>
                </div>
            </div>

            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="cursor-pointer"
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                <Image 
                    src={HeroImg} 
                    alt="Hero Image" 
                    width={300} 
                    height={300}
                    style={{
                        filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
                    }}
                />
            </div>
        </section>
    );
}