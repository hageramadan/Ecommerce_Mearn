import React, { useState, useEffect } from 'react'
import c1 from '../assets/category/cc2.jpg';
import c2 from '../assets/category/elc.jpg';
import c3 from '../assets/category/ip.jpeg';
import c4 from '../assets/category/clo.jpg';
import { getCategories } from '../api/category/categoryApi';

const categoryImages = [c1, c2, c3, c4];

function Category({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories();
        setCategories(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='mx-10 md:mx-40'>
        <h2 className='text-center my-[50px] text-2xl'>Trending Categories</h2>
        <div className='flex items-center justify-center flex-wrap lg:flex-nowrap gap-7 lg:gap-12 mx-10 lg:mx-35'>
          {categories.map((category, index) => (
            <div
              key={category._id}
              className='cursor-pointer flex flex-col items-center'
              onClick={() => onSelectCategory(category.Name)} 
            >
              <div className='w-25 p-3 rounded-full border mb-4'>
                <img
                  src={categoryImages[index % categoryImages.length]} 
                  alt="category"
                  className='cursor-pointer rounded-full w-14 h-14 object-center'
                />
              </div>
              <h5>{category.Name}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Category;
