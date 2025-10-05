import React, { useState } from 'react';
import './Wishlist.css';
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Elegant Evening Gown',
      price: 79.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXn7az7InFcTFsszap26Gvd3AxreuwaJMS4tkS3Oilc-e5uh-xzzKFq4UfFYy5viDOM-1owJQIDGhxQMkTUJDPEPRlWnlQDEZQRvsBulRiDLW3iouMK_SLsffmYRPikmzfc9AjBNVcEQfVK6a69zZBtonnZAzQLXuBAP2lZtb02TjbkYrnPlw42Qp97fbLkbD7MQ7P8bru8BNnWVqF0M_6IEdkCkonJTUufcci-UYSiytyJfCD8ZKMR9xVEDE6Q7p5oW4erl1VGZTi',
      onSale: true,
      outOfStock: false
    },
    {
      id: 2,
      name: 'Casual Denim Jacket',
      price: 49.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEeMgUZwEylXmTPHO6m7rWK_vS4ZI8EoYaQAODS4n2NoSSoW29gRaEevTcxdSDWJP6W4SbhT80h7izU8mEDx0g3oGjbtVbrVp-pkuWBcnHU-9kQp1sNY3PVWt015O3YTk8gRiW1qupwGX-jjBlFec7tMggWKQ8v1PtxZCylfzOFDDwZL2qDUMoRBrihNAWkcKlFlWfNPSJ5TrHS8TAu8nPs9VrY-0hr4rKc5HruKFBnBmbTDL2oSOFv5X-ieOLDqN4-M93NXQPNxUJ',
      onSale: false,
      outOfStock: false
    },
    {
      id: 3,
      name: 'Comfortable Running Shoes',
      price: 29.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKaZw3BxWBojE6ARfNcd-wfT9bSSVnmOYr93vP0hP2rCXaVCAWHCWdz9aGA8YNGRHV00wUM4ekwVkvYMO-OF1Ei0ZNOo3PfwsoztHEPca4HC9eYifrlXCIATPuwZZ7uttLwnY7iDG4L90Zlezd6f6XFh3z3eRQwJyY8ps00XvAlNU7ZVI65HfuQznG5353nw86a1uzoWpwn09sWe2v2tmlKDN_MmMMrMhPZFYMIyYYUFKW9gU_vujS-ZphCpgwgkSNCj5gRUJcy9nT',
      onSale: false,
      outOfStock: true
    },
    {
      id: 4,
      name: 'Stylish Sunglasses',
      price: 19.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3ujqX-bTZxQQ3D7ZvpGyJLRWuBsH3eugZJUQ7h4GhIhPrRsPXMU71Lf6iRn_C7qPYaHzovKlUjfgMazlXAIdMeFK46ngareF00bW2SzhXD67J52mzFx5z9ee-SBB_zDtIP7wZsiOLgDoMVI-f3h2wJ30dKasqtXS0ytu_mE0Ubx5trU9CuDVKB_o9unQ0ohyRAgrmRKp-wzyML7vhEEjp1zlRDsuHZ9tDBHZ0l7_qFPv2OM9S9uyux3DsZ0XOaCReoU_KWPKMmCr',
      onSale: false,
      outOfStock: false
    },
    {
      id: 5,
      name: 'Leather Handbag',
      price: 99.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8m-j1rOQidEyQhEh6ZTuKSpXVY-ubGMaTHR5BlJTEc-1_T2l9FD8gsOBUyYkVYYnd0aWQ_LGhKQFI7e_KTTZpcXRHrF7IWvQfeQEX8wgr0Z81dpxfCraTNgZ0QHz7pO9f5QBmbF6QntidC3GF6C9FedmKLeah18ojQ8L3WTwjp-NHlZAsza-zwClwJjTHiZR6HKdOkwhgwGomm3zjhkHIoFr7Cq--T8xHD-YAYDcSsbF_D99fALUehLj25imFn7fceNF7Zj5fBxP9',
      onSale: false,
      outOfStock: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] text-slate-800 font-['Inter',sans-serif]">
      {/* Header */}
      {/* <header className="bg-[#f5f7f8]/80 backdrop-blur-sm sticky top-0 z-20 border-b border-slate-200/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <a href="/details" className="flex items-center gap-2">
                <svg className="h-6 w-6 text-[#0b73da]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
                <span className="text-lg font-bold">FashionForward</span>
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-sm font-medium hover:text-[#0b73da] transition-colors" href="#">New Arrivals</a>
                <a className="text-sm font-medium hover:text-[#0b73da] transition-colors" href="#">Men</a>
                <a className="text-sm font-medium hover:text-[#0b73da] transition-colors" href="#">Women</a>
                <a className="text-sm font-medium hover:text-[#0b73da] transition-colors" href="#">Accessories</a>
                <a className="text-sm font-medium text-[#0b73da] hover:opacity-80 transition-opacity" href="#">Sale</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  className="bg-slate-100/50 border-transparent focus:ring-[#0b73da] focus:border-[#0b73da] rounded-full pl-10 pr-4 py-2 text-sm w-48 lg:w-64 transition"
                  placeholder="Search..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-2 rounded-full hover:bg-slate-200/60 transition-colors">
                <span>❤️</span>
              </button>
              <button className="p-2 rounded-full hover:bg-slate-200/60 transition-colors">
                <span>🛍️</span>
              </button>
              <button>
                <div className="h-9 w-9 rounded-full bg-cover bg-center" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBulnZaCzAJ35P6fXbN4Ebd57Fjg_rRFUB0C8LyAtEJmj1Jl8iXQqnhaVrnH6TGgucwq1PzP5W3vn95CVkn27VvGaleU_Xnu4EqrFqnwg7rCiSWCDdxM5WXJEnC3MJ8CKZiYP8xS37_5ARCRHJGROYqAE_I7CWxaOnrMVvABlUlDUxXdLq0ixoNlzQhZju4I4l3ZcYleXU3oOKMW96TnWgIGISjnz4z15iiqc9IsrtiDmMf0Jz3wjBLGmKZKklxDq3zL9_2RM5o4mNP)'}}></div>
              </button>
            </div>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-10 text-center">
            My Wishlist
          </h1>
          
          <div className="space-y-6">
            {wishlistItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`p-4 flex items-center justify-between gap-6 animate-fade-in ${item.outOfStock ? 'opacity-60' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-24 h-24 overflow-hidden rounded-lg group">
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      src={item.image}
                    />
                    {item.outOfStock && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                        <span className="text-4xl">🚫</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-xl text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-lg text-slate-500">
                      ${item.price.toFixed(2)}
                    </p>
                    {item.onSale && (
                      <span className="text-sm font-medium bg-[#0b73da]/10 text-[#0b73da] px-2 py-0.5 rounded-md inline-block w-fit">
                        On Sale
                      </span>
                    )}
                    {item.outOfStock && (
                      <span className="text-sm font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-md inline-block w-fit">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 rounded-full hover:bg-slate-200/60 transition-colors text-slate-500"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <span>🗑️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* <style jsx>{`
        
      `}</style> */}
    </div>
  );
};

export default Wishlist;