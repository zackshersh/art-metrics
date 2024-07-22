import React from 'react';

function RangeSliderLabel({value, label, extraStyles}) {
    return (
        <label className={`w-full min-w-20 min-h-6 transition-all ${value > 0 ? "font-bold" : "text-sm"} ${extraStyles ? extraStyles : ""} `}>
            <span>{value.toFixed(0)}% </span>
            {label}
        </label>
    );
}

export default RangeSliderLabel;