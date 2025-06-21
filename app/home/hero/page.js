"use client";

import { useState } from "react";
import Image from "next/image";
import HeroImg from "@/assets/heroImg.png";

export default function Hero() {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -15;
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div className="flex items-center justify-evenly h-screen bg-white px-12">
            {/* Left: Text */}
            <div className="flex flex-col justify-center w-1/2 text-gray-800 max-w-lg">
                <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
                        AI-Powered Translation
                    </span>
                </div>
                <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
                    Breaking Down Communication 
                    <span className="text-blue-500"> Barriers</span>
                </h1>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    Signedify uses AI to translate American Sign Language into real-time text, making conversations more accessible and inclusive for everyone.
                </p>
                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Try Demo
                    </button>
                    <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-blue-500 hover:text-blue-500 transition-all duration-300 font-semibold text-lg">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Right: Image with smooth tilt */}
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="transition-transform duration-300 ease-out cursor-pointer"
                style={{
                    transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                }}
            >
                <Image 
                    src={HeroImg} 
                    alt="Hero Image" 
                    width={300} 
                    height={300}
                    style={{
                        filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
                        transition: "filter 0.3s ease-out"
                    }}
                />
            </div>
        </div>
    );
}