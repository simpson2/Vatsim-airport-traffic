export function filterControllersByAirport(
    controllerCallsigns: string[],
    airport: string
): string[] {
    const normalisedAirport = airport.trim().toUpperCase();
    const airportPrefix = normalisedAirport+'_';

    const filteredControllers = controllerCallsigns.filter(
        (controller) => controller.startsWith(airportPrefix)
    );

    return filteredControllers;
};
