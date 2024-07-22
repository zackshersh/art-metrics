import React, {useEffect, useState} from 'react';
import RangeInput from './RangeInput';
import Button from './Button';

import { Link } from 'react-router-dom';



import Nav from './Nav';

function RatingInputs({userRatings, setUserRatings, canSubmit, setCanSubmit, submitHandler, skipHandler, parentReset, sizingStyles, verticalLayout}) {

    // const [boba_kiki, setBoba_Kiki] = useState(0);
    // const [fresh_smelly, setFresh_Smelly] = useState(0);



    const incrementRatedCount = () => {
        console.log("INCREMENTING")
        console.log(userRatings.valuesSet)
        // if(userRatings.numRatingsSet + 1 >= submitThreshold){
        //     setCanSubmit(true);
        // }
    }

    const setRatingValue = (value, name) => {
        let updated = {...userRatings};
        updated[name] = value;

        if(value != 0){
            let index = updated.valuesSet.indexOf(name);
            if(index == -1){
                updated.valuesSet.push(name);
            }
        }
        

        setUserRatings(updated);
    }

    const setBoba_Kiki = (val) => {
        let updated = {...userRatings, boba_kiki: val};

        let index = updated.valuesSet.indexOf("boba_kiki");

        // "boba_kiki" has not been interacted with yet
        if(index == -1){
            updated.valuesSet.push("boba_kiki");
        }


        setUserRatings(updated);
    }

    const setFresh_Smelly = (val) => {
        let updated = {...userRatings, fresh_smelly: val};
        setUserRatings(updated);
    }

    const setSleepy_Amped = (val) => {
        let updated = {...userRatings, sleepy_amped: val};
        setUserRatings(updated);
    }






    // useEffect(() => {
    //     if(userRatings.numRatingsSet + 1 >= submitThreshold){
    //         setCanSubmit(true);
    //     }
    // },[userRatings.numRatingsSet])

    // useEffect(() => {
    //     setUserRatings({
    //         boba_kiki: boba_kiki,
    //         fresh_smelly: fresh_smelly
    //     })
    // }, [boba_kiki, fresh_smelly])

    return (
        <div className={`${sizingStyles} p-3 rounded-md flex flex-col justify-center`}>

            <div style={{
                // display: "grid",
                // gridTemplateRows: "1fr 1fr 1fr",//verticalLayout ? "1fr 1fr 1fr" : "1fr",
                // gridTemplateColumns: "1fr", //verticalLayout ? "1fr" : "1fr 1fr 1fr",
                height:  "auto"}} 
            className={``}>

                <RangeInput name={"boba_kiki"} minLabel={"Boba"} maxLabel={"Kiki"} value={userRatings.boba_kiki} setValue={setRatingValue} incrementRatedCount={incrementRatedCount} verticalLayout={verticalLayout} verticallyCompact={verticalLayout}/>

                <RangeInput name={"fresh_smelly"} minLabel={"Fresh"} maxLabel={"Smelly"} value={userRatings.fresh_smelly} setValue={setRatingValue} incrementRatedCount={incrementRatedCount} verticalLayout={verticalLayout} verticallyCompact={verticalLayout}/>

                <RangeInput name={"sleepy_amped"} minLabel={"Sleepy"} maxLabel={"Amped"} value={userRatings.sleepy_amped} setValue={setRatingValue} incrementRatedCount={incrementRatedCount} verticalLayout={verticalLayout} verticallyCompact={verticalLayout}/>

            </div>

            <div className={`${verticalLayout ? "flex" : ""}`}>
                <Button handler={submitHandler} label={"Submit"} active={canSubmit} importance='primary' size='lg' sizingStyles={verticalLayout ? "w-3/5 mr-4" : "w-full"}/>
                <Button handler={skipHandler} label={"Skip"} active={true} importance='secondary' sizingStyles={verticalLayout ? "w-2/5" : "w-full"}/>
            </div>
        </div>
    );
}

export default RatingInputs;