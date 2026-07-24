import { expect, it } from 'vitest';
import { formatAirportTraffic } from '../src/formatAirportTraffic.js';
import { type AirportTraffic } from '../src/types.js';

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
        controllers: [
            'EIDW_GND',
            'EIDW_TWR'
        ],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Controllers:EIDW_GND, EIDW_TWR\n\nDepartures:\nEIN123 EIDW -> KLAX\n\nArrivals:\nNone');
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
        controllers: ['EIDW_TWR'],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Controllers:EIDW_TWR\n\nDepartures:\nNone\n\nArrivals:\nEIN123 EIDW -> KLAX');
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
        controllers: [
            'EIDW_GND',
            'EIDW_TWR'
        ],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Controllers:EIDW_GND, EIDW_TWR\n\nDepartures:\nEIN123 EIDW -> KLAX\n\nArrivals:\nEIN456 KLAX -> EIDW');
});

it('formats no traffic', () => {
    const testTraffic: AirportTraffic = {
        departures: [],
        arrivals: [],
        controllers: [],
    };

    const actual = formatAirportTraffic(testTraffic);

    expect(actual).toEqual('Controllers:None\n\nDepartures:\nNone\n\nArrivals:\nNone');
});
