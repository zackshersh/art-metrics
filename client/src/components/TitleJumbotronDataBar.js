import React, { useEffect, useState } from 'react';
import TitleJumbotronMetricDisplay from './TitleJumbotronMetricDisplay';

import { smallDropShadow } from './boxShadowStyles';


function TitleJumbotronDataBar({currentWork}) {

    const [artworkTitle, setArtworkTitle] = useState("");
    const [artist, setArtist] = useState("");

    const [currentValues, setCurrentValues] = useState({
        boba_kiki: 0,
        fresh_smelly: 0,
        sleepy_amped: 0
    })

    const updateArtworkTitle = () => {
        if(!currentWork) return;

        let title = currentWork.work_data.title;


        let maxLength;
        
        if( window.innerWidth >= 640 ){

            maxLength = Math.floor((window.innerWidth-340)/11);

        } else {

            maxLength = Math.floor((window.innerWidth-40)/11)

        }
        if(title.length > maxLength){
            title = title.slice(0, maxLength) + "..."
        }
        setArtworkTitle(title)
    }
    
    const updateValues = () => {
        setCurrentValues({
            boba_kiki: currentWork.metrics.boba_kiki.mean,
            fresh_smelly: currentWork.metrics.fresh_smelly.mean,
            sleepy_amped: currentWork.metrics.sleepy_amped.mean,
        })
    }

    const update = () => {

        updateValues();
        setArtist(currentWork.work_data.artist);
        updateArtworkTitle();
    }

    useEffect(() => {
        if(currentWork){
            setTimeout(() => {
                update();
            }, 500)
        }
    },[currentWork])

    useEffect(() => {
        window.addEventListener("resize", updateArtworkTitle);

        return () => {
            window.removeEventListener("resize", updateArtworkTitle, true)
        }
    }, [])


    if(!currentWork) return (<div></div>)
    return (
        <div style={{boxShadow: smallDropShadow}} className='z-10 p-1 rounded-md bg-[rgba(0,0,0,0.5)] sm:bg-stone-900 justify-between w-full flex flex-col sm:flex-row'>
                <div className='pl-3 *:text-neutral-200'>
                    {/* <h3 className='italic text font-bold'>{allArtworks.length > 0 ? allArtworks[currentIndex].work_data.title : ""}</h3> */}
                    <h3 className='italic text font-bold'>{artworkTitle}</h3>

                    <h5 className='text-sm mt-[-4px]'>{artist}</h5>
                </div>
                <div className='flex flex-wrap *:mx-3 mt-3 sm:mt-0'>
                    <TitleJumbotronMetricDisplay targetValue={ currentValues.boba_kiki } minLabel={"boba"} maxLabel={"kiki"} />
                    <TitleJumbotronMetricDisplay targetValue={ currentValues.fresh_smelly } minLabel={"fresh"} maxLabel={"smelly"} />
                    <TitleJumbotronMetricDisplay targetValue={ currentValues.sleepy_amped } minLabel={"sleepy"} maxLabel={"amped"} />
                </div>
        </div>
    );
}

export default TitleJumbotronDataBar;