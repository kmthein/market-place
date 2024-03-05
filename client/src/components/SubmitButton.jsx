import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";

const SubmitButton = (props) => {
  const { isProcessing } = useSelector((state) => state.ui);

  return (
    <>
      {!isProcessing ? (
        <button
          type="submit"
          className="bg-[#4254b6] text-white hover:bg-[#495cc9] w-20 justify-center hover:text-gray-200 flex font-medium h-10 px-2 gap-1 items-center rounded-md"
        >
          {props.children}
        </button>
      ) : (
        <button
          disabled
          className="bg-[#2f3e91] text-white/50 flex font-medium h-10 px-2 gap-1 items-center rounded-md w-20 justify-center"
        >
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </button>
      )}
    </>
  );
};

export default SubmitButton;
