import React, { useEffect, useMemo, useState } from 'react';
import SvgDynamicIcon from '../components/SvgDynamicIcon';
import { clamp, easeInOutQuad, lerp, scale } from '../utils/utils';
import DynamicIconWrapper from '../components/DynamicIconWrapper';

import useAnimation from '../utils/animation/use-animation';
import useAnimationTimer from '../utils/animation/use-animation-timer';
import TitleDynamicIconSlider from '../components/TitleDynamicIconSlider';
import { dropShadow } from '../components/boxShadowStyles';
import { getAllArtworks } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import TitleJumbotron from '../components/TitleJumbotron';


function TitleButton({text, path}){

    const navigate = useNavigate();

    const [hovered, setHovered] = useState(false);

    return (
        <div style={{
            boxShadow: hovered ? "" : dropShadow,
            transitionDuration: "0.05s"
            }} 
            onMouseDown={() => navigate(path)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}

            className='bg-stone-900 text-white hover:bg-stone-700 transition-colors border border-stone-300 p-5 rounded-lg w-full'>
            <h1 className='text-3xl'>{text}</h1>
        </div>
    )
}

function Title(props) {

    const length = 2000;
    // const animatedValue = useAnimationTimer(length * 1000,0);

    const getBottomHeight = () => {
        if(window.innerWidth < 780){
            return 300
        } else {
            return 200
        }
    }

    const [bottomHeight, setBottomHeight] = useState(getBottomHeight());

    useEffect(() => {
        const updateBottomHeight = () => {
            setBottomHeight(getBottomHeight())
        }
        window.addEventListener("resize", updateBottomHeight, false);

        return () => {
            window.removeEventListener("resize", updateBottomHeight, false);
        }
    },[])


    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: `1fr ${bottomHeight}px`,

        }} className='bg-stone-300 h-screen w-full p-5 py-5'>
            <TitleJumbotron />
            <div style={{
                boxShadow: dropShadow
            }} className='h-full flex w-full flex-col md:flex-row bg-stone-100 p-5 rounded-lg border-stone-600'>
                <div className='w-full h-full mr-3'>
                    <h1 className='text-6xl font-bold'>Art Metrics</h1>
                    <h3 className='text-2xl leading-tight mt-3'>Filler filler filler this is filler text but it will be explaining what Art Metrics is eventually.</h3>
                </div>
                <div className='flex w-full md:flex-row'>
                    <TitleButton text={"Explore"} path={"/home"}/>
                    <div className='SPACER p-3'></div>
                    <TitleButton text={"Rate"} />
                </div>
            </div>

        </div>
    );
}

export default Title;