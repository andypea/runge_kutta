export {euler};

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
        throw `Number derivative functions (${dy.length}) does not match number of initial values (${yInitial.length})!`
    }

    if (! Number.isInteger(numSteps)) {
        throw `The number of steps (${numSteps}) is not an integer!`
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

