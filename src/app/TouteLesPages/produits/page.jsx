"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Accueil = () => {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.product);

  // Charger les produits une seule fois
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Filtrer et trier les produits par titre
  const filteredProducts = produits
    .filter((product) =>
      product.titre.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.titre.localeCompare(b.titre);
      else return b.titre.localeCompare(a.titre);
    });

  return (
    <div className="flex flex-col items-center px-4">
      <div className="h-[30vh]"></div>
      {/* Champ de recherche et sélection du tri */}
      <div className="flex justify-center gap-10 w-full">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="border border-gray-300 rounded-md p-2 mb-4 w-[15%] min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2 mb-4 w-[15%] min-w-[200px]"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
      {/* Affichage des produits filtrés et triés */}
      <div className="grid grid-cols-2 md:grid-cols-3 max-w-[60vw] gap-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/TouteLesPages/produits/${product.id}`}>
            <div className="p-4 border rounded-lg cursor-pointer">
              <img
                src={product.image}
                alt={product.titre}
                className="w-full h-32 object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{product.titre}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Accueil;