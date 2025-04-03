"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Accueil = () => {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.product);

  // Charger les produits une seule fois
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Stocker la valeur de l'input pour filtrer les produits
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les produits en fonction de la recherche (utilise "titre" et non "title")
  const filteredProducts = produits.filter((product) =>
    product.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center px-4">
      <div className="h-[30vh]"></div>
      {/* Champ de recherche */}
      <div className="flex justify-center gap-10 w-[100%]">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="border border-gray-300 rounded-md p-2 mb-4 w-[15%] min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Rechercher un produit..."
          className="border border-gray-300 rounded-md p-2 mb-4 w-[15%] min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Affichage des produits filtrés */}
      <div className="grid grid-cols-2 md:grid-cols-3 max-w-[60vw] gap-4">
        {filteredProducts.map((product) => (
          <div key={product.titre} className="p-4 border rounded-lg">
            <img
              src={product.image}
              alt={product.titre}
              className="w-full h-32 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">{product.titre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accueil;
