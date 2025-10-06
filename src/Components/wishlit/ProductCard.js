import React from 'react';
import {TrashIcon} from '@heroicons/react/24/outline';
const ProductCard = ({
    item,
    animationDelay,
    onRemove
}) => {
    const {
        _id,
        name,
        price,
        images,
        onSale,
        outOfStock
    } = item;

    return (
        <div
            className={`rounded-xl shadow-md hover:shadow-xl transition-shadow p-4 flex items-center justify-between gap-6 animate-fade-in ${outOfStock ? 'opacity-60' : ''}`}
            style={{ animationDelay: `${animationDelay}s` }}
        >
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-lg group">
                    <img
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={`https://raw.githubusercontent.com/MMarzoo/my-image/main/images/${images[0]}`}
                    />
                    {outOfStock && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                            <span className="text-4xl">🚫</span>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1 sm:gap-2">
                    <h3 className="font-semibold text-lg sm:text-xl  truncate">
                        {name}
                    </h3>
                    <p className=" font-medium sm:text-lg">
                        ${price.toFixed(2)}
                    </p>
                    {onSale && !outOfStock && (
                        <span className="text-xs sm:text-sm font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit">
                            On Sale
                        </span>
                    )}
                    {outOfStock && (
                        <span className="text-xs sm:text-sm font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full w-fit">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>

            {/* Remove Button */}
            <div className="flex items-center">
                <button
                    className="p-2 rounded-full hover:bg-red-100  transition-colors text-red-600 shadow-sm hover:shadow-md"
                    onClick={() => onRemove(_id)}
                >
                    <TrashIcon className="w-6 h-6 " />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
