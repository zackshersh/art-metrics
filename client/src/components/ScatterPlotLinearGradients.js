import React, { useState } from 'react';
import { getMetricColors, rgbArrayToCSS } from '../utils/utils';

function ScatterPlotLinearGradients(props) {

    const [boba_kiki, setBoba_Kiki] = useState(getMetricColors("boba_kiki"));
    const [fresh_smelly, setFresh_Smelly] = useState(getMetricColors("fresh_smelly"));
    const [sleepy_amped, setSleepy_Amped] = useState(getMetricColors("sleepy_amped"));

    return (
        <defs>
            <linearGradient id='boba_kiki_h_gradient'>
                <stop offset={"5%"} stopColor={rgbArrayToCSS(boba_kiki.start)} />
                <stop offset={"95%"} stopColor={rgbArrayToCSS(boba_kiki.end)} />
            </linearGradient>
            <linearGradient id='boba_kiki_v_gradient' gradientTransform='rotate(90)'>
                <stop offset={"5%"} stopColor={rgbArrayToCSS(boba_kiki.start)} />
                <stop offset={"95%"} stopColor={rgbArrayToCSS(boba_kiki.end)} />
            </linearGradient>
            <linearGradient id='fresh_smelly_h_gradient'>
                <stop offset={"5%"} stopColor={rgbArrayToCSS(fresh_smelly.start)} />
                <stop offset={"95%"} stopColor={rgbArrayToCSS(fresh_smelly.end)} />
            </linearGradient>
            <linearGradient id='fresh_smelly_v_gradient' gradientTransform='rotate(90)'>
                <stop offset={"5%"} stopColor={rgbArrayToCSS(fresh_smelly.start)} />
                <stop offset={"95%"} stopColor={rgbArrayToCSS(fresh_smelly.end)} />
            </linearGradient>
            <linearGradient id='sleepy_amped_h_gradient'>
                <stop offset={"5%"} stopColor={rgbArrayToCSS(sleepy_amped.start)} />
                <stop offset={"95%"} stopColor={rgbArrayToCSS(sleepy_amped.end)} />
            </linearGradient>
            <linearGradient id='sleepy_amped_v_gradient' gradientTransform='rotate(90)'>
                <stop offset={"5%"} stopColor={rgbArrayToCSS(sleepy_amped.start)} />
                <stop offset={"95%"} stopColor={rgbArrayToCSS(sleepy_amped.end)} />
            </linearGradient>
        </defs>
    );
}

export default ScatterPlotLinearGradients;