import React, { useState } from 'react';
import { getElemDimmensions } from '../utils/utils';

import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

function Dot({work, pos, setBackdrop, setDetailsPopupData}) {


    const [textStyle, setTextStyle] = useState("13px Neue-Montreal");
    const [labelString, setLabelString] = useState("View Details →")
    const [textDims, setTextDims] = useState(getElemDimmensions("text", labelString, {style: {font: textStyle}}));

    const [radius, setRadius] = useState(4);
    const [workData, setWorkData] = useState(work.work_data);
    const [active, setActive] = useState(false);

    const [maskID, setMaskID] = useState(Math.floor(Math.random() * 999999));

    const labelPadding = {
        x: 16,
        y: 14
    }

    const navigate = useNavigate();

    const large = 6;
    const small = 4;


    const mouseEnter = () => {
        try {
            setBackdrop(workData.img_url);

        } catch (err) {
            console.error(err);
        }

        setActive(true);
        setRadius(large);
    }

    const mouseLeave = () => {
        setBackdrop(undefined);

        setActive(false)
        setRadius(small);
    }

    const handleMouseDown = () => {
        console.log(isMobile)
        // special mobile touch behavior
            // if on mobile, touching once will set to active and have art preview
            // if already active, then will set popupdata
        if(isMobile){

        } else {

            if(active){
                setDetailsPopupData(work)
                // navigate(`/details/${work._id}`)
            }     

        }
    }

    const handleTouchStart = () => {
        // setActive(true);
        if(!active){
            setActive(true);
        } else {
            setDetailsPopupData(work);
        }
    }

    const getMaskRect = () => {

        let inactiveRadius = 8

        let w = active ? textDims.width + labelPadding.x : inactiveRadius;
        let h = active ? textDims.height + labelPadding.y : inactiveRadius;

        let mW = 100;
        let mH = 50;

        let rx = active ? 4 : 9999;

        return {
            mask: <g>
                    <rect  x={pos.x - (mW/2)} y={pos.y - (mH/2)} width={mW} height={mH} fill='black'></rect>
                    <rect  x={pos.x - w/2} y={pos.y - h/2} width={w} height={h} fill='white' rx={rx}></rect>
                </g>,
            border: <rect onMouseDown={handleMouseDown} x={pos.x - w/2} y={pos.y - h/2} width={w} height={h} fill={active ? "white" : "black"} stroke='black' rx={rx}></rect>,
        }
    }

    return (
        <g>
            <mask id={maskID}>
                {getMaskRect().mask}
            </mask>

            {getMaskRect().border}

            <text fill='black' onMouseDown={handleMouseDown} visibility={active ? "visible" : "hidden"} x={pos.x - (textDims.width/2)} y={pos.y + (textDims.height/3)} mask={`url(#${maskID})`} style={{font: textStyle}}>{labelString}</text>

            <circle cx={pos.x} cy={pos.y} fill='rgba(0,0,0,0)' r={(radius+6).clamp(0,large+20)} data-work-data={workData} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}></circle>
        </g>
    );
}

export default Dot;