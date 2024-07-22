import { lerp } from "./utils";

export function parseSvg(svg){
    let arr = [];
    let currentToken = "";
    svg.split("").forEach((char, i) => {
        let isInt = !isNaN(char);

        if((isInt || char == "." || char == "-") && char != " "){
            currentToken += char; 
            if(i == svg.split("").length-1){
                arr.push(parseFloat(currentToken))
            }

        } else {
            arr.push(parseFloat(currentToken));
            arr.push(char);

            currentToken = "";
        }
    })


    return arr;
}



export function compileSvg(arr){
    let acc = ""

    arr.forEach((token, i) => {
        acc += token;
    })

    return acc;
}

export function interpolateSvgs(path1, path2, t){
    let parsed1 = parseSvg(path1);
    let parsed2 = parseSvg(path2);

    
    let interpolated = [];

    for(var i=0; i<parsed2.length; i++){
        let a = parsed1[i];
        let b = parsed2[i];

        if(a !== a){
            
        } else if(typeof a == "string"){
            interpolated.push(a)
        } else if (typeof a == "number"){
            let lerped = lerp(a,b,t);
            interpolated.push(lerped);
        }

    }

    let str = compileSvg(interpolated);



    return str;
}