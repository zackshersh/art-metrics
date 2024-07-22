import metricColors from "./metric-colors.json";
import metricSvgPaths from "./metric-svg-paths.json";

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function getTextDimmensions(string){
    let text = document.createElement("text");
    text.textContent = string;

    document.body.appendChild(text);
    let bounds = text.getBoundingClientRect();
    document.body.removeChild(text);

    return {width: bounds.width, height: bounds.height};
}

export function getElemDimmensions(type, innerhtml, {style}){
    let elem = document.createElement(type);
    elem.innerHTML = innerhtml;

    for(var s in style) {
        elem.style[s] = style[s];
    }

    document.body.appendChild(elem);
    let bounds = elem.getBoundingClientRect();
    document.body.removeChild(elem);



    return {width: bounds.width, height: bounds.height}
}

export function preloadImgs(data){
    data.forEach((work,i) => {
        const img = new Image();
        img.src = work.work_data.img_url;
    })
}

export function getMetricColors(metricName){
    switch(metricName){
        case "boba_kiki":
            return {start: metricColors.boba, end: metricColors.kiki};
        case "fresh_smelly":
            return {start: metricColors.fresh, end: metricColors.smelly};
        case "sleepy_amped":
            return {start: metricColors.sleepy, end: metricColors.amped}
        default:
            return {start: "#000000", end: "#000000"}
    }
}

export function rgbArrayToCSS(arr, opacity=1){
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]}, ${opacity})`
}

export function getPathsForValueName(valueName){
    if(metricSvgPaths[valueName]){
        return metricSvgPaths[valueName]
    } else {
        return {
            start: "",
            end: ""
        }
    }
}

export function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export function clamp (number, min, max) {
    return Math.min(Math.max(number, min), max);
}

export function lerp( a, b, alpha ) {
    return a + alpha * ( b - a );
}

export function colorLerp(c1, c2, t) {

    return [
        lerp(c1[0], c2[0], t),
        lerp(c1[1], c2[1], t),
        lerp(c1[2], c2[2], t)
    ]
}

export function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
}

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};
