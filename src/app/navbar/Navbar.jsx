"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../lib/slices/counterSlice";
import "./Navbar.css";
import Image from "next/image";
import logoColor from "../../../public/img/LOGO2.png";
import logoWhite from "../../../public/img/logoWhite.png";
import Link from "next/link";

// Controle du logo selon le scroll
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 140) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Gestion Hamburger
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-screen h-[7rem] z-10 flex gap-3.5 justify-center items-center fixed text-white bg-gradient-to-b from-black/40 to-white/0">
      <div className="w-100">
        <ul className="flex justify-around">
          <li>
            <Link href="/TouteLesPages/produits">Produits</Link>
          </li>
          <li>
            <Link href="/ToutesLesPages/aPropo">a propos</Link>
          </li>
        </ul>
      </div>

      {/* L O G O  */}

      <Link href="/">
  <div className="relative w-30 h-30">
    {/* Logo coloré */}
    <Image
      src={logoColor}
      alt="Logo Coloré"
      fill
      style={{ objectFit: "contain" }}
      className={`transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
    />
    {/* Logo blanc */}
    <Image
      src={logoWhite}
      alt="Logo Blanc"
      fill
      style={{ objectFit: "contain" }}
      className={`transition-opacity duration-500 absolute top-0 left-0 ${scrolled ? "opacity-100" : "opacity-0"}`}
    />
  </div>
</Link>


      <div className="w-100">
        <ul className="flex justify-around">
          <li>
            <Link href="/ToutesLesPages/aPropos">a propos</Link>
          </li>
          <li>
            <Link href="/ToutesLesPages/shrek">shrek</Link>
          </li>
        </ul>
      </div>

      {/* Hamburger Menu */}
      <div onClick={toggleMenu} className="cursor-pointer">
        <svg
          width="30"
          height="30"
          viewBox="0 0 100 100"
          className={`transition-transform duration-300 ${
            menuOpen ? "rotate-20" : ""
          }`}
        >
          <g fill="none" stroke="white" strokeWidth="10">
            {/* Première barre */}
            <line
              x1="20"
              y1="20"
              x2="80"
              y2="20"
              className={`transition-all duration-300 ${
                menuOpen ? "rotate-45 " : ""
              }`}
            />
            {/* Deuxième barre (celle du milieu) */}
            <line
              x1="20"
              y1="50"
              x2="80"
              y2="50"
              className={`transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            {/* Troisième barre */}
            <line
              x1="20"
              y1="80"
              x2="80"
              y2="80"
              className={`transition-all duration-300 ${
                menuOpen ? "rotate-[-55deg] " : ""
              }`}
            />
          </g>
        </svg>
      </div>
    </nav>
  );
}
