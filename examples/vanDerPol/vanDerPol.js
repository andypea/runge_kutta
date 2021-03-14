// Reproduces the Matlab ode45 example at <https://www.mathworks.com/help/matlab/ref/ode45.html>

import {rungeKuttaAdaptive, rungeKuttaAdaptiveTypes} from '../../index.js'

let dy = [
    (t, y) => {
        return y[1];
    },
    (t, y) => {
        return (1 - Math.pow(y[0], 2)) * y[1] - y[0]; 
    },
];

let yInitial = [
    2.0,
    0.0,
];

let tInitial = 0;
let tFinal = 20;

let initialStepSize = 1;
let errorThreshold = 1e-4;
let rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;
let result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

result.steps.forEach(s => console.log(`${s.t}, ${s.y[0]}, ${s.y[1]}`));

