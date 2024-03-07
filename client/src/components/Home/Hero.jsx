import React from 'react'

const Hero = () => {
  return (
    <div className=" home">
        <div className="pt-[15%] xl:px-40 2xl:px-60">
          <h1 className="font-bold text-4xl 2xl:text-5xl">
            Easy to buy and sell 
          </h1>
          <h1 className="mt-4 font-bold text-4xl 2xl:text-5xl">
            your products in one place
          </h1>
          <p className="w-[40%] mt-6 leading-8 text-gray-800">Welcome to our vibrant marketplace, where opportunities await around every corner. Uncover unique products, connect with talented creators, and indulge in a world of endless possibilities.</p>
          {/* <div className="mt-8 bg-white h-14 md:w-[45%] 2xl:w-[38%] rounded-full flex items-center justify-between">
            <input
              type="text"
              placeholder="search"
              className=" rounded-full outline-none px-4 border-0 w-full mx-4"
            />
            <button className="bg-[#cf8e9c] hover:bg-[#df777ce3] hover:-rotate-2 hover:text-gray-800 mr-2 py-2 px-5 rounded-full">
              Search
            </button>
          </div> */}
        </div>
      </div>
  )
}

export default Hero