import React, { useEffect, useState } from 'react';
import { colorLerp, easeInOutQuad, getMetricColors, getPathsForValueName, lerp, scale } from '../utils/utils';
import { compileSvg, interpolateSvgs, parseSvg } from '../utils/dynamicSvgScripts';
import { easeCubicInOut } from 'd3';

function SvgDynamicIcon({valueName, value, scaleFactor, colorExagerationFactor=0}) {

    // const [path1, setPath1] = useState("");
    // const [path2, setPath2] = useState("");

    // const [pathD, setPathD] = useState("");

    const [t, setT] = useState(0);

    const [minColor, setMinColor] = useState(getMetricColors(valueName).start)
    const [maxColor, setMaxColor] = useState(getMetricColors(valueName).end);


    
    useEffect(() => {
        // console.log(valueName)
        setT(scale(value, -1, 1, 0, 1));
    }, [value])


    const generatePaths = () => {
        // console.log(valueName, scaleFactor)
        performance.mark("generate_paths_start")
        let metricPaths = getPathsForValueName(valueName);

        if(Array.isArray(metricPaths.start)){
            let arr = [];
            for(let i=0; i < metricPaths.start.length; i++){
                let interpolated = singlePath(metricPaths.start[i], metricPaths.end[i], t);
                arr.push(<path key={i} fill={`rgb(${colorLerp(minColor, maxColor, t)})`} d={interpolated}></path>);
            }
            performance.mark("generate_paths_end");
            const measure = performance.measure(
                "generate_paths",
                "generate_paths_start",
                "generate_paths_end")

            // console.log(valueName + " " + measure.duration + "ms")
            return arr;
        } else {
            let interpolated = singlePath(metricPaths.start, metricPaths.end, t);

            let easedT = lerp(t, easeCubicInOut(t), colorExagerationFactor)
            let c = `rgb(${colorLerp(minColor, maxColor, easedT)})`;
            let fill = c;
            let stroke = "none";

            if(valueName == "sleepy_amped"){
                fill = "none";
                stroke = c;
            }
            performance.mark("generate_paths_end");
            const measure = performance.measure(
                "generate_paths",
                "generate_paths_start",
                "generate_paths_end")

            // console.log(valueName + " " + measure.duration + "ms")
            return <path strokeWidth={3} stroke={stroke} fill={fill} d={interpolated}></path>
        }


    }

    const singlePath = (path1, path2) => {
        let interpolated = interpolateSvgs(path1, path2, t);
        return interpolated;
    }


    const sideLength = 44;    

    return (
        <div style={{
            width: Math.floor(sideLength * scaleFactor * 1.5),
            height: Math.floor(sideLength * scaleFactor)
        }} className='flex justify-center items-center w-full h-full'>
            <svg style={{
                transform: `scale(${scaleFactor})`
            }} width={sideLength} height={sideLength} className=''>
                {generatePaths()}
            </svg>
        </div>
    ); 
}

export default SvgDynamicIcon;