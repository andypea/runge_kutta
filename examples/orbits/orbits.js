//import {rungeKutta, rungeKuttaTypes} from '../../index.js'
import {rungeKuttaAdaptive, rungeKuttaAdaptiveTypes} from '../../index.js'

let dy = [
    (t, y) => {
        return y[2];
    },
    (t, y) => {
        return y[3]; 
    },
    (t, y) => {
        let G = 1;
        let m = 1;
        let d2 = Math.pow(y[0], 2) + Math.pow(y[1], 2);
        return -G * m / d2 * y[0] / Math.pow(d2, 0.5);
    },
    (t, y) => {
        let G = 1;
        let m = 1;
        let d2 = Math.pow(y[0], 2) + Math.pow(y[1], 2);
        return -G * m / d2 * y[1] / Math.pow(d2, 0.5);
    }
];

let yInitial = [
    1.0, // x
    0.0, // y 
    0.0, // vx
    1.0  // vy
];

let tInitial = 0;
let tFinal = 6;

let initialStepSize = 0.05;
let errorThreshold = 1e-4;
let rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;
let result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

//let numSteps = 1000;
//let rungeKuttaType = rungeKuttaTypes.rk4;
//let result = rungeKutta(dy, yInitial, tInitial, tFinal, numSteps, rungeKuttaType);

result.steps.forEach(s => console.log(`${s.t}, ${s.y[0]}, ${s.y[1]}, ${s.y[2]}, ${s.y[3]}`));

