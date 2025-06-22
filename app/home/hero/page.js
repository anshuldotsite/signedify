"use client";

import Link from 'next/link';
import Image from "next/image";
import HeroImg from "@/assets/heroImg.jpg"; // Adjust the path as necessary

export default function Hero() {
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
                    <Link href="/component/demo">
                        <button className="transform rounded-full bg-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl">
                            Try It Here!
                        </button>
                    </Link>
                    <button
                        className="rounded-full border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:border-blue-500 hover:text-blue-500"
                        onClick={() => window.open('https://github.com/anshuldotsite/signedify', '_blank', 'noopener,noreferrer')}
                    >
                        Learn More
                    </button>
                </div>
            </div>
            <div>
                <Image src={HeroImg} alt="Hero Image" className="w-full max-w-md rounded-lg shadow-lg" />
            </div>
        </section>
    );
}