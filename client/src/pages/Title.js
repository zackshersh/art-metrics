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

            className='bg-stone-300 hover:bg-stone-200 transition-colors border border-stone-300 p-5 rounded-lg  w-full'>
            <h1 className='text-3xl'>{text}</h1>
        </div>
    )
}

function Title(props) {

    const length = 2000;
    // const animatedValue = useAnimationTimer(length * 1000,0);




    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: window.innerWidth > 640 ? "1fr 200px" : "1fr 300px",

        }} className='bg-stone-300 h-screen w-full p-5 py-5'>
            <TitleJumbotron />
            <div style={{
                boxShadow: dropShadow
            }} className='h-full flex w-full flex-col sm:flex-row bg-stone-100 p-5 rounded-lg border-stone-600'>
                <div className='w-full h-full'>
                    <h1 className='text-6xl font-bold'>Art Metrics</h1>
                </div>
                <div className='flex w-full'>
                    <TitleButton text={"Explore"} path={"/home"}/>
                    <div className='SPACER px-3'></div>
                    <TitleButton text={"Rate"} />
                </div>
            </div>

        </div>
    );
}

export default Title;