import calculatektimes from "./calculatektimes";

export default function calculateData(){

    let data = {
        b: [],
        u: [],
        c: [],
        d: [],
        cmd: []
    };

    let average = {
        b: [],
        u: [],
        c: [],
        d: [],
        cmd: []
    }

    let k = 50;
    for(let n = 1000; n <= 100000; n += 1000){
        let results = calculatektimes(k, n);
        let 
            bsum = 0,
            csum = 0,
            usum = 0,
            dsum = 0,
            cmdsum = 0;        

        for(let i = 0; i < k; i++){

            bsum += results[i].b;
            usum += results[i].u;
            csum += results[i].c;
            dsum += results[i].d;
            cmdsum += results[i].cmd;


            data.b.push({"x": n, "y": results[i].b}); 
            data.u.push({"x": n, "y": results[i].u}); 
            data.c.push({"x": n, "y": results[i].c}); 
            data.d.push({"x": n, "y": results[i].d}); 
            data.cmd.push({"x": n, "y": results[i].cmd}); 
        }
        let precision = 1000;
        average.b.push({"x": n, "y": Math.round(precision * bsum / k) / precision});
        average.u.push({"x": n, "y": Math.round(precision * usum / k) / precision});
        average.c.push({"x": n, "y": Math.round(precision * csum / k) / precision});
        average.d.push({"x": n, "y":  Math.round(precision * dsum / k) / precision});
        average.cmd.push({"x": n, "y":  Math.round(precision * cmdsum / k) / precision});
        console.log(n);
    }

    console.log([data, average]);
    return [data, average];
}

