import React, { useState, useEffect } from "react";

import SoundOn from "../components/SoundOn";
import SideMenu from "../components/SideMenu";
import { Helper } from "../assets/utils/Helper";
import Data from "../assets/utils/data";
import Hafez from "../assets/api/hafez";

export default function Home() {
    const [data, setData] = useState();
    const [lang, setLang] = useState(document.querySelector('html').getAttribute("lang"));
    const [isShow, setIsShow] = useState(true);
    const [hafezPoemValue, setHafezPoemValue] = useState();
    const urlParams = new URLSearchParams(window.location.search);
    
    useEffect(()=>{
        if(!checkUrl()) getHafez();

        // Check if the page has already loaded
        // if (document.readyState === 'complete') {
        //     onPageLoad();
        // } else {
        //     window.addEventListener('load', onPageLoad, false);

        //     // Remove the event listener when component unmounts
        //     return () => window.removeEventListener('load', onPageLoad);
        // }
    }, [])

    const getHafez = () => {
        Hafez.getHafezRandom(1).then(res=>{
            var d = res.data;
            setData(d.data[0]);
            setHafezPoemValue(d.data[0].id);
        })
    }

    const getHafezById = (id) => {
        setHafezPoemValue(id);
        Hafez.getHafezById(id).then(res=>{
            var d = res.data;
            setData(d.data);
        })
    }

    const checkUrl = () => {
        // Check if the 'hafezpoem' parameter exists
        if (urlParams.has('hafezpoem')) {
            // Get the value of 'hafezpoem'
            const value = urlParams.get('hafezpoem');
            const language = urlParams.get('lang');
        
            // Check if the value is not empty
            if (value.trim() !== '') {
                getHafezById(value);

                if(language){
                    setLang(language);
                    Helper.setLanguage(language);
                }

                return true;
            } else {
                console.log('hafezpoem has an empty value');
                // Perform actions for empty value
                return false;
            }
        } else {
            // Perform actions if 'hafezpoem' parameter doesn't exist
            return false;
        }
    }

    const onPageLoad = () => {
        setTimeout(()=>{ 
            const element = document.getElementById("sound-on");
            if(element) element.classList.add('animate__animated', 'animate__fadeOut');
            setIsShow(false);
        }, 2000);
    };

    return (
        <>
            {isShow && <SoundOn lang={lang} />}
            
            <SideMenu lang={lang} setLang={setLang} hafezPoemValue={hafezPoemValue} data={data} />

            <div id="hafez" className="relative w-full min-h-[100vh] bg-[#773d3b] sm:pb-20 pb-10">
                <div className="absolute w-full z-30">
                    <img className="mx-auto sm:w-[46em] w-[24em]" src="/images/hafez_header.png" alt="" />
                </div>
                <div id="hafez-content" className="relative min-h-[95vh] lg:w-[650px] sm:w-[550px] w-[80%] sm:pt-[9.5em] pt-[4.5em] sm:pb-[36em] pb-[22em] container mx-auto text-justify whitespace-pre-line bg-[#e0ddcb] rounded-b-full">
                    <img className="mx-auto sm:mb-[3.5em] mb-[2em] sm:w-[10em] w-[5.5em]" src="/images/title.png" alt="Fal Hafez" />
                    <div className="text-center px-7 lg:text-2xl lg:leading-loose sm:text-2xl text-base sm:leading-loose leading-loose sm:font-medium font-normal text-gray-800">
                        {(lang === "fa")? data?.poem_fa : data?.poem_en? data?.poem_en : "No translation available"}
                    </div>
                    <div className="absolute sm:-bottom-10 -bottom-5 w-full">
                        <img className="mx-auto sm:w-[25em] w-[15em]" src="/images/hafez_footer.png" alt="" />
                    </div>
                </div>
                <div className="sm:mt-28 mt-16 flex flex-row justify-center sm:gap-20 gap-8 items-center">
                    <img className="sm:w-[10em] w-[6em]" src="/images/logo.svg" alt="Fal Hafez" />
                    <img className="sm:w-[8em] w-[5em]" src="/images/21ai_logo2.png" alt="Fal Hafez" />
                </div>
            </div>
        </>
    )
}