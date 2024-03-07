import React from 'react'
import NoImgAvaiable from "../../images/no_image.png";
import Badge from '../Badge';
import { IoBookmarkOutline } from "react-icons/io5";

const ProductCard = ({product}) => {
  return (
    <div className=' basis-1/4 px-2 mb-5'>
        <img src={product.images[0] || NoImgAvaiable} alt={product.name} className=' w-full h-[200px] object-contain mb-2'  />
        <div className='mt-3'>
            <div className='mb-2'>
                <Badge label={product.category} />
            </div>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium'>{product.name}</h2>
                <IoBookmarkOutline className='text-2xl cursor-pointer hover:text-gray-500 duration-150' />
            </div>
            <span className='mt-1 font-medium'>${product.price}</span>
        </div>
    </div>
  )
}

export default ProductCard