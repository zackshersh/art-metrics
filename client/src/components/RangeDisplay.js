import React, {useState, useEffect, useRef, useMemo} from 'react';
import * as d3 from "d3";

import { getMetricColors } from '../utils/utils';

function RangeDisplay({title, data}) {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);


    const [gradientColors, setGradientColors] = useState(getMetricColors(data.name));
    console.log(getMetricColors(data.name));
    const markerW = 8;
    const markerH = 30;

    const lineWeight = 4;

    const contRef = useRef();


    const updateDimmensions = () => {
        if(!contRef.current) return;
        let bounds = contRef.current.getBoundingClientRect();
        setWidth(bounds.width);
        setHeight(bounds.height);
        console.log(bounds)
    };

    const initialize = () => {
        console.log(data);

        window.addEventListener("resize", () => {
            updateDimmensions()
        })
        updateDimmensions();
    };

    useEffect(() => {
        initialize();

        setTimeout(() => {
            updateDimmensions()
        }, 50);
    },[])

    useEffect(() => {
        updateDimmensions()
    },[contRef])

    const xScale = useMemo(() => {
        return d3.scaleLinear().domain([-1,1]).range([0,width])
    }, [data, width]);

    const sdScale = useMemo(() => {
        return d3.scaleLinear().domain([0,1]).range([0,width/2])
    },[data, width])

    const x = useMemo(() => {
        return xScale(data.mean)
    }, [xScale, data, width])

    const sd_offset = useMemo(() => {
        return sdScale(data.standard_dev);
    },[sdScale, data, width])

    const sd_pos = useMemo(() => {
        return {
            start: x - sd_offset,
            end: x + sd_offset
        }
    })

    const titleSplit = useMemo(() => {
        return [
            title.split("_")[0],
            title.split("_")[1]
        ]
    },[title]);
    const titleStyles = "text-xs text-stone-500 capitalize";


    let tickW = 2;
    let tickH = 12;
    const generateTicks = () => {
        let tickCount = 3;
        let arr = [];
        for(var i=-1; i <= 1; i += 2/(tickCount-1)){
            
            let h = tickH;
            if(i == 0) h *= 2

            arr.push(<rect key={i} x={(xScale(i)-tickW/2).clamp(0,width-tickW)} y={(height/2)-h/2} width={tickW} height={h} fill="rgb(150,150,150)" />)
        }
        return arr;
    }

    const gradientID = useMemo(() => {
        // return `gradient-${Math.random().toFixed(4)}`;
        return `gradient-${title}`;
    },[])

    return (
        <div className='py-2 w-full'>
            <div className='min-h-8 w-full' ref={contRef}>
                <svg width={width} height={height}>

                    {/* STANDARD DEVIATION */}
                    <rect x={sd_pos.start} y={(height/2)-8} width={sd_offset*2} height={16} stroke='none' strokeWidth={2} fill='rgba(200,200,200,0.8)' rx={4}/>
                    {generateTicks()}
                    {/* MAIN LINE */}
                    <rect x={0} y={(height/2)-(lineWeight/2)} width={width} height={lineWeight} fill={`url(#${gradientID})`}></rect>
                    <linearGradient gradientUnits='userSpaceOnUse' id={`${gradientID}`} x1={`${0}px`} x2={`${width}px`} y1="0px" y2="0px">
                        <stop offset={"5%"} stopColor={gradientColors ? `rgb(${gradientColors.start[0]},${gradientColors.start[1]},${gradientColors.start[2]})` : "rgb(150,150,150)"} />
                        <stop offset={"95%"} stopColor={gradientColors ? `rgb(${gradientColors.end[0]},${gradientColors.end[1]},${gradientColors.end[2]})` : "rgb(150,150,150"} />
                    </linearGradient>
                    {/* MARKER */}
                    {/* <line strokeWidth={5} stroke="black" x1={x} x2={x} y1={(height/2)-markerH/2} y2={(height/2)+markerH/2}/> */}
                    <rect stroke='#f5f5f4' strokeWidth={2} fill={`url(#${gradientID})`} x={x-markerW/2} y={(height/2)-markerH/2} width={markerW} height={markerH} />
                </svg>
            </div>
            <div className='flex justify-between mt-[-4px]'>
                <p className={titleStyles}>{titleSplit[0]}</p>
                <p className={titleStyles}>{titleSplit[1]}</p>
            </div>
        </div>
    );
}

export default RangeDisplay;