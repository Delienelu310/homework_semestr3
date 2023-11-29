import runTheModel from "./model"

export default function calculatektimes(k, n){
    let results = [];
    for(let i = 0; i < k; i++){
        results.push(runTheModel(n));
    }
    return results;
}