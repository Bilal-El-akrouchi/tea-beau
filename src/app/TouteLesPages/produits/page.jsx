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

  if (loading) return 
  <h1>
    <video src="../"></video>
  </h1>;
  if (error) return <h1>Erreur : {error}</h1>;

  return (
    <div>
      <h1>Liste des produits</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4  ">
        {produits.length > 0 ? (  // ✅ Vérifie que produits est bien un tableau
          produits.map((product) => (
            <div className=" bg-emerald-800 h-[100%] rounded-lg" key={product.id}>
              <h2> <img src={product.image} alt={product.title} className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover"/></h2>
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
