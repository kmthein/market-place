import React from 'react'
import { useSelector } from 'react-redux'

const SubmitButton = (props) => {
  const { isLoading } = useSelector((state) => state.ui);
  console.log(isLoading);
  
  return (
    <>
    {
      !isLoading ? (
        <button
        type="submit"
        className="bg-[#4254b6] text-white hover:bg-[#374699] hover:-rotate-2 hover:text-gray-200 flex font-medium h-10 px-2 gap-1 items-center rounded-md">
            {props.children}
        </button>
      ) : (
        <button disabled className="bg-[#2b356d] text-white/50 flex font-medium h-10 px-2 gap-1 items-center rounded-md">Loading...</button>
      )
    }
  </>
  )
}

export default SubmitButton