import React from 'react';

function AxisLabel({text, vertical=false, start=false, margin}) {

    const cont1 = vertical ? {maxWidth: margin.x, minWidth: margin.x} : {maxHeight: margin.y, minHeight: margin.y};
    const padding = vertical ? start ? "pr-2" : "pl-2" : start ? "" : "";

    const pos = vertical ? start ? "top-0 left-0" : "top-0 right-0" : start ? "left-0 top-0" : "left-0 bottom-0";
    const full = vertical ? "h-full" : "w-full";
    const tAlign = vertical ? start ? "justify-end items-center" : "justify-start items-center" : start ? "justify-center items-end" : "justify-center items-start";

    return (
        // {vertical ? 
            <div style={cont1} className={`absolute flex ${pos} ${full} ${tAlign} ${padding}`}>
                <span >{text}</span>
            </div> //: ""
        // }
    );
}

export default AxisLabel;