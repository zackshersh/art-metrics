import React, { useEffect, useState } from 'react';
import { useDeviceDetection } from '../utils/hooks';

function MiniArtworkDisplay({artwork, verticalLayout}) {

    const [enlarged, setEnlarged] = useState(false);
    const [touchMode, setTouchMode] = useState(false);
    const [touchStartPos, setTouchStartPos] = useState();

    // const [showEnlargeTooltip, setShowEnlargeTooltip] = useState(true);

    // useEffect(() => {
    //     if(enlarged == true) setShowEnlargeTooltip(false);
    // }, [enlarged])

    const handleTouchStart = (e) => {
        setEnlarged(true); 
        setTouchMode(true);
    }





    return (
        <div className=''>

            <div className={`w-full h-full flex justify-center items-center min-h-full ${ verticalLayout ? "max-h-[35vh] max-w-[80vw]" : "max-h-[70vh] max-w-[50vw]"} overflow-hidden relative`}>
                <img  style={{
                    boxShadow: "rgba(0, 0, 0, 0.4) 0px 4px 8px 0px",
                }} 
                    // onMouseEnter={() => {setEnlarged(true)}}
                    // onMouseLeave={() => {setEnlarged(false)}}
                    onMouseDown={() => {setEnlarged(true)}}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={() => {setEnlarged(false)}}
                    className={`object-contain cursor-pointer rounded-md ${ verticalLayout ? "max-h-[35vh] max-w-[80vw]" : "max-h-[70vh] max-w-[50vw]"}`} 
                    src={artwork.work_data.img_url} />
                <p className='absolute top-2 left-2 rounded-md bg-stone-200 py-1 px-2 text-sm opacity-55 pointer-events-none'>+ Click to Enlarge</p>
            </div>
            <div className='pt-3'>
                <h5 className={`${verticalLayout ? "text-md" : "text-lg"} italic leading-snug`}>{artwork.work_data.title}</h5>
                <h5 className={`${verticalLayout ? "text-sm" : ""}`}>{artwork.work_data.artist}</h5>
            </div>

            { enlarged ? 
                <div className={`absolute min-w-[100vw] min-h-[100vh] p-4 top-0 left-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-40 overflow-hidden`}
                    onMouseDown={() => {setEnlarged(false)}}
                >
                    <img style={{
                        // transform: `translateX(${imageTranslate[0]}px)`
                    }}
                    className={`rounded-md ${touchMode ? "absolute object-cover": "object-contain max-h-[90vh] max-w-[90vw]"}`} 
                    src={artwork.work_data.img_url}/>
                </div>: ""}

        </div>
    );
}

export default MiniArtworkDisplay;