import { expect, it } from 'vitest';
import { filterFlightsByAirport } from '../src/filterFlights.js';
import type { Pilot } from '../src/types.js';

it('includes a matching departure', () => {
    // Arrange
    const testPilot: Pilot = {
        callsign: 'EIN123',
        flight_plan: {
            departure: 'EIDW',
            destination: 'KLAX',
        },
    };

    // Act
    const actual = filterFlightsByAirport([testPilot], 'EIDW');

    // Assert
    expect(actual).toEqual({
        departures: [testPilot],
        arrivals: [],
    });
});

it('includes a matching arrival', () => {
    // Arrange
    const testPilot: Pilot = {
        callsign: 'EIN345',
        flight_plan: {
            departure: 'KLAX',
            destination: 'EIDW',
        },
    };

    // Act
    const actual = filterFlightsByAirport([testPilot], 'EIDW');

    // Assert
    expect(actual).toEqual({
        departures: [],
        arrivals: [testPilot],
    });
});

it('ignores a pilot without a flight plan', () => {
    // Arrange
    const testPilot: Pilot = {
        callsign: 'EIN678',
        flight_plan: null,
    };

    // Act
    const actual = filterFlightsByAirport([testPilot], 'EIDW');

    // Assert
    expect(actual).toEqual({
        departures: [],
        arrivals: [],
    });
});

it('normalises the requested airport code', () => {
    // Arrange
    const testPilot: Pilot = {
        callsign: 'EIN123',
        flight_plan: {
            departure: 'EIDW',
            destination: 'KLAX',
        },
    };

    // Act
    const actual = filterFlightsByAirport([testPilot], ' eidw ');

    // Assert
    expect(actual).toEqual({
        departures: [testPilot],
        arrivals: [],
    });
});

it('excludes a flight unrelated to the requested airport', () => {
    // Arrange
    const testPilot: Pilot = {
        callsign: 'EIN123',
        flight_plan: {
            departure: 'EINN',
            destination: 'GCTS',
        },
    };

    // Act
    const actual = filterFlightsByAirport([testPilot], 'EIDW');

    // Assert
    expect(actual).toEqual({
        departures: [],
        arrivals: [],
    });
});
