import { fetchVatsimPilots } from './fetchVatsimData.js';
import { filterFlightsByAirport, type AirportTraffic } from './filterFlights.js';

export async function getAirportTraffic(airport: string): Promise<AirportTraffic> {
    const vatsimData = await fetchVatsimPilots();
    const airportTraffic = filterFlightsByAirport(vatsimData, airport);

    return airportTraffic;
};
