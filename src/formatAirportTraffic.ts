import type { AirportTraffic } from './types.js';

export function formatAirportTraffic(traffic: AirportTraffic): string {

    const departureLines: string[] = [];
    const arrivalLines: string[] = [];
    const controllerLines: string[] = [];
    let departureString = 'Departures:\nNone';
    let arrivalString = 'Arrivals:\nNone';
    let controllerString = 'Controllers:None';

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
    for (const controller of traffic.controllers) {
        if (controller === null) continue;

        controllerLines.push(controller);
    };


    if (departureLines.length !== 0) {
        departureString = 'Departures:\n'+departureLines.join('\n');
    };
    if (arrivalLines.length !== 0) {
        arrivalString = 'Arrivals:\n'+arrivalLines.join('\n');
    };
    if (controllerLines.length !== 0) {
        controllerString = 'Controllers:'+controllerLines.join(', ');
    };

    const finalString = controllerString+'\n\n'+departureString+'\n\n'+arrivalString;
    return finalString;
};
