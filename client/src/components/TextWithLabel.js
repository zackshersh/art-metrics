import React from 'react';

function TextWithLabel({mainText, label, size="sm", styles, width="full"}) {

    const mainStyle = size == "lg" ? "text-md" : "text-sm";
    const labelStyle = size == "lg" ? "text-sm" : "text-xs";

    return (
        <div className={`w-${width}`}>
            {label ? 
                <p className={`${labelStyle} text-stone-600 font-light mb-[-2px]`}>{label}</p> 
            : null}
            <h5 className={`${mainStyle} ${styles}`}>{mainText}</h5>
        </div>
    );
}

export default TextWithLabel;