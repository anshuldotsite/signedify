import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function Navbar() {

    return (
        <div className="flex justify-between items-center p-4 bg-white text-blue-500 text-xl">
            <div className="flex flex-row items-center justify-center space-x-2">
            <Image src={Logo} width={75} height={75}></Image>
            <h1>Signedify</h1>
            </div>
      
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
            <div className="flex space-x-4">
                <button className="bg-white text-blue-500 px-4 py-2 rounded">Get The App!</button>
          </div>
      </div>
    );
  }
  