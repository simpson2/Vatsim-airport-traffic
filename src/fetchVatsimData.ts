import type { Pilot } from './types.js';

type VatsimPilot = {
    callsign: string;
    flight_plan: {
        departure: string;
        arrival: string;
    } | null;
};

type VatsimData = {
    pilots: VatsimPilot[];
};

function toPilot(vatsimPilot: VatsimPilot): Pilot {
    const callsign = vatsimPilot.callsign;

    if (vatsimPilot.flight_plan === null) {
        const flight_plan = null;
        return { callsign, flight_plan };
    }

    const flight_plan = {
        departure: vatsimPilot.flight_plan.departure,
        destination: vatsimPilot.flight_plan.arrival,
    };

    return { callsign, flight_plan };
};

const VATSIM_DATA_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

export async function fetchVatsimPilots(): Promise<Pilot[]> {
    const response = await fetch(VATSIM_DATA_URL);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch VATSIM data: ${response.status} ${response.statusText}`,
        );
    }

    const rawData = await response.json();
    const data = rawData as VatsimData;

    return data.pilots.map(toPilot);
}
