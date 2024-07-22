import React from 'react';
import Dropdown from './Dropdown';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { softDropShadow } from './boxShadowStyles';

function ScatterplotOptions({xAxis, setXAxis, yAxis, setYAxis}) {

    const handleXAxis = (value) => {;
        setXAxis(value);
    }
    const handleYAxis = (value) => {
        setYAxis(value);
    }

    const navigate = useNavigate();

    const metricOptions = ["boba_kiki", "fresh_smelly", "sleepy_amped"]
    return (
        <div style={{boxShadow: softDropShadow}} className='absolute bottom-0 w-full p-3 border-t border-stone-300 bg-stone-200 flex flex-col sm:flex-row  sm:justify-between z-30'>
            <div className='flex *:mr-4 mb-3 sm:mb-0'>
                <Dropdown title={"X-Axis"} options={metricOptions} handler={handleXAxis} dropdownIndex={0}/>
                <Dropdown title={"Y-Axis"} options={metricOptions} handler={handleYAxis} startingIndex={1} dropdownIndex={1}/>
            </div>
            <Button importance='primary' fillHeight={true} label={"Rate the Artworks"} active={true} handler={() => {
                navigate("/rating")
            }} />
        </div>
    );
}

export default ScatterplotOptions;