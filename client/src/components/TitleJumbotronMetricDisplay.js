import React, { useEffect, useRef, useState } from 'react';
import SvgDynamicIcon from './SvgDynamicIcon';
import { lerp, scale } from '../utils/utils';
import { easeCubicInOut, easePolyInOut, easePolyOut } from 'd3';


class Manager {
    constructor(minLabel, maxLabel){

        this.minLabel = minLabel;
        this.maxLabel = maxLabel;

        this.elem = undefined;
        this.value = 0;

        this.transitionStartVal = 0;
        this.targetValue = 0;
        this.increment = 0.1;

        this.transitionT = 0;

        this.interval = undefined;
    }

    init(elem, setValue, setT){
        this.elem = elem;
        console.log(this.elem);

        this.interval = setInterval(() => {
            setValue(this.value);
            setT(this.transitionT)
            this.update();
        },50)
    }

    newTarget(targetValue){
        this.targetValue = targetValue;
        this.transitionT = 0.1;
    }

    update(){

        let easedT = easePolyOut(this.transitionT);
        this.value = lerp(this.transitionStartVal, this.targetValue, easedT);

        if(1-this.transitionT < this.increment || this.transitionT >= 1){
            this.transitionT = 1;
            this.transitionStartVal = this.targetValue;
        } else {
            this.transitionT += this.increment;

        }


        this.updateElem()
        
    }

    updateElem(){
        let activeLabel = "";

        if(this.value > 0) {
            activeLabel = this.maxLabel
        } else if(this.value < 0){
            activeLabel = this.minLabel
        }
        let percent = Math.abs( Math.floor( this.value * 100 ) );
        this.elem.innerHTML = `${percent}% ${activeLabel}`
    }
}
function TitleJumbotronMetricDisplay({targetValue, minLabel, maxLabel}) {

    const [value, setValue] = useState(0);
    const [t, setT] = useState(0);

    const [percent, setPercent] = useState("");
    const [activeLabel, setActiveLabel] = useState("");

    const spanRef = useRef();

    useEffect(() => {


        if(targetValue > 0) {
            setActiveLabel(maxLabel)
        } else if(targetValue < 0){
            setActiveLabel(minLabel)
        }

        let percent = Math.abs( Math.floor( targetValue * 100 ) );
        setPercent(percent + "%");



        setValue(targetValue)
    }, [targetValue])
    // const [manager, setManager] = useState(new Manager(minLabel, maxLabel));

    // useEffect(() => {
    //     if(spanRef.current){
    //         manager.init(spanRef.current, setValue, setT)
    //     }
    // },[])

    // useEffect(() => {

    //     manager.newTarget(targetValue);
    // },[targetValue])


    return (
        <div style={{
            opacity: scale(Math.sin(t * Math.PI),0,1,1,0.4)
        }} className='flex items-center min-w-20'>
            <div style={{
                // transform: `scale(${ scale(Math.abs(value), 0, 1, 0.3, 0.7) })`,
                transform: "scale(0.7)"
            }}>
                <SvgDynamicIcon valueName={`${minLabel}_${maxLabel}`} value={value} scaleFactor={1} colorExagerationFactor={1} />
            </div>
            <div className='*:block '>
                <span className='text-white text' >{percent}</span>
                <span className='text-white text-xs capitalize mt-[-3px]' >{activeLabel}</span>

            </div>
        </div>
    );
}

export default TitleJumbotronMetricDisplay;