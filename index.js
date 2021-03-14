export {rungeKuttaStep, rungeKutta, rungeKuttaTypes, rungeKuttaAdaptive, rungeKuttaAdaptiveTypes};

// TODO: Rename methods to explicit...
// TODO: Add implicit methods.
// TODO: A nice looking source for implicit methods is <https://gmd.copernicus.org/articles/11/1497/2018/gmd-11-1497-2018.pdf>
// TODO: Turn functions into generators, so users can observe and stop them in real-time.
// TODO: Throw and exception if NaNs are produced.

/**
 * Validate a rungeKuttaType object
 *
 * @param {object} rungeKuttaType - The object to be validated.
 * @param {boolean} adaptive - Whether the object is an adaptive version.
 */
const validateRungeKuttaType = (rungeKuttaType, adaptive) => {
    // TODO: Put rungeKuttaType validation into a seperate function.
    if (rungeKuttaType.a.length !== rungeKuttaType.numStages) {
        throw `The number of a coefficient rows (${rungeKuttaType.a.length}) is not equal to the number of stages minus 1 (${rungeKuttaType.numStages})!`;
    }
   
    for (let i = 0; i < rungeKuttaType.numStages; i++) {
        if (rungeKuttaType.a[i].length !== i) {
            throw `The number of a coefficient columns in row ${i} (${rungeKuttaType.a[i].length}) is not equal to the correct value (${i + 1})!`;
        }
    }

    if (rungeKuttaType.b.length !== rungeKuttaType.numStages) {
        throw `The number of b coefficients (${rungeKuttaType.b.length}) is not equal to the number of stages (${rungeKuttaType.numStages})!`;  
    }
    
    if (rungeKuttaType.c.length !== rungeKuttaType.numStages) {
        throw `The number of c coefficients (${rungeKuttaType.c.length}) is not equal to the number of stages (${rungeKuttaType.numStages})!`;
    }

    if (rungeKuttaType.c[0] !== 0) {
        throw `The initial c coefficient (${rungeKuttaType.c[0]}) is not equal to 0!`;
    }

    if (adaptive) {
        if (rungeKuttaType.bStar.length !== rungeKuttaType.numStages) {
            throw `The number of bStar coefficients (${rungeKuttaType.bStar.length}) is not equal to the number of stages (${rungeKuttaType.numStages})!`;  
        }
    }
}

const rungeKuttaAdaptive = (dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType) => {
   
    // TODO: Use typed expressions.
    if (dy(tInitial, yInitial).length !== yInitial.length) {
        throw `Number derivative functions (${dy(yInitial).length}) does not match number of initial values (${yInitial.length})!`;
    }
   
    if (! Number.isInteger(rungeKuttaType.numStages)) {
        throw `The number of stages (${rungeKuttaType.numStages}) is not an integer!`;
    }

    validateRungeKuttaType(rungeKuttaType, true);

    const step_results = new Array();
    step_results.push({step: 0, t: tInitial, y: yInitial.slice()});

    let stepSize = initialStepSize;
    let numFailedSteps = 0;
    let numStep = 1;
    let numAttempts = 1;
    let tNew = 0;
    let stepSuccess = false;
    
    do {
        tNew = step_results[step_results.length - 1].t + stepSize;
        if (tNew > tFinal) {
            tNew = tFinal;
            stepSize = tFinal - step_results[step_results.length - 1].t;
        }
        
        const step = rungeKuttaStepAdaptive(dy, 
                                            step_results[step_results.length - 1].y, 
                                            step_results[step_results.length - 1].t, 
                                            tNew, 
                                            rungeKuttaType);

        let maxAbsErrorEstimate = step.errorEstimate.reduce(function(a, b) {
            return Math.max(Math.abs(a), Math.abs(b));
        },
        0);

        if (maxAbsErrorEstimate <= errorThreshold) {
            // TODO: Add the number of failed steps to each result.
            step_results.push({step: numStep, 
                t: tNew, 
                y: step.y, 
                errorEstimate: step.errorEstimate, 
                maxAbsErrorEstimate: maxAbsErrorEstimate, 
                stepSize: stepSize
            });
            numStep++;
            stepSuccess = true;
        } else {
            numFailedSteps++;
            stepSuccess = false;
        }
        
        numAttempts++;

        // From: Numerical Methods for Ordinary Differential Equations (3rd
        // Edition) by J. C. Butcher
        let p = rungeKuttaType.b.length; // The order of the method
        let r = Math.max(0.5, Math.min(2.0, 0.9 * Math.pow(errorThreshold / maxAbsErrorEstimate, 1 / (p + 1))));
        stepSize = r * stepSize;

    } while ((tNew < tFinal) || (! stepSuccess));

    return {
        t: step_results[step_results.length - 1].t,
        y: step_results[step_results.length - 1].y, 
        steps: step_results, 
        numFailedSteps: numFailedSteps,
        settings: {
            adaptive: true,
            yInitial: yInitial,
            tInitial: tInitial,
            tFinal: tFinal,
            initialStepSize: initialStepSize,
            errorThreshold: errorThreshold,
            rungeKuttaType: rungeKuttaType
        }
    };
}

const rungeKutta = (dy, yInitial, tInitial, tFinal, numSteps, rungeKuttaType) => {
   
    // TODO: Use typed expressions.
    if (dy(tInitial, yInitial).length !== yInitial.length) {
        throw `Number derivative functions (${dy(yInitial).length}) does not match number of initial values (${yInitial.length})!`;
    }
   
    if (! Number.isInteger(rungeKuttaType.numStages)) {
        throw `The number of stages (${rungeKuttaType.numStages}) is not an integer!`;
    }
    
    if (! Number.isInteger(numSteps)) {
        throw `The number of stages (${numSteps}) is not an integer!`;
    }

    validateRungeKuttaType(rungeKuttaType, false);

    const stepSize = (tFinal - tInitial) / numSteps;
   
    const step_results = new Array(numSteps + 1);
    step_results[0] = {step: 0, t: tInitial, y: yInitial.slice()}

    for (let step = 1; step <= numSteps; step++) {
        const tNew = step_results[step - 1].t + stepSize;
        const yNew = rungeKuttaStep(dy, step_results[step - 1].y, step_results[step - 1].t, tNew, rungeKuttaType);
        step_results[step] = {step: step, t: tNew, y: yNew};
    }

    return {
        t: step_results[numSteps].t,
        y: step_results[numSteps].y, 
        steps: step_results, 
        settings: {
            adaptive: false,
            yInitial: yInitial,
            tInitial: tInitial,
            tFinal: tFinal,
            numSteps: numSteps,
            rungeKuttaType: rungeKuttaType
        }
    };
}

const rungeKuttaTypes = {
    euler: {
        numStages: 1,
        a: [[]],
        b: [1],
        c: [0]
    },
    ralston: {
        numStages: 2,
        a: [[],
            [2/3]],
        b: [1/4, 3/4],
        c: [0, 2/3]
    },
    rk4: {
        numStages: 4,
        a: [[],
            [1/2],
            [0, 1/2],
            [0, 0, 1]],
        b: [1/6, 2/6, 2/6, 1/6],
        c: [0, 1/2, 1/2, 1]
    }
};

const rungeKuttaAdaptiveTypes = {
    rk45: {
        numStages: 6,
        a: [[],
            [1/4],
            [3/32, 9/32],
            [1932/2197, -7200/2197, 7296/2197],
            [439/216, -8, 3680/513, -845/4104],
            [-8/27, 2, -3544/2565, 1859/4104, -11/40]
        ],
        b: [16/135, 0, 6656/12825, 28561/56430, -9/50, 2/55],
        bStar: [25/216, 0, 1408/2565, 2197/4104, -1/5, 0],
        c: [0, 1/4, 3/8, 12/13, 1, 1/2]
    }
};

const rungeKuttaStep = (dy, yInitial, tInitial, tFinal, rungeKuttaType) => {

    const numVars = yInitial.length;
    const h = tFinal - tInitial;
    const numStages = rungeKuttaType.numStages;
    const a = rungeKuttaType.a;
    const b = rungeKuttaType.b;
    const c = rungeKuttaType.c;

    let k = new Array(numStages);
    for (let s = 0; s < numStages; s++) {
        k[s] = new Array(numVars);
    }

    for (let s = 0; s < numStages; s++) {
        let t = tInitial + c[s] * h;
        let y = new Array(numVars);
        for (let varIndex = 0; varIndex < numVars; varIndex++) {
            y[varIndex] = yInitial[varIndex];
            for (let s2 = 0; s2 < s; s2++) {
                y[varIndex] += h * a[s][s2] * k[s - 1][varIndex];
            }
        }
        k[s] = dy(t, y);
        //for (let varIndex = 0; varIndex < numVars; varIndex++) {
        //    k[s][varIndex] = dy[varIndex](t, y);
        //}
    }

    let y = new Array(numVars);
    for (let varIndex = 0; varIndex < numVars; varIndex++) {
        y[varIndex] = 0; 
        for (let s = 0; s < numStages; s++) {
            y[varIndex] += b[s] * k[s][varIndex];
        }
        y[varIndex] *= h;
        y[varIndex] += yInitial[varIndex];
    }

    return y;
};

const rungeKuttaStepAdaptive = (dy, yInitial, tInitial, tFinal, rungeKuttaType) => {

    const numVars = yInitial.length;
    const h = tFinal - tInitial;
    const numStages = rungeKuttaType.numStages;
    const a = rungeKuttaType.a;
    const b = rungeKuttaType.b;
    const bStar = rungeKuttaType.bStar;
    const c = rungeKuttaType.c;

    let k = new Array(numStages);
    for (let s = 0; s < numStages; s++) {
        k[s] = new Array(numVars);
    }

    for (let s = 0; s < numStages; s++) {
        let t = tInitial + c[s] * h;
        let y = new Array(numVars);
        for (let varIndex = 0; varIndex < numVars; varIndex++) {
            y[varIndex] = yInitial[varIndex];
            for (let s2 = 0; s2 < s; s2++) {
                y[varIndex] += h * a[s][s2] * k[s - 1][varIndex];
            }
        }
        k[s] = dy(t, y);
        //for (let varIndex = 0; varIndex < numVars; varIndex++) {
        //    k[s][varIndex] = dy[varIndex](t, y);
        //}
    }

    let y = new Array(numVars);
    let errorEstimate = new Array(numVars);
    for (let varIndex = 0; varIndex < numVars; varIndex++) {
        y[varIndex] = 0; 
        errorEstimate[varIndex] = 0;
        for (let s = 0; s < numStages; s++) {
            y[varIndex] += b[s] * k[s][varIndex];
            errorEstimate[varIndex] += (b[s] - bStar[s]) * k[s][varIndex]; 
        }
        y[varIndex] *= h;
        y[varIndex] += yInitial[varIndex];
        errorEstimate[varIndex] *= h;
    }

    return {y: y,
            errorEstimate: errorEstimate};
};

