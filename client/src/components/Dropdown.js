import React, { useState, useEffect } from 'react';
import { capitalizeFirstLetter, getMetricColors, rgbArrayToCSS } from '../utils/utils';

function Dropdown({title, options, handler, startingIndex=0, dropdownIndex}) {

    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedIndex, setSelectedIndex] = useState(startingIndex);

    const [expanded, setExpanded] = useState(false);

    const [sliderTranslate, setSliderTranslate] = useState(0);
    const [maskTranslate, setMaskTranslate] = useState(0);

    const [optionHeight, setOptionHeight] = useState(0);


    // const heightPerOption = 8;
    const remEquivH = 2;
    const paddingOffset = 0.25;

    const transformOption = (option) => {
        let split = option.split("_");
        return `${capitalizeFirstLetter(split[0])} → ${capitalizeFirstLetter(split[1])}`
    }

    const tO = transformOption;



    useEffect(() => {

        setSliderTranslate(() => {
            if(expanded){
                return '0rem'
            } else {
                // return `0rem`
                return `-${(selectedIndex*remEquivH)}rem`
            }
        }  )

        setMaskTranslate(() => {
            if(expanded) {
                // return `1rem`
                return `-${(remEquivH * (options.length-1))}rem`
            } else {
                return `0rem`
            }
        })
    },[expanded, selectedIndex]);


    // submitting selection
    useEffect(() => {
        handler(options[selectedIndex])
    },[selectedIndex])

    // adds eventlistener at beginning to detect any click that isn't on it specifically
    const setClickListener = () => {
        console.log("SETTING")
        const onPostExpandedClick = (e) => {
            if(e.target.className != `DROPDOWN-${dropdownIndex}`){
                setExpanded(false);
                window.removeEventListener("mousedown", onPostExpandedClick, true);
            }
        }

        window.addEventListener("mousedown", onPostExpandedClick, true);
    }


    const generateOptions = () => {
        return options.map((option, i) => {

            let {start, end} = getMetricColors(option);

            return(<p style={{
                background: start ? `linear-gradient(90deg, ${rgbArrayToCSS(start,0.7)} 0%, ${rgbArrayToCSS(end,0.7)} 100%)` : "",


            }} key={i} className={`relative z-20 text-sm flex items-center h-[2rem] border-red-500 px-1 ${i == selectedIndex ? expanded ? "bg-stone-200" : "" : expanded ? "bg-stone-50" : ""}`}
            onMouseDown={(e) => {
                    if(expanded){
                        setSelectedIndex(i);
                        setExpanded(false);
                        handler(options[selectedIndex]);
                    } else {
                        setClickListener()
                    }
            }}>
                <span className={`DROPDOWN-${dropdownIndex}`}>{tO(option)}</span>
            </p>)
        })
    }


    const handleClick = () => {
        if(expanded) {

        } else {
            setExpanded(true);
        }
    }



    return (
        <div className=''>
            <div className={`relative h-8 inline-block min-w-40 z-40`}>
                <div style={{transform: `translateY(${maskTranslate})`}}
                className={`border border-blue-600 transition-all absolute top-0 overflow-hidden inline-block rounded-md border border-stone-400 shadow-inner shadow-zinc-200 bg-stone-50   ${expanded ? `h-[${2 * options.length}rem] shadow-md shadow-zinc-300` : `h-[2rem]`}`} onMouseDown={handleClick}>
                    <div style={{transform: `translateY(${sliderTranslate})`}}
                    className={`transition-all inline-block min-w-40 rounded-m `}>
                        {generateOptions()}
                        {/* <span className='text-sm'>{tO(selectedOption)}</span> */}
                    </div>
                </div>
            </div>
            <p className='pl-1 text-xs text-stone-600'>{title}</p>
            {/* <div onMouseDown={() => {setExpanded(false)}} className={`bg-[rgba(0,0,0,1)] w-[200vw] left-[-75vw] h-[200vh] absolute top-[-100vh] ${expanded ? "block" : "hidden"}`}></div> */}
        </div>
    );
}

export default Dropdown;