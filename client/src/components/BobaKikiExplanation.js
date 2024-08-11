import React from 'react';

import boba_kiki_img from "../assets/images/boba-kiki.png"

function BobaKikiExplanation(props) {
    return (
        <div>
            <h3 className='pt-1 border-t border-black text-3xl font-bold'>Boba-Kiki Explained</h3>
            <img style={{mixBlendMode: "darken"}} className='w-[400px]' src={boba_kiki_img}></img>
            <p className='mt-4'>The Boba-Kiki metric is in reference to the Boba-Kiki effect, which describes how humans have innate associations with certain words rather than words all being arbitrary. It was demonstrated in experiments where people were shown the two shapes seen above and asked which one was "Boba" and which was "Kiki". They consistently assigned "Boba" to the round shape and "Kiki" to the spiky shape.</p>
            <p className='mt-4'>The goal of using Boba-Kiki, rather than something like Round-Spiky, is to describe more than just the forms and shapes of a work. Just like Boba and Kiki are associated with round and spiky shapes respectively, what subject matter or emotions are Boba and which are Kiki?</p>
            <p className='text-lg font-bold mt-4'>You see a mother porcupine lovingly caring for her child, is that Boba or Kiki?</p>
        </div>
    );
}

export default BobaKikiExplanation;