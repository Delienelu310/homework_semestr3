
export default function runTheModel(n){
    let spots = [];
    for(let i = 0; i < n; i++){
        spots.push(0);
    }


    let 
        b = -1,
        u = -1,
        c = -1,
        d = -1;

    let 
        countC = 0,
        countD = 0;

    for(let i = 0; d==-1 ;i++){
        let j = Math.floor(Math.random() * n);
        
        spots[j]++;

        if(spots[j] == 1) countC++;
        else if(spots[j] == 2) countD++;

        //calculating b, c and d
        if(b == -1 && spots[j] > 1 ) b = i + 1;
        if(c == -1 && countC == n) c = i + 1;
        if(d == -1 && countD == n) d = i + 1;
        if(i == n - 1){
            u = 0;
            for(let i = 0; i < n; i++){
                if(spots[i] == 0) u++;
            }
        }
    }

    return {
        b: b,
        u: u,
        c: c,
        d: d,
        cmd: d-c
    }
}