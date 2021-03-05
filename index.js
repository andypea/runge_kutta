export {euler, rungeKuttaStep, eulerRungeKutta, rungeKutta, ralstonRungeKutta};

// TODO: Rename methods to explicit...
// TODO: Add implicit methods.
// TODO: Add adaptive methods.

/**
 * Integrates a system of 1st-order ordinary differential equations (ODE) using
 * Euler's method.
 *
 * @param {Array} dy - An array of functions which each calculate the derivative of a variable.
 * @param {Array} yInitial - An array of initial values for the variables.
 * @param {number} tInitial - The initial value of t.
 * @param {number} tFinal - The final value of t.
 * @param {number} numSteps - The number of steps to use for the numerical
 * integration.
 *
 * @returns {Array} The estimated values of the variables at time tFinal.
 */
const euler = (dy, yInitial, tInitial, tFinal, numSteps) => {

    if (dy.length !== yInitial.length) {
        throw `Number derivative functions (${dy.length}) does not match number of initial values (${yInitial.length})!`;
    }

    if (! Number.isInteger(numSteps)) {
        throw `The number of steps (${numSteps}) is not an integer!`;
    }

    const numVars = dy.length;
    const deltaT = (tFinal - tInitial) / numSteps;
    
    let t = tInitial;
    let y = yInitial.slice();
    let yNext = new Array(numVars);

    for (let step = 0; step < numSteps; step++ ) {
        for (let varIndex = 0; varIndex < numVars; varIndex++) {
            yNext[varIndex] = y[varIndex] + deltaT * dy[varIndex](t, y);
        }

        t = t + deltaT;
        y = yNext.slice();
    }

    return y;
};

const rungeKuttaStep = (dy, yInitial, tInitial, tFinal, numStages, a, b, c) => {

    const numVars = dy.length
    const h = tFinal - tInitial;

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

const eulerRungeKutta = (dy, yInitial, tInitial, tFinal, numSteps) => {

    // The Runge-Kutta co-efficients for Euler's method.
    const numStages = 1;

    const a = [[]];

    const b = [1];
        
    const c = [0];

    return rungeKutta(dy, yInitial, tInitial, tFinal, numSteps, numStages, a, b, c);
}

const ralstonRungeKutta = (dy, yInitial, tInitial, tFinal, numSteps) => {

    // The Runge-Kutta co-efficients for Euler's method.
    const numStages = 2;

    const a = [[],
               [2/3]];

    const b = [1/4, 3/4];
        
    const c = [0, 2/3];

    return rungeKutta(dy, yInitial, tInitial, tFinal, numSteps, numStages, a, b, c);
}



const rungeKutta = (dy, yInitial, tInitial, tFinal, numSteps, numStages, a, b, c) => {
    
    if (dy.length !== yInitial.length) {
        throw `Number derivative functions (${dy.length}) does not match number of initial values (${yInitial.length})!`;
    }
    
    if (a.length !== numStages) {
        throw `The number of a coefficient rows (${a.length}) is not equal to the number of stages minus 1 (${numStages})!`;
    }
   
    for (let i = 0; i < numStages; i++) {
        if (a[i].length !== i) {
            throw `The number of a coefficient columns in row ${i} (${a[i].length}) is not equal to the correct value (${i + 1})!`;
        }
    }

    if (b.length !== numStages) {
        throw `The number of b coefficients (${b.length}) is not equal to the number of stages (${numStages})!`;  
    }
    
    if (c.length !== numStages) {
        throw `The number of c coefficients (${c.length}) is not equal to the number of stages (${numStages})!`;
    }

    if (c[0] !== 0) {
        throw `The initial c coefficient (${c[0]}) is not equal to 0!`;
    }

    if (! Number.isInteger(numStages)) {
        throw `The number of stages (${numStages}) is not an integer!`;
    }
    
    if (! Number.isInteger(numSteps)) {
        throw `The number of stages (${numStages}) is not an integer!`;
    }

    let y = yInitial.slice();

    const stepSize = (tFinal - tInitial) / numSteps;

    let t = tInitial;

    for (let step = 0; step < numSteps; step++) {
        y = rungeKuttaStep(dy, y, t, t + stepSize, numStages, a, b, c);
        t += stepSize;
    }

    return y;
}
