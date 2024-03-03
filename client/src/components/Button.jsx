import React from 'react'

const Button = (props) => {
  return (
    <button
    type="submit"
    className="bg-[#4254b6] text-white hover:bg-[#374699] hover:-rotate-2 hover:text-gray-200 flex font-medium h-10 px-2 gap-1 items-center rounded-md">
        {props.children}
    </button>
  )
}

export default Button