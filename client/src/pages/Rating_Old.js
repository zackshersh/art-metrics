import React, { useEffect, useState } from 'react';
import { getAllArtworks, getArtwork, getRandomArtwork, submitRatings } from '../utils/api';
import ArtworkDisplay from '../components/ArtworkDisplay';
import RangeInput from '../components/RangeInput';
import RatingInputs from '../components/RatingInputs';
import { addToVisited, checkIfVisited } from '../utils/localStorage';

function Rating(props) {

    const [allArtworks, setAllArtworks] = useState(undefined);
    const [currentWork, setCurrentWork] = useState(undefined);
    const [currentWorkIndex, setCurrentWorkIndex] = useState(0);

    const [noRemainingWorks, setNoRemainingWorks] = useState(false);

    const userRatingsDefault = {
        boba_kiki: 0,
        fresh_smelly: 0,
        // tracks which values have been set yet
        // when a input is interacted with for the first time, it pushes its name into this array
            // canSubmit only set when the length of the array is equal to # of inputs
        valuesSet: []
    }
    const [userRatings, setUserRatings] = useState(userRatingsDefault);
 
    const [canSubmit, setCanSubmit] = useState(false);



    useEffect(() => {

        const shuffle = (array) => {

            let _array = [...array];
            let currentIndex = _array.length;
          
            // While there remain elements to shuffle...
            while (currentIndex != 0) {
          
              // Pick a remaining element...
              let randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
          
              // And swap it with the current element.
              [_array[currentIndex], _array[randomIndex]] = [
                _array[randomIndex], _array[currentIndex]];
            }

            return _array;
        }

        const getAll = async () => {
            try {
                let res = await getAllArtworks();
                console.log(res.status)
                let all = await res.json();
                all = shuffle(all);
                setAllArtworks(all);
                console.log(all);
            } catch (err) {
                console.error(err);
            }
        }

        getAll();
    },[]);

    useEffect(() => {
        updateCurrentWork();

    }, [allArtworks, currentWorkIndex])


    const updateCurrentWork = () => {
        if(allArtworks){
            setCurrentWork(allArtworks[currentWorkIndex]);
        }
    }

    const handleSubmit = () => {
        console.log(userRatings)
        let ratingsCopy = {...userRatings};
        delete ratingsCopy.valuesSet;
        submitRatings(currentWork._id, ratingsCopy);

        addToVisited(currentWork._id);

        nextWork();
        reset();
    }

    const handleSkip = () => {
        console.log("SKIP")
        if(currentWorkIndex != -1){
            addToVisited(currentWork._id);

        }

        nextWork();
        reset();
    }

    useEffect(() => {
        console.log(currentWork)
        // if(checkIfVisited(currentWork.id)){
        //     nextWork();
        // }

    },[])
    // checks to see if that artwork was visited and if so, checks the next one, and on and on
    const nextWork = () => {

        let i = 1;
        while(i < 300){

            if(currentWorkIndex + i >= allArtworks.length){
                setNoRemainingWorks(true);
                setCurrentWorkIndex(-1);
                setCanSubmit(false);
                return;
            }

            let _id = allArtworks[currentWorkIndex + i]._id;
            if(checkIfVisited(_id)){
                i++
            } else {
                break;
            }
        }
        setCurrentWorkIndex(currentWorkIndex + i);
    }

    const reset = () => {
        console.log("RESET")
        setUserRatings({...userRatingsDefault});
    }


    useEffect(() => {

        const submitThreshold = 2;
        if(userRatings.valuesSet.length >= submitThreshold){
            if(currentWorkIndex != -1){
                setCanSubmit(true);
            }
        } else {
            setCanSubmit(false);
        }
    },[userRatings])

    return (
        <div>
            <h3>Rating</h3>
            {currentWork  ? <ArtworkDisplay artwork={currentWork} /> : "None Left"}
            <RatingInputs userRatings={userRatings} setUserRatings={setUserRatings} canSubmit={canSubmit} setCanSubmit={setCanSubmit} submitHandler={handleSubmit} skipHandler={handleSkip} parentReset={reset}/>
            
        </div>
    );
}

export default Rating;