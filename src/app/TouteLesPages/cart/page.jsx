"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/lib/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
      {items.length === 0 ? (
        <p>Le panier est vide.</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id} className="mb-2 flex justify-between items-center">
              <div>
                {item.titre} x {item.quantity} - {item.selectedGrammage} ( {item.price} € )
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
