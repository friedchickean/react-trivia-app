import React from "react";
import { BiMenu } from 'react-icons/bi';
import { TbPointerQuestion } from "react-icons/tb";

export default function Nav() {


    return (
        <nav className="py-7 px-36 mb-5 text-center text-6xl flex justify-center">
            <div className="flex cursor-pointer bg-white p-2 rounded-md shadow-[2px_4px_0px_2px_rgba(29,29,29)] group hover:scale-105 ease-in-out duration-500 active:scale-100 active:duration-200">
                <TbPointerQuestion className="drop-shadow-[1px_1.5px_1px_rgba(59,10,59,1)] group-hover:rotate-90 ease-in-out duration-500"/>
                <h1 className="text-purple-800 drop-shadow-[1px_1.5px_1px_rgba(0,0,0,1)]" >Triviago</h1>
            </div>
        </nav>
    )
}