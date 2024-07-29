import React, {useEffect, useRef, useState} from 'react';
import { getAllArtworks } from '../utils/api';
import { capitalizeFirstLetter, colorLerp, getMetricColors, getTextDimmensions, lerp, preloadImgs, rgbArrayToCSS, scale } from '../utils/utils';
// import ScatterRenderer from '../utils/ScatterRenderer';

import * as d3 from "d3";
import AxisLabel from './AxisLabel';
import Dot from './Dot';
import ScatterplotOptions from './ScatterplotOptions';
import ArtDetailsPopup from './ArtDetailsPopup';
import ScatterPlotLinearGradients from './ScatterPlotLinearGradients';

function Scatterplot(props) {

    const [allArtworks, setAllArtworks] = useState();

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [xAxis, setXAxis] = useState("fresh_smelly");
    const [yAxis, setYAxis] = useState("boba_kiki");

    const [backdropImg, setBackdropImg] = useState(undefined);

    const [detailsPopupData, setDetailsPopupData] = useState();

    const svgRef = useRef();
    const contRef = useRef();

    useEffect(() => {
        const getAll = async () => {
            try {
                let res = await getAllArtworks();
                let all = await res.json();

                setAllArtworks(all);
                return all;
            } catch (err) {
                console.error(err);
            }
        }

        getAll().then((data) => {
            preloadImgs(data)
        });

        window.addEventListener("resize", updateDimmensions)

        updateDimmensions()
    },[])


    const margin = {x: 80, y: 30};

    let x = d3.scaleLinear()
        .domain([-1, 1])
        .range([margin.x, width-margin.x]);

    let y = d3.scaleLinear()
        .domain([-1, 1])
        .range([height - margin.y, margin.y]);

    const getAxes = () => {

        // const axesStyle = {stroke: "black", strokeWidth: 1};
        // const axesStyle = {stroke: "url(#boba_kiki_gradient)", strokeWidth: 1};
        
        let lineWeight = 4;
        let outlineOffset = 0;

        return [

            <rect key={0} x={margin.x} y={(height/2) - (lineWeight/2) - outlineOffset} width={width - margin.x*2} height={lineWeight + outlineOffset*2} fill={`black`}  className='no-transition'/>,
            <rect key={1} x={(width/2) - (lineWeight/2) - outlineOffset} y={margin.y} width={lineWeight + outlineOffset*2} height={height - margin.y*2} fill={`black`}  className='no-transition'/>,
            
            // colorful lines
            <rect key={2} x={margin.x} y={(height/2) - (lineWeight/2)} width={width - margin.x*2} height={lineWeight} fill={`url(#${xAxis}_h_gradient)`}  className='no-transition'/>,
            <rect key={3} x={(width/2) - (lineWeight/2)} y={margin.y} width={lineWeight} height={height - margin.y*2} fill={`url(#${yAxis}_v_gradient)`}  className='no-transition'/>
        ]
    }

    const getLabels = () => {
        const xLabels = [
            capitalizeFirstLetter(xAxis.split("_")[0]),
            capitalizeFirstLetter(xAxis.split("_")[1])
        ]
        const yLabels = [
            capitalizeFirstLetter(yAxis.split("_")[0]),
            capitalizeFirstLetter(yAxis.split("_")[1])
        ]

        return [
            <AxisLabel key={Math.random()} start vertical text={xLabels[0]} margin={margin}/>,
            <AxisLabel key={Math.random()} vertical text={xLabels[1]} margin={margin}/>,
            <AxisLabel key={Math.random()} start text={yLabels[0]} margin={margin}/>,
            <AxisLabel key={Math.random()} text={yLabels[1]} margin={margin}/>,
        ]
    }

    const updateDimmensions = () => {
        if(contRef.current){
            let bounds = contRef.current.getBoundingClientRect();
            setWidth(bounds.width);
            setHeight(bounds.height);
        }
    }

    const getBackgroundElements = () => {
        let spacing = 36;
        let arr = [];

        let xColors = getMetricColors(xAxis);
        let yColors = getMetricColors(yAxis);

        function newRect(cX, cY){
            let sideLength = 2;

            let xT = scale(cX, margin.x, width - margin.x, 0, 1);
            let xColor = colorLerp(xColors.start, xColors.end, xT);
            
            let yT = scale(cY, margin.y, height - margin.y, 0, 1);
            let yColor = colorLerp(yColors.start, yColors.end, yT);

            let t = 0;
            
            // t = scale(yT-xT,-1,1,0,1);
            if(y > x){
                t = (yT - xT)/2 + 0.5;
            } else  if (y < x){
                t = 0.5 - (yT - xT)/2;
            }  else {
                t = 0.5;
            }


            let color;
            color = xColor;
            color = yColor;
            color = colorLerp(xColor, yColor, t);
            
            return <rect key={Math.floor(Math.random()*100000000000)} x={cX - sideLength/2} y={cY - sideLength/2} width={sideLength} height={sideLength} fill={rgbArrayToCSS(color)} />
        }

        // in order to enforce symmetry, background dots created 4 at a time, 1 in each quadrant, moving at increasing increments from the axes
        for(let y = height/2; y > margin.y * 0; y -= spacing){
            for(let x = width/2; x > margin.x * 0; x -= spacing){

                if(y != height/2 && x != width/2){
                    arr.push( newRect(x, y) );
                    arr.push( newRect(width - x, y))
                    arr.push( newRect(x, height - y))
                    arr.push( newRect(width - x, height - y))
                }
                // arr.push( newRect(x, y + height/2) );
                // arr.push( newRect(x + width/2, y + height/2))
            }
        }

        return arr;
    }


    return (
        <div className='w-full flex h-full flex-col'>
            <div className='h-full' style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "1fr min-content"
            }}>
                <div className='SVG+BKG-IMG h-full py-3'>
                        <div className='min-w-full h-full grow relative z-10 self-start' ref={contRef}>
                            <svg className='absolute' id='scatterplot-svg' width={width} height={height} ref={svgRef}>
                                
                                <g>
                                    {getAxes()}
                                </g>
                                <g>
                                    {getBackgroundElements()}
                                </g>
                                <g>
                                    { allArtworks != undefined ? allArtworks.map((work, i) => {
                                        
                                        let pos = {
                                            x: x(work.metrics[xAxis].mean),
                                            y: y(work.metrics[yAxis].mean)
                                        }
                                        
                                        return (<Dot key={i} work={work} pos={pos} setBackdrop={setBackdropImg} setDetailsPopupData={setDetailsPopupData}/>)
                                    }) : ""}
                                </g>
                                <ScatterPlotLinearGradients />
                            </svg>
                            {getLabels()}
                        </div>

                    <div style={{height: 'calc(100% - 135px)'}} className='w-full flex justify-center align-center absolute top-12 left-0'>
                            {backdropImg ? 
                                <img style={{maxHeight: "70%", maxWidth: "80%", objectFit: "contain", margin: "auto auto", transform: "translateY(0vh)"}} className='z-0 w-full h-full' src={backdropImg} /> 
                                : ''}
                    </div>
                </div>
                <ScatterplotOptions xAxis={xAxis} setXAxis={setXAxis} yAxis={yAxis} setYAxis={setYAxis} />
            </div>
            <ArtDetailsPopup artwork={detailsPopupData} setArtwork={setDetailsPopupData} />
        </div>
    );
}

export default Scatterplot;