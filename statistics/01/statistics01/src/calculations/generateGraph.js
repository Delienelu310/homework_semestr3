import calculateIntegal from "./calculateIntegral";

export function generateGraphForOneArg(func, a, b, m, n, k){
    let result = [];

    for(let i = 0; i < k; i++){
        result.push(
            Math.round( calculateIntegal(func, a, b, m, n) * 10**3 ) / 10**3
        );
    }

    return result;
}

export default function generateGraph(func, a, b, m, k){
    
    let result = [];

    for(let n = 50; n <= 5000; n += 50){
        result.push(generateGraphForOneArg(func, a, b, m, n, k));
    }

    return result;
}

export function convertIntoVictoryGraphData(result){
    
    let data = [];
    
    for(let i = 1; i <= 100; i++){
        for(let k = 0; k < 50; k++){
            data.push({
                "x": i * 50,
                "y": result[i-1][k]
            });
        }
    }

    console.log(data);
    return data;
}

export function getAverage(result, k){
    let data = [];
    
    for(let i = 1; i <= 100; i++){
        let sum = 0;
        for(let j = 0; j < k; j++){
            sum += result[i-1][j];
        }
        data.push({
            "x": i * 50,
            "y": sum / k
        });
    }

    return data;
}
