import React from 'react';

interface HoverCardProps {
  title: string;
  description: string;
  backgroundColor?: string;
  cardColor?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({
  title,
  description,
  backgroundColor = 'bg-[#9CBDFF]',
  cardColor = 'bg-gradient-to-b from-white/20 to-white/10',
}) => {
  return (
    <div
      className={`relative overflow-hidden w-64 h-64 rounded-3xl cursor-pointer text-lg font-bold ${cardColor}
      transition-transform duration-500 hover:scale-120`}
    >
      {/* This element is needed for peer hover to work */}
      <div className="z-10 absolute w-full h-full peer" />

      {/* Top bubble — hidden by default, appears on hover */}
      <div
        className={`absolute -top-32 -left-16 w-32 h-44 rounded-full ${backgroundColor}
        opacity-0 peer-hover:opacity-100 transition-all duration-500
        peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%]`}
      />

      {/* Hover content bubble — hidden by default, appears on hover */}
      <div
        className={`absolute flex flex-col text-center
        -bottom-32 -right-16 w-36 h-44 rounded-full ${backgroundColor}
        opacity-0 peer-hover:opacity-100 transition-all duration-500
        peer-hover:right-0 peer-hover:bottom-0 peer-hover:rounded-b-none
        peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full peer-hover:p-6`}
      >
        <div className="font-avenir-regular font-bold text-xl break-words mb-3">{title}</div>
        <div className="font-avenir-regular text-xs font-medium mt-2 break-words">{description}</div>
      </div>

      {/* Visible title */}
      <div className="w-full h-full items-center justify-center flex text-center px-4">
        <span className="break-words">{title}</span>
      </div>
    </div>
  );
};

export default HoverCard;
