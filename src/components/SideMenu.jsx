import React, { useState, useEffect } from "react";

import { Helper } from "../assets/utils/Helper";
import Data, { translation } from "../assets/utils/data";

import { HiOutlineShare, HiDownload, HiLink, HiOutlinePlay, HiPlay } from "react-icons/hi";
import { BsPlayCircle, BsPlayCircleFill } from "react-icons/bs";
import { Tooltip, Modal, Button, TextInput, Toast } from 'flowbite-react';

export default function SideMenu({lang, setLang, hafezPoemValue, data}) {
    const [openModal, setOpenModal] = useState(false);
    const [shareLink, setShareLink] = useState(null);
    const [isShowToast, setIsShowToast] = useState(false);
    const [isShowPlayer, setIsShowPlayer] = useState(false);

    useEffect(()=>{
        const fullUrl = window.location.href;
        const baseUrl = new URL(fullUrl).origin;
        setShareLink(`${baseUrl}?hafezpoem=${hafezPoemValue}&lang=${lang}`);
    }, [hafezPoemValue, data])

    const copyLink = () => {
        Helper.copyInputText("share-link");
        setOpenModal(false);
        setIsShowToast(true);
        setTimeout(()=>{
            setIsShowToast(false);
        }, 2000);
    }

    const download = async () => {
        Helper.downloadWebPage();       
    }

    const setLanguage = () => {
        var newLang = (lang == "fa")? "en" : "fa";

        setLang(newLang);

        Helper.setLanguage(newLang);
    }

    const showPlayer = () => { 
        setIsShowPlayer(!isShowPlayer); 
    }

    return (
        <>
            <div className="fixed sm:right-[1em] right-[0.2em] flex items-center h-[100vh] z-40">
                <div id="sidemenu" className="flex flex-col gap-5 mb-5 items-center text-[#c0bdab] sm:text-2xl text-lg">
                    <button className={`${(lang == "fa") ? "mr-auto" : "ml-auto"} uppercase  bg-[#532827] hover:bg-[#421e1e] sm:text-base text-xs sm:w-[35px] sm:h-[35px] w-[27px] h-[27px] rounded-full`}
                        onClick={setLanguage}
                    >
                        {(lang === "fa") ? "en" : "ش"}
                    </button>
                    <Tooltip content={translation.share[lang]} placement="left"><HiOutlineShare className="cursor-pointer" onClick={() => setOpenModal(true)} /></Tooltip>
                    <Tooltip content={translation.download[lang]} placement="left"><HiDownload className="cursor-pointer" onClick={() => download()} /></Tooltip>
                    <Tooltip content={translation.audio[lang]} placement="left">
                        { !isShowPlayer && <BsPlayCircle className="cursor-pointer" onClick={() => showPlayer()} />}
                        { isShowPlayer && <BsPlayCircleFill className="cursor-pointer" onClick={() => showPlayer()} />}
                    </Tooltip>
                </div>
            </div>

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <TextInput id="share-link" className="my-5" placeholder="Share Link" required color="gray" readOnly value={shareLink} />
                        <div className="flex justify-center gap-4">
                            <button className="focus bg-[#773d3b] hover:bg-[#974e4b] rounded-lg py-2 px-4 text-[#e0ddcb]" onClick={() => copyLink()}>
                                {translation.copylink[lang]}
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {isShowToast && <div className="fixed w-full top-5 z-40">
                <Toast className="mx-auto w-[160px] animate__animated animate__fadeInDown"> 
                    <HiLink className="h-5 w-5 text-[#773d3b]" />
                    <div className="px-4 text-sm font-normal"> {translation.linkcopied[lang]}</div>
                </Toast>
            </div>}

            {data && <div id="audio" className={`${isShowPlayer? "bottom-5" : "-bottom-full" } fixed left-0 w-full z-40 transition-[bottom] duration-500 ease-in-out`}>
                <audio id="audio-player" className="mx-auto" controls autoPlay>
                    <source src={`/audios/${data.audio_fa}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>}
        </>
    )
}