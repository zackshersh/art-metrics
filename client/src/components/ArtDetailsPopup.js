import React from 'react';
import ArtworkDisplay from './ArtworkDisplay';
import TextWithLabel from './TextWithLabel';
import RangeDisplay from './RangeDisplay';
import { dropShadow } from './boxShadowStyles';

function ArtDetailsPopup({artwork, setArtwork}) {

    const getMetricDisplays = () => {
        let arr = [];

        let i = 0;
        for (const [key, value] of Object.entries(artwork.metrics)){
            let metric = value;
            metric.name = key;
            arr.push(
                <RangeDisplay key={i} title={key} data={metric} />
            )

            i++;
        }
        return arr;
    }

    const handleExit = (e) => {
        console.log(e.target.dataset.cantriggerexit)
        if(e.target.dataset.cantriggerexit){
            setArtwork(undefined)
        }
    }

    return (
        <div data-cantriggerexit={true} className={`absolute w-full h-full top-0 bg-[rgba(0,0,0,0.4)] z-50 ${artwork ? "block" : "hidden"} flex justify-end`} onMouseDown={handleExit}>
            { artwork ?
                <div className='p-3 py-8 sm:py-3 bg-stone-300 h-full w-full sm:w-auto sm:min-w-[500px] sm:max-w-[80vw] md:max-w-[50vw] overflow-y-auto'>
                    <p data-cantriggerexit={true} onMouseDown={handleExit} className='text-stone-600 mb-3 ml-3 sm:ml-0 cursor-pointer underline underline-offset-4 hover:text-stone-400 transition-colors'>← Back</p>
                    <div className='flex justify-center'>
                        <div>
                        <img style={{boxShadow: dropShadow}} className='object-contain w-full h-full rounded-md max-h-[50vh] max-w-[90vw] sm:max-h-[50vh] sm:max-w-[50vw]' src={artwork.work_data.img_url} />
                        </div>
                    </div>
                    <div className='p-3 bg-stone-100 mt-3 rounded-md shadow shadow-inner shadow-stone-400'>
                        <div className=''>
                            <TextWithLabel mainText={artwork.work_data.title} size={"lg"} label={"Title"} styles={'italic'}  />
                            <TextWithLabel mainText={artwork.work_data.artist || "Unknown"} size={"lg"} label={"Artist"} />
                            <div className='flex flex-wrap pt-2'>
                                <TextWithLabel mainText={artwork.work_data.date} size={"sm"} label={"Date"} styles={`pr-5`} width='1/2'/>
                                <TextWithLabel mainText={artwork.work_data.origin} size={"sm"} label={"Origin"}  width='1/2' />
                            </div>
                        </div>
                        <div className='w-full mt-4'>
                            <hr className='mb-3 border-stone-300' />
                            <h3 className='text-lg'>Average User Ratings</h3>
                            <div className=''>
                                {getMetricDisplays()}
                            </div>
                        </div>   
                    </div>
                </div> : ""

            }
        </div>
    );
}

export default ArtDetailsPopup;