import should from 'should';
import {doug} from '../index.js';

describe('doug()', function() {
    it('should return 42', function() {
        doug().should.be.equal(42);
    });
});

