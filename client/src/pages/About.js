import React, { useState } from 'react';
import Nav from '../components/Nav';
import { getMetricColors, rgbArrayToCSS } from '../utils/utils';
import { dropShadow, smallDropShadow, softDropShadow } from '../components/boxShadowStyles';


function MetricExplanation({metric, min, max, text}){

    const [colors, setColors] = useState(getMetricColors(metric));

    return (
        <div style={{boxShadow: softDropShadow}} className='w-full md:w-[48%] *:flex-grow rounded-lg bg-stone-900 p-3 mt-5 relative'>
            <div style={{
                background: `linear-gradient(to right, ${rgbArrayToCSS(colors.start)}, ${rgbArrayToCSS(colors.end)})`
            }} className='p-2 w-full rounded-full'></div>
            <div className='relative'>
                <div className='flex justify-between items-start mt-1'>
                    <h5 style={{color: rgbArrayToCSS(colors.start)}} className='text-xl font-bold'>{min}</h5>
                    <h5 style={{color: rgbArrayToCSS(colors.end)}} className='text-xl font-bold'>{max}</h5>
                </div>
                <div className='w-full flex justify-center absolute top-0'>
                    <p className='text-stone-200'>vs.</p>
                </div>
            </div>
            <div className=''>
                <p className='text-stone-200 text-[0.93rem] leading-[1.2rem] mt-3'>{text}</p>
            </div>
        </div>
    )
}
function About(props) {
    return (
        <div>
            <Nav />
            <main className='p-6'>
                <h1 className='text-7xl font-bold'>Art Metrics</h1>

                <section className='mt-4'>
                    <h3 className='text-2xl'>The meanings of the different metrics are intended to be left open to the interpretation of the user, but here are some general pointers:</h3>
                    <div className='flex flex-wrap justify-between'>
                        <MetricExplanation metric={"boba_kiki"} min={"Boba"} max={"Kiki"} text={
                            `Boba and Kiki are in reference to the Boba/Kiki effect, which was first discovered in a study that when given a list of nonsensical words and arbitrary shapes, subjects would consistently assign words like "Kiki" to sharp or spiky shapes and would assign words like "Boba" to round shapes.`
                        }/>
                        <MetricExplanation metric={"fresh_smelly"} min={"Fresh"} max={"Smelly"} text={"Fresh and Smelly refer "} />
                        <MetricExplanation metric={"sleepy_amped"} min={"Sleepy"} max={"Amped"} />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default About;