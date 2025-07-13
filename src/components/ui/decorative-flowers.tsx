'use client'

import React from 'react'

interface FlowerProps {
  color: string
  size?: number
  className?: string
}

const Flower: React.FC<FlowerProps> = ({ color, size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <path
      d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.5 11 7C10 7.5 9.5 8.5 9.5 9.5C9.5 11 10.5 12 12 12C13.5 12 14.5 11 14.5 9.5C14.5 8.5 14 7.5 13 7C14 6.5 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z"
      fill={color}
    />
    <path
      d="M12 12C13.5 12 14.5 13 14.5 14.5C14.5 15.5 14 16.5 13 17C14 17.5 14.5 18.5 14.5 19.5C14.5 21 13.5 22 12 22C10.5 22 9.5 21 9.5 19.5C9.5 18.5 10 17.5 11 17C10 16.5 9.5 15.5 9.5 14.5C9.5 13 10.5 12 12 12Z"
      fill={color}
    />
    <path
      d="M2 12C2 10.5 3 9.5 4.5 9.5C5.5 9.5 6.5 10 7 11C7.5 10 8.5 9.5 9.5 9.5C11 9.5 12 10.5 12 12C12 13.5 11 14.5 9.5 14.5C8.5 14.5 7.5 14 7 13C6.5 14 5.5 14.5 4.5 14.5C3 14.5 2 13.5 2 12Z"
      fill={color}
    />
    <path
      d="M12 12C12 13.5 13 14.5 14.5 14.5C15.5 14.5 16.5 14 17 13C17.5 14 18.5 14.5 19.5 14.5C21 14.5 22 13.5 22 12C22 10.5 21 9.5 19.5 9.5C18.5 9.5 17.5 10 17 11C16.5 10 15.5 9.5 14.5 9.5C13 9.5 12 10.5 12 12Z"
      fill={color}
    />
  </svg>
)

interface DecorativeFlowersProps {
  className?: string
}

export const DecorativeFlowers: React.FC<DecorativeFlowersProps> = ({ className = '' }) => {
  const flowerColors = [
    '#F6C34A', // yellow
    '#E96C7C', // pink
    '#7EC6E6', // blue
    '#A9E65B', // green
    '#F9B4E1', // purple
  ]

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Top left flowers */}
      <div className="absolute top-16 left-16 transform -rotate-12 opacity-80 hidden md:block">
        <Flower color={flowerColors[0]} size={40} />
      </div>
      <div className="absolute top-32 left-32 transform rotate-45 opacity-70 hidden lg:block">
        <Flower color={flowerColors[1]} size={28} />
      </div>
      <div className="absolute top-48 left-20 transform -rotate-30 opacity-60 hidden md:block">
        <Flower color={flowerColors[2]} size={32} />
      </div>

      {/* Top right flowers */}
      <div className="absolute top-20 right-20 transform rotate-30 opacity-75 hidden md:block">
        <Flower color={flowerColors[3]} size={36} />
      </div>
      <div className="absolute top-40 right-12 transform -rotate-45 opacity-80 hidden lg:block">
        <Flower color={flowerColors[4]} size={34} />
      </div>
      <div className="absolute top-12 right-40 transform rotate-60 opacity-65 hidden md:block">
        <Flower color={flowerColors[0]} size={26} />
      </div>

      {/* Bottom left flowers */}
      <div className="absolute bottom-24 left-28 transform rotate-15 opacity-70 hidden lg:block">
        <Flower color={flowerColors[2]} size={32} />
      </div>
      <div className="absolute bottom-12 left-12 transform -rotate-60 opacity-75 hidden md:block">
        <Flower color={flowerColors[1]} size={28} />
      </div>

      {/* Bottom right flowers */}
      <div className="absolute bottom-20 right-32 transform rotate-75 opacity-80 hidden md:block">
        <Flower color={flowerColors[3]} size={30} />
      </div>
      <div className="absolute bottom-40 right-16 transform -rotate-15 opacity-70 hidden lg:block">
        <Flower color={flowerColors[4]} size={38} />
      </div>

      {/* Decorative vines/stems */}
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M10,20 Q20,10 30,20 T50,25 T70,30"
          stroke="#A9E65B"
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M80,15 Q70,25 60,15 T40,20 T20,25"
          stroke="#7EC6E6"
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M15,80 Q25,70 35,80 T55,75 T75,70"
          stroke="#F6C34A"
          strokeWidth="0.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

export default DecorativeFlowers
