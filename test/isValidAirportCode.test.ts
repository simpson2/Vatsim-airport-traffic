import { expect, it } from 'vitest';
import { isValidAirportCode } from '../src/isValidAirportCode.js';

it('accepts a valid airport code', () => {
    const actual = isValidAirportCode('EIDW');

    expect(actual).toEqual(true);
});

it('accepts lowercase airport code with surrounding whitespace', () => {
    const actual = isValidAirportCode(' eidw ');

    expect(actual).toEqual(true);
});

it('rejects an airport code containing a non-letter', () => {
    const actual = isValidAirportCode('E1DW');

    expect(actual).toEqual(false);
});

it('rejects an airport code shorter than four letters', () => {
    const actual = isValidAirportCode('EDW');

    expect(actual).toEqual(false);
});

it('rejects an airport code longer than four letters', () => {
    const actual = isValidAirportCode('EIDWX');

    expect(actual).toEqual(false);
});
