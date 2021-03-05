import should from 'should';
import {rungeKuttaStep} from '../index.js';

describe('rungeKuttaStep()', function() {
    it('should give the correct answer for a simple example', function() {
        // From: <https://en.wikipedia.org/wiki/Euler_method>
        const dy = [(t, y) => {
            return y[0];
        }];

        const yInitial = [1]

        const tInitial = 0

        const tFinal = 1;

        const numStages = 1;

        const a = [[]];

        const b = [1];
        
        const c = [0];

        rungeKuttaStep(dy, yInitial, tInitial, tFinal, numStages, a, b, c)[0].should.be.approximately(2, 0.01);
    });
});


