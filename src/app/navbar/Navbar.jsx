"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import CartModal from "../components/CartModal";
import logoColor from "../../../public/img/LOGO2.png";
import logoWhite from "../../../public/img/logoWhite.png";
import { toggle } from "@/lib/slices/darkMode";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const dispatch = useDispatch() 
  const dark = useSelector((state) => state.toggle.darkMode)
  console.log(dark)
  const handleScroll = () => {
    setScrolled(window.scrollY > 140);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Récupérer le contenu du panier
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="w-screen h-[7rem] z-10 flex justify-around items-center fixed text-white bg-gradient-to-b from-black/40 to-white/0 px-4">
        {/* Liens de navigation */}
       
         
            <div>
              <Link href="/TouteLesPages/produits">Produits</Link>
            </div>
            <div>
              <Link href="/TouteLesPages/aPropos">À propos</Link>
            </div>
          
     

        {/* Logo */}
        <Link href="/">
          <div className="relative w-30 h-30">
            <Image
              src={logoColor}
              alt="Logo Coloré"
              fill
              style={{ objectFit: "contain" }}
              className={`transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src={logoWhite}
              alt="Logo Blanc"
              fill
              style={{ objectFit: "contain" }}
              className={`transition-opacity duration-500 absolute top-0 left-0 ${scrolled ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </Link>

        {/* Liens supplémentaires et bouton panier */}
        
            <div>
               <button onClick={() => dispatch(toggle())}>DARK MODE</button>
            </div>
            {/* Bouton pour ouvrir le modal du panier */}
            <div>
              <button onClick={() => setShowCartModal(true)} className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7.5M17 13l1.5 7.5M9 21a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          
       
      </nav>
      {/* Affichage du modal du panier si activé */}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
    </>
  );
}
