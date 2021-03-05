export {doug, euler};

/**
 * Gives the answer
 *
 * @return The answer
 */
const doug = () => {
    return 42;
};

const euler = (dy, y0, h, numSteps) => {
    let y = y0;

    for (let step = 0; step < numSteps; step++ ) {
        y = y + h * dy(y);
    }

    return y;
};

