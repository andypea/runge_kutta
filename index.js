export {rungeKuttaStep, rungeKutta, rungeKuttaTypes};

// TODO: Rename methods to explicit...
// TODO: Add implicit methods.
// TODO: Add adaptive methods.

const rungeKutta = (dy, yInitial, tInitial, tFinal, numSteps, rungeKuttaType) => {
    
    // TODO: Use typed expressions.
    if (dy.length !== yInitial.length) {
        throw `Number derivative functions (${dy.length}) does not match number of initial values (${yInitial.length})!`;
    }
   
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

    if (! Number.isInteger(rungeKuttaType.numStages)) {
        throw `The number of stages (${rungeKuttaType.numStages}) is not an integer!`;
    }
    
    if (! Number.isInteger(numSteps)) {
        throw `The number of stages (${numSteps}) is not an integer!`;
    }


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

const rungeKuttaStep = (dy, yInitial, tInitial, tFinal, rungeKuttaType) => {

    const numVars = dy.length;
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
        for (let varIndex = 0; varIndex < numVars; varIndex++) {
            k[s][varIndex] = dy[varIndex](t, y);
        }
    }

    let y = new Array(numVars);
    for (let varIndex = 0; varIndex < numVars; varIndex++) {
        y[varIndex] = yInitial[varIndex];
        for (let s = 0; s < numStages; s++) {
            y[varIndex] += h * b[s] * k[s][varIndex];
        }
    }

    return y;
};

