import React from 'react'

const Badge = (props) => {
  return (
    <span className={` bg-[#dac2c2] px-2 py-1 rounded-md font-medium text-sm ${props.className}`}>{props.label}</span>
  )
}

export default Badge