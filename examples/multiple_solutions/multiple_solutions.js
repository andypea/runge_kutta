// Reproduces the Matlab ode45 example at <https://www.mathworks.com/help/matlab/ref/ode45.html>

import {rungeKuttaAdaptive, rungeKuttaAdaptiveTypes} from '../../index.js'
import {rungeKutta, rungeKuttaTypes} from '../../index.js'

let dy = [
    (t, y) => {
        return -2 * y[0] + 2 * Math.cos(t) * Math.sin(2 * t);
    }
];

let yInitial = [
    -2.0
];

let tInitial = 0;
let tFinal = 3;

let initialStepSize = 0.1;
let errorThreshold = 1e-4;
let rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;
let result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

result.steps.forEach(s => {
    console.log(s.y);
});

result.steps.forEach(s => console.log(`${s.t}, ${s.y[0]}`));


