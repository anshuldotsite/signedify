import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white p-4 text-xl text-blue-500">
      <Link href="/" className="flex items-center space-x-2">
        <Image src={Logo} alt="Signedify Logo" width={75} height={75} />
        <h1>Signedify</h1>
      </Link>

      <nav className="md:flex">
        <ul className="flex space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:block">
        <button className="rounded bg-white px-4 py-2 text-blue-500">
          Get The App!
        </button>
      </div>
    </header>
  );
}
  