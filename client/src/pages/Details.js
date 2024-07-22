import React, { useState, useEffect } from 'react';
import { getArtwork } from '../utils/api';
import ArtworkDisplay from '../components/ArtworkDisplay';
import RatingsDistribution from '../components/RatingsDistribution';
import RangeDisplay from '../components/RangeDisplay';
import Nav from '../components/Nav';

function Details(props) {

    const [workData, setWorkData] = useState();

    useEffect(() => {
        let split = window.location.href.split("/");
        let pageID = split[split.length-1];

        const getData = async () => {
            try {
                let res = await getArtwork(pageID);
                let data = await res.json();
                setWorkData(data);
            } catch (err) {
                console.error(err);
            }
        }

        getData();

    },[]);

    const getDistributionPlots = () => {
        let arr = [];

        let i = 0;
        for (const [key, value] of Object.entries(workData.metrics)){
            let metric = value;
            metric.name = key;

            arr.push(
                <RatingsDistribution key={i} data={metric} />
            )

            i++;
        }

        return arr;
    }



    return (
        <div className='flex flex-col h-screen'>
            <Nav />
            <div className='grow flex flex-col justify-center bg-stone-50 p-5'>
                {workData ? 
                    <div className=' flex justify-center'>
                        <ArtworkDisplay compact={false} largeText artwork={workData} /> 


                    </div>
                : ""}

            </div>
        </div>
    );
}

export default Details;