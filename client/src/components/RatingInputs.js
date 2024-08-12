import React, {useEffect, useState} from 'react';
import RangeInput from './RangeInput';
import Button from './Button';

import { Link } from 'react-router-dom';

import Nav from './Nav';
import PopupWrapper from './PopupWrapper';
import BobaKikiExplanation from './BobaKikiExplanation';

function RatingInputs({ratingsState, addNewValueSet, canSubmit, setCanSubmit, submitHandler, skipHandler, parentReset, sizingStyles, verticalLayout}) {

    const { boba_kiki,
        setBoba_Kiki,
        fresh_smelly,
        setFresh_Smelly,
        sleepy_amped,
        setSleepy_Amped} = ratingsState;


    const setRatingValue = (value, name) => {

        switch(name){
            case "boba_kiki":
                setBoba_Kiki(value);
                break;
            case "fresh_smelly":
                setFresh_Smelly(value);
                break;
            case "sleepy_amped":
                setSleepy_Amped(value);
                break;
        }

        addNewValueSet(name);

    }

    const [showBKPopup, setShowBKPopup] = useState(false);

    const triggerBKPopup = () => {
        setShowBKPopup(true);
    }


    return (
        <div className={`${sizingStyles} p-3 rounded-md flex flex-col justify-center`}>

            <div style={{
                // display: "grid",
                // gridTemplateRows: "1fr 1fr 1fr",//verticalLayout ? "1fr 1fr 1fr" : "1fr",
                // gridTemplateColumns: "1fr", //verticalLayout ? "1fr" : "1fr 1fr 1fr",
                height:  "auto"}} 
            className={``}>

                <RangeInput name={"boba_kiki"} minLabel={"Boba"} maxLabel={"Kiki"} value={boba_kiki} setValue={setRatingValue} verticalLayout={verticalLayout} verticallyCompact={verticalLayout} hasTooltip showBKPopup={triggerBKPopup}/>

                <RangeInput name={"fresh_smelly"} minLabel={"Fresh"} maxLabel={"Smelly"} value={fresh_smelly} setValue={setRatingValue} verticalLayout={verticalLayout} verticallyCompact={verticalLayout}/>

                <RangeInput name={"sleepy_amped"} minLabel={"Sleepy"} maxLabel={"Amped"} value={sleepy_amped} setValue={setRatingValue} verticalLayout={verticalLayout} verticallyCompact={verticalLayout}/>

            </div>

            <div className={`${verticalLayout ? "flex" : ""}`}>
                <Button handler={submitHandler} label={"Next"} active={canSubmit} importance='primary' size='lg' sizingStyles={verticalLayout ? "w-3/5 mr-4" : "w-full"}/>
                <Button handler={skipHandler} label={"Skip"} active={true} importance='secondary' sizingStyles={verticalLayout ? "w-2/5" : "w-full"}/>
            </div>

            <PopupWrapper active={showBKPopup} setActive={setShowBKPopup}>
                <BobaKikiExplanation />
            </PopupWrapper>
        </div>
    );
}

export default RatingInputs;