"use client";

import React, { useState } from "react";
// import Title from "./Title";
import Timer from "./Timer";



function MainMenu(){

    const [displayTimer, setDisplayTimer] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(true);

    function onClick(){
        setDisplayTimer(true);
        setDisplayMenu(false);
    }

    return(
        <>
        {displayTimer && <Timer initialTime={3} />}
        {displayMenu && <div className="flex justify-center items-center flex-col pt-20 w-500">
            <button onClick={onClick} className="text-white border border-solid border-white p-4 hover:bg-red-950"> <span className="text-5xl">Start</span> </button>
            <p className="text-white text-xs pt-5 w-80 text-center" >
            This game contains flashing lights that may trigger 
            seizures for individuals with photosensitive 
            epilepsy or other conditions. If you experience
            any discomfort, dizziness, etc. during the game, 
            please take a break immediately and consult a 
            healthcare professional if necessary. Your safety
            and well-being are important.
            </p>
        </div>}
        </>
    )
}

export default MainMenu;