import React, { useEffect, useMemo, useState } from 'react';

import { dropShadow, smallDropShadow } from '../components/boxShadowStyles';
import { getAllArtworks } from '../utils/api';
import TitleJumbotronMetricDisplay from './TitleJumbotronMetricDisplay';
import TitleJumbotronDataBar from './TitleJumbotronDataBar';

function TitleJumbotron(props) {

    const [allArtworks, setAllArtworks] = useState([]);
    const [bkgImageURL, setBkgImageURL] = useState("");
    const [bkg1Index, setBkg1Index] = useState(0);
    const [bkg2Index, setBkg2Index] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [artworkTitle, setArtworkTitle] = useState("");

    const [numUpdates, setNumUpdates] = useState(0);



    useEffect(() => {

        const shuffle = (array) => {
            let _array = [...array];
            let currentIndex = _array.length;

            while (currentIndex != 0) {
              let randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [_array[currentIndex], _array[randomIndex]] = [
                _array[randomIndex], _array[currentIndex]];
            }

            return _array;
        }

        const getAll = async () => {
            try {
                let res = await getAllArtworks();
                let all = await res.json();
                all = shuffle(all);

                setAllArtworks(all);

            } catch (err) {
                console.error(err);
            }
        }

        getAll();

    },[]);

    useEffect(() => {

        let i = 2;


        const interval = setInterval(() => {
            // console.log(bkgIndex+1);
            if(i % 2){
                setBkg1Index(i % allArtworks.length);
                setCurrentIndex(i % allArtworks.length);
            } else {
                setBkg2Index(i % allArtworks.length);
                setCurrentIndex(i % allArtworks.length);
            }

            // if(i >= allArtworks.length) i = 0;
            // setBkgIndex(i % allArtworks.length);
            i++;
            setNumUpdates(i)
        }, 5000);

        return () => clearInterval(interval);
    },[allArtworks])




    
    return (
        <div style={{boxShadow: dropShadow}} className='bg-black relative rounded-lg mb-5 border border-stone-900 border-8'>
            <div className='absolute bottom-0 w-full flex justify-center p-6 '>
                <TitleJumbotronDataBar currentWork={allArtworks.length > 0 ? allArtworks[currentIndex] : undefined} />
            </div>
            <div style={{
                backgroundImage: allArtworks.length > 0 ? `url(${allArtworks[bkg1Index].work_data.img_url})` : "",
                backgroundPosition: "center",
                backgroundSize: "contain",
                boxShadow: dropShadow,
                opacity: numUpdates % 2 ? 0 : 1,
                transitionProperty: "opacity",
                transitionDuration: "1.5s"
            }} className='rounded-lg  w-full h-full absolute top-0'>

            </div>
            <div style={{
                backgroundImage: allArtworks.length > 0 ? `url(${allArtworks[bkg2Index].work_data.img_url})` : "",
                backgroundPosition: "center",
                backgroundSize: "contain",
                boxShadow: dropShadow,
                opacity: numUpdates % 2 ? 1 : 0,
                transitionProperty: "opacity",
                transitionDuration: "1.5s",
            }} className='rounded-lg w-full h-full absolute top-0'>

            </div>
        </div>
    );
}

export default TitleJumbotron;