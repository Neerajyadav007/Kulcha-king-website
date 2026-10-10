// components/ui/menu-item-card.tsx

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

// --- PROPS INTERFACE ---
export interface MenuItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  isVegetarian?: boolean;
  name: string;
  price: number;
  originalPrice: number;
  quantity?: string;
  prepTimeInMinutes?: number;
  onAdd: () => void;
  badge?: string;
}

const MenuItemCard = React.forwardRef<HTMLDivElement, MenuItemCardProps>(
  (
    {
      className,
      imageUrl,
      isVegetarian = true,
      name,
      price,
      originalPrice,
      quantity = "Served with Choley & Makhan",
      prepTimeInMinutes = 15,
      onAdd,
      badge,
      ...props
    },
    ref
  ) => {
    const savings = originalPrice - price;

    // --- ANIMATION VARIANTS ---
    const cardVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      hover: { scale: 1.02, transition: { duration: 0.2 } },
    };
    
    const buttonVariants = {
      tap: { scale: 0.95 },
    };

    const vegIconVariants = {
       initial: { scale: 0 },
       animate: { scale: 1, transition: { delay: 0.2, type: "spring", stiffness: 200 } },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative flex flex-col w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#10121a] text-neutral-900 dark:text-white shadow-md group transition-all duration-300 hover:border-amber-500/60 dark:hover:border-amber-400/60 hover:shadow-xl",
          className
        )}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        layout
        {...props}
      >
        {/* --- IMAGE & ADD BUTTON CONTAINER --- */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-48 sm:h-52 transition-transform duration-500 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Optional Special Badge */}
          {badge && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-amber-400 font-bold text-[10px] tracking-wide uppercase border border-amber-400/30">
              {badge}
            </div>
          )}

          {/* --- VEGETARIAN ICON --- */}
          <motion.div 
            className="absolute top-3 right-3"
            variants={vegIconVariants}
            aria-label={isVegetarian ? "100% Vegetarian" : "Non-Vegetarian"}
          >
            <div className={cn(
              "w-5 h-5 border flex items-center justify-center rounded-md backdrop-blur-sm shadow-sm",
              isVegetarian ? "border-green-600 bg-white dark:bg-neutral-900" : "border-red-600 bg-white dark:bg-neutral-900"
            )}>
              <div className={cn(
                "w-2.5 h-2.5 rounded-full",
                isVegetarian ? "bg-green-600" : "bg-red-600"
              )} />
            </div>
          </motion.div>

          {/* --- ADD BUTTON (APPEARS ON HOVER / VISIBLE ON MOBILE) --- */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full px-4 flex justify-center">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              variants={buttonVariants}
              whileTap="tap"
              className="w-full sm:w-auto px-8 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 transform sm:translate-y-4 border rounded-full shadow-lg opacity-100 sm:opacity-0 bg-amber-500 hover:bg-amber-600 text-white border-amber-400/50 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 flex items-center justify-center gap-1.5 cursor-pointer"
              aria-label={`Add ${name} to cart`}
            >
              <span>+ Add to Basket</span>
            </motion.button>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="flex flex-col flex-grow p-4 text-left">
          {/* --- PRICING --- */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black font-serif text-amber-600 dark:text-amber-400">₹{price}</span>
            <span className="text-xs line-through text-neutral-400 dark:text-neutral-500 font-semibold">₹{originalPrice}</span>
            {savings > 0 && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                SAVE ₹{savings}
              </span>
            )}
          </div>
          
          {/* --- QUANTITY --- */}
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-medium">{quantity}</p>
          
          {/* --- ITEM NAME --- */}
          <h3 className="mt-1.5 text-base font-bold font-serif leading-tight text-neutral-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
            {name}
          </h3>
          
          {/* --- PREP TIME --- */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-100 dark:border-neutral-800/80 text-[11px] text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{prepTimeInMinutes} mins prep</span>
            </div>
            <span className="font-semibold text-amber-600 dark:text-amber-400">Clay Tandoor</span>
          </div>
        </div>
      </motion.div>
    );
  }
);

MenuItemCard.displayName = "MenuItemCard";

export { MenuItemCard };
export default MenuItemCard;
