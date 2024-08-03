import React from "react";
import Title from "./Title";

// function onClick(){
//     print();  
// }
Title
function MainMenu(){
return(
    <div className="flex justify-center items-center flex-col pt-20 w-500">
    <Title/>
    <button  className="text-white border border-solid border-white p-4"> <span className="text-5xl">Start</span> </button>
        <p className="text-white text-xs pt-5 w-80" >
            This game contains flashing lights that may trigger seizures for individuals with photosensitive 
            epilepsy or other conditions. If you experience
            any discomfort, dizziness, etc. during the game, 
            please take a break immediately and consult a 
            healthcare professional if necessary. Your safety
            and well-being are important.
        </p>
    </div>
)
}

export default MainMenu;