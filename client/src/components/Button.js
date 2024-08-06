import React, { useEffect, useState } from 'react';
import { getMetricColors } from '../utils/utils';

function Button({handler, label, active, size="md", importance="primary", sizingStyles, fillHeight=false}) {

    const [hover, setHover] = useState(false);


    const paddingStyles = () => {
        switch(size){
            case "sm":
                return "px-6 py-2"
                break;
            case "lg":
                return "px-6 py-3"
                break;
            default:
                return "px-6 py-2"
        }
    }

    const primaryStyles = {
        hoverFilter: "brightness(2)",
        textColor: "white",
        bg: "black",

    }

    const secondaryStyles = {
        hoverFilter: "brightness(1.1)",
        textColor: "black",
        bg: "#aaaaaa",

    }

    const getImportanceStyles = () => {
        switch(importance){
            case "primary":
                return primaryStyles;
            case "secondary":
                return secondaryStyles;
            default:
                return secondaryStyles
        }
    }
    
    const [importanceStyles, setImportanceStyles] = useState(getImportanceStyles())



    const styles = {
        boxShadow: "rgba(255, 255, 255, 0.2) 0 1px 0 0 inset, rgba(0, 0, 0, 0.2) 0 2px 4px 0",
        backgroundColor: importanceStyles.bg,
        backgroundImage: active ? "linear-gradient(180deg, rgba(206, 211, 234, 0.13) 0%, transparent 100%)" : "",
        color: importanceStyles.textColor,
        opacity: active ? 1 : 0.6,
        filter: hover && active ? importanceStyles.hoverFilter : "",
        height: fillHeight ? "60px" : ""
    
    }

    return (
        <div 
            style={styles}
            className={` ${paddingStyles()} ${sizingStyles} ${fillHeight ? "" : "my-3"} rounded-lg p-3 justify-self-end flex items-center justify-center`}
            // className={`${getColor()} ${sizingStyles()} my-3 rounded-lg p-3 justify-self-end flex items-center `}
            onMouseDown={active ? handler : () => {}}
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}>
            <span className='text-center'>{label}</span>
        </div>
    );
}

export default Button;