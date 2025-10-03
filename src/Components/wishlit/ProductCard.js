import React from 'react';

const ProductCard = ({
    item,
    animationDelay,
    onRemove
}) => {
    const {
        _id,
        name,
        price,
        image,
        onSale,
        outOfStock
    } = item;

    return (
        <div
            className={`p-4 flex items-center justify-between gap-6 animate-fade-in ${outOfStock ? 'opacity-60' : ''}`}
            style={{ animationDelay: `${animationDelay}s` }}
        >
            <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 overflow-hidden rounded-lg group">
                    <img
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                        src={image}
                    />
                    {outOfStock && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                            <span className="text-4xl">🚫</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-xl text-slate-900">
                        {name}
                    </h3>
                    <p className="text-lg text-slate-500">
                        ${price.toFixed(2)}
                    </p>
                    {onSale && (
                        <span className="text-sm font-medium bg-[#0b73da]/10 text-[#0b73da] px-2 py-0.5 rounded-md inline-block w-fit">
                            On Sale
                        </span>
                    )}
                    {outOfStock && (
                        <span className="text-sm font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-md inline-block w-fit">
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="p-2 rounded-full hover:bg-slate-200/60 transition-colors text-slate-500"
                    onClick={() => onRemove(_id)}
                >
                    <span>🗑️</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;