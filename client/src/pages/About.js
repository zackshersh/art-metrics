import React, { useState } from 'react';
import Nav from '../components/Nav';
import { getMetricColors, rgbArrayToCSS } from '../utils/utils';
import { dropShadow, smallDropShadow, softDropShadow } from '../components/boxShadowStyles';

import boba_kiki_img from "../assets/images/boba-kiki.png"


function MetricExplanation({metric, min, max, text}){

    const [colors, setColors] = useState(getMetricColors(metric));

    return (
        <div style={{boxShadow: softDropShadow}} className='w-full md:w-[48%] *:flex-grow rounded-lg bg-stone-900 p-3 mt-5 relative'>
            <div style={{
                background: `linear-gradient(to right, ${rgbArrayToCSS(colors.start)}, ${rgbArrayToCSS(colors.end)})`
            }} className='p-2 w-full rounded-full'></div>
            <div className='relative'>
                <div className='flex justify-between items-start mt-1'>
                    <h5 style={{color: rgbArrayToCSS(colors.start)}} className='text-lg font-bold'>{min}</h5>
                    <h5 style={{color: rgbArrayToCSS(colors.end)}} className='text-lg font-bold'>{max}</h5>
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
                {/* <h1 className='text-7xl font-bold'>Subjective Metrics</h1> */}
                <section className='mt-4 *:mt-3'>
                    <h3 className='pt-1 border-t border-black text-3xl font-bold'>What is this?</h3>
                    <p>Subjective Metrics measures the unquantifiable qualities of works of art. It positions each work of art along 3 axes: from <b className='font-black'>Boba</b> → <b className='font-black'>Kiki</b>, from <b className='font-black'>Fresh</b> → <b className='font-black'>Smelly</b>, and from <b className='font-black'>Sleepy</b> → <b className='font-black'>Amped</b>.</p>

                    <p>Users are asked to rate artworks along these 3 axes, indicating where they feel that work falls on the spectrum. Your rating does not need to be based on any specific quality of the work, rather the general impression it evokes for <b className='font-black'>you</b>.</p>
                </section>
                <section className='mt-8'>
                    <h3 className='pt-1 border-t border-black text-3xl font-bold'>Boba-Kiki Explained</h3>
                    <img className='w-[400px]' src={boba_kiki_img}></img>
                    <p className='mt-3'>Boba and Kiki are in reference to the Boba-Kiki effect, an effect demonstrated in experiments where people were presented with the 2 shapes seen above and asked which one was "Boba" and which one was "Kiki".</p>
                    {/* <div className='flex flex-wrap justify-between'>
                        <MetricExplanation metric={"boba_kiki"} min={"Boba"} max={"Kiki"} text={
                            `Boba and Kiki are in reference to the Boba/Kiki effect, which was first discovered in a study that when given a list of nonsensical words and arbitrary shapes, subjects would consistently assign words like "Kiki" to sharp or spiky shapes and would assign words like "Boba" to round shapes.`
                        }/>
                        <MetricExplanation metric={"fresh_smelly"} min={"Fresh"} max={"Smelly"} text={"Fresh and Smelly refer "} />
                        <MetricExplanation metric={"sleepy_amped"} min={"Sleepy"} max={"Amped"} />
                    </div> */}
                </section>
            </main>
        </div>
    );
}

export default About;