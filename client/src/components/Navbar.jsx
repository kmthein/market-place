import React from 'react'
import { GiBasket } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className='bg-[#CBD5F0] text-[#194F92] py-4'>
        <div className=' w-full px-20'>
            <div className='flex items-center gap-3'>
            <h3 className='title-font text-3xl font-semibold'>Zay Wal</h3>
            <GiBasket className='text-4xl text-[#194F92] bg-[#CBD5F0]' />
            </div>
        </div>
    </div>
  )
}

export default Navbar