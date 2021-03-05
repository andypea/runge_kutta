import should from 'should';
import {rungeKutta, rungeKuttaTypes} from '../index.js';

describe('rungeKutta()', function() {
    describe('rungeKuttaType.euler', function() {
        it('should give the correct answer for a simple example using Euler\'s method.', function() {
            // From: <https://en.wikipedia.org/wiki/eulerRungeKutta_method>
            const dy = (t, y) => {
                return y[0];
            };

            rungeKutta([dy], [1], 0, 4, 4, rungeKuttaTypes.euler)[0].should.be.approximately(16, 0.01);
            rungeKutta([dy], [1], 0, 4, 4 * 4, rungeKuttaTypes.euler)[0].should.be.approximately(35.53, 0.01);
            rungeKutta([dy], [1], 0, 4, 10 * 4, rungeKuttaTypes.euler)[0].should.be.approximately(45.26, 0.01);
            rungeKutta([dy], [1], 0, 4, 20 * 4, rungeKuttaTypes.euler)[0].should.be.approximately(49.56, 0.01);
            rungeKutta([dy], [1], 0, 4, 40 * 4, rungeKuttaTypes.euler)[0].should.be.approximately(51.98, 0.01);
            rungeKutta([dy], [1], 0, 4, 80 * 4, rungeKuttaTypes.euler)[0].should.be.approximately(53.26, 0.01);
        });

        it('should give the correct answer for a simple 2nd-order ODE using Euler\'s method.', function() {
            // From: http://sites.science.oregonstate.edu/math/home/programs/undergrad/CalculusQuestStudyGuides/ode/second/so_num/so_num.html
            const dy = [
                (t, y) => {
                    return y[1];
                },
                (t, y) => {
                    return -y[1] + Math.sin(t * y[0]);
                }
            ];

            const y0 = [
                1,
                2
            ];

            const t0 = 0;

            rungeKutta(dy, y0, t0, 1, 1, rungeKuttaTypes.euler)[0].should.be.approximately(3.000, 0.001);
            rungeKutta(dy, y0, t0, 1, 1, rungeKuttaTypes.euler)[1].should.be.approximately(0.000, 0.001);

            rungeKutta(dy, y0, t0, 0.5, 1, rungeKuttaTypes.euler)[0].should.be.approximately(2.000, 0.001);
            rungeKutta(dy, y0, t0, 0.5, 1, rungeKuttaTypes.euler)[1].should.be.approximately(1.000, 0.001);

            rungeKutta(dy, y0, t0, 1, 2, rungeKuttaTypes.euler)[0].should.be.approximately(2.500, 0.001);
            rungeKutta(dy, y0, t0, 1, 2, rungeKuttaTypes.euler)[1].should.be.approximately(0.921, 0.001);

            // These values are in the original page, but appear incorrect.
            //eulerRungeKutta(dy, y0, t0, 1 / 4, 4)[0].should.be.approximately(3.777, 0.001);
            //eulerRungeKutta(dy, y0, t0, 1 / 8, 8)[0].should.be.approximately(3.933, 0.001);
            //eulerRungeKutta(dy, y0, t0, 1 / 16, 16)[0].should.be.approximately(4.024, 0.001);
            //eulerRungeKutta(dy, y0, t0, 1 / 32, 32)[0].should.be.approximately(4.074, 0.001);
        });

        it('should give the correct answer for a another simple 2nd-order ODE using Euler\'s method.', function() {
            // From: http://www.math.umd.edu/~petersd/460/html/eulerRungeKutta_demo2.html
            const dy = [
                (t, y) => {
                    return y[1];
                },
                (t, y) => {
                    return t + y[1] - 3 * y[0]; 
                }
            ];

            const y0 = [
                1,
                -2
            ];

            const t0 = 0;

            rungeKutta(dy, y0, t0, 4, 16, rungeKuttaTypes.euler)[0].should.be.approximately(32.5946, 0.0001);
            rungeKutta(dy, y0, t0, 4, 32, rungeKuttaTypes.euler)[0].should.be.approximately(15.0972, 0.0001);
            rungeKutta(dy, y0, t0, 4, 64, rungeKuttaTypes.euler)[0].should.be.approximately(8.0537, 0.0001);
            rungeKutta(dy, y0, t0, 4, 128, rungeKuttaTypes.euler)[0].should.be.approximately(5.40507, 0.0001);
            rungeKutta(dy, y0, t0, 4, 256, rungeKuttaTypes.euler)[0].should.be.approximately(4.31208, 0.0001);
        });
    });
    
    describe('rungeKuttaType.ralston', function() {
        it('should give the correct answer for a simple example using Ralston\'s method.', function() {
            // From: <https://en.wikipedia.org/wiki/eulerRungeKutta_method>
            const dy = [(t, y) => {
                return Math.tan(y) + 1;
            }];

            const yInitial = [1];

            const tInitial = 1;

            const tFinal = 1.1;

            const numSteps = 4;

            rungeKutta(dy, yInitial, tInitial, tInitial + 1 * 0.025, 1, rungeKuttaTypes.ralston)[0].should.be.approximately(1.066, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 2 * 0.025, 2, rungeKuttaTypes.ralston)[0].should.be.approximately(1.141, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 3 * 0.025, 3, rungeKuttaTypes.ralston)[0].should.be.approximately(1.227, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 4 * 0.025, 4, rungeKuttaTypes.ralston)[0].should.be.approximately(1.335, 0.001);
        });
    });
  
    describe('rungeKuttaType.rk4', function() {
        it('should give the correct answer for a 2nd-order ODE example using the standard RK4 method.', function() {
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


            const rungeKuttaType = rungeKuttaTypes.rk4;

            rungeKutta(dy, yInitial, tInitial, tInitial + 0 * stepSize, 0, rungeKuttaType)[0].should.be.approximately(0.000, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 0 * stepSize, 0, rungeKuttaType)[1].should.be.approximately(1.000, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 1 * stepSize, 1, rungeKuttaType)[0].should.be.approximately(0.009, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 1 * stepSize, 1, rungeKuttaType)[1].should.be.approximately(0.990, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 2 * stepSize, 2, rungeKuttaType)[0].should.be.approximately(0.019, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 2 * stepSize, 2, rungeKuttaType)[1].should.be.approximately(0.980, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 3 * stepSize, 3, rungeKuttaType)[0].should.be.approximately(0.029, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 3 * stepSize, 3, rungeKuttaType)[1].should.be.approximately(0.970, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 4 * stepSize, 4, rungeKuttaType)[0].should.be.approximately(0.039, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 4 * stepSize, 4, rungeKuttaType)[1].should.be.approximately(0.960, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 5 * stepSize, 5, rungeKuttaType)[0].should.be.approximately(0.048, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 5 * stepSize, 5, rungeKuttaType)[1].should.be.approximately(0.951, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 6 * stepSize, 6, rungeKuttaType)[0].should.be.approximately(0.058, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 6 * stepSize, 6, rungeKuttaType)[1].should.be.approximately(0.941, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 7 * stepSize, 7, rungeKuttaType)[0].should.be.approximately(0.067, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 7 * stepSize, 7, rungeKuttaType)[1].should.be.approximately(0.932, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 8 * stepSize, 8, rungeKuttaType)[0].should.be.approximately(0.076, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 8 * stepSize, 8, rungeKuttaType)[1].should.be.approximately(0.923, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 9 * stepSize, 9, rungeKuttaType)[0].should.be.approximately(0.086, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 9 * stepSize, 9, rungeKuttaType)[1].should.be.approximately(0.914, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 10 * stepSize, 10, rungeKuttaType)[0].should.be.approximately(0.095, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 10 * stepSize, 10, rungeKuttaType)[1].should.be.approximately(0.904, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 11 * stepSize, 11, rungeKuttaType)[0].should.be.approximately(0.104, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 11 * stepSize, 11, rungeKuttaType)[1].should.be.approximately(0.896, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 12 * stepSize, 12, rungeKuttaType)[0].should.be.approximately(0.113, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 12 * stepSize, 12, rungeKuttaType)[1].should.be.approximately(0.887, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 13 * stepSize, 13, rungeKuttaType)[0].should.be.approximately(0.121, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 13 * stepSize, 13, rungeKuttaType)[1].should.be.approximately(0.878, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 14 * stepSize, 14, rungeKuttaType)[0].should.be.approximately(0.130, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 14 * stepSize, 14, rungeKuttaType)[1].should.be.approximately(0.869, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 15 * stepSize, 15, rungeKuttaType)[0].should.be.approximately(0.139, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 15 * stepSize, 15, rungeKuttaType)[1].should.be.approximately(0.861, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 16 * stepSize, 16, rungeKuttaType)[0].should.be.approximately(0.147, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 16 * stepSize, 16, rungeKuttaType)[1].should.be.approximately(0.852, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 17 * stepSize, 17, rungeKuttaType)[0].should.be.approximately(0.156, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 17 * stepSize, 17, rungeKuttaType)[1].should.be.approximately(0.844, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 18 * stepSize, 18, rungeKuttaType)[0].should.be.approximately(0.164, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 18 * stepSize, 18, rungeKuttaType)[1].should.be.approximately(0.836, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 19 * stepSize, 19, rungeKuttaType)[0].should.be.approximately(0.173, 0.001);
            rungeKutta(dy, yInitial, tInitial, tInitial + 19 * stepSize, 19, rungeKuttaType)[1].should.be.approximately(0.827, 0.001);
        });
    });
});

