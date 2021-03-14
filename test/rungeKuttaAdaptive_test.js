import should from 'should';
import {rungeKuttaAdaptive, rungeKuttaAdaptiveTypes} from '../index.js';

describe('rungeKuttaAdaptive()', function() {
    describe('rungeKuttaType.rk45', function() {
        it('should give the correct answer for a 2nd-order trivial ODE using the Runge-Kutta-Fehlberg (RK45) method.', function() {
            const dy = [
                (t, y) => {
                    return 0;
                },
                (t, y) => {
                    return 0;
                }
            ];

            const yInitial = [0, 1];
            const tInitial = 0;
            const tFinal = 1;
            const initialStepSize = 0.01;
            const errorThreshold = 0.001;
            const rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;

            const result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

            result.y[0].should.be.equal(0);
            result.y[1].should.be.equal(1);
            result.t.should.be.equal(1);
        });
        
        it('should give the correct answer for a 1st-order ODE using the Runge-Kutta-Fehlberg (RK45) method.', function() {
            //<https://math.okstate.edu/people/yqwang/teaching/math4513_fall11/Notes/rungekutta.pdf>
            const dy = [
                (t, y) => {
                    return y - Math.pow(t, 2) + 1;
                }
            ];

            const yInitial = [0.5];
            const tInitial = 0;
            const tFinal = 2;
            const initialStepSize = 0.5;
            const errorThreshold = 1e-12;
            const rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;

            const result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

            result.y[0].should.be.approximately(5.305471950534674, 1e-7);
            result.t.should.be.approximately(tFinal, 1e-14);
        });
        
        it('should give the correct answer for a 1st-order ODE using the Runge-Kutta-Fehlberg (RK45) method.', function() {
            //<https://math.okstate.edu/people/yqwang/teaching/math4513_fall11/Notes/rungekutta.pdf>
            const dy = [
                (t, y) => {
                    return y - Math.pow(t, 2) + 1;
                }
            ];

            const yInitial = [0.5];
            const tInitial = 0;
            const tFinal = 2;
            const initialStepSize = 0.5;
            const errorThreshold = 1e-12;
            const rungeKuttaType = rungeKuttaAdaptiveTypes.rk45;

            const result = rungeKuttaAdaptive(dy, yInitial, tInitial, tFinal, initialStepSize, errorThreshold, rungeKuttaType);

            result.y[0].should.be.approximately(5.305471950534674, 1e-7);
            result.t.should.be.approximately(tFinal, 1e-14);
        });
    });
});

