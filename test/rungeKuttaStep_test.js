import should from 'should';
import {rungeKuttaStep, rungeKuttaTypes} from '../index.js';

describe('rungeKuttaStep()', function() {
    it('should give the correct answer for a simple example', function() {
        // From: <https://en.wikipedia.org/wiki/Euler_method>
        const dy = [(t, y) => {
            return y[0];
        }];

        const yInitial = [1]

        const tInitial = 0

        const tFinal = 1;

        const rungeKuttaType = rungeKuttaTypes.euler;

        rungeKuttaStep(dy, yInitial, tInitial, tFinal, rungeKuttaType)[0].should.be.approximately(2, 0.01);
    });
    
    it('should give the correct answer for a slightly more complex example', function() {
        // <https://math.okstate.edu/people/yqwang/teaching/math4513_fall11/Notes/rungekutta.pdf>
        // TODO: Make this as single function that returns an array of values instead of being an array
        // of functions.
        const dy = [(t, y) => {
            return y[0] - Math.pow(t, 2) + 1;
        }];

        const yInitial = [0.5];

        const tInitial = 0;

        const tFinal = 0.5;

        const rungeKuttaType = rungeKuttaTypes.rk4;

        rungeKuttaStep(dy, yInitial, tInitial, tFinal, rungeKuttaType)[0].should.be.approximately(1.425130208333333 , 1e-14);
    });
});


