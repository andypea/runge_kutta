import {rungeKuttaAdaptive, rungeKuttaAdaptiveTypes} from '../../index.js'

let dy = 
    (t, y) => {
        let dr = 0.1; // damping ratio (1 => critically damped)
        let uaf = 1; // undamped angular frequency
        let m = 1; // mass
        let da1 = 1; // driving amplitude
        let df1 = 1.5; // driving frequency 
        let da2 = 1; // driving amplitude
        let df2 = 2.0; // driving frequency 
        return [
            y[1],
            -2 * dr * uaf * y[1] - Math.pow(uaf, 2) * y[0] + 
            1 / m * da1 * Math.sin(df1 * t) +
            1 / m * da2 * Math.sin(df2 * t)
        ];
    };

let yInitial = [1, 0];
let tInitial = 0;
let tFinal = 100;
let initialStepSize = 0.05;
let errorThreshold = 1e-4;
let rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;

let result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

result.steps.forEach(s => console.log(`${s.t}, ${s.y[0]}`));

