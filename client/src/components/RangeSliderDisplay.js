import React, { useEffect, useState } from 'react';
import { rangeInputShadow } from './boxShadowStyles';
import { clamp } from '../utils/utils';
import SvgDynamicIcon from './SvgDynamicIcon';
import PopupWrapper from './PopupWrapper';
import BobaKikiExplanation from './BobaKikiExplanation';

function RangeSliderDisplay({value, valueName, minLabel, maxLabel, verticallyCompact}) {

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    // const [_value, set_Value] = useState(value);

    // // buffers state change from external value
    //     // "value" updates anytime any of the values is set for any of the ratings
    //     // don't want to do more svg rerenders than necessary because it is very slow
    //     // internal "_value" only updates if "value" is different than last time
    // useEffect(() => {
    //     // if(value == _value){
    //         console.log(valueName, "-----", value, _value)
    //         set_Value(value);
    //     // }
    // }, [value]);

    const [displayBobaKikiExlpanation, setDisplayBobaKikiExplanation] = useState(false);

    const triggerBobaKikiExplanation = () => {
        setDisplayBobaKikiExplanation(true);
    }

    useEffect(() => {

        setMinValue(clamp(value,-1,0)*-100);
        setMaxValue(clamp(value,0,1)*100);

    }, [value])

    const getValueLabelStyles = (value) => {
        if(minValue == 0 && maxValue == 0){
            return "text-md text-stone-500"
        } else if(value > 0){
            return "text-lg md:text-lg font-bold"
        } else if (value == 0){
            return "text-xs text-stone-500"
        }
    }

    return (
        <div style={{
            boxShadow: rangeInputShadow.boxShadow
        }} className={`p-1 pl-1 mb-1 bg-stone-100 ${verticallyCompact ? "h-10" : "h-[60px]"} rounded-md  border border-stone-400 bg-stone-100 flex items-center justify-between *:mr-3`}>
            {/* MAIN CONTENT CONTAINER */}
            <div className='flex items-center h-full'>
                {/* SVG ICON */}
                <SvgDynamicIcon valueName={valueName} value={value} scaleFactor={verticallyCompact ? 0.7 : 1} />
                
                {/* VALUE DISPLAY */}
                <div className={`flex ${verticallyCompact ? "flex-row items-center" : "flex-col"} justify-center`}>
                    <h3 className={`transition-all text-nowrap ${verticallyCompact ? "mr-3" : "mb-[-0.25rem]"} ${getValueLabelStyles(minValue)}`}>{minValue.toFixed(0)}% {minLabel}</h3>
                    {/* SPACER */}
                    <h3 className={`transition-all text-nowrap ${getValueLabelStyles(maxValue)}`}>{maxValue.toFixed(0)}% {maxLabel}</h3>
                </div>
            </div>

            {/* BOBA-KIKI ? CONTAINER */}
            { valueName == "boba_kiki" ? 
                <div className='w-5 h-5 border border-stone-500 p-1 flex justify-center items-center rounded-full cursor-pointer hover:opacity-60' onMouseDown={triggerBobaKikiExplanation}>
                    <p className='text-stone-500 text-sm'>?</p>
                </div> : ""
            }

            <PopupWrapper active={displayBobaKikiExlpanation} setActive={setDisplayBobaKikiExplanation}>
                <BobaKikiExplanation />
            </PopupWrapper>

        </div>
    );
}

export default RangeSliderDisplay;