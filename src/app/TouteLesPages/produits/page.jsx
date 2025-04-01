"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/slices/productSlice";

export default function Produits() {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.product); // ✅ "produits" en minuscule

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <h1>Chargement...</h1>;
  if (error) return <h1>Erreur : {error}</h1>;

  return (
    <div>
      <h1>Liste des produits</h1>
      <div>
        {produits.length > 0 ? (  // ✅ Vérifie que produits est bien un tableau
          produits.map((product) => (
            <div key={product.id}>
              <h2>{product.title}</h2>
              <h2>{product.price}</h2>
            </div>
          ))
        ) : (
          <p>Aucun produit disponible</p>
        )}
      </div>
    </div>
  );
}
