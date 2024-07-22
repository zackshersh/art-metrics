import React, {useState, useEffect, useMemo} from 'react';
import { clamp, lerp, scale } from '../utils/utils';
import DynamicIconWrapper from './DynamicIconWrapper';

function TitleDynamicIconSlider({valueName, t}) {

    const [value, setValue] = useState(0);
    // const [startVal, setStartVal] = useState(-1);
    // const [endVal, setEndVal] = useState(1);

    const [points, setPoints] = useState({
        start: -1,
        end: 1
    })
    const [lastT, setLastT] = useState(0);

    const getWidth = () => window.innerWidth * 0.65;
    const [width, setWidth] = useState(getWidth());

    window.addEventListener("resize", () => {
        setWidth(getWidth());
    })

    const [restarting, setRestarting] = useState(0);

    const [endValInit, setEndValInit] = useState(false);

    const [animationManager, setAnimationManager] = useState({
        lastT: 0,

        startVal: -1,
        endVal: 1,
        update: t => {
            let dif = Math.abs(t - lastT);
            if(dif > 0.5){
                this.startVal = this.endVal
                this.endVal = scale(Math.random(),0,1,-0.7,0.7);
            }
            console.log(this)
            setValue(lerp(this.startVal, this.endVal, t));
        }
    })

    // let startVal = useMemo(() => {
    //     // return endVal;
    //     console.log(endValInit);
    //     if(endValInit){
            
    //         return endVal;
    //     } else {
    //         return scale(Math.random(),0,1,-0.7,0.7);
    //     }
    // }, [restarting]);

    // let endVal = useMemo(() => {
    //     setEndValInit(true);
    //     console.log("geyy")
    //     return scale( Math.random(), 0, 1, -1, 1);
    // }, [startVal]);

    useEffect(() => {

        // let unboundUpdate = animationManager.update
        // let boundUpdate = unboundUpdate.bind(animationManager);
        // boundUpdate(t);
        let dif = t - lastT;
        setLastT(t);
        if(dif < 0){
            // let ev = endVal;
            setPoints({
                start: points.end,
                end: scale( Math.random(), 0, 1, -1, 1)
            })
            // setEndVal(scale( Math.random(), 0, 1, -1, 1));
            // setValue(scale( Math.random(), 0, 1, -1, 1));

            // setStartVal(ev);

            setRestarting(restarting + 1);
        }
        setValue(lerp(points.start, points.end, t));
    }, [t])

    const generateTicks = () => {

        let spacing = 84;
        spacing = (width/2) / Math.round((width/2)/spacing)
        let tickHeight = 8;

        let arr = [];

        for(var x=0; x <= width+1; x += spacing ){
            arr.push(<line x1={x} y1={32 - (tickHeight/2)} x2={x} y2={32 + (tickHeight/2)} stroke='#aaaaaa' strokeWidth={2}/>)
        }

        return arr;
    }

    const bigTickHeight = 20;

    return (
        <div style={{
            width: width,
            height: 64
        }} className=' my-2 relative flex items-center'>
            <div style={{
                top: 0,
                left: clamp( scale(points.end, -1, 1, 0, width), 48, width-96),
                transitionProperty: "left",
                transitionDuration: "1.3s",
            }} className='absolute'>
                <DynamicIconWrapper valueName={valueName} t={t} value={value} />
            </div>
            <svg width={width} height={64}>
                <line stroke='#aaaaaa' strokeWidth={2} x1={0} y1={32} x2={width} y2={32} />
                <line stroke='#aaaaaa' strokeWidth={2} x1={1} y1={32 - (bigTickHeight/2)} x2={1} y2={32 + (bigTickHeight/2)} />
                <line stroke='#aaaaaa' strokeWidth={2} x1={width-1} y1={32 - (bigTickHeight/2)} x2={width-1} y2={32 + (bigTickHeight/2)} />
                <line stroke='#aaaaaa' strokeWidth={2} x1={width/2} y1={32 - (bigTickHeight/2)} x2={width/2} y2={32 + (bigTickHeight/2)} />
                {generateTicks()}
            </svg>
        </div>
    );
}

export default TitleDynamicIconSlider;