import React from "react";

const Home = () => {
  return (
    <>
      <div className=" home">
        <div className="pt-[15%] px-60">
          <h1 className="font-bold text-4xl 2xl:text-5xl">
            Easy to buy and sell 
          </h1>
          <h1 className="mt-4 font-bold text-4xl 2xl:text-5xl">
            your products in one place
          </h1>
          <div className="mt-8 bg-white h-14 w-[38%] rounded-full flex items-center justify-between">
            <input
              type="text"
              placeholder="search"
              className=" rounded-full outline-none px-8"
            />
            <button className="bg-[#cf8e9c] hover:bg-[#df777ce3] hover:-rotate-2 hover:text-gray-800 mr-2 py-2 px-5 rounded-full">
              Search
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Home;
