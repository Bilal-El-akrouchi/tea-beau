// components/CartModal.jsx
"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/lib/slices/cartSlice";

const CartModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"$>
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Mon Panier</h2>
          <button onClick={onClose} className="text-gray-600 text-3xl leading-none">&times;</button>
        </div>
        {items.length === 0 ? (
          <p>Le panier est vide.</p>
        ) : (
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.titre}</p>
                  <p className="text-sm text-gray-500">
                    {item.selectedGrammage} - {item.price} €
                  </p>
                  <p className="text-sm">Quantité: {item.quantity}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-sm"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
