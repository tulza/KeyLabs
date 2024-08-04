import React from "react";
import useSound from 'use-sound';
import mySound from '@/assets/Audio/Flash.mp3';


const SoundButton(){
    const [play] = useSound
    return <button onClick={play}>Play Sound</button>
}

