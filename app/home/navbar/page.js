'use client';

import { useState } from 'react';
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between bg-white p-4 text-xl text-blue-500 shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image src={Logo} alt="Signedify Logo" width={75} height={75} />
        <h1 className="font-bold transition transform duration-300 hover:scale-105">Signedify</h1>
      </Link>

      <nav className="hidden md:flex">
        <ul className="flex space-x-10 pr-[2.5rem]">
          {navLinks.map((link) => (
            <li key={link.href} className="hover:scale-110">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <nav className="pb-4" >
            <ul className="space-y-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 flex justify-center items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
  