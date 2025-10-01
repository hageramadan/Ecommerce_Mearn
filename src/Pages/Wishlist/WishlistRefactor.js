import React, { useState } from 'react';
import './Wishlist.css';
import WishlistContainer from '../../Components/wishlit/WishlistContainer.js';

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

  const handleRemoveItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8] text-slate-800 font-['Inter',sans-serif]">
      <WishlistContainer 
        wishlistItems={wishlistItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Wishlist;