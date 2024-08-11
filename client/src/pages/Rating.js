import React, { useEffect, useState } from 'react';
import { getAllArtworks, submitRatings } from '../utils/api';
import ArtworkDisplay from '../components/ArtworkDisplay';
import { addToVisited, checkIfVisited } from '../utils/localStorage';
import RatingInputs from '../components/RatingInputs';
import MiniArtworkDisplay from '../components/MiniArtworkDisplay';
import Nav from '../components/Nav'; 

import { useWindowSize } from '../utils/hooks';
import { Link } from 'react-router-dom';


function Rating(props) {

    const [allArtworks, setAllArtworks] = useState(undefined);
    const [currentWorkIndex, setCurrentWorkIndex] = useState(0);

    const currentWork = () => {console.log(allArtworks, currentWorkIndex) ; return allArtworks[currentWorkIndex]};

    // const userRatingsDefault = {
    //     boba_kiki: 0,
    //     fresh_smelly: 0,
    //     sleepy_amped: 0,
    //     // tracks which values have been set yet
    //     // when a input is interacted with for the first time, it pushes its name into this array
    //         // canSubmit only set when the length of the array is equal to # of inputs
    //     valuesSet: []
    // }
    // const [userRatings, setUserRatings] = useState(userRatingsDefault);

    const [boba_kiki, setBoba_Kiki] = useState(0);
    const [fresh_smelly, setFresh_Smelly] = useState(0);
    const [sleepy_amped, setSleepy_Amped] = useState(0);
    const [valuesSet, setValuesSet] = useState([]);

    const addNewValueSet = (valueName) => {
        let index = valuesSet.indexOf(valueName);
        if(index == -1){
            let newArr = [...valuesSet, valueName];
            // updated.valuesSet.push(name);
            setValuesSet(newArr);
        }
    }
 
    const [canSubmit, setCanSubmit] = useState(false);

    const initialize = () => {
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

    }

    useEffect(() => {
        initialize();
    },[])

    useEffect(() => {
        
        if(!allArtworks) return;

        try {
            if( checkIfVisited( currentWork()._id ) ){
                advanceToNext();
            }
        } catch (err) {
            console.error(err);
        }

    },[allArtworks])

    const reset = () => {
        console.log("RESET")
        // setUserRatings({...userRatingsDefault});
        setBoba_Kiki(0);
        setFresh_Smelly(0);
        setSleepy_Amped(0);
        setValuesSet([]);
    }

    // *****************
    // ADVANCING TO NEXT
    // *****************
    const handleSubmit = async () => {
        // console.log(userRatings)
        // let ratingsCopy = {...userRatings};
        // delete ratingsCopy.valuesSet;
        let ratings = {
            boba_kiki: boba_kiki,
            fresh_smelly: fresh_smelly,
            sleepy_amped: sleepy_amped
        }
        submitRatings(currentWork()._id, ratings);

        addToVisited(currentWork()._id);

        advanceToNext();
        reset();
    }

    const handleSkip = () => {
        console.log("SKIP")
        if(checkIfValidCurrentWork()){
            addToVisited(currentWork()._id);
        }

        advanceToNext();
        reset();
    }

    const advanceToNext = () => {
        let i = 1;
        while(i < 300){

            if(currentWorkIndex + i >= allArtworks.length){
                setCurrentWorkIndex(undefined);
                console.log("_________")
                // return;
                i = 999999;
                break;
            }

            let _id =  allArtworks[currentWorkIndex + i]._id;

            if(checkIfVisited(_id)){
                i++;
            } else {
                break;
            }
        }

        setCurrentWorkIndex(currentWorkIndex + i);
    }


    // ************************
    // CHECKING IF OK TO SUBMIT
    // ************************
    const checkIfAllMetricsRated = () => {

        try {
            const submitThreshold = allArtworks ? Object.keys(allArtworks[currentWorkIndex].metrics).length : 1000;
            return valuesSet.length >= submitThreshold

        } catch (error) {
            console.error(error)            
        }

    }

    const checkIfValidCurrentWork = () => {
        if(!allArtworks) return false;

        return allArtworks[currentWorkIndex] != undefined;
    }



    // *****************
    // ANY UPDATE AT ALL
    // *****************
    useEffect(() => {

        if(checkIfAllMetricsRated() && checkIfValidCurrentWork()){
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    })

    const screenIsWiderThan = (width) => {
        if(window.innerWidth > width){
            return true;
        } else {
            return false;
        }
    }

    const [verticalLayout, setVerticalLayout] = useState(screenIsWiderThan(768));
    
    useEffect(() => {
        setVerticalLayout( !screenIsWiderThan(768) )
    },[useWindowSize()])

    return (
        <div className=' bg-stone-100 h-screen'
            style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gridTemplateRows: "50px 1fr"
            }}>
            {/* <div className='w-full flex justify-center mb-1 py-1 rounded-md hover:bg-stone-300 transition-colors'>
                <Link to={"/home"}>← Home</Link>
            </div> */}
            <Nav></Nav>
            <div style={{
                // boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px -4px inset"
            }}
            className={`bg-stone-300 p-2 flex ${verticalLayout ? "flex-col-reverse " : "flex-row items-center"}`}>

                {/* <RatingInputs userRatings={userRatings} setUserRatings={setUserRatings} canSubmit={canSubmit} setCanSubmit={setCanSubmit} submitHandler={handleSubmit} skipHandler={handleSkip} sizingStyles={verticalLayout ? "w-full" : "w-2/5"} verticalLayout={verticalLayout}/> */}
                <RatingInputs ratingsState={{
                    boba_kiki: boba_kiki,
                    setBoba_Kiki: setBoba_Kiki,
                    fresh_smelly: fresh_smelly,
                    setFresh_Smelly: setFresh_Smelly,
                    sleepy_amped: sleepy_amped,
                    setSleepy_Amped: setSleepy_Amped
                }} addNewValueSet={addNewValueSet} canSubmit={canSubmit} setCanSubmit={setCanSubmit} submitHandler={handleSubmit} skipHandler={handleSkip} sizingStyles={verticalLayout ? "w-full" : "w-2/5"} verticalLayout={verticalLayout}/>


                <div className='SPACER pl-3'> </div>
                <div className={`${verticalLayout ? "w-full": "w-3/5"} h-full `}>
                    <div className='flex justify-center items-center h-full p-3 w-full rounded-lg'>
                        {checkIfValidCurrentWork() ? <MiniArtworkDisplay artwork={allArtworks[currentWorkIndex]} verticalLayout={verticalLayout}/> : "No Artworks Left"}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Rating;