import { expect, it } from 'vitest';
import { type AirportTraffic } from '../src/filterFlights.js';
import { formatAirportTraffic } from '../src/formatAirportTraffic.js';

it('formats a departure only', () => {
    const testTraffic: AirportTraffic = {
        departures: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    destination: 'KLAX',
                },
            },
        ],
        arrivals: [],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Departures:\nEIN123 EIDW -> KLAX\n\nArrivals:\nNone');
});

it('formats an arrival only', () => {
    const testTraffic: AirportTraffic = {
        departures: [],
        arrivals: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    destination: 'KLAX',
                },
            },
        ],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Departures:\nNone\n\nArrivals:\nEIN123 EIDW -> KLAX');
});

it('formats both departure and arrival', () => {
    const testTraffic: AirportTraffic = {
        departures: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    destination: 'KLAX',
                },
            },
        ],
        arrivals: [
            {
                callsign: 'EIN456',
                flight_plan: {
                    departure: 'KLAX',
                    destination: 'EIDW',
                },
            },
        ],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Departures:\nEIN123 EIDW -> KLAX\n\nArrivals:\nEIN456 KLAX -> EIDW');
});

it('formats no traffic', () => {
    const testTraffic: AirportTraffic = {
        departures: [],
        arrivals: [],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Departures:\nNone\n\nArrivals:\nNone');
});
