import assert from 'assert';
import {euler} from '../index.js';

describe('euler()', function() {
    it('should give the correct answer for a simple example', function() {
        const dy = (t) => {
            return t;
        }
        assert.equal(euler(dy, 1, 1, 4), 16);
    });
});

