
export default function checkRandom(){

    let result = {};

    for(let i = 0; i < 10**8;i++){
        let val = Math.round( (Math.random() * 10**3) ) / 10**3;
        if(result[val] === undefined) result[val] = 1;
        else result[val]++;
    }

    return result;
}