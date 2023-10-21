
export function zero(x){
    return x ** 3;
}

export function first(x){
    return x ** (1/3);
}

export function second(x){
    return Math.sin(x);
}

export function third(x){
    return 4 * x * ( (1 - x)**3 );
}

export function piCalculation(x){
    return 2* (1 - x**2)**(0.5);
}