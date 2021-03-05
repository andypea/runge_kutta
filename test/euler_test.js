import should from 'should';
import {euler} from '../index.js';

describe('euler()', function() {
    it('should give the correct answer for a simple example', function() {
        // From: <https://en.wikipedia.org/wiki/Euler_method>
        const dy = (t, y) => {
            return y[0];
        };

        euler([dy], [1], 0, 4, 4)[0].should.be.approximately(16, 0.01);
        euler([dy], [1], 0, 4, 4 * 4)[0].should.be.approximately(35.53, 0.01);
        euler([dy], [1], 0, 4, 10 * 4)[0].should.be.approximately(45.26, 0.01);
        euler([dy], [1], 0, 4, 20 * 4)[0].should.be.approximately(49.56, 0.01);
        euler([dy], [1], 0, 4, 40 * 4)[0].should.be.approximately(51.98, 0.01);
        euler([dy], [1], 0, 4, 80 * 4)[0].should.be.approximately(53.26, 0.01);
    });
    
    it('should give the correct answer for a simple 2nd-order example', function() {
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
        
        euler(dy, y0, t0, 1, 1)[0].should.be.approximately(3.000, 0.001);
        euler(dy, y0, t0, 1, 1)[1].should.be.approximately(0.000, 0.001);
        
        euler(dy, y0, t0, 0.5, 1)[0].should.be.approximately(2.000, 0.001);
        euler(dy, y0, t0, 0.5, 1)[1].should.be.approximately(1.000, 0.001);
       
        euler(dy, y0, t0, 1, 2)[0].should.be.approximately(2.500, 0.001);
        euler(dy, y0, t0, 1, 2)[1].should.be.approximately(0.921, 0.001);
      
        // These values are in the original page, but appear incorrect.
        //euler(dy, y0, t0, 1 / 4, 4)[0].should.be.approximately(3.777, 0.001);
        //euler(dy, y0, t0, 1 / 8, 8)[0].should.be.approximately(3.933, 0.001);
        //euler(dy, y0, t0, 1 / 16, 16)[0].should.be.approximately(4.024, 0.001);
        //euler(dy, y0, t0, 1 / 32, 32)[0].should.be.approximately(4.074, 0.001);
    });
    
    it('should give the correct answer for a another simple 2nd-order example', function() {
        // From: http://www.math.umd.edu/~petersd/460/html/euler_demo2.html
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
        
        euler(dy, y0, t0, 4, 16)[0].should.be.approximately(32.5946, 0.0001);
        euler(dy, y0, t0, 4, 32)[0].should.be.approximately(15.0972, 0.0001);
        euler(dy, y0, t0, 4, 64)[0].should.be.approximately(8.0537, 0.0001);
        euler(dy, y0, t0, 4, 128)[0].should.be.approximately(5.40507, 0.0001);
        euler(dy, y0, t0, 4, 256)[0].should.be.approximately(4.31208, 0.0001);
    });
});

