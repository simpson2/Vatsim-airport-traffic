import { afterEach, expect, it, vi } from 'vitest';
import { fetchVatsimData } from '../src/fetchVatsimData.js';

afterEach(() => {
    vi.restoreAllMocks();
});

it('fetches and transforms VATSIM data', async () => {
    const vatsimResponse = {
        pilots: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    arrival: 'EGLL',
                },
            },
            {
                callsign: 'EIN456',
                flight_plan: null,
            },
        ],
        controllers: [
            { callsign: 'EIDW_GND' },
            { callsign: 'EGLL_TWR' },
        ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify(vatsimResponse), {
            status: 200,
        }),
    );

    const actual = await fetchVatsimData();

    expect(actual).toEqual({
        pilots: [
            {
                callsign: 'EIN123',
                flight_plan: {
                    departure: 'EIDW',
                    destination: 'EGLL',
                },
            },
            {
                callsign: 'EIN456',
                flight_plan: null,
            },
        ],
        controllerCallsigns: ['EIDW_GND', 'EGLL_TWR'],
    });
});

it('throws when VATSIM request fails', async () => {
    const expectedError = 'Failed to fetch VATSIM data: 503 Service Unavailable';

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(expectedError, {
            status: 503,
            statusText: 'Service Unavailable',
        }),
    );

    const actual = fetchVatsimData();

    await expect(actual).rejects.toThrow(expectedError);
});
