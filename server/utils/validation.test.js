const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
        const input = 123;
        const result = isRealString(input);

        expect(result).toBe(false);
    });
    it('should reject string with only spaces', () => {
        const input = '     ';
        const result = isRealString(input);

        expect(result).toBe(false);  
    });
    it('should allow string with non space characters', () => {
        const input = 'hello123';
        const result = isRealString(input);

        expect(result).toBe(true);  
    });
});
