import React, { useState } from 'react';

function Powerup( {name, cost, description} ) {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className='rounded-md bg-orange-600 text-white w-36 h-36 flex flex-col justify-center items-center cursor-pointer shadow-[2px_4px_0px_2px_rgba(95,12,49)]
        hover:bg-orange-400 hover:text-black hover:scale-125 transition-transform active:scale-95' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <h2 className='text-xl'>{name}</h2>
            <h3>{cost} points</h3>
            <p className={`text-left m-5 text-xs ${isHovered ? 'block' : 'hidden'} transition-all text-black duration-200`}>{description}</p>
        </div>
    );
}

export default Powerup;