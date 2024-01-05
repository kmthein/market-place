import React from "react";

const Home = () => {
  return (
    <>
      <div className=" home">
        <div className="pt-[15%] pl-[10%]">
          <h1 className="font-bold text-4xl 2xl:text-5xl">The leading B2B ecommerce</h1>
          <h1 className="mt-4 font-bold text-4xl 2x:text-5xl">platform for global trade</h1>
          <div className="mt-8 bg-white h-14 w-[38%] rounded-full flex items-center justify-between">
            <input type="text" placeholder="search" className=" rounded-full outline-none px-8" />
            <button className="bg-[#21508a] mr-2 py-2 px-5 text-white rounded-full">Search</button>
        </div>
        </div>
        
      </div>
      <div></div>
    </>
  );
};

export default Home;
