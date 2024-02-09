import React, { useState, useEffect } from "react";

import { RiVolumeUpFill } from "react-icons/ri";
import Data, { translation } from "../assets/utils/Data";

export default function SoundOn({lang, style}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);

            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, [])

    const handleClickPlayer = () => {
        if(isLoaded){
            const soundOn = document.getElementById("sound-on");
            const audioPlayer = document.getElementById("audio-player");

            if(soundOn){
                soundOn.classList.add('animate__animated', 'animate__fadeOut');
                setTimeout(() => {
                    soundOn.classList.add('hidden');
                    if(audioPlayer) audioPlayer.play();
                }, 500);
            }
        }
    }

    const onPageLoad = () => {
        setIsLoaded(true);
    }

    return (
        <div id="sound-on" className="fixed top-0 left-0 h-full w-full z-50 cursor-pointer" onClick={handleClickPlayer}>
            <div className="flex flex-col h-full w-full items-center justify-center bg-[#141318] text-white" style={style}>
                <RiVolumeUpFill className="text-6xl animate-pulse mb-2 animate__animated animate__pulse" />
                <p className="font-semibold mb-10">{translation.soundon[lang]}</p>
                <p className="rtl:text-2xl ltr:text-xl">{translation.touchtocontinue[lang]}</p>
                {/* <div className="relative text-center -mt-1">
                    <img className="w-[15em]" src="/images/sound.gif" alt="" />
                    <div className="absolute bottom-5 w-full ">
                        <p className="mx-auto text-lg font-semibold">{translation.soundon[lang]}</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}