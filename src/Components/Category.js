import React from 'react'
import c1 from '../assets/category/c1.png';
import c2 from '../assets/category/c2.png';
import c3 from '../assets/category/c3.png';
import c4 from '../assets/category/c4.png';
import c5 from '../assets/category/c5.png';

function Category() {
  return (
   <>
    <div className='mx-10 md:mx-40'>
        <h2 className='text-center my-[50px] text-2xl '>Trending Categories</h2>
        <div className='flex items-center justify-center flex-wrap lg:flex-nowrap gap-7 lg:gap-12 mx-10 lg:mx-35'>
            <div className='cursor-pointer flex flex-col items-center'>
                <div className='w-25 p-5 rounded-full border mb-4'>
                    <img src={c1} alt="category" className='w-12 cursor-pointer'/>
                </div>
                <h5>Television</h5>
            </div>
            <div className='cursor-pointer'>
                <div className='w-25 p-5 rounded-full border mb-4'>
                    <img src={c2} alt="category" className='w-12 cursor-pointer'/>
                </div>
                <h5>Accessories</h5>
            </div>
            <div className='cursor-pointer'>
                <div className='w-25 p-5 rounded-full border mb-4'>
                    <img src={c3} alt="category" className='w-12 cursor-pointer'/>
                </div>
                <h5>Men's Pants</h5>
            </div>
            <div className='cursor-pointer'>
                <div className='w-25 p-5 rounded-full border mb-4'>
                    <img src={c4} alt="category" className='w-12 cursor-pointer'/>
                </div>
                <h5>Men's Shoes</h5>
            </div>
            <div className='cursor-pointer'>
                <div className='w-25 p-5 rounded-full border mb-4'>
                    <img src={c5} alt="category" className='w-12 cursor-pointer'/>
                </div>
                <h5>Kid's Wear</h5>
            </div>
            
           

            
        </div>

    </div>
   </>
  )
}

export default Category
