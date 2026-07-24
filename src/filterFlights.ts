import type { Pilot } from './types.js';

type AirportFlights = {
    departures: Pilot[];
    arrivals: Pilot[];
};

export function filterFlightsByAirport(
    pilots: Pilot[],
    airport: string,
): AirportFlights {
    const normalisedAirport = airport.trim().toUpperCase(); // Normalize the airport code to uppercase for consistent comparison

    const departures = pilots.filter(
        (pilot) => pilot.flight_plan?.departure.toUpperCase() === normalisedAirport); // Filter pilots whose flight plan departure matches the specified airport
    const arrivals = pilots.filter(
        (pilot) => pilot.flight_plan?.destination.toUpperCase() === normalisedAirport); // Filter pilots whose flight plan destination matches the specified airport

    return { departures, arrivals };
};
