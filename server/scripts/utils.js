
module.exports = {
    avg(arr){
        
        if(!Array.isArray(arr)) return;
        let sum = 0;

        for(var i=0;i<arr.length;i++){
            sum += arr[i]
        }

        return sum/arr.length;
    },
    standardDeviation (array) {
        const n = array.length
        const mean = array.reduce((a, b) => a + b) / n
        return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
    }
}