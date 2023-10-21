
export default function calculateIntegal(func, a, b, m, n ){

    let s = (b - a) * m;

    let c = 0;
    for(let i = 0; i < n; i++){
        let x = Math.random() * (b - a) + a;
        let y = Math.random() * m;

 
        if(func(x) > y) c++;
    }


    return c / n * s;
}

