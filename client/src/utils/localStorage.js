

export const lsRetrieve = (name) => {
    let data = localStorage.getItem(name);
    return JSON.parse(data);
}

export const lsStore = (name, data) => {
    localStorage.setItem( name,
        JSON.stringify(data)
    )
}

export const addToVisited = (_id) => {
    let arr = lsRetrieve("visited-works");
    arr = arr ? arr : [];

    arr.push(_id);

    lsStore("visited-works", arr)
}

export const checkIfVisited = (_id) => {
    let arr = lsRetrieve("visited-works");
    if(arr){
        return arr.indexOf(_id) != -1;
    } else {
        return false;
    }
}

