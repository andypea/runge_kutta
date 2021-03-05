import should from 'should';
import {rungeKutta} from '../index.js';

describe('rungeKutta()', function() {
    it('should give the correct answer for a 2nd order ODE example', function() {
        //From <http://lampx.tugraz.at/~hadley/num/ch8/rk4ode2.php>
        const dy = [
            (t, y) => {
                return y[1];
            },
            (t, y) => {
                return -y[1] - Math.sin(y[0]) + Math.sin(t);
            }
        ];

        const yInitial = [0, 1];

        const tInitial = 0;

        const stepSize = 0.01;

        const numStages = 4;

        const a = [[],
            [1/2],
            [0, 1/2],
            [0, 0, 1]];

        const b = [1/6, 2/6, 2/6, 1/6];

        const c = [0, 1/2, 1/2, 1];
        
        rungeKutta(dy, yInitial, tInitial, tInitial + 0 * stepSize, 0, numStages, a, b, c)[0].should.be.approximately(0.000, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 0 * stepSize, 0, numStages, a, b, c)[1].should.be.approximately(1.000, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 1 * stepSize, 1, numStages, a, b, c)[0].should.be.approximately(0.009, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 1 * stepSize, 1, numStages, a, b, c)[1].should.be.approximately(0.990, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 2 * stepSize, 2, numStages, a, b, c)[0].should.be.approximately(0.019, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 2 * stepSize, 2, numStages, a, b, c)[1].should.be.approximately(0.980, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 3 * stepSize, 3, numStages, a, b, c)[0].should.be.approximately(0.029, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 3 * stepSize, 3, numStages, a, b, c)[1].should.be.approximately(0.970, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 4 * stepSize, 4, numStages, a, b, c)[0].should.be.approximately(0.039, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 4 * stepSize, 4, numStages, a, b, c)[1].should.be.approximately(0.960, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 5 * stepSize, 5, numStages, a, b, c)[0].should.be.approximately(0.048, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 5 * stepSize, 5, numStages, a, b, c)[1].should.be.approximately(0.951, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 6 * stepSize, 6, numStages, a, b, c)[0].should.be.approximately(0.058, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 6 * stepSize, 6, numStages, a, b, c)[1].should.be.approximately(0.941, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 7 * stepSize, 7, numStages, a, b, c)[0].should.be.approximately(0.067, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 7 * stepSize, 7, numStages, a, b, c)[1].should.be.approximately(0.932, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 8 * stepSize, 8, numStages, a, b, c)[0].should.be.approximately(0.076, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 8 * stepSize, 8, numStages, a, b, c)[1].should.be.approximately(0.923, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 9 * stepSize, 9, numStages, a, b, c)[0].should.be.approximately(0.086, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 9 * stepSize, 9, numStages, a, b, c)[1].should.be.approximately(0.914, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 10 * stepSize, 10, numStages, a, b, c)[0].should.be.approximately(0.095, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 10 * stepSize, 10, numStages, a, b, c)[1].should.be.approximately(0.904, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 11 * stepSize, 11, numStages, a, b, c)[0].should.be.approximately(0.104, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 11 * stepSize, 11, numStages, a, b, c)[1].should.be.approximately(0.896, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 12 * stepSize, 12, numStages, a, b, c)[0].should.be.approximately(0.113, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 12 * stepSize, 12, numStages, a, b, c)[1].should.be.approximately(0.887, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 13 * stepSize, 13, numStages, a, b, c)[0].should.be.approximately(0.121, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 13 * stepSize, 13, numStages, a, b, c)[1].should.be.approximately(0.878, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 14 * stepSize, 14, numStages, a, b, c)[0].should.be.approximately(0.130, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 14 * stepSize, 14, numStages, a, b, c)[1].should.be.approximately(0.869, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 15 * stepSize, 15, numStages, a, b, c)[0].should.be.approximately(0.139, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 15 * stepSize, 15, numStages, a, b, c)[1].should.be.approximately(0.861, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 16 * stepSize, 16, numStages, a, b, c)[0].should.be.approximately(0.147, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 16 * stepSize, 16, numStages, a, b, c)[1].should.be.approximately(0.852, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 17 * stepSize, 17, numStages, a, b, c)[0].should.be.approximately(0.156, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 17 * stepSize, 17, numStages, a, b, c)[1].should.be.approximately(0.844, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 18 * stepSize, 18, numStages, a, b, c)[0].should.be.approximately(0.164, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 18 * stepSize, 18, numStages, a, b, c)[1].should.be.approximately(0.836, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 19 * stepSize, 19, numStages, a, b, c)[0].should.be.approximately(0.173, 0.001);
        rungeKutta(dy, yInitial, tInitial, tInitial + 19 * stepSize, 19, numStages, a, b, c)[1].should.be.approximately(0.827, 0.001);
    });
});

