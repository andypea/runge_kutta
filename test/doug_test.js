import assert from 'assert';
import {doug} from '../index.js';

describe('doug()', function() {
    it('should return 42', function() {
        assert.equal(doug(), 42);
    });
});

