import { expect, it } from 'vitest';
import { filterControllersByAirport } from '../src/filterControllers.js';

it('includes controllers matching airport', () => {
    // Arrange
    const testAirport = 'eidw';
    const testControllerCallsigns = ['EGLL_TWR', 'EIDW_GND', 'EIDW_APP'];

    // Act
    const actual = filterControllersByAirport(testControllerCallsigns, testAirport);

    // Assert
    expect(actual).toEqual(['EIDW_GND', 'EIDW_APP']);
});

it('returns an empty array when no controllers match', () => {
    // Arrange
    const testAirport = 'eidw';
    const testControllerCallsigns = ['EGLL_TWR', 'KLAX_GND', 'EINN_APP'];

    // Act
    const actual = filterControllersByAirport(testControllerCallsigns, testAirport);

    // Assert
    expect(actual).toEqual([]);
});
