import { afterEach, expect, it, vi } from 'vitest';
import { fetchVatsimPilots } from '../src/fetchVatsimData.js';

afterEach(() => {
    vi.restoreAllMocks();
});

it('fetches and transforms VATSIM pilots', async () => {
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
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(JSON.stringify(vatsimResponse), {
            status: 200,
        }),
    );

    const actual = await fetchVatsimPilots();

    expect(actual).toEqual([
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
    ]);
});

it('throws when VATSIM request fails', async () => {
    const expectedError = 'Failed to fetch VATSIM data: 503 Service Unavailable';

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
        new Response(expectedError, {
            status: 503,
            statusText: 'Service Unavailable',
        }),
    );

    const actual = fetchVatsimPilots();

    await expect(actual).rejects.toThrow(expectedError);
});
