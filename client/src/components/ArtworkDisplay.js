import React from 'react';
import TextWithLabel from './TextWithLabel';
import RangeDisplay from './RangeDisplay';

function ArtworkDisplay({artwork={}, largeImage, largeText, compact}) {

    const titleStyles = `italic`;
    const artistStyles = ``;
    const otherTextStyles = `${largeText ? "visible" : "hidden"}`;
    console.log(artwork)

    const getMetricDisplays = () => {
        let arr = [];

        let i = 0;
        for (const [key, value] of Object.entries(artwork.metrics)){
            let metric = value;
            metric.name = key;
            console.log(key)
            arr.push(
                <RangeDisplay key={i} title={key} data={metric} />
            )

            i++;
        }
        return arr;
    }

    return (
        <div className={`bg-stone-300 shadow shadow-stone-300 rounded-md px-3 py-3 ${!compact ? "inline-flex justify-center flex-col sm:flex-row" : "inline-block"}`}>
            <div style={{maxHeight: "70vh", minHeight: "400px"}} className='max-h-1/2 sm:max-w-1/2'>
                <img className='object-contain w-full h-full rounded-md' src={artwork.work_data.img_url} />

            </div>
            {compact ? "" :
                <div className='p-2'></div>
            }

            { compact ? 

                // COMPACT LAYOUT
                <div className='py-2 px-1'>
                    <h5 className='italic'>{artwork.work_data.title}</h5>
                    <h5>{artwork.work_data.artist}</h5>
                </div>

                :

                // EXPANDED LAYOUT
                <div className={`max-h-1/2 sm:w-1/2 md:max-w-[500px]  p-4 shadow-inner shadow-stone-100 bg-stone-50 rounded-md overflow-scroll`}>
                    <TextWithLabel mainText={artwork.work_data.title} size={"lg"} label={"Title"} styles={titleStyles} />
                    <TextWithLabel mainText={artwork.work_data.artist ? artwork.work_data.artist : "Unknown"} size={"lg"} label={"Artist"} styles={artistStyles} />
                    <div className='flex flex-wrap pt-2'>
                        <TextWithLabel mainText={artwork.work_data.date} size={"sm"} label={"Date"} styles={`${otherTextStyles} pr-5`} width='1/2'/>
                        <TextWithLabel mainText={artwork.work_data.origin} size={"sm"} label={"Origin"} styles={otherTextStyles} width='1/2' />
                    </div>
                    <div className='w-full mt-7'>
                        <div className='border border-red-500 min-w-[300px] p-2'></div>
                        <h3 className='text-xl'>Average User Ratings</h3>
                        <div className=''>
                            {getMetricDisplays()}
                        </div>
                     </div>   
                </div>
            }
        </div>
    );
}

export default ArtworkDisplay;