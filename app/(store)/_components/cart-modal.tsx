"use client";

import type React from "react";

import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import sneaker from "@/public/sneakers-thumbs/sneaker-1.png";

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { cartItems, increaseQuantity, decreaseQuantity, cartTotal } =
    useCart();
  const [address, setAddress] = useState("");
  const [showAddressWarning, setShowAddressWarning] = useState(false);

  const tax = cartTotal * 0.04;
  const total = cartTotal + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (address === "") {
      setShowAddressWarning(true);
      return;
    }

    const cartItemsText = cartItems
      .map((item) => {
        return `${item.name} Quantidade: (${
          item.quantity
        }) Preço: R$ ${item.price.toFixed(2)} |`;
      })
      .join(" ");

    const message = encodeURIComponent(cartItemsText);
    const phone = "11912345678";

    const whatsappUrl = `https://wa.me/${phone}?text=${message} Endereço: ${address}`;

    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-zinc-900 shadow-xl w-full h-full sm:max-w-md sm:h-fit sm:max-h-[90vh] overflow-y-auto">
        <div className="bg-zinc-900 sticky top-0 p-4 flex justify-between items-center border-b border-y-zinc-800">
          <h2 className="text-xl font-semibold">Visualização do carrinho</h2>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-800 cursor-pointer"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {cartItems.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Seu carrinho está vazio
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex py-4 border-b border-zinc-800"
                >
                  <div className="w-16 h-16 mr-4 flex-shrink-0">
                    <Image
                      src={item.imageUrl || sneaker}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium capitalize">{item.name}</h3>
                    <p className="text-sm text-stone-400">Black</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 border border-zinc-800 rounded-md hover:bg-zinc-800 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 border border-zinc-800 rounded-md hover:bg-zinc-800 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-medium">
                        {formatCurrencyBrl(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrencyBrl(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa</span>
                  <span>+ {formatCurrencyBrl(tax)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-y-zinc-800">
                  <span>Total</span>
                  <span>{formatCurrencyBrl(total)}</span>
                </div>
              </div>

              <div className="mt-6">
                <label className="block font-medium mb-2">
                  Endereço de entrega:
                </label>
                <input
                  type="text"
                  placeholder="Digite seu endereço..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value !== "") {
                      setShowAddressWarning(false);
                    }
                  }}
                  className={`w-full p-2 border focus:outline-none ${
                    showAddressWarning ? "border-red-500" : ""
                  }`}
                />
                {showAddressWarning && (
                  <p className="text-red-500 text-sm mt-1">
                    Por favor digite sue endereço!
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className="bg-zinc-900 sticky bottom-0 p-4 border-t border-zinc-800 flex justify-between">
          <button onClick={onClose} className="px-4 py-2 border cursor-pointer">
            Cancelar
          </button>

          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-orange-300 cursor-pointer"
            disabled={cartItems.length === 0}
          >
            Prosseguir
          </button>
        </div>
      </div>
    </div>
  );
}
