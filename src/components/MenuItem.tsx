import type { MenuItem as MenuItemType } from "@/types/menu";
import { useState } from "react";

const MenuItem = (item: MenuItemType) => {
  const { id, name, description, price, imageUrl, available } = item;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-sm overflow-hidden active:shadow-md transition"
    >
      {/* Mobile: Horizontal Layout */}
      <div className="flex sm:flex-col">
        {/* Image - Square on mobile, responsive on desktop */}
        <div className="relative w-24 h-24 sm:w-full sm:aspect-square flex-shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {!available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full font-semibold text-xs">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="flex-1 p-3 sm:p-3 flex flex-col justify-between w-full min-w-0"
          onClick={() => setIsExpanded(true)}
        >
          <div className="w-full">
            {/* Name & Price */}
            <div className="flex justify-between items-start gap-2 mb-1">
              <h3
                className={`text-sm sm:text-base font-semibold text-gray-800 ${
                  isExpanded ? "" : "truncate"
                }`}
              >
                {name}
              </h3>
              <span className="text-sm sm:text-base font-bold text-orange-500 whitespace-nowrap">
                ${price}
              </span>
            </div>

            {/* Description */}
            <p
              className={`text-gray-600 text-xs sm:text-sm mb-2 w-full ${
                isExpanded ? "" : "truncate"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Button - Smaller and more compact */}
          <button
            disabled={!available}
            className={`self-start px-3 py-1 sm:px-4 sm:py-1.5 rounded-md font-medium text-xs sm:text-sm transition cursor-pointer ${
              available
                ? "bg-orange-500 text-white active:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {available ? "Add" : "N/A"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
