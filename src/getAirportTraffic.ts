import { fetchVatsimData } from './fetchVatsimData.js';
import { filterControllersByAirport } from './filterControllers.js';
import { filterFlightsByAirport } from './filterFlights.js';
import type { AirportTraffic } from './types.js';

export async function getAirportTraffic(airport: string): Promise<AirportTraffic> {
    const vatsimData = await fetchVatsimData();

    const airportFlights = filterFlightsByAirport(vatsimData.pilots, airport);
    const controllers = filterControllersByAirport(vatsimData.controllerCallsigns, airport);


    return {
        departures: airportFlights.departures,
        arrivals: airportFlights.arrivals,
        controllers,
    };
};
