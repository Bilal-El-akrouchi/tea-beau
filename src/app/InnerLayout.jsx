// InnerLayout.jsx
"use client";
import { useSelector } from "react-redux";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

export default function InnerLayout({ children }) {
  const darkMode = useSelector((state) => state.toggle.darkMode);

  return (
    <div className={`${darkMode ? 'bg-blue-900' : 'bg-rgba(96, 130, 96, 0.694)'} transition-colors duration-300 min-h-screen`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
