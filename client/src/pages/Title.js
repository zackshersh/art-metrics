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


function TitleButton({text, path, primary=true, styles}){

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

            className={`${primary ? "bg-stone-900 text-white hover:bg-stone-700 flex-grow" : "bg-stone-300 text-black hover:bg-stone-200 flex-grow-0"} transition-colors border border-stone-300 p-5 rounded-lg ${styles}`}>
            <h1 className='text-3xl'>{text}</h1>
        </div>
    )
}

function Title(props) {

    const length = 2000;
    // const animatedValue = useAnimationTimer(length * 1000,0);

    const getBottomHeight = () => {
        if(window.innerWidth < 780){
            return 250
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
                    <h1 className='text-6xl font-bold'>Special Metrics</h1>
                    <h3 className='text-2xl leading-tight mt-3'>Quantifying the unquantifiable qualities of art.</h3>
                </div>
                <div className='flex w-full md:flex-row'>
                    <TitleButton text={"Explore"} path={"/home"} styles={""}/>
                    <div className='SPACER p-2'></div>
                    <TitleButton text={"Rate"} path={"/rating"} />
                    <div className='SPACER p-2'></div>
                    <TitleButton text={"About"} path={"/about"} primary={false}/>
                </div>
            </div>

        </div>
    );
}

export default Title;