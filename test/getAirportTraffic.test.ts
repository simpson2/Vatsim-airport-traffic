import { afterEach, expect, it, vi } from 'vitest';
import { getAirportTraffic } from '../src/getAirportTraffic.js';

afterEach(() => {
    vi.restoreAllMocks();
});

it('includes a matching departure', async () => {
    const testAirport = 'EIDW';
    const expectedResponse = {
        pilots: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    arrival: 'EGLL',
                },
            },
        ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify(expectedResponse), {
            status: 200,
        }),
    );

    const actual = await getAirportTraffic(testAirport);

    expect(actual).toEqual({
        departures: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    destination: 'EGLL',
                },
            },
        ],
        arrivals: [],
    });
});
