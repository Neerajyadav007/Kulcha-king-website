// demo.tsx

import React from "react";
import { MenuItemCard } from "@/components/ui/menu-item-card";

const menuItems = [
  {
    imageUrl: "https://kulchakingparanthasingh.com/wp-content/uploads/2024/09/amritsari-kulcha.jpg",
    isVegetarian: true,
    name: "Amritsari Aloo Pyaaz Kulcha",
    price: 140,
    originalPrice: 180,
    quantity: "2 Pcs + Choley + Butter",
    prepTimeInMinutes: 12,
  },
  {
    imageUrl: "https://kulchakingparanthasingh.com/wp-content/uploads/2024/09/paneer-kulcha.jpg",
    isVegetarian: true,
    name: "Royal Paneer Garlic Kulcha",
    price: 180,
    originalPrice: 220,
    quantity: "2 Pcs + Choley + Butter",
    prepTimeInMinutes: 15,
  },
  {
    imageUrl: "https://kulchakingparanthasingh.com/wp-content/uploads/2024/09/chur-chur-naan.jpg",
    isVegetarian: true,
    name: "Crispy Chur Chur Naan Thali",
    price: 210,
    originalPrice: 260,
    quantity: "Naan + Dal Makhni + Choley",
    prepTimeInMinutes: 15,
  },
  {
    imageUrl: "https://kulchakingparanthasingh.com/wp-content/uploads/2024/09/lassi.jpg",
    isVegetarian: true,
    name: "Special Pede Wali Malai Lassi",
    price: 80,
    originalPrice: 100,
    quantity: "400 ml Clay Kulhad",
    prepTimeInMinutes: 5,
  },
];

export default function MenuItemCardDemo() {
  const handleAddItem = (itemName) => {
    console.log(`Added ${itemName} to cart!`);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-background">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {menuItems.map((item, index) => (
          <MenuItemCard
            key={index}
            imageUrl={item.imageUrl}
            isVegetarian={item.isVegetarian}
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            quantity={item.quantity}
            prepTimeInMinutes={item.prepTimeInMinutes}
            onAdd={() => handleAddItem(item.name)}
          />
        ))}
      </div>
    </div>
  );
}
