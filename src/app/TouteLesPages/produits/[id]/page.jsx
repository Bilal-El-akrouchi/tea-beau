"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/slices/productSlice";
import { addToCart } from "@/lib/slices/cartSlice";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { produits, loading } = useSelector((state) => state.product);

  // Toujours appeler ce useState pour garder le même ordre de hooks.
  const [selectedGrammage, setSelectedGrammage] = useState("");

  // Si les produits ne sont pas encore chargés, déclenche le fetch.
  useEffect(() => {
    if (produits.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, produits.length]);

  // Recherche du produit par son id.
  const product = produits.find((p) => p.id.toString() === id);

  // Dès que le produit est disponible, on initialise le grammage si ce n'est pas déjà fait.
  useEffect(() => {
    if (product && selectedGrammage === "" && product.prix) {
      setSelectedGrammage(Object.keys(product.prix)[0]);
    }
  }, [product, selectedGrammage]);

  if (loading) return <div>Chargement...</div>;

  if (!product) {
    return <div>Produit non trouvé</div>;
  }

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">{product.titre}</h1>
      <div>
        <Image
          src={product.image}
          alt={product.titre}
          width={300}
          height={300}
          className="object-cover"
        />
        <div className="flex justify-between text-white">
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Prix :</h2>
            <ul>
              {Object.entries(product.prix).map(([taille, prix]) => (
                <li key={taille}>
                  {taille} : {prix} €
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4">Note : {product.note}</p>
        </div>
      </div>

      {/* Sélection du grammage */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Choisissez un grammage :</h3>
        <div className="flex gap-2 mt-2">
          {product.prix &&
            Object.keys(product.prix).map((option) => (
              <button
                key={option}
                onClick={() => setSelectedGrammage(option)}
                className={`px-3 py-1 border rounded transition-colors ${
                  selectedGrammage === option
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {option} - {product.prix[option]} €
              </button>
            ))}
        </div>
      </div>

      {/* Bouton Ajouter au panier */}
      <button
        onClick={() =>
          dispatch(
            addToCart({
              ...product,
              selectedGrammage,
              price: product.prix[selectedGrammage],
            })
          )
        }
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export default ProductDetails;
