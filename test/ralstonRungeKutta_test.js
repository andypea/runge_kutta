import should from 'should';
import {ralstonRungeKutta} from '../index.js';

describe('ralstonRungeKutta()', function() {
    it('should give the correct answer for a simple example', function() {
        // From: <https://en.wikipedia.org/wiki/eulerRungeKutta_method>
        const dy = [(t, y) => {
            return Math.tan(y) + 1;
        }];

        const yInitial = [1];

        const tInitial = 1;

        const tFinal = 1.1;

        const numSteps = 4;

        ralstonRungeKutta(dy, yInitial, tInitial, tInitial + 1 * 0.025, 1)[0].should.be.approximately(1.066, 0.001);
        ralstonRungeKutta(dy, yInitial, tInitial, tInitial + 2 * 0.025, 2)[0].should.be.approximately(1.141, 0.001);
        ralstonRungeKutta(dy, yInitial, tInitial, tInitial + 3 * 0.025, 3)[0].should.be.approximately(1.227, 0.001);
        ralstonRungeKutta(dy, yInitial, tInitial, tInitial + 4 * 0.025, 4)[0].should.be.approximately(1.335, 0.001);
    });
});

