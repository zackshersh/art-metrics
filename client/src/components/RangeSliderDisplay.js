import React, { useEffect, useState } from 'react';
import { rangeInputShadow } from './boxShadowStyles';
import { clamp } from '../utils/utils';
import SvgDynamicIcon from './SvgDynamicIcon';

function RangeSliderDisplay({value, valueName, minLabel, maxLabel, verticallyCompact}) {

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

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
        }} className={`p-1 pl-2 mb-1 bg-stone-100 ${verticallyCompact ? "h-10" : "h-[60px]"} rounded-md  border border-stone-400 bg-stone-100 flex items-center *:mr-3`}>
            {/* SVG ICON */}
            <SvgDynamicIcon valueName={valueName} value={value} scaleFactor={verticallyCompact ? 0.7 : 1} />
            
            {/* VALUE DISPLAY */}
            <div className={`flex ${verticallyCompact ? "flex-row items-center" : "flex-col"} justify-center`}>
                <h3 className={`transition-all text-nowrap ${verticallyCompact ? "mr-3" : "mb-[-0.25rem]"} ${getValueLabelStyles(minValue)}`}>{minValue.toFixed(0)}% {minLabel}</h3>
                {/* SPACER */}
                <h3 className={`transition-all text-nowrap ${getValueLabelStyles(maxValue)}`}>{maxValue.toFixed(0)}% {maxLabel}</h3>
            </div>
        </div>
    );
}

export default RangeSliderDisplay;