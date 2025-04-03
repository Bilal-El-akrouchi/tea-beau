"use client"; // ✅ Ajouté pour que useState fonctionne
import { useEffect, useState } from "react";
import Image from "next/image";
import imageHeader from "../../public/img/image4.jpg";
import precedent from "../../public/img/precedent.png";
import suivant from "../../public/img/suivant.png";
import { fetchProducts } from "@/lib/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Accueil = () => {
  const dispatch = useDispatch();
  const { produits, loading, error } = useSelector((state) => state.product);

  // Charger les produits une seule fois
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Stocker les produits aléatoires
  const [prodRandom, setProdRandom] = useState([]);

  useEffect(() => {
    if (produits.length > 0) {
      setProdRandom([...produits].sort(() => Math.random() - 0.5).slice(0, 5));
    }
  }, [produits]);

  // Carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % prodRandom.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prodRandom.length - 1 : prevIndex - 1
    );
  };
  // filtrer les notes 
  const bestRatedProducts = produits.filter((product) => {
    if (!product.note) return false;
    const rating = parseFloat(product.note.split("/")[0]);
    return rating >= 4;
  });

  return (
    <>
      <header className="relative h-screen">
        <div className="absolute w-[50%] h-full flex flex-col justify-center pt-[4rem] ps-[2rem] text-white z-1">
          <h1>
            Un Thé
            <br /> De Qualité
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            quibusdam.
          </p>
          <p>Lorem ipsum adipisicing elit. Aut, quibusdam.</p>
        </div>
        <Image
          src={imageHeader}
          alt="tkt"
          className="w-full h-full z-0 sticky"
        />
      </header>


      {/* S E C T I O N     C A R O U S S E L */}
      <section>
        <div className="text-white h-screen flex items-center justify-center">
          <h1 className="text-center static ">Notre Tea Collection</h1>
        </div>

        {/* Carrousel */}
        <div className="p-5 bgFloral z-0 bg-fixed top-0 flex items-center justify-center">
          <div className="carrousel-container w-[75vw] max-h-[80vh] overflow-hidden flex items-center justify-center relative">
            <button onClick={prevItem} className="prev-button">
              <Image
              
                src={precedent}
                alt="Précédent"
                className="w-[8em] h-[8em] relative left-5 top-5 cursor-pointer"
              />
            </button>

            {/* Afficher l'élément actuel uniquement */}
            <div className="carrousel-item  flex overflow-hidden items-center justify-center">
              {prodRandom.length > 0 && (
                <img
                  src={prodRandom[currentIndex].image}
                  alt={prodRandom[currentIndex].title}
                  style={{
                    width: "500px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            <button onClick={nextItem} className="next-button">
              <Image
                src={suivant}
                alt="suivant"
                className="w-[8em] h-[8em] relative right-5 top-5 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </section>
              {/* M I S E   E N   A V A N T   D E S   P R O D U  I T S */}
              <section className="mieuxNoté flex w-full flex-col items-center p-5">
        <h1 className="text-center pb-4">Les Mieux Notés</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bestRatedProducts.map((product) => (
            <div key={product.titre} className="p-4 text-white hover:bg-lime-100 hover:text-emerald-950 shadow-2xl rounded-lg">
              <img
                src={product.image}
                alt={product.titre}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
              <h2 className="mt-2">{product.titre}</h2>
              <p className="mt-1">{product.note}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Accueil;
