
export default function generateAvgFuncData(func, avgdata){
    let result = [];
    
    for(let i = 0; i < avgdata.length; i++){
        let n = avgdata[i].x;
        let avg = avgdata[i].y;

        result.push({"x": n ,"y": func(avg, n)});
    }

    return result;
}
