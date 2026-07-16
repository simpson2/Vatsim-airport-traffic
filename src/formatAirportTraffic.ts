import type { AirportTraffic } from './filterFlights.js';

export function formatAirportTraffic(traffic: AirportTraffic): string {

    const departureLines: string[] = [];
    const arrivalLines: string[] = [];
    let departureString = 'Departures:\nNone';
    let arrivalString = 'Arrivals:\nNone';

    for (const pilot of traffic.departures) {
        if (pilot.flight_plan === null) continue;

        const linesString = pilot.callsign
        +' '
        +pilot.flight_plan.departure
        +' '
        +'-> '
        +pilot.flight_plan.destination;

        departureLines.push(linesString);
    };
    for (const pilot of traffic.arrivals) {
        if (pilot.flight_plan === null) continue;

        const linesString = pilot.callsign
        +' '
        +pilot.flight_plan.departure
        +' '
        +'-> '
        +pilot.flight_plan.destination;

        arrivalLines.push(linesString);
    };


    if (departureLines.length !== 0) {
        departureString = 'Departures:\n'+departureLines.join('\n');
    };
    if (arrivalLines.length !== 0) {
        arrivalString = 'Arrivals:\n'+arrivalLines.join('\n');
    };

    const finalString = departureString+'\n\n'+arrivalString;
    return finalString;
};
